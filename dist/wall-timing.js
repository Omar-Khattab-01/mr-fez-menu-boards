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
  if (typeof settings.enabled !== 'boolean' || settings.mode !== 'flame-parade' ||
      settings.direction !== 'right-to-left' ||
      !Number.isFinite(settings.quietSeconds) || settings.quietSeconds < 10 || settings.quietSeconds > 600 ||
      !Number.isFinite(settings.effectSeconds) || settings.effectSeconds < 8 || settings.effectSeconds > 40 ||
      !Number.isFinite(settings.intensity) || settings.intensity < 0.1 || settings.intensity > 1 ||
      !Number.isSafeInteger(settings.epochMs)) {
    throw new Error('Animation needs a 10–600 second interval, 8–40 second duration, intensity 0.1–1 and a valid UTC epoch.');
  }
  return settings;
}

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
