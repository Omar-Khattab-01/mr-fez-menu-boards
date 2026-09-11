import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_ANIMATION as config, animationSettings, wallPhase, localHeroX } from '../dist/wall-timing.js';
const at = elapsed => wallPhase(config.epochMs + elapsed, config);

test('menus have a quiet interval and the effect fades in and out', () => {
  assert.equal(at(0).active, false);
  assert.equal(at(39999).opacity, 0);
  assert.equal(at(40000).opacity, 0);
  assert.equal(at(48000).opacity, config.intensity);
  assert.ok(at(55999).opacity < 0.001);
  assert.equal(at(56000).active, false);
});

test('rotisserie visits TV 4, then 3, then 2, then 1', () => {
  for (const [tv, progress] of [[4, 0.1875], [3, 0.3958333333333333], [2, 0.6041666666666666], [1, 0.8125]]) {
    assert.ok(Math.abs(localHeroX(tv, at(40000 + 16000 * progress)) - 0.5) < 1e-7);
  }
  assert.ok(at(40000).x > 4);
  assert.ok(at(55999).x < 0);
});

test('neighboring viewports have continuous shared coordinates throughout the effect', () => {
  for (let time = 40000; time < 56000; time += 137) {
    for (let tv = 1; tv < 4; tv++) {
      assert.ok(Math.abs(localHeroX(tv, at(time)) - 1 - localHeroX(tv + 1, at(time))) < 1e-12);
    }
  }
});

test('late joins, reloads and resumed players recover the same shared phase', () => {
  assert.deepEqual(at(49234), at(49234 + 56000 * 50));
  assert.deepEqual(wallPhase(config.epochMs + 49234, config), wallPhase(config.epochMs + 49234, { ...config }));
  assert.ok(wallPhase(config.epochMs - 1, config).progress >= 0);
});

test('disabled effects stay invisible; bad timing and imported values are rejected', () => {
  assert.equal(wallPhase(config.epochMs + 48000, { ...config, enabled: false }).opacity, 0);
  for (const value of [{ effectSeconds: 0 }, { quietSeconds: -1 }, { epochMs: NaN }, { intensity: 2 }, { mode: 'slide-menu' }]) {
    assert.throws(() => animationSettings(value));
  }
  assert.throws(() => localHeroX(5, at(48000)));
});
