# Lead form copy, privacy notice and referral disclosure

**Status: draft for review by a solicitor (or data protection adviser) before the site goes live.** Anything marked REVIEW is a point to check. A checklist is at the end.

Assumed business model: the site collects quote requests (estate value and postcode) and passes them to solicitors, and may be paid by the solicitor for that. Nothing below should be used until the operator's real arrangements match what the text says.

---

## 1. Lead form

### Form heading and intro

**Heading:** Get a probate quote from a solicitor

**Intro:** Tell us a little about the estate and where you are. We will pass your details to a solicitor who covers your area, and they will contact you to discuss a quote. There is no obligation to instruct them.

### Fields

| # | Label | Field type | Required | Helper text (microcopy) |
|---|---|---|---|---|
| 1 | Roughly what is the estate worth? | Select: Under £5,000 / £5,000 to £100,000 / £100,000 to £325,000 / £325,000 to £500,000 / £500,000 to £1 million / Over £1 million / Not sure | Yes | A rough guess is fine. Include property, savings and investments, and take off debts if you know them. |
| 2 | Is there a property in the estate? | Radio: Yes / No / Not sure | Yes | A house, flat or land owned by the person who died. |
| 3 | Is there a will? | Radio: Yes / No / Not sure | Yes | If you are not sure, choose "Not sure". A solicitor can help you find out. |
| 4 | How many people inherit? | Select: 1 / 2 / 3 / 4 / 5 or more / Not sure | No | Count everyone named in the will, or everyone who would inherit if there is no will. |
| 5 | Your postcode | Text | Yes | We use this to find a solicitor near you. Use your own postcode, or the postcode of the property if that is where the estate is being dealt with. |
| 6 | Your role | Select: Executor named in the will / Family member / Beneficiary / Other | No | |
| 7 | Your name | Text | Yes | |
| 8 | Your email address | Email | Yes | |
| 9 | Your phone number | Tel | Yes | A solicitor will usually phone you. |
| 10 | Anything else the solicitor should know? | Text area (optional, 500 characters) | No | Please do not include sensitive details such as health information. |

REVIEW: Field 10 may invite special category data. The helper text discourages it, but consider removing the field. Field 1 bands include £325,000, which is the current nil-rate band. TODO: confirm the current inheritance tax nil-rate band and residence nil-rate band figures on gov.uk, and how long they are frozen for, before using £325,000 as a band edge.

### Consent and notices (shown directly above the button)

**Checkbox 1 (required):**
I agree that you may pass my details to one or more solicitors who cover my area, so that they can contact me about my enquiry.

**Checkbox 2 (optional, unticked by default):**
I would also like to receive occasional emails about probate and estate administration. I can unsubscribe at any time.

**Text above the button:**
By sending this form you confirm you have read our [Privacy Notice](/privacy/) and our statement on [how we are paid](/how-we-are-paid/). We may receive a fee from a solicitor if you request a quote.

REVIEW: Whether consent is the right lawful basis for passing details to solicitors, or whether legitimate interests could apply, is for a data protection adviser to decide. The text above is written to work if the answer is consent. Marketing emails need their own consent under PECR. Do not pre-tick either box.

### Button and confirmation

**Button:** Request my quote

**Success message:** Thank you. We have passed your details to a solicitor who covers your area. They should contact you within [TODO: insert working days only if you can guarantee it]. If you do not hear from anyone, please [contact us](/contact/).

**Error messages:**
- Postcode: Please enter a full UK postcode, for example SW1A 1AA.
- Email: Please check your email address. It should look like name@example.com.
- Phone: Please enter a UK phone number.
- Required field: Please answer this question so we can find the right solicitor.
- Consent: Please tick the box so we can pass your details on, or contact a solicitor directly instead.

### Not-eligible message (estate under £5,000 or Scotland / Northern Ireland postcode)

**Under £5,000 / may not need a grant:** Estates this size often do not need a grant of probate, and a solicitor may not be the best route. Our guide to [whether you need probate](/do-i-need-probate/) explains more. You can still send the form if you would like to talk to a solicitor.

**Scotland or Northern Ireland:** We currently only match enquiries with solicitors in England and Wales. The process in your area is different. Please contact a local solicitor directly.

TODO: decide whether to block these postcodes or just warn. If national scope includes Scotland and NI, new copy and solicitor partners are needed.

---

## 2. Referral disclosure ("How we are paid")

Show a short version next to the form and publish the long version at /how-we-are-paid/.

### Short version (next to the form)

We may receive a fee from a solicitor if you request a quote. This does not change what you pay. [How we are paid](/how-we-are-paid/)

REVIEW: "does not change what you pay" must be true. Remove it if solicitors add the fee to the client's price.

### Full version

**How we are paid**

This website is a free service for people looking for a probate solicitor. We are not a law firm and we do not give legal advice.

When you ask for a quote, we pass your details to a solicitor, or more than one, who covers your area. If you use this form, we may receive a fee from the solicitor. This may be a fixed amount for each enquiry, or an amount agreed with the solicitor. We receive this fee whether or not you go on to instruct them.

The solicitors who receive enquiries are [TODO: choose one of: "chosen based on location and capacity" / "the firms that have agreed to work with us in your area"]. We do not recommend any individual firm and the order in which we refer enquiries is not a ranking of quality. [TODO: if enquiries go to more than one firm, say how many, for example "up to three".]

The fee we receive does not increase the price you pay. [TODO: confirm this is true in the contract with each solicitor.] You are free to compare quotes, to choose a different solicitor, or to deal with probate yourself.

