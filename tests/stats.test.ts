import assert from "node:assert/strict";
import { test } from "node:test";
import { bestMonth, featureCount, yoy } from "../lib/stats/compute";
import { STATS } from "../content/stats/growdiaries";

test("year-over-year deltas match the published claim", () => {
  const y = yoy();
  assert.equal(y.codeOutput.delta, "+81%");
  assert.equal(y.deliveryCadence.delta, "+48%"); // exact: 17.17 → 25.33 builds/month (CV rounds to +47%)
  assert.equal(y.featureThroughput.delta, "+38%");
});

test("window averages match the published numbers", () => {
  const y = yoy();
  assert.equal(Math.round(y.codeOutput.was), 6066);
  assert.equal(Math.round(y.codeOutput.now), 11006);
  assert.equal(y.deliveryCadence.was.toFixed(1), "17.2");
  assert.equal(y.deliveryCadence.now.toFixed(1), "25.3");
  assert.equal(y.featureThroughput.was.toFixed(1), "4.8");
  assert.equal(y.featureThroughput.now.toFixed(1), "6.7");
});

test("totals are consistent", () => {
  assert.equal(featureCount(), 90);
  assert.deepEqual(bestMonth(), { month: "2026-07", lines: 29125 });
  assert.equal(STATS.com.reduce((a, b) => a + b, 0), STATS.totals.commits);
  assert.equal(STATS.add.reduce((a, b) => a + b, 0), STATS.totals.added);
  assert.equal(STATS.del.reduce((a, b) => a + b, 0), STATS.totals.deleted);
});
