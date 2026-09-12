const localVideo = src => typeof src==='string' && /^(assets|fire-to-fez)\/[a-zA-Z0-9_/-]+\.mp4$/.test(src) && !src.includes('..');
// Shared UTC schedule: opening/reloading a TV never restarts its effect.
export const DEFAULT_ANIMATION = Object.freeze({
  enabled: true,
  mode: 'flame-parade',
  direction: 'right-to-left',
  quietSeconds: 40,
  effectSeconds: 16,
  intensity: 0.85,
  epochMs: 1767225600000,
});

export function animationSettings(value = {}) {
  const settings = { ...DEFAULT_ANIMATION, ...value };
  if (typeof settings.enabled !== 'boolean' || !['flame-parade','panoramic-video'].includes(settings.mode) ||
      settings.direction !== (settings.mode==='panoramic-video'?'left-to-right':'right-to-left') ||
      !Number.isFinite(settings.quietSeconds) || settings.quietSeconds < 10 || settings.quietSeconds > 600 ||
      !Number.isFinite(settings.effectSeconds) || settings.effectSeconds < 8 || settings.effectSeconds > 40 ||
      !Number.isFinite(settings.intensity) || settings.intensity < 0.1 || settings.intensity > 1 ||
      !Number.isSafeInteger(settings.epochMs)) {
    throw new Error('Animation needs a 10–600 second interval, 8–40 second duration, intensity 0.1–1 and a valid UTC epoch.');
  }
  if (settings.video && (typeof settings.video.enabled !== 'boolean' ||
      typeof settings.video.src !== 'string' || !localVideo(settings.video.src) || settings.video.src.includes('..') ||
      !Number.isFinite(settings.video.durationSeconds) || settings.video.durationSeconds < 1 || settings.video.durationSeconds > 60)) {
    throw new Error('Video needs a local MP4 asset, an enabled setting and a 1–60 second duration.');
  }
  if (settings.mode==='panoramic-video' && (!settings.video ||
      !Array.isArray(settings.video.screenSources) || settings.video.screenSources.length!==4 ||
      new Set(settings.video.screenSources).size!==4 || !settings.video.screenSources.every(localVideo))) {
    throw new Error('Panoramic video needs four distinct local MP4 screen sections.');
  }
  if(settings.playlist!==undefined && (!Array.isArray(settings.playlist)||settings.playlist.length<1||settings.playlist.length>12)) throw new Error('Playlist needs 1–12 films.');
  for(const film of settings.playlist||[]) {
    if(typeof film.title!=='string'||!film.title.trim()||!localVideo(film.src)||film.durationSeconds!==settings.video.durationSeconds||!Array.isArray(film.screenSources)||film.screenSources.length!==4||new Set(film.screenSources).size!==4||!film.screenSources.every(localVideo)||!['boolean','undefined'].includes(typeof film.enabled)) throw new Error('Every film needs a title, matching duration, an optional enabled setting and four distinct screen sections.');
  }
  if(settings.playlist?.length&&!settings.playlist.some(film=>film.enabled!==false)) throw new Error('Select at least one film for the rotation.');
  return settings;
}

const rotationFilms = settings => settings.playlist?.filter(film=>film.enabled!==false) || (settings.video ? [settings.video] : []);

export function wallPhase(nowMs, value) {
  const settings = animationSettings(value);
  if (!Number.isFinite(nowMs)) throw new Error('Invalid animation clock.');
  const quiet = settings.quietSeconds * 1000;
  const duration = settings.effectSeconds * 1000;
  const cycle = quiet + duration;
  const elapsed = ((nowMs - settings.epochMs) % cycle + cycle) % cycle;
  const active = settings.enabled && elapsed >= quiet;
  const effectTime = active ? elapsed - quiet : 0;
  const progress = effectTime / duration;
  // Fully off-wall at both endpoints; unchanged menu under the decorative layer.
  const x = 4.4 - 4.8 * progress;
  const fade = active ? Math.min(1, effectTime / 1200, (duration - effectTime) / 1200) : 0;
  return {
    active,
    progress,
    x,
    opacity: fade * settings.intensity,
    remainingMs: active ? cycle - elapsed : quiet - elapsed,
    // Gentle deterministic movement. No randomness or flashing.
    flameScale: 1 + 0.09 * Math.sin(effectTime / 680),
    flameDrift: 2 * Math.sin(effectTime / 1700),
    heroTilt: 2 * Math.sin(effectTime / 1300),
  };
}

export function localHeroX(physicalPosition, phase) {
  if (!Number.isInteger(physicalPosition) || physicalPosition < 1 || physicalPosition > 4) {
    throw new Error('TV position must be 1–4.');
  }
  return phase.x - (physicalPosition - 1);
}

// Alternate the existing flame pass with the branded video, preserving reading time.
export function presentationPhase(nowMs, value) {
  const settings = animationSettings(value);
  if (!Number.isFinite(nowMs)) throw new Error('Invalid presentation clock.');
  const quiet = settings.quietSeconds * 1000;
  if(settings.mode==='panoramic-video') {
    const duration=settings.video.durationSeconds*1000;
    const count=rotationFilms(settings).length;
    const cycle=Math.floor((nowMs-settings.epochMs)/(quiet+duration));
    const clipIndex=((cycle%count)+count)%count;
    const elapsed=((nowMs-settings.epochMs)%(quiet+duration)+quiet+duration)%(quiet+duration);
    if(!settings.enabled||!settings.video.enabled) return {kind:'quiet',remainingMs:0,videoTime:0,flameNow:settings.epochMs};
    return elapsed<quiet
      ? {kind:'quiet',remainingMs:quiet-elapsed,videoTime:0,flameNow:settings.epochMs,clipIndex}
      : {kind:'video',remainingMs:quiet+duration-elapsed,videoTime:(elapsed-quiet)/1000,flameNow:settings.epochMs,clipIndex};
  }
  const flame = settings.effectSeconds * 1000;
  const clip = settings.video?.enabled ? settings.video.durationSeconds * 1000 : 0;
  const total = quiet + flame + (clip ? quiet + clip : 0);
  const elapsed = ((nowMs-settings.epochMs)%total+total)%total;
  if (!settings.enabled) return { kind:'quiet', remainingMs:0, videoTime:0, flameNow:settings.epochMs };
  if (elapsed < quiet) return { kind:'quiet', remainingMs:quiet-elapsed, videoTime:0, flameNow:settings.epochMs };
  if (elapsed < quiet+flame) return { kind:'flame', remainingMs:quiet+flame-elapsed, videoTime:0, flameNow:settings.epochMs+elapsed };
  if (elapsed < quiet+flame+quiet) return { kind:'quiet', remainingMs:quiet+flame+quiet-elapsed, videoTime:0, flameNow:settings.epochMs };
  return { kind:'video', remainingMs:total-elapsed, videoTime:(elapsed-quiet-flame-quiet)/1000, flameNow:settings.epochMs };
}

export function videoSource(value, physicalPosition, clipIndex=0) {
  const config=animationSettings(value);
  if(!Number.isInteger(physicalPosition)||physicalPosition<1||physicalPosition>4) throw new Error('TV position must be 1–4.');
  const film=rotationFilms(config)[clipIndex]||config.video;
  return config.mode==='panoramic-video'?film.screenSources[physicalPosition-1]:film?.src;
}
