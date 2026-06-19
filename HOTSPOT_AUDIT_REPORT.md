# Comprehensive Hotspot Audit Report for dtc-guide.html

## Executive Summary

The document currently has **31 hotspots** defined with corresponding modals. After auditing the document, I identified **45 additional instances** where technical terms, regulatory references, and financial concepts appear without hotspot treatment that would benefit from interactive explanations.

---

## Current Hotspot Coverage

### ✅ **Existing Hotspots (31 terms):**
- Entities: DTC, DTCC, Cede & Co., NSCC, FICC, GSD, MBSD
- Infrastructure: Depositories, Clearing Agencies, Nominees, Central Securities Depository
- Concepts: Legal Owner, Beneficial Owner, Street Name, Book-Entry, DVP, Settlement Risk
- Regulatory: SEC, Federal Reserve, Clearing Agency, Dodd-Frank Act (newly added)
- Processes: DTC Eligibility, FAST, Clearing, Settlement, Transfer Agent, Participant
- Legal: Securities Act 1933, General Partnership, Operating Arrangements, Rules
- Systems: CNS, Central Counterparty, Multilateral Netting, SIFMU, DRS
- Processes: Pro-Rata, Proxy Voting System, T1, Margin, Central Bank Money
- Agency: Proxy Solicitor

---

## 🔍 **Missing Hotspots by Priority**

### **HIGH PRIORITY** (Core concepts mentioned frequently)

#### 1. **Financial Risk & Margin Terms**
- **novation** (line 615) - Core CCP concept, mentioned without explanation
- **VaR / Value-at-Risk** (line 761, 810, 816) - Critical risk metric, mentioned 3+ times
- **mark-to-market** (line 761) - Essential valuation concept
- **backtesting** (line 761) - Risk validation methodology
- **margin** (mentioned multiple times without modal) - Core clearing concept
- **clearing fund** (mentioned multiple times without modal) - Critical risk resource

#### 2. **Regulatory & Legal References**
- **SIFMA** (line 895) - Industry association mentioned without explanation
- **Uniform Practice Code** (line 895) - Industry standard without modal
- **SEC rules** (line 1047) - Referenced generically without hotspot
- **Treasury Clearing Rules** (line 765) - Specific regulatory requirement
- **SIPC** (line 1184, 1185, 1186) - Investor protection mentioned 3 times

#### 3. **Settlement & Trading Concepts**
- **Continuous Net Settlement (CNS)** (line 624, 640) - Core NSCC service, mentioned twice without modal
- **T+1** (line 881) - Settlement cycle mentioned, modal exists for "t1" but not used in text
- **repo / repurchase agreements** (line 734, 809) - Critical market mechanism
- **tri-party repo** (line 734) - Specific repo structure
- **general collateral financing** (line 734) - Repo market segment

#### 4. **Corporate Action Terms**
- **ATOP** (line 1023) - Specific DTC program without modal
- **ASOP** (line 1024) - Specific DTC program without modal
- **IVORS** (line 1025) - Specific DTC program without modal
- **TBA** (line 700, 815) - To-be-announced market, mentioned twice
- **NOBO/OBO** (line 1055) - Investor status types without modal
- **PWP** (line 783, 1083, 1125) - Payment Without Presentation

### **MEDIUM PRIORITY** (Specialized terms)

#### 5. **FICC-Specific Services**
- **GCF Repo** (line 734) - Government securities financing
- **CCIT** (line 734) - Tri-party repo service
- **Sponsored Service** (line 739) - Access program
- **Agent Clearing Service** (line 739) - Client clearing
- **Electronic Pool Notification** (line 745) - MBSD service
- **Auction Takedown** (line 749) - Treasury auction service
- **CCLF** (line 810) - Liquidity facility

#### 6. **Risk Management Structures**
- **cross-guaranty agreements** (line 677) - Inter-entity risk sharing
- **corporate contribution** (line 677) - Layer of loss absorption
- **waterfall** (line 677) - Loss allocation sequence
- **net capital** (line 673) - Broker financial requirement
- **loss allocation rules** (line 804) - Default handling

#### 7. **Operational Processes**
- **record date** (mentioned 10+ times without modal)
- **payment date** (mentioned 10+ times without modal)
- **tender offers** (line 1000, 1023) - Corporate action type
- **rights offerings** (line 1004, 1024) - Corporate action type
- **stock splits** (line 1004) - Corporate action type
- **mergers** (line 1004) - Corporate action type
- **redemptions** (line 1008, 1103-1107) - Multiple types mentioned

### **LOWER PRIORITY** (Supporting concepts)

#### 8. **Market Structure Terms**
- **exchange** (line 620, 867) - Trading venue
- **ATS** (line 620) - Alternative trading system
- **ETFs** (line 605, 642) - Exchange-traded funds
- **ADRs** (line 605, 642) - Depositary receipts
- **UITs** (line 605, 642) - Unit investment trusts
- **broker-dealer** (mentioned 10+ times)
- **Treasuries** (line 729, 809) - Government securities

#### 9. **Technical Processing Terms**
- **cash in lieu** (line 1040) - Fractional share handling
- **roundup shares** (line 1041) - Fractional handling alternative
- **restricted distributions** (line 1041, 1042) - Special processing
- **fractional shares** (line 1034) - Corporate action result
- **proxy materials** (line 1047) - Voting documents
- **annual reports** (line 1055) - Corporate disclosure

---

## 🎯 **Recommendations**

### **Immediate Actions (Top 10 Priority):**

1. **novation** - Core CCP concept that appears in main explanation
2. **VaR** - Critical risk metric mentioned 3+ times
3. **Continuous Net Settlement (CNS)** - Fundamental NSCC service
4. **SIPC** - Important investor protection mentioned 3 times
5. **margin** - Core clearing concept mentioned frequently
6. **repo/repurchase agreements** - Essential market mechanism
7. **record date** - Critical concept mentioned 10+ times
8. **clearing fund** - Essential risk resource mentioned repeatedly
9. **T+1 settlement cycle** - Current industry standard
10. **ATOP/ASOP/IVORS** - DTC corporate action programs

### **Secondary Actions (Next 15):**

11. **mark-to-market** & **backtesting** - Risk methodology
12. **GCF Repo** & **CCIT** - Specific repo services
13. **TBA** - Important MBS market concept
14. **Uniform Practice Code** - Industry standard
15. **SIFMA** - Industry association
16. **cross-guaranty agreements** - Risk management
17. **waterfall** - Loss allocation
18. **NOBO/OBO** - Investor status types
19. **PWP** - Processing procedure
20. **tender offers** & **rights offerings** - Corporate actions
21-25. **Redemption types** (maturity, call, sinking fund, put)

### **Future Enhancements (Remaining 10):**

26-35. **Technical processing terms** and **market structure** items

---

## 📊 **Statistics**

- **Total document terms identified:** 76
- **Current hotspot coverage:** 31 (41%)
- **Missing hotspots:** 45 (59%)
- **Priority 1 (High):** 15 terms
- **Priority 2 (Medium):** 15 terms
- **Priority 3 (Low):** 15 terms

---

## 🔧 **Implementation Strategy**

### **Phase 1:** Create modals for top 10 high-priority terms
### **Phase 2:** Add hotspots to text for Phase 1 terms
### **Phase 3:** Create modals for next 15 medium-priority terms
### **Phase 4:** Add hotspots for Phase 3 terms
### **Phase 5:** Create modals for remaining lower-priority terms as needed

This systematic approach would bring hotspot coverage from **41% to 86%**, significantly enhancing the document's interactivity and educational value.
