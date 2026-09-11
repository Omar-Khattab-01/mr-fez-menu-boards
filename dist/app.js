import { animationSettings, wallPhase, presentationPhase } from './wall-timing.js';
const app=document.querySelector('#app');
let menu,view='boards',selected=1,editing=null;
const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>n===null||n===undefined?'—':'$'+Number(n).toFixed(2);
const screenOptions=(value)=>menu.screens.map(s=>`<option value="${s.id}" ${s.id===Number(value)?'selected':''}>TV ${s.physicalPosition} · ${e(s.name)}</option>`).join('');
const param=new URLSearchParams(location.search);const display=param.has('screen');
if(param.has('wall')) view='wall';
let animationFrame=0, demoStartedAt=null, demoKind='flame';
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const rawOffset=Number(param.get('offsetMs')||0);
const clockOffset=Number.isFinite(rawOffset)?Math.max(-5000,Math.min(5000,rawOffset)):0;
function notify(text){const el=document.querySelector('#status');el.textContent=text;el.style.display='block';setTimeout(()=>el.style.display='none',3500)}
function board(screen){const items=menu.items.filter(i=>i.screenId===screen.id&&i.visible).sort((a,b)=>a.sortOrder-b.sortOrder);const promos=menu.promotions.filter(p=>p.screenId===screen.id&&p.visible).sort((a,b)=>a.sortOrder-b.sortOrder);return `<section class="board ${e(screen.layout)}" aria-label="TV ${screen.physicalPosition}: ${e(screen.name)}"><div class="board-head"><span>${e(menu.brand.name)}</span><span>${e(screen.name)}</span></div><div class="board-items">${!screen.visible?'<p class="empty">Menu temporarily unavailable</p>':items.map(i=>{const asset=menu.assets.find(a=>a.id===i.imageAssetId);return `<article class="item"><h2>${e(i.name)}</h2>${i.price!==null?`<div class="price">${money(i.price)}</div>`:''}${!i.available?'<div class="unavailable">Not available</div>':''}${asset?.src?`<div class="image-wrap"><img class="food" src="${e(asset.src)}" alt="${e(i.name)}"></div>`:'<div class="placeholder">Photo to be supplied</div>'}${i.variants.map(v=>`<div class="variant"><span>${e(v.label)}</span><strong>${money(v.price)}</strong></div>`).join('')}${i.combo?`<div class="combo">${e(i.combo.label)} +${money(i.combo.priceDelta)}</div>`:''}${i.description?`<p class="description">${e(i.description)}</p>`:''}</article>`}).join('')}</div>${screen.visible&&promos.length?`<div class="board-footer">${promos.map(p=>`<span>${e(p.text)}</span>`).join('')}</div>`:''}</section>`}
function render(){cancelAnimationFrame(animationFrame);app.querySelectorAll('video').forEach(v=>v.pause());document.documentElement.style.setProperty('--red',menu.brand.colours.red);document.documentElement.style.setProperty('--charcoal',menu.brand.colours.charcoal);document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));if(display){document.body.classList.add('display');const s=menu.screens.find(s=>s.physicalPosition===Number(param.get('screen')));app.innerHTML=s?effectViewport(s):'<p>Screen not found.</p>';startEffects();return;}if(view==='boards')renderBoards();if(view==='admin')renderAdmin();if(view==='notes')renderNotes();if(view==='wall')renderWall();}
function renderBoards(){const s=menu.screens.find(s=>s.id===selected)||menu.screens[0];app.innerHTML=`<div class="heading"><div><h1>Four screens. One menu.</h1><p class="muted">Current menu content, transcribed from your restaurant’s boards.</p></div><div class="actions"><button id="wall-preview">Four-TV animation</button><button id="fullscreen">Full screen</button></div></div><div class="screen-tabs">${[...menu.screens].sort((a,b)=>a.physicalPosition-b.physicalPosition).map(s=>`<button data-screen="${s.id}" class="${s.id===selected?'active':''}">TV ${s.physicalPosition}<small>${e(s.name)}</small></button>`).join('')}</div>${board(s)}<div class="caption"><span>Source: ${e(s.sourceFile)} · Left-to-right placement inferred from neighboring boards.</span><span>Artwork placeholders · Prices as photographed</span></div><p class="muted">Prototype edits last for this session. Export your menu to keep changes; use Import in Edit menu to restore them.</p>`;app.querySelectorAll('[data-screen]').forEach(b=>b.onclick=()=>{selected=Number(b.dataset.screen);render()});app.querySelector('#wall-preview').onclick=()=>{view='wall';render()};app.querySelector('#fullscreen').onclick=()=>{const boardEl=app.querySelector('.board');if(boardEl.requestFullscreen)boardEl.requestFullscreen().catch(()=>notify('Full screen is unavailable in this preview.'));};}
function renderAdmin(){app.innerHTML=`<div class="heading"><div><h1>Edit menu</h1><p class="muted">${menu.items.length} products · All four boards use this shared menu data.</p></div><label class="actions">Import menu<input id="import" type="file" accept="application/json" style="width:220px"></label></div><div class="notice">Changes apply to this preview session. Export the menu to keep them. The TV animation follows a shared clock. Menu edits still need to be exported and published to reach remote TVs.</div>${editing?editor(menu.items.find(i=>i.id===editing)):''}<div class="panel scroll-table"><table><thead><tr><th>Product</th><th>Price / options</th><th>Screen</th><th>Status</th><th></th></tr></thead><tbody>${[...menu.items].sort((a,b)=>a.screenId-b.screenId||a.sortOrder-b.sortOrder).map(i=>`<tr><td>${e(i.name)}<small>${e(i.category)}</small></td><td>${i.price!==null?money(i.price):i.variants.map(v=>e(v.label)+' '+money(v.price)).join(' / ')}${i.combo?`<small>${e(i.combo.label)} +${money(i.combo.priceDelta)}</small>`:''}</td><td>TV ${menu.screens.find(s=>s.id===i.screenId)?.physicalPosition}</td><td>${!i.visible?'Hidden':i.available?'Available':'Not available'}</td><td><button data-edit="${e(i.id)}">Edit<span class="source-name"> ${e(i.name)}</span></button></td></tr>`).join('')}</tbody></table></div><div class="panel"><h2>Screen mapping</h2><p class="muted">Move a whole board by changing its physical TV position. Individual products can move independently.</p><form id="mapping">${menu.screens.map(s=>`<label>${e(s.name)} · ${e(s.sourceFile)}<select name="s${s.id}">${[1,2,3,4].map(n=>`<option ${n===s.physicalPosition?'selected':''}>${n}</option>`).join('')}</select></label>`).join('')}<button class="primary" type="submit">Apply mapping</button></form></div><div class="panel"><h2>Complete menu data</h2><p class="muted">Edit promotions, category labels, sizes, descriptions, add-ons, assets, screen names and layouts here. Unknown values stay null.</p><details><summary>Open structured data editor</summary><form id="rawform"><label class="full">Menu JSON<textarea id="raw" rows="20" spellcheck="false">${e(JSON.stringify(menu,null,2))}</textarea></label><button class="primary">Apply menu data</button></form></details></div>`;app.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{editing=b.dataset.edit;renderAdmin();app.querySelector('#itemform').scrollIntoView({behavior:'smooth',block:'start'})});app.querySelector('#mapping').onsubmit=ev=>{ev.preventDefault();const f=new FormData(ev.target),positions=menu.screens.map(s=>Number(f.get('s'+s.id)));if(new Set(positions).size!==4)return notify('Give each board a different TV position.');menu.screens.forEach((s,n)=>s.physicalPosition=positions[n]);render();notify('Screen mapping updated.');};app.querySelector('#rawform').onsubmit=ev=>{ev.preventDefault();try{const next=JSON.parse(app.querySelector('#raw').value);validate(next);menu=next;editing=null;render();notify('Menu data applied.');}catch(err){notify('Could not apply: '+err.message)}};app.querySelector('#import').onchange=async ev=>{try{const file=ev.target.files[0];if(!file)return;const next=JSON.parse(await file.text());validate(next);menu=next;editing=null;render();notify('Menu imported.');}catch(err){notify('Could not import: '+err.message)}};if(editing)bindEditor();}
function editor(i){return `<div class="panel"><h2>${e(i.name)}</h2><form id="itemform"><label>Product name<input name="name" required value="${e(i.name)}"></label><label>Category<input name="category" required value="${e(i.category)}"></label><label>Price (leave blank for sizes)<input type="number" name="price" min="0" step="0.01" value="${i.price??''}"></label><label>Screen<select name="screenId">${screenOptions(i.screenId)}</select></label><label>Order on screen<input type="number" name="sortOrder" min="1" required value="${i.sortOrder}"></label><label>Combo surcharge<input type="number" name="comboPrice" min="0" step="0.01" value="${i.combo?.priceDelta??''}"></label><label class="full">Description<textarea name="description">${e(i.description)}</textarea></label>${i.variants.map((v,n)=>`<label>${e(v.label)} price<input type="number" min="0" step="0.01" required name="variant${n}" value="${v.price}"></label>`).join('')}<label class="check"><input type="checkbox" name="visible" ${i.visible?'checked':''}>Visible on menu</label><label class="check"><input type="checkbox" name="available" ${i.available?'checked':''}>Available</label><div class="full actions"><button class="primary" type="submit">Apply changes</button><button type="button" id="cancel">Cancel</button><span class="muted">Source: ${e(i.source.file)}</span></div></form></div>`}
function bindEditor(){app.querySelector('#cancel').onclick=()=>{editing=null;renderAdmin()};app.querySelector('#itemform').onsubmit=ev=>{ev.preventDefault();const f=new FormData(ev.target),i=menu.items.find(i=>i.id===editing);i.name=f.get('name').trim();i.category=f.get('category').trim();i.description=f.get('description').trim();i.price=f.get('price')===''?null:Number(f.get('price'));i.screenId=Number(f.get('screenId'));i.sortOrder=Number(f.get('sortOrder'));i.visible=f.has('visible');i.available=f.has('available');i.variants.forEach((v,n)=>v.price=Number(f.get('variant'+n)));i.combo=f.get('comboPrice')===''?null:{...(i.combo||{label:'COMBO!',includes:null}),priceDelta:Number(f.get('comboPrice'))};editing=null;renderAdmin();notify('Changes applied to the menu preview.');};}
function renderNotes(){app.innerHTML=`<div class="heading"><div><h1>Source notes</h1><p class="muted">The photos are reference material. Every displayed word and price is application data.</p></div></div><div class="notes-grid"><div class="panel"><h2>Confirm before production</h2><ul>${menu.developmentNotes.map(n=>`<li>${e(n.text)}</li>`).join('')}</ul></div><div><div class="panel"><h2>Assets needed</h2><p class="muted">No screenshot crops are used as production artwork. Temporary photo spaces mark the missing assets.</p><ul><li>Official Mr. Fez logo and fez icon in SVG or transparent PNG.</li><li>Original food photography for all ${menu.items.length} products, including family platters.</li><li>Drink photography and exact included drink options, if displayed later.</li><li>Original family meal promotional artwork and confirmed Instagram handle.</li><li>Brand font files or font names, and official colour values.</li></ul><a href="assets-needed.md">Read asset checklist</a></div><div class="panel"><h2>Visual direction</h2><p>Red and white product blocks on charcoal; condensed uppercase headings, prominent prices, cutout food photography and simple size-price rows. The prototype keeps these recognizable patterns with consistent spacing.</p><p class="muted">Fonts and colours are approximations. The blue cast on TV 1 is not treated as a confirmed brand colour.</p></div><div class="panel"><h2>Extraction record</h2><a href="extraction.md">Full transcription and screen hierarchy</a> · <a href="data/menu.json">Original seed data</a></div></div></div>`;}
function validate(m){animationSettings(m.animation);const fail=t=>{throw Error(t)};if(m.schemaVersion!==1||!m.brand?.name||!m.brand.colours||!Array.isArray(m.items)||!Array.isArray(m.screens)||m.screens.length!==4)fail('Expected a version 1 menu with four screens.');if(!Array.isArray(m.assets)||!Array.isArray(m.promotions)||!Array.isArray(m.developmentNotes))fail('Missing assets, promotions or notes.');const ids=new Set(m.screens.map(s=>s.id));if(ids.size!==4||new Set(m.screens.map(s=>s.physicalPosition)).size!==4||m.screens.some(s=>![1,2,3,4].includes(s.physicalPosition)||!['columns','two-column','two-row','family'].includes(s.layout)||typeof s.name!=='string'))fail('Invalid screen mapping or layout.');const price=p=>p===null||(typeof p==='number'&&Number.isFinite(p)&&p>=0);if(new Set(m.items.map(i=>i.id)).size!==m.items.length)fail('Product IDs must be unique.');for(const i of m.items){if(!i.id||typeof i.name!=='string'||!i.name.trim()||typeof i.category!=='string'||typeof i.description!=='string'||!ids.has(i.screenId)||!Number.isFinite(i.sortOrder)||!price(i.price)||typeof i.visible!=='boolean'||typeof i.available!=='boolean'||!Array.isArray(i.variants)||!i.source?.file)fail('Invalid product: '+i.id);for(const v of i.variants)if(typeof v.label!=='string'||!price(v.price))fail('Invalid size price.');if(i.combo&&(!price(i.combo.priceDelta)||typeof i.combo.label!=='string'))fail('Invalid combo.');}for(const p of m.promotions)if(!ids.has(p.screenId)||typeof p.text!=='string')fail('Invalid promotion.');for(const a of m.assets)if(a.src&&!/^(https:\/\/|\.?\/?assets\/)/.test(a.src))fail('Asset URLs must use HTTPS or the local assets folder.');for(const c of Object.values(m.brand.colours))if(!/^#[0-9a-f]{6}$/i.test(c))fail('Colours must be six-digit hex values.');return true;}
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{view=b.dataset.view;editing=null;render()});document.querySelector('#export').onclick=()=>{const blob=new Blob([JSON.stringify(menu,null,2)+'\n'],{type:'application/json'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='mr-fez-menu.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Menu exported.');};
try{const r=await fetch('data/menu.json');if(!r.ok)throw Error('Menu data could not be loaded.');menu=await r.json();validate(menu);render();}catch(err){app.innerHTML=`<div class="panel"><h1>Menu unavailable</h1><p>${e(err.message)}</p><button onclick="location.reload()">Try again</button></div>`;}


function effectViewport(screen) {
  return `<div class="tv-viewport" data-position="${screen.physicalPosition}">
    ${board(screen)}
    ${menu.animation?.video?.enabled&&screen.visible?`<video class="tv-video" src="${e(menu.animation.video.src)}" muted playsinline preload="auto" aria-label="Saj shawarma animation with Mr. Fez logo"></video>`:''}
    <div class="effect-overlay" aria-hidden="true">
      <div class="effect-veil"></div>
      <div class="effect-world" style="left:${-(screen.physicalPosition-1)*100}%">
        <div class="flame-edge flame-bottom"></div>
        <div class="flame-edge flame-top"></div>
        <img class="fx-hero" src="assets/shawarma-fire.png" alt="" draggable="false">
      </div>
    </div>
  </div>`;
}

function renderWall() {
  const config=animationSettings(menu.animation);
  const ordered=[...menu.screens].sort((a,b)=>a.physicalPosition-b.physicalPosition);
  app.innerHTML=`<div class="heading"><div><h1>Shawarma animations across four TVs</h1>
    <p class="muted">A flame pass and the branded saj shawarma video alternate, with time to read the menus between them.</p></div>
    <div class="actions"><button id="demo">Preview flames</button>${config.video?.enabled?'<button id="demo-video" class="primary">Preview saj video</button>':''}<button id="wall-fullscreen">Full screen</button></div></div>
    <div class="wall-labels">${ordered.map(s=>`<a href="?screen=${s.physicalPosition}">TV ${s.physicalPosition}${s.physicalPosition===1?' · Left':s.physicalPosition===4?' · Right':''}</a>`).join('')}</div>
    <div class="wall-preview">${ordered.map(effectViewport).join('')}</div>
    <div class="caption"><span id="animation-status" role="status">Shared TV schedule</span><span>Flames travel right to left · Video plays on all TVs</span></div>
    ${config.video?.src?`<div class="panel"><h2>Saj shawarma · Mr. Fez</h2><video class="clip-player" controls playsinline preload="metadata" src="${e(config.video.src)}" aria-label="Play the saj shawarma video with Mr. Fez logo"></video><p class="muted"><a href="${e(config.video.src)}" download>Download the video</a> · 10 seconds · Includes your logo</p></div>`:''}
    <div class="panel"><h2>Animation settings</h2><form id="animation-settings">
    <label class="check"><input type="checkbox" name="enabled" ${config.enabled?'checked':''}>Enable animation rotation</label>
    ${config.video?`<label class="check"><input type="checkbox" name="videoEnabled" ${config.video.enabled?'checked':''}>Include saj shawarma video</label>`:''}
    <label>Time between effects (seconds)<input type="number" name="quietSeconds" min="10" max="600" required value="${config.quietSeconds}"></label>
    <label>Travel duration (seconds)<input type="number" name="effectSeconds" min="8" max="40" required value="${config.effectSeconds}"></label>
    <label>Flame intensity (%)<input type="number" name="intensity" min="10" max="100" required value="${Math.round(config.intensity*100)}"></label>
    <div class="full actions"><button class="primary">Apply to preview</button><span class="muted">Export and publish the menu to apply settings to the TVs.</span></div>
    </form></div>
    <div class="panel"><h2>Connect your screens</h2><ol><li>Open each TV link above on its matching physical screen, with TV 1 on the left.</li><li>Enable automatic date and time on every player. They join the same schedule even if opened at different times.</li><li>Use full-screen mode and keep each screen page visible. Set every TV to the same aspect ratio and disable overscan.</li></ol>
    <p class="muted">The preview button runs a local demo; it does not trigger the remote TVs. Separate devices follow their clocks, so this is approximate synchronization rather than frame-locked video. For a seamless physical installation, use one computer driving all four displays or a synchronized signage player. <a href="sync-setup.md">Setup and timing adjustment</a></p></div>`;
  app.querySelector('#demo').onclick=()=>{demoKind='flame';demoStartedAt=Date.now();startEffects()};
  if(app.querySelector('#demo-video'))app.querySelector('#demo-video').onclick=()=>{demoKind='video';demoStartedAt=Date.now();startEffects()};
  app.querySelector('#wall-fullscreen').onclick=()=>app.querySelector('.wall-preview').requestFullscreen?.().catch(()=>notify('Full screen is unavailable in this preview.'));
  app.querySelector('#animation-settings').onsubmit=event=>{
    event.preventDefault();const values=new FormData(event.target);
    try {menu.animation=animationSettings({...config,...(config.video?{video:{...config.video,enabled:values.has('videoEnabled')}}:{}),enabled:values.has('enabled'),quietSeconds:Number(values.get('quietSeconds')),effectSeconds:Number(values.get('effectSeconds')),intensity:Number(values.get('intensity'))/100});demoStartedAt=null;render();notify('Animation settings applied to this preview.');}
    catch(error){notify(error.message)}
  };
  startEffects();
}

function startEffects() {
  cancelAnimationFrame(animationFrame);
  const layers=[...app.querySelectorAll('.effect-overlay')];
  if(!layers.length)return;
  const status=app.querySelector('#animation-status');
  let lastStatus='';
  const targets=layers.map(layer=>({layer,hero:layer.querySelector('.fx-hero'),edges:[...layer.querySelectorAll('.flame-edge')],video:layer.parentElement.querySelector('.tv-video'),pending:false,blocked:false,lastCheck:-Infinity}));
  function tick() {
    const config=animationSettings(menu.animation);
    const off=param.get('motion')==='off'||(reducedMotion.matches&&param.get('motion')!=='on');
    let now=Date.now()+clockOffset;
    let demo=demoStartedAt!==null;
    if(demo){const elapsed=Date.now()-demoStartedAt;const duration=demoKind==='video'?(config.video?.durationSeconds||10):config.effectSeconds;if(elapsed>=duration*1000){demoStartedAt=null;demo=false;}else{now=config.epochMs+config.quietSeconds*1000+elapsed+(demoKind==='video'?(config.quietSeconds+config.effectSeconds)*1000:0);}}
    const activeConfig={...config,enabled:config.enabled&&!off};
    const slot=presentationPhase(now,activeConfig);
    const phase=wallPhase(slot.flameNow,activeConfig);
    for(const target of targets){
      target.layer.style.opacity=slot.kind==='flame'?phase.opacity:0;
      const video=target.video;
      if(video){
        video.muted=true;
        if(slot.kind==='video'&&!target.blocked&&!video.error){
          if(video.readyState>=1&&!video.seeking&&now-target.lastCheck>=250){
            const desired=Math.min(slot.videoTime,Math.max(0,video.duration-0.05));
            if(Math.abs(video.currentTime-desired)>0.4)video.currentTime=desired;
            target.lastCheck=now;
          }
          if(video.paused&&!target.pending){target.pending=true;video.play().catch(error=>{if(error.name!=='AbortError')target.blocked=true;}).finally(()=>target.pending=false);}
          video.style.opacity=video.readyState>=2&&!video.seeking?1:0;
        }else{video.pause();video.style.opacity=0;target.lastCheck=-Infinity;}
      }
      if(phase.active){
        target.hero.style.left=`${phase.x/4*100}%`;
        target.hero.style.transform=`translateX(-50%) rotate(${phase.heroTilt}deg)`;
        for(const edge of target.edges){edge.style.backgroundPositionX=`${phase.flameDrift}%`;edge.style.setProperty('--flame-scale',phase.flameScale);}
      }
    }
    const message=off?'Animation off on this device (motion preference).':!config.enabled?'Animation disabled.':demo?'Local demo · remote TVs keep their shared schedule':slot.kind==='video'?`Saj video · ${Math.ceil(slot.remainingMs/1000)} seconds remaining${targets.some(t=>t.blocked||t.video?.error)?' · Video unavailable on a player; menu retained':''}`:slot.kind==='flame'?`Live flame effect · ${Math.ceil(slot.remainingMs/1000)} seconds remaining`:`Shared schedule · next animation in ${Math.ceil(slot.remainingMs/1000)} seconds`;
    if(status&&message!==lastStatus){status.textContent=message;lastStatus=message;}
    animationFrame=requestAnimationFrame(tick);
  }
  tick();
}
reducedMotion.addEventListener?.('change',()=>{if(display||view==='wall')startEffects()});
// After tab suspension the next frame reads current UTC; no accumulated animation drift.
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(animationFrame);app.querySelectorAll('.tv-video').forEach(v=>v.pause());}else if(display||view==='wall')startEffects()});
