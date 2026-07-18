#!/usr/bin/env python3
"""
Build js/search-index.js from HTML pages (titles, sections, modals, keywords).

Usage (from repo root):
  python3 scripts/build-search-index.py
  python3 scripts/build-search-index.py --dry-run

Merges:
  - Page-level entries (title, meta description-ish, path keywords)
  - Section headings with id attributes
  - Modal overlays (id starts with modal-)
  - Existing hand-curated keyword boosts for known pages (optional overlay)

Output is a JS file: const searchIndex = [ ... ];
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Pages to index (relative to repo root)
PAGES = [
    "index.html",
    "sitemap.html",
    "pages/forms/dtc-eligibility-questionnaire.html",
    "pages/guides/dtc-guide.html",
    "pages/guides/sf28-teaching-guide.html",
    "pages/guides/corporate-structures.html",
    "pages/guides/trusts-fiduciary.html",
    "pages/guides/non-profit-foundations.html",
    "pages/guides/collateral-ucc-article-8.html",
    "pages/docs/treasury-international-bill-of-exchange.html",
    "pages/docs/dtc-biblical-exegesis.html",
]

# Extra keywords by page basename (hand boosts)
KEYWORD_BOOSTS: dict[str, list[str]] = {
    "index.html": ["hub", "home", "documents", "navigation"],
    "dtc-eligibility-questionnaire.html": [
        "eligibility", "questionnaire", "cusip", "lor", "blor", "ilor",
        "uw source", "exhibit b", "niids", "fast", "oa", "operational arrangements",
    ],
    "dtc-guide.html": [
        "dtc", "dtcc", "cede", "nominee", "book-entry", "participant", "settlement",
    ],
    "sf28-teaching-guide.html": ["sf 28", "surety", "far", "affidavit", "collateral"],
    "corporate-structures.html": ["llc", "corporation", "partnership", "entity"],
    "collateral-ucc-article-8.html": ["ucc", "article 8", "collateral", "security interest"],
}


def strip_tags(html: str) -> str:
    text = re.sub(r"<script[^>]*>.*?</script>", " ", html, flags=re.S | re.I)
    text = re.sub(r"<style[^>]*>.*?</style>", " ", text, flags=re.S | re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def get_title(html: str) -> str:
    m = re.search(r"<title[^>]*>(.*?)</title>", html, re.S | re.I)
    if not m:
        return "Untitled"
    return strip_tags(m.group(1))


def extract_headings(html: str) -> list[tuple[str, str]]:
    """Return (id, text) for h1–h4 with id."""
    out = []
    for m in re.finditer(
        r"<h([1-4])[^>]*\bid=[\"']([^\"']+)[\"'][^>]*>(.*?)</h\1>",
        html,
        re.S | re.I,
    ):
        hid, inner = m.group(2), m.group(3)
        text = strip_tags(inner)
        if text and len(text) < 200:
            out.append((hid, text))
    # also id on section/div with class section-heading
    for m in re.finditer(
        r"<[^>]+id=[\"']([^\"']+)[\"'][^>]*class=[\"'][^\"']*section-heading[^\"']*[\"'][^>]*>(.*?)</",
        html,
        re.S | re.I,
    ):
        text = strip_tags(m.group(2))
        if text:
            out.append((m.group(1), text))
    return out


def extract_modals(html: str) -> list[tuple[str, str, str]]:
    """Return (id, title, snippet)."""
    out = []
    for m in re.finditer(
        r'<div[^>]+class=["\'][^"\']*modal-overlay[^"\']*["\'][^>]*id=["\'](modal-[^"\']+)["\'][^>]*>(.*?)</div>\s*(?=<div[^>]+class=["\'][^"\']*modal-overlay|<!--|$)',
        html,
        re.S | re.I,
    ):
        mid, body = m.group(1), m.group(2)
        # title from h3 or modal-header
        tm = re.search(r"<h3[^>]*>(.*?)</h3>", body, re.S | re.I)
        title = strip_tags(tm.group(1)) if tm else mid.replace("modal-", "").replace("-", " ").title()
        snippet = strip_tags(body)[:220]
        out.append((mid, title, snippet))
    # simpler fallback: any id="modal-*"
    if not out:
        for m in re.finditer(r'id=["\'](modal-[^"\']+)["\']', html, re.I):
            mid = m.group(1)
            # find following h3 nearby
            chunk = html[m.start() : m.start() + 1500]
            tm = re.search(r"<h3[^>]*>(.*?)</h3>", chunk, re.S | re.I)
            title = strip_tags(tm.group(1)) if tm else mid.replace("-", " ")
            out.append((mid, title, title))
    return out


def keywords_from_text(*parts: str, extra: list[str] | None = None) -> list[str]:
    bag: set[str] = set()
    if extra:
        for k in extra:
            bag.add(k.lower())
    stop = {
        "the", "and", "for", "with", "from", "that", "this", "are", "was", "were",
        "a", "an", "of", "to", "in", "on", "or", "is", "as", "by", "at", "be",
        "your", "you", "our", "their", "into", "about", "over", "under",
    }
    for p in parts:
        words = re.findall(r"[a-z0-9][a-z0-9\-/]{2,}", (p or "").lower())
        for w in words:
            if w not in stop and not w.isdigit():
                bag.add(w)
    # keep list bounded
    return sorted(bag)[:40]


def build_entries() -> list[dict]:
    entries: list[dict] = []
    seen: set[str] = set()

    for rel in PAGES:
        path = ROOT / rel
        if not path.exists():
            print(f"skip missing {rel}", file=sys.stderr)
            continue
        html = path.read_text(encoding="utf-8", errors="replace")
        title = get_title(html)
        base = path.name
        boost = KEYWORD_BOOSTS.get(base, [])

        page_id = path.stem if path.name != "index.html" else "index"
        if page_id in seen:
            page_id = rel.replace("/", "-").replace(".html", "")
        seen.add(page_id)

        page_kw = keywords_from_text(title, path.stem.replace("-", " "), extra=boost)
        entries.append(
            {
                "id": page_id,
                "title": title,
                "url": rel,
                "description": f"Teaching page: {title}",
                "keywords": page_kw,
                "type": "page",
            }
        )

        for hid, htext in extract_headings(html):
            eid = f"{page_id}-{hid}"
            if eid in seen:
                continue
            seen.add(eid)
            entries.append(
                {
                    "id": eid,
                    "title": htext,
                    "url": f"{rel}#{hid}",
                    "description": f"Section on {title}",
                    "keywords": keywords_from_text(htext, hid.replace("-", " "), extra=boost[:8]),
                    "type": "section",
                }
            )

        for mid, mtitle, snippet in extract_modals(html):
            eid = mid if mid not in seen else f"{page_id}-{mid}"
            if eid in seen:
                continue
            seen.add(eid)
            entries.append(
                {
                    "id": eid,
                    "title": mtitle,
                    "url": f"{rel}#{mid}",
                    "description": snippet[:180],
                    "keywords": keywords_from_text(mtitle, mid.replace("-", " "), snippet[:80]),
                    "type": "term",
                }
            )

    return entries


def write_index(entries: list[dict], dry_run: bool) -> None:
    out_path = ROOT / "js" / "search-index.js"
    header = (
        "/* Auto-generated Search Index */\n"
        "/* Regenerated by: python3 scripts/build-search-index.py */\n"
        "/* Do not hand-edit large sections — re-run the script after content changes. */\n"
    )
    body = "const searchIndex = " + json.dumps(entries, indent=2, ensure_ascii=False) + ";\n"
    text = header + body
    if dry_run:
        print(f"would write {len(entries)} entries ({len(text)} bytes) to {out_path}")
        print("sample:", json.dumps(entries[:2], indent=2)[:500])
        return
    out_path.write_text(text, encoding="utf-8")
    print(f"wrote {len(entries)} entries to {out_path.relative_to(ROOT)} ({len(text)} bytes)")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()
    entries = build_entries()
    write_index(entries, dry_run=args.dry_run)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
