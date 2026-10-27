'use strict';

/*
 * Probate cost estimator (England and Wales).
 *
 * Pure function, no dependencies. Works in Node (module.exports) and in a
 * browser (window.ProbateCost) so the same file can be dropped into a page.
 *
 * Every figure below is an ASSUMPTION used to give a rough range. None of
 * them has been checked against a live solicitor price list. Before launch,
 * check each one where the comment says to, and keep the "estimate only"
 * wording next to any number shown to the public.
 *
 * Not covered: Scotland (confirmation) and Northern Ireland (different
 * courts and fees), conveyancing on selling a property, inheritance tax
 * itself, income tax or CGT, disputes, or the cost of a trust.
 */

/* ---------- Court fee ---------- */

// Probate application fee, England and Wales, for estates over the threshold.
// Search results from several law firms (Oct 2026) report GBP 526 from
// 13 July 2026 (up from GBP 300). gov.uk could not be reached from the
// build environment, so this is NOT confirmed at source.
// TODO: confirm at https://www.gov.uk/wills-probate-inheritance/applying-for-a-grant-of-representation
// and in the MoJ fee order. Re-check whenever fees are reviewed.
const COURT_FEE = 526;

// No fee is payable if the estate is at or below this value.
// TODO: confirm threshold (GBP 5,000) on gov.uk at the same page as above.
const COURT_FEE_THRESHOLD = 5000;

// Cost of each additional official copy of the grant, if ordered with the
// application. Reported as GBP 2 from 13 July 2026 (GBP 16 if ordered later).
// TODO: confirm on gov.uk. This reading comes from law-firm summaries only.
const COPY_FEE = 2;

// Number of grant copies assumed (banks, insurers, HMRC, Land Registry).
// Our own assumption. Check against what solicitors typically order.
const COPIES = { low: 2, typical: 5, high: 10 };

/* ---------- VAT ---------- */

// UK standard VAT rate, applied to legal fees and valuation fees.
// TODO: confirm on gov.uk if the rate changes. Court fees carry no VAT.
const VAT_RATE = 0.2;

/* ---------- Legal fees (excluding VAT) ---------- */

// Percentage of estate value charged, by complexity. Percentage pricing of
// 1% to 5% plus VAT is commonly advertised, but these exact figures are our
// assumption. TODO: check against 10 to 20 current solicitor price lists
// (fixed-fee and percentage) before publishing any range.
const LEGAL_FEE_PERCENT = {
  simple:   { low: 0.010, typical: 0.015, high: 0.025 },
  moderate: { low: 0.015, typical: 0.025, high: 0.035 },
  complex:  { low: 0.020, typical: 0.035, high: 0.050 },
};

// Floor on legal fees (GBP, ex VAT) so small estates do not show an
// unrealistically low fee. Assumption. TODO: check against fixed-fee quotes.
const LEGAL_FEE_MIN = {
  simple:   { low: 900,  typical: 1500, high: 2500 },
  moderate: { low: 1500, typical: 2500, high: 4000 },
  complex:  { low: 2500, typical: 4000, high: 6000 },
};

// Ceiling on the percentage-based part (GBP, ex VAT), so very large estates
// do not produce silly numbers. Large estates are usually quoted hourly or
// by negotiation, so this is a modelling choice only. TODO: sense-check.
const LEGAL_FEE_MAX = {
  simple:   { low: 4000,  typical: 7000,  high: 12000 },
  moderate: { low: 8000,  typical: 15000, high: 25000 },
  complex:  { low: 15000, typical: 30000, high: 60000 },
};

// Extra work per beneficiary after the first (GBP, ex VAT): more
// correspondence, more distribution paperwork. Assumption.
const PER_EXTRA_BENEFICIARY = { low: 50, typical: 150, high: 350 };

// Extra work when there is no valid will (intestacy): establishing who is
// entitled, sometimes an indemnity or heir search (GBP, ex VAT). Assumption.
const NO_WILL_UPLIFT = { low: 300, typical: 800, high: 2000 };

// Extra work when the estate includes property (title, mortgage, insurance,
// valuation liaison) (GBP, ex VAT). Excludes conveyancing on a sale, which
// is a separate fee. Assumption.
const PROPERTY_UPLIFT = { low: 300, typical: 750, high: 1500 };

/* ---------- Valuation ---------- */

// Professional probate valuation of a property (GBP, ex VAT). Often needed
// for inheritance tax and the probate application. Assumption.
// TODO: check against 5 to 10 local surveyor / estate agent fees.
const PROPERTY_VALUATION = { low: 0, typical: 350, high: 700 };

// Other valuations (jewellery, art, antiques, shares) (GBP, ex VAT).
// Zero at the low end; higher for complex estates. Assumption.
const OTHER_VALUATION = {
  simple:   { low: 0, typical: 0,   high: 150 },
  moderate: { low: 0, typical: 100, high: 400 },
  complex:  { low: 0, typical: 300, high: 1200 },
};

