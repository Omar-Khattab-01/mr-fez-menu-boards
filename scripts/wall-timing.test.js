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

import { presentationPhase } from '../dist/wall-timing.js';
const videoConfig={...config,video:{enabled:true,src:'assets/saj-shawarma.mp4',durationSeconds:10}};
test('rotation includes both reading breaks and a complete ten-second branded clip',()=>{
 const at=t=>presentationPhase(config.epochMs+t,videoConfig);
 assert.equal(at(39999).kind,'quiet');
 assert.equal(at(40000).kind,'flame');
 assert.equal(at(56000).kind,'quiet');
 assert.equal(at(96000).kind,'video');
 assert.equal(at(99500).videoTime,3.5);
 assert.equal(at(105999).kind,'video');
 assert.equal(at(106000).kind,'quiet');
 assert.deepEqual(at(99500),at(99500+106000*3));
});
test('disabled or absent videos retain the original flame schedule',()=>{
 assert.equal(presentationPhase(config.epochMs+96000,config).kind,'flame');
 assert.equal(presentationPhase(config.epochMs+99500,{...videoConfig,enabled:false}).kind,'quiet');
 assert.throws(()=>animationSettings({...config,video:{enabled:true,src:'https://invalid.test/file.mp4',durationSeconds:10}}));
});

import { readFileSync } from 'node:fs';
import { videoSource } from '../dist/wall-timing.js';
const panorama={...JSON.parse(readFileSync(new URL('../dist/data/menu.json',import.meta.url))).animation,playlist:undefined};
test('published panorama has one quiet interval and a full 20-second shared clip',()=>{
 const at=t=>presentationPhase(panorama.epochMs+t,panorama);
 assert.equal(at(39999).kind,'quiet');
 assert.equal(at(40000).kind,'video');
 assert.equal(at(43500).videoTime,3.5);
 assert.equal(at(59999).kind,'video');
 assert.equal(at(60000).kind,'quiet');
 assert.deepEqual(at(43500),at(43500+60000*7));
 assert.equal(presentationPhase(panorama.epochMs+45000,{...panorama,video:{...panorama.video,enabled:false}}).kind,'quiet');
 for(let t=0;t<60000;t+=137) assert.notEqual(at(t).kind,'flame');
});
test('physical positions select distinct panorama quarters and reject incomplete mappings',()=>{
 for(const position of [4,2,1,3]) assert.equal(videoSource(panorama,position),`fire-to-fez/fire-to-fez-tv-${position}.mp4`);
 for(const screenSources of [[],['assets/a.mp4'],Array(4).fill('assets/a.mp4'),['assets/a.mp4','assets/b.mp4','assets/c.mp4','../evil.mp4']]) {
  assert.throws(()=>animationSettings({...panorama,video:{...panorama.video,screenSources}}));
 }
 assert.throws(()=>videoSource(panorama,5));
});

test('four-film rotation selects the same film for late joins and preloads it during the reading break',()=>{
 const playlist=Array.from({length:4},(_,i)=>({title:`Film ${i}`,durationSeconds:20,src:`fire-to-fez/film-${i}.mp4`,screenSources:[1,2,3,4].map(p=>`fire-to-fez/film-${i}-tv-${p}.mp4`)}));
 const cfg={...panorama,playlist};
 for(let i=0;i<4;i++){
  const quiet=presentationPhase(cfg.epochMs+i*60000,cfg);
  const playing=presentationPhase(cfg.epochMs+i*60000+43000,cfg);
  assert.equal(quiet.clipIndex,i); assert.equal(playing.clipIndex,i); assert.equal(playing.videoTime,3);
  assert.equal(videoSource(cfg,3,playing.clipIndex),playlist[i].screenSources[2]);
  assert.deepEqual(playing,presentationPhase(cfg.epochMs+i*60000+43000+240000,cfg));
 }
 assert.equal(presentationPhase(cfg.epochMs-1,cfg).clipIndex,3);
 assert.throws(()=>animationSettings({...cfg,playlist:[]}));
 assert.throws(()=>animationSettings({...cfg,playlist:[{...playlist[0],durationSeconds:10}]}));
});