All solicitors we work with are regulated by the Solicitors Regulation Authority. [TODO: verify each firm's SRA registration before listing them, and confirm that is how you want to describe them.] You can check any firm on the SRA website's register.

If you have a complaint about us, please [contact us](/contact/). If you have a complaint about a solicitor's service, you should start with the firm, and you may be able to take it to the Legal Ombudsman.

REVIEW (solicitor): The SRA requires firms to be transparent about referral arrangements, including telling clients about any fee they pay or receive for the introduction before or at the time they act. Check the current SRA Standards and Regulations (Code of Conduct for Solicitors) wording, and make sure each partner firm's own client care documents disclose the arrangement. Also confirm that the way this site charges (per lead, rather than a percentage of fees) is acceptable under SRA rules, and that this activity does not itself need authorisation. The precise paragraph numbers have deliberately not been quoted here because they have not been verified.

---

## 3. Privacy notice

**Privacy notice**

Last updated: [TODO: date]

### Who we are

[TODO: Company name, company number, registered address and contact email.] We are the "controller" of the personal data you give us through this website. This means we decide how and why your data is used.

[TODO: ICO registration number. Controllers in the UK usually have to pay a data protection fee to the ICO. Check whether this applies and register before launch.]

### What information we collect

When you use our quote form, we collect:

- Your name, email address and phone number
- Your postcode
- Your role (for example executor or beneficiary), if you tell us
- Details about the estate: approximate value, whether there is a property or a will, and the number of beneficiaries
- Anything you add in the free-text box
- Technical information such as your IP address and the pages you visit, collected through cookies. See our [Cookie Notice](/cookies/). [TODO: write the cookie notice according to what the site actually uses.]

We do not ask for special category data (such as health information), and we ask you not to include it. Information about a person who has died is generally not personal data, but information about you and other living people is.

### Why we use it, and our legal basis

| Purpose | Legal basis | Notes |
|---|---|---|
| Passing your enquiry to a solicitor so they can contact you | Your consent [REVIEW: or legitimate interests, adviser to decide] | You can withdraw consent at any time, but this will not affect what has already been done |
| Keeping records of enquiries and the solicitors they were sent to, for accounts and disputes | Legitimate interests (running our business and keeping accurate records) | |
| Responding to your messages | Legitimate interests | |
| Sending you emails about probate, if you opted in | Your consent | You can unsubscribe at any time |
| Running and improving the website | Legitimate interests, or consent where cookies require it | |
| Complying with the law | Legal obligation | |

### Who we share your data with

- **Solicitors.** We pass your enquiry details to [TODO: number] solicitor firms covering your postcode. Once they receive it, they become responsible for how they use it, and their own privacy notice will apply.
- **Our service providers,** such as website hosting, email and form software, and customer record systems. They act on our instructions. [TODO: list actual providers, their locations and whether data leaves the UK.]
- **Professional advisers and regulators,** where necessary.
- **Anyone else if the law requires it.**

We do not sell your data to other types of business. [REVIEW: wording is deliberate. Selling an enquiry to a solicitor is the business model, so the notice should be honest that solicitors pay us. See "How we are paid".]

### International transfers

[TODO: state whether any provider is outside the UK, and which safeguards apply.]

### How long we keep it

We keep enquiry records for [TODO: choose a period, for example 12 months, and justify it] and then delete or anonymise them. We keep accounting records for as long as the law requires. [TODO: confirm legal retention periods with an accountant.]

### Your rights

Under UK data protection law you have the right to:

- ask for a copy of the data we hold about you
- ask us to correct data that is wrong
- ask us to delete your data in some circumstances
- ask us to restrict how we use it
- object to some uses, including direct marketing
- withdraw consent at any time, where we rely on it
- ask for your data in a portable format, in some circumstances

To use these rights, email [TODO: address]. We normally reply within one month.

### Complaints

If you are unhappy with how we use your data, please contact us first. You can also complain to the Information Commissioner's Office at ico.org.uk or on 0303 123 1113. [TODO: confirm ICO contact details before publishing.]

### Changes to this notice

We may update this notice. The date at the top shows when it was last changed.

---

## 4. Points to be checked before launch

**UK GDPR / ICO**
1. Choose the lawful basis for passing leads to solicitors (consent versus legitimate interests) and make the form wording match. Check the ICO guidance on consent, on the right to be informed (Article 13 information) and on data sharing.
2. Confirm ICO data protection fee registration and add the registration number.
3. Check PECR rules for marketing emails and for solicitors' follow-up calls. Phone numbers on the TPS list need particular care if the solicitor makes marketing calls rather than responding to an enquiry the user asked for.
4. Decide how long enquiries are kept and how a deletion request reaches the solicitors who received the lead.
5. Prepare a data processing / data sharing agreement with each solicitor.
6. Cookie consent: the site needs a compliant banner if it uses non-essential cookies or tracking. This depends on the build.
7. Consider whether a data protection impact assessment is needed.

**SRA and legal sector**
8. Confirm what the SRA expects when a firm pays for introductions, and what each firm must tell its clients. Do not rely on the wording in this draft until a solicitor has confirmed it.
9. Confirm the site is not itself carrying out a regulated legal activity or holding itself out as providing legal services.
10. Check the claims "all solicitors are SRA regulated" and "does not increase the price you pay" are true for every partner.
11. Check any wording about lead exclusivity or the number of firms a lead is sent to against what actually happens.

**Advertising and consumer law**
12. Check the CAP / ASA guidance on testimonials, comparison claims and price claims before using any quote figures in advertising.
13. Review the site terms and a liability disclaimer for the cost estimator, including that it is an estimate only.
