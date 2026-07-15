# OA ↔ Eligibility Questionnaire Crosswalk — Slice B

**Source of truth:** `pdf/operational-arrangements.pdf` — as of **June 10, 2026**  
**Teaching page:** `pages/forms/dtc-eligibility-questionnaire.html` (v1.2)  
**Scope:** BEO LOR (BLOR/ILOR) · required LOR riders · 144A/Reg S CUSIPs · put/Tender LOR · certificate sizing · indemnity/assurances · scenarios A–D  
**Depends on:** Slice A (timelines / Agent Confirmation already fixed)

---

## Crosswalk results

| Claim area | OA cite | Was | Now | Status |
|------------|---------|-----|-----|--------|
| BEO requires LOR on DTC form | § I.B.1.a | OK | OK + Exhibit B timing | **MATCH** |
| BLOR vs ILOR | § I.B.1.a | Mostly OK | Name-change / MMI nuances | **MATCH** |
| LOR delivery “1 BD pre-close” | Exhibit B | **STALE** | U.S. 3 BD PDF; non-U.S. 10/3 BD | **FIXED** |
| Riders: UK/Ireland | § I.B.1.b | OK | Required for each UK/Ireland security | **MATCH** |
| Riders: non-U.S. currency | § I.B.1.b | “May” in Scenario A | **Required** for GBP | **FIXED** |
| Riders: 144A/Reg S | § I.B.1.b | “Always required” | Expressly **older issues**; distinct CUSIP always (§ II.A.1.b) | **FIXED** |
| Distinct 144A/Reg S CUSIP | § II.A.1.b | OK | OK | **MATCH** |
| Tender LOR for all puts | Form: certificated only | Scenario A forced Tender LOR on BEO | Certificated form rule; BEO caution | **FIXED** |
| Certificate >$500M multi-cert | § I.B.1.d | OK (exceeds $500M) | OK | **MATCH** |
| REIT/NOL “must indemnity” | § I.B.4 | Overclaim | Assurances required; indemnity often/may; gaming must | **FIXED** |
| Foreign legal opinion | § I.B.3 | Soft | Scenario C strengthened | **MATCH** |
| Serial muni distinct CUSIPs | § II.A.1 | OK | OK | **MATCH** |
| PORTAL | Market history | OK legacy | Distinct CUSIP survives | **MATCH** |

---

## Scenario package after Slice B

| Scenario | LOR / special docs taught |
|----------|---------------------------|
| **A** UK dual 144A/Reg S + put + GBP | BLOR/ILOR + UK rider + **currency rider**; distinct CUSIP; Tender LOR **not** auto for BEO |
| **B** U.S. 144A HY | Distinct restricted CUSIP; LOR/riders per OA (older issues explicit); $500M one cert OK |
| **C** UK SEC-registered USD | UK rider; possible foreign opinion; non-U.S. LOR timing/signatures |
| **D** Muni serial BEO | Serial CUSIPs; BLOR name match; no Tender LOR |

---

## Quiz (Slice B)

| Q | Change |
|---|--------|
| Q2 | Explanation: Tender LOR = certificated form language |
| Q18 | Dual 144A/Reg S: CUSIP + older-issue riders language |
| Q20 | Correct = Tender LOR for **certificated** put/tender (form) |

---

## Files

- `pages/forms/dtc-eligibility-questionnaire.html`
- This matrix
- Slice A matrix remains: `scripts/OA_QUESTIONNAIRE_CROSSWALK_SLICE_A.md`

---

## Still out of scope (Slice C+)

- Older Issue / MMI / E-CD full paths  
- Directory phones  
- Full certificate legends / FRAC deep dive  
- Complete remaining modal inventory  
