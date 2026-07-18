# Search index

## Source of truth

- **Runtime file:** `js/search-index.js` (`const searchIndex = [...]`)
- **Query UI:** `js/search.js` (loads **after** the index file)
- **Generator:** `scripts/build-search-index.py`

## When to regenerate

Re-run after you:

- Add/rename a teaching page in `pages/`
- Add modal overlays (`id="modal-..."`) or section headings with `id`
- Change page `<title>`s that should appear in hub search

## How

From repo root (HTTP not required):

```bash
python3 scripts/build-search-index.py
# preview only:
python3 scripts/build-search-index.py --dry-run
```

Or:

```bash
npm run build:search
```

Commit the updated `js/search-index.js` with your content change.

## What gets indexed

| Type | Source |
|------|--------|
| `page` | Each HTML file in the script’s `PAGES` list |
| `section` | `h1`–`h4` with `id`, plus `.section-heading` with `id` |
| `term` | `.modal-overlay` blocks / `id="modal-*"` |

Hand keyword boosts live in `KEYWORD_BOOSTS` inside the Python script.

## Manual edits

Small keyword tweaks can be done by hand, but large edits will be overwritten on the next script run. Prefer updating `KEYWORD_BOOSTS` or page content, then regenerate.