/* ---------- Other disbursements (no VAT assumed) ---------- */

// Statutory notices to creditors (Gazette plus local paper), bankruptcy
// searches, Land Registry copies, ID checks, bank and asset search fees.
// Bundled into one figure per complexity. Assumption.
// TODO: check current Gazette notice price, Land Charges search fee and
// Land Registry official copy fee on gov.uk / thegazette.co.uk.
const OTHER_DISBURSEMENTS = {
  simple:   { low: 0,   typical: 60,  high: 200 },
  moderate: { low: 60,  typical: 200, high: 450 },
  complex:  { low: 150, typical: 400, high: 900 },
};

// Extra disbursements when there is property (Land Registry copies,
// searches). Assumption. TODO: check Land Registry fees on gov.uk.
const PROPERTY_DISBURSEMENTS = { low: 7, typical: 40, high: 150 };

/* ---------- Implementation ---------- */

const BANDS = ['low', 'typical', 'high'];
const COMPLEXITIES = ['simple', 'moderate', 'complex'];

function validate(input) {
  if (input === null || typeof input !== 'object') {
    throw new TypeError('Input must be an object');
  }
  const { estateValue, hasProperty, hasWill, beneficiaries, complexity } = input;
  if (typeof estateValue !== 'number' || !Number.isFinite(estateValue) || estateValue < 0) {
    throw new RangeError('estateValue must be a number of pounds, 0 or more');
  }
  if (typeof hasProperty !== 'boolean') {
    throw new TypeError('hasProperty must be true or false');
  }
  if (typeof hasWill !== 'boolean') {
    throw new TypeError('hasWill must be true or false');
  }
  if (!Number.isInteger(beneficiaries) || beneficiaries < 1) {
    throw new RangeError('beneficiaries must be a whole number, 1 or more');
  }
  if (!COMPLEXITIES.includes(complexity)) {
    throw new RangeError('complexity must be one of: ' + COMPLEXITIES.join(', '));
  }
}

function estimateProbateCost(input) {
  validate(input);
  const { estateValue, hasProperty, hasWill, beneficiaries, complexity } = input;

  const lines = {
    legalFees: {},
    courtFee: {},
    valuation: {},
    otherDisbursements: {},
  };

  for (const band of BANDS) {
    // Legal fees: percentage of estate, held between a floor and a ceiling,
    // then add-ons, then VAT.
    const pct = estateValue * LEGAL_FEE_PERCENT[complexity][band];
    let legal = Math.min(
      Math.max(pct, LEGAL_FEE_MIN[complexity][band]),
      LEGAL_FEE_MAX[complexity][band]
    );
    legal += (beneficiaries - 1) * PER_EXTRA_BENEFICIARY[band];
    if (!hasWill) legal += NO_WILL_UPLIFT[band];
    if (hasProperty) legal += PROPERTY_UPLIFT[band];
    lines.legalFees[band] = Math.round(legal * (1 + VAT_RATE));

    // Court fee plus grant copies. No fee at or below the threshold.
    lines.courtFee[band] =
      estateValue > COURT_FEE_THRESHOLD ? COURT_FEE + COPIES[band] * COPY_FEE : 0;

    // Valuation (ex VAT, then VAT added).
    const val =
      (hasProperty ? PROPERTY_VALUATION[band] : 0) + OTHER_VALUATION[complexity][band];
    lines.valuation[band] = Math.round(val * (1 + VAT_RATE));

    // Other disbursements.
    lines.otherDisbursements[band] =
      OTHER_DISBURSEMENTS[complexity][band] + (hasProperty ? PROPERTY_DISBURSEMENTS[band] : 0);
  }

  const total = {};
  for (const band of BANDS) {
    total[band] = Object.values(lines).reduce((sum, line) => sum + line[band], 0);
  }

  return {
    low: total.low,
    typical: total.typical,
    high: total.high,
    breakdown: lines,
    currency: 'GBP',
    notes: [
      'Estimate only. Not a quote and not legal advice.',
      'Legal fees and valuation include VAT. Court fee and grant copies do not.',
      'Excludes conveyancing on a sale, inheritance tax, and any dispute.',
      'England and Wales only.',
    ],
  };
}

const api = {
  estimateProbateCost,
  constants: {
    COURT_FEE, COURT_FEE_THRESHOLD, COPY_FEE, COPIES, VAT_RATE,
    LEGAL_FEE_PERCENT, LEGAL_FEE_MIN, LEGAL_FEE_MAX,
    PER_EXTRA_BENEFICIARY, NO_WILL_UPLIFT, PROPERTY_UPLIFT,
    PROPERTY_VALUATION, OTHER_VALUATION,
    OTHER_DISBURSEMENTS, PROPERTY_DISBURSEMENTS,
  },
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = api;
} else if (typeof window !== 'undefined') {
  window.ProbateCost = api;
}
