# Figures and claims still to check

Inline `TODO` markers in each file are the source of truth: `grep -rn TODO probate-site/`.

## Probate application fee (unverified at source)
gov.uk was unreachable when written. Law-firm summaries report the following; confirm all on gov.uk
(wills-probate-inheritance/applying-for-a-grant-of-representation):
- [ ] GBP 526 from 13 July 2026 (was GBP 300): reported by several law firms and the Gazette, but some pages still show GBP 300, so confirm on gov.uk
- [ ] No fee at or below GBP 5,000
- [ ] Extra grant copies GBP 2 with the application, GBP 16 later (sources conflict)

## Calculator (`calculator/probate-cost.js`): all assumptions
- [ ] Legal fee percentages (1% to 5%), floors and ceilings: check against 10 to 20 solicitor price lists
- [ ] Add-ons: extra beneficiary, no will, property
- [ ] Property and other valuation costs
- [ ] Other disbursements, Land Registry and search fees, Gazette notice price
- [ ] Number of grant copies assumed
- [ ] VAT 20% on legal fees and valuations

## Copy
- [ ] Cost page: fill the "rough total cost" table (currently placeholders); sourced percentage-fee range; valuation range
- [ ] Timing page: grant processing time now says "around five weeks" (secondary source: ICAEW summary of HMCTS data, Oct 2026), confirm on gov.uk and date-stamp; death registration (now worded as 5 days from medical examiner contact, 8 Scotland); IHT due date (six months after end of month of death, consistent across sources) and interest; executor's year; IHT instalment option and interest
- [ ] Do I need probate: joint tenants vs tenants in common; DVLA position on cars; Land Registry register fee
- [ ] Contesting a will: solicitor review of whole page; six-month 1975 Act limit and court discretion to extend (consistent across secondary sources, wording now in the page); caveat period (six months, renewable, consistent across secondary sources) and current fee (conflicting figures found); who can claim; do not state costs or "no win no fee" unless sourced
- [ ] IHT nil-rate band GBP 325,000, residence nil-rate band GBP 175,000, frozen to April 2031 (reported by Deloitte and trade press after Autumn Budget 2025; confirm on gov.uk)
- [ ] SRA price transparency (summarised in the cost page from SRA guidance seen via search); Legal Ombudsman limits (one year / six months from final response, secondary sources); VAT treatment

## Lead form, privacy and referral disclosure
- [ ] Lawful basis for passing leads to solicitors (consent vs legitimate interests)
- [ ] ICO fee registration and number
- [ ] PECR / TPS rules for solicitors' follow-up calls and marketing emails
- [ ] Retention periods; deletion requests reaching solicitors
- [ ] Data sharing agreement with each solicitor
- [ ] Cookie notice (depends on build)
- [ ] Remove or keep the free-text field (health data risk)
- [ ] SRA referral-fee disclosure wording; paragraphs 5.1 to 5.3 (solicitors) and 7.1(b) (firms) now mentioned from an SRA warning notice found via search; solicitor to confirm current text
- [ ] "Does not increase the price you pay" and "all solicitors SRA regulated" true for every partner
- [ ] Whether the lead-generation activity needs authorisation
- [ ] ASA/CAP rules on price claims

## Scope
- [ ] England and Wales only. Scotland and Northern Ireland need separate copy and fees, or a postcode block

## New pages (probate-without-a-will, what-does-an-executor-do, selling-a-house-in-probate)
- [ ] Intestacy order of inheritance and any spouse threshold figure (not stated): confirm on gov.uk
- [ ] Order of priority for administrators; when an administration bond or guarantee is needed
- [ ] Executors: limit of four on a grant; renunciation wording; effect of creditor notices
- [ ] Selling a house: council tax exemption for properties in probate; CGT treatment of personal representatives and any reporting deadlines; empty-property insurance wording
