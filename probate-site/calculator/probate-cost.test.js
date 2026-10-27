'use strict';

// Run with: node --test probate-site/calculator/probate-cost.test.js
const test = require('node:test');
const assert = require('node:assert/strict');
const { estimateProbateCost, constants } = require('./probate-cost.js');

const base = {
  estateValue: 300000,
  hasProperty: true,
  hasWill: true,
  beneficiaries: 2,
  complexity: 'simple',
};

test('low <= typical <= high for every complexity and sample estate', () => {
  for (const complexity of ['simple', 'moderate', 'complex']) {
    for (const estateValue of [0, 4000, 5000, 5001, 80000, 300000, 1000000, 5000000]) {
      for (const hasProperty of [true, false]) {
        for (const hasWill of [true, false]) {
          const r = estimateProbateCost({ estateValue, hasProperty, hasWill, beneficiaries: 3, complexity });
          assert.ok(r.low <= r.typical && r.typical <= r.high, JSON.stringify({ complexity, estateValue, r: [r.low, r.typical, r.high] }));
        }
      }
    }
  }
});

test('breakdown lines add up to each total', () => {
  const r = estimateProbateCost(base);
  for (const band of ['low', 'typical', 'high']) {
    const sum = Object.values(r.breakdown).reduce((s, l) => s + l[band], 0);
    assert.equal(sum, r[band]);
  }
  assert.deepEqual(Object.keys(r.breakdown), ['legalFees', 'courtFee', 'valuation', 'otherDisbursements']);
});

test('court fee is zero at or below the threshold and charged above it', () => {
  const at = estimateProbateCost({ ...base, estateValue: constants.COURT_FEE_THRESHOLD });
  const above = estimateProbateCost({ ...base, estateValue: constants.COURT_FEE_THRESHOLD + 1 });
  assert.equal(at.breakdown.courtFee.typical, 0);
  assert.equal(above.breakdown.courtFee.low, constants.COURT_FEE + constants.COPIES.low * constants.COPY_FEE);
});

test('no property means no property valuation or property uplift', () => {
  const withP = estimateProbateCost(base);
  const without = estimateProbateCost({ ...base, hasProperty: false });
  assert.ok(without.typical < withP.typical);
  assert.equal(without.breakdown.valuation.typical, 0);
});

test('no will costs more than a will', () => {
  const will = estimateProbateCost(base);
  const noWill = estimateProbateCost({ ...base, hasWill: false });
  assert.ok(noWill.typical > will.typical);
});

test('more beneficiaries cost more', () => {
  const one = estimateProbateCost({ ...base, beneficiaries: 1 });
  const six = estimateProbateCost({ ...base, beneficiaries: 6 });
  assert.ok(six.typical > one.typical);
});

test('higher complexity costs more', () => {
  const s = estimateProbateCost(base).typical;
  const m = estimateProbateCost({ ...base, complexity: 'moderate' }).typical;
  const c = estimateProbateCost({ ...base, complexity: 'complex' }).typical;
  assert.ok(s < m && m < c);
});

test('legal fees use the percentage, with VAT, when between floor and ceiling', () => {
  const r = estimateProbateCost({ ...base, hasProperty: false, beneficiaries: 1, estateValue: 200000 });
  // 1.5% of 200,000 = 3,000 ex VAT, 3,600 inc VAT
  assert.equal(r.breakdown.legalFees.typical, 3600);
});

test('legal fee floor applies to small estates and ceiling to huge ones', () => {
  const small = estimateProbateCost({ ...base, hasProperty: false, beneficiaries: 1, estateValue: 10000 });
  assert.equal(small.breakdown.legalFees.typical, Math.round(constants.LEGAL_FEE_MIN.simple.typical * 1.2));
  const huge = estimateProbateCost({ ...base, hasProperty: false, beneficiaries: 1, estateValue: 50000000 });
  assert.equal(huge.breakdown.legalFees.typical, Math.round(constants.LEGAL_FEE_MAX.simple.typical * 1.2));
});

test('results are whole pounds', () => {
  const r = estimateProbateCost({ ...base, estateValue: 123456.78, beneficiaries: 3 });
  for (const v of [r.low, r.typical, r.high]) assert.ok(Number.isInteger(v));
});

test('invalid input is rejected', () => {
  assert.throws(() => estimateProbateCost(null), TypeError);
  assert.throws(() => estimateProbateCost({ ...base, estateValue: -1 }), RangeError);
  assert.throws(() => estimateProbateCost({ ...base, estateValue: NaN }), RangeError);
  assert.throws(() => estimateProbateCost({ ...base, estateValue: '300000' }), RangeError);
  assert.throws(() => estimateProbateCost({ ...base, hasProperty: 'yes' }), TypeError);
  assert.throws(() => estimateProbateCost({ ...base, hasWill: undefined }), TypeError);
  assert.throws(() => estimateProbateCost({ ...base, beneficiaries: 0 }), RangeError);
  assert.throws(() => estimateProbateCost({ ...base, beneficiaries: 1.5 }), RangeError);
  assert.throws(() => estimateProbateCost({ ...base, complexity: 'hard' }), RangeError);
});

test('does not mutate its input', () => {
  const input = Object.freeze({ ...base });
  assert.doesNotThrow(() => estimateProbateCost(input));
});
