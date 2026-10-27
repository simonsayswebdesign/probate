# Figures and claims still to check

Inline `TODO` markers in each file are the source of truth: `grep -rn TODO probate-site/`.

## Probate application fee (unverified at source)
gov.uk was unreachable when written. Law-firm summaries report the following; confirm all on gov.uk
(wills-probate-inheritance/applying-for-a-grant-of-representation):
- [ ] GBP 526 from 13 July 2026 (was GBP 300)
- [ ] No fee at or below GBP 5,000
- [ ] Extra grant copies GBP 2 with the application, GBP 16 later

## Calculator (`calculator/probate-cost.js`): all assumptions
- [ ] Legal fee percentages (1% to 5%), floors and ceilings: check against 10 to 20 solicitor price lists
- [ ] Add-ons: extra beneficiary, no will, property
- [ ] Property and other valuation costs
- [ ] Other disbursements, Land Registry and search fees, Gazette notice price
- [ ] Number of grant copies assumed
- [ ] VAT 20% on legal fees and valuations

## Copy
- [ ] Cost page: fill the "rough total cost" table (currently placeholders); sourced percentage-fee range; valuation range
- [ ] Timing page: current official grant processing time; death registration deadlines (5 days E&W, 8 Scotland); IHT due date and interest; executor's year; IHT instalment option
- [ ] Do I need probate: joint tenants vs tenants in common; DVLA position on cars; Land Registry register fee
- [ ] Contesting a will: solicitor review of whole page; six-month limit for 1975 Act claims and extension; caveat period and fee; who can claim; do not state costs or "no win no fee" unless sourced
- [ ] IHT nil-rate band GBP 325,000, residence nil-rate band, and freeze period
- [ ] SRA price transparency rules; Legal Ombudsman time limits; VAT treatment

## Lead form, privacy and referral disclosure
- [ ] Lawful basis for passing leads to solicitors (consent vs legitimate interests)
- [ ] ICO fee registration and number
- [ ] PECR / TPS rules for solicitors' follow-up calls and marketing emails
- [ ] Retention periods; deletion requests reaching solicitors
- [ ] Data sharing agreement with each solicitor
- [ ] Cookie notice (depends on build)
- [ ] Remove or keep the free-text field (health data risk)
- [ ] SRA referral-fee disclosure wording and rule references (paragraph numbers not verified)
- [ ] "Does not increase the price you pay" and "all solicitors SRA regulated" true for every partner
- [ ] Whether the lead-generation activity needs authorisation
- [ ] ASA/CAP rules on price claims

## Scope
- [ ] England and Wales only. Scotland and Northern Ireland need separate copy and fees, or a postcode block
