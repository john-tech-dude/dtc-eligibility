# OA ↔ Eligibility Questionnaire Crosswalk — Slice A

**Source of truth:** `pdf/operational-arrangements.pdf` — *The Depository Trust Company Operational Arrangements*, **as of June 10, 2026** (85 pages).  
**Teaching page:** `pages/forms/dtc-eligibility-questionnaire.html`  
**Pass date:** July 2026  
**Scope:** Deadlines / Exhibit B · Agent Confirmation · E-sign · UW SOURCE/UWC · OFAC · related quiz keys  

---

## Critical corrections applied

| Topic | Old teaching claim | OA rule (June 10, 2026) | Status after fix |
|-------|--------------------|-------------------------|------------------|
| Eligibility package timing | ≥ **10** BD pre-close questionnaire + prospectus | **Exhibit B:** ≥ **6** BD pre-close via UW SOURCE/UWC (offering doc, underwriter, CUSIPs, amounts, rates/maturities) | **MATCH** |
| CUSIP timing | 7 BD muni / upon pricing corporate | Exhibit B includes CUSIPs in the **6 BD** package (muni NIIDS note separate) | **MATCH** |
| Agent Confirmation | ≥ **3 BD prior** to closing (claimed “post→pre” change) | **§ I.A.1:** email confirmation of features/attributes **within 10 BD after Closing Date** for UW SOURCE/UWC issues | **MATCH** |
| Agent Letter | Often conflated with Agent Confirmation | **§ I intro:** Agent Letter on file **before** eligibility | **MATCH** (split taught) |
| BEO LOR | 1 BD pre-close with securities | **Exhibit B:** U.S. final PDF ≥ **3 BD**; non-U.S. draft ≥ **10 BD**, original hard copy by **3 BD** | **MATCH** |
| Securities delivery | 1 BD pre, noon ET LOR+securities | **§ II.B / Exhibit B:** cert inspection noon ET **day before**, *or* FRAC noon ET **on closing** | **MATCH** |
| Closing notice | Not taught | Exhibit B: underwriter & Agent notify by **1:15 p.m. ET** on Closing Date | **MATCH** (added) |
| UW SOURCE/UWC | Preferred; paper still OK | **§ I.A.1:** submission through UW SOURCE/UWC **at a minimum** for full-service eligibility | **MATCH** |
| E-sign | U.S. e-sign OK; non-U.S. manual | **§ I.A.6:** may rely on e-sign; non-U.S. often original manual; opinions hard-copy original | **MATCH** |
| OFAC | Underwriter confirms principals | Important Legal Info + **§ I.D:** parties must not violate OFAC; SDN/sanctioned issuer → **not eligible**; Participant screening rep; Agent OFAC cert | **MATCH** |
| Standards vs deadlines | “Standards not deadlines” | Important Legal Info: times applicable to DTC are standards; DTC may extend | **MATCH** |

---

## Form facsimile (intentional legacy)

The on-page **2000-style form instructions** still show 10 BD / 7 BD CUSIP wording. That is preserved as **historical form text**, with a field-diff pointing to **OA Exhibit B ≥ 6 BD**. Do not “fix” the facsimile text to rewrite the scanned form; teach the delta.

---

## Quiz keys updated (Slice A)

| Q | Change |
|---|--------|
| Q1 | Correct → **6 BD** Exhibit B package (not 10) |
| Q5 | Correct → **within 10 BD after closing** Agent Confirmation |
| Q10 | Softened missed-window distractor; Agent Letter remains hard stop |
| Q16/Q6 | Aligned to § I.A.6 wording |
| Q17 | Broader OFAC § I.D answer |
| Q19 | CUSIP in 6 BD package (not muni 7 / corp upon pricing) |

---

## Files touched

- `pages/forms/dtc-eligibility-questionnaire.html` (v1.1 footer)
- This matrix: `scripts/OA_QUESTIONNAIRE_CROSSWALK_SLICE_A.md`

---

## Out of scope (later slices)

- Full LOR/BLOR/ILOR rider matrix  
- Older Issue / MMI / E-CD paths  
- Certificate sizing, legends, FAST operational detail beyond noon-ET  
- Directory phone numbers  
- Complete modal inventory outside Slice A topics  

---

## How to re-run

1. Extract text from next OA PDF edition.  
2. Re-check Exhibit B table + § I.A.1 Agent Confirmation paragraph + § I.A.6 + § I.D OFAC.  
3. Diff against this matrix and the deadline callout / quiz answers.  
