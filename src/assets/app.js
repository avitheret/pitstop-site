/* ---------- helpers ---------- */
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
const ils = n => '₪' + n.toLocaleString('en-US');
const byId = id => P.find(p => p.id === id);
const bd = s => String(s).replace(/[A-Za-z0-9][A-Za-z0-9 .+\-]*[A-Za-z0-9+]/g, m=>`<bdi>${m}</bdi>`);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- product illustrations (inline SVG) ---------- */
function tube(d, w){
  return `<path d="${d}" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${d}" fill="none" stroke="#202027" stroke-width="${w-5}" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${d}" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="2" stroke-linecap="round" transform="translate(0,-${(w/4).toFixed(1)})"/>`;
}
const pol = (cx, cy, r, a) => [cx + r*Math.cos(a), cy + r*Math.sin(a)];
const ART = {
  exhaust(){
    let tips = '';
    for (const y of [132,168]) tips += `<rect x="326" y="${y-17}" width="44" height="34" rx="5" fill="url(#gChrome)" stroke="currentColor" stroke-width="2"/>
      <ellipse cx="370" cy="${y}" rx="9" ry="17" fill="#09090a" stroke="currentColor" stroke-width="2.5"/>
      <ellipse cx="370" cy="${y}" rx="6" ry="12.5" fill="url(#gGlow)"/>`;
    return `${tube('M18 176 H92 C116 176 120 150 142 150',20)}
    <rect x="140" y="106" width="152" height="88" rx="42" fill="url(#gMetal)" stroke="currentColor" stroke-width="2.5"/>
    <path d="M170 109 V191 M262 109 V191" stroke="currentColor" stroke-opacity=".35" stroke-width="2"/>
    <path d="M160 120 H272" stroke="#fff" stroke-opacity=".18" stroke-width="3" stroke-linecap="round"/>
    <rect x="189" y="138" width="54" height="24" rx="2" fill="var(--red)"/>
    <text x="216" y="155" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="11" font-weight="600" fill="#fff">REMUS</text>
    ${tube('M290 132 H330',16)}${tube('M290 168 H330',16)}${tips}
    <circle cx="372" cy="150" r="60" fill="url(#gHalo)" opacity=".5"/>`;
  },
  ecu(){
    let ribs = '', pins = '';
    for (let i=0;i<8;i++) ribs += `<path d="M116 ${92+i*14} H196" stroke="currentColor" stroke-opacity=".45" stroke-width="3" stroke-linecap="round"/>`;
    for (let i=0;i<7;i++){ const x=222+i*9; pins += `<path d="M${x} 92 V84 M${x} 168 V176" stroke="currentColor" stroke-width="2"/>`; }
    for (let i=0;i<7;i++){ const y=101+i*9; pins += `<path d="M213 ${y} H205 M287 ${y} H295" stroke="currentColor" stroke-width="2"/>`; }
    let dots = ''; for (let i=0;i<10;i++) dots += `<circle cx="${152+i*10}" cy="236" r="2.4" fill="currentColor" fill-opacity=".7"/>`;
    return `<circle cx="300" cy="200" r="70" fill="url(#gHalo)" opacity=".5"/>
    <rect x="95" y="70" width="215" height="150" rx="10" fill="url(#gMetal)" stroke="currentColor" stroke-width="2.5"/>
    ${ribs}
    <rect x="213" y="92" width="74" height="76" rx="4" fill="#0b0b0d" stroke="currentColor" stroke-width="2"/>${pins}
    <text x="250" y="137" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="17" font-weight="600" fill="var(--red)">APR</text>
    <text x="250" y="154" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="8" fill="currentColor" fill-opacity=".7">STAGE 1</text>
    <rect x="140" y="220" width="125" height="30" rx="4" fill="#0f0f12" stroke="currentColor" stroke-width="2"/>${dots}
    <circle cx="286" cy="200" r="5" fill="var(--red)"/>
    ${tube('M202 252 C202 284 300 276 372 286',10)}`;
  },
  intake(){
    let pleats = '';
    for (let x=50;x<=132;x+=9){ const t=(x-40)*.2; pleats += `<path d="M${x} ${110-t} V${190+t}" stroke="currentColor" stroke-opacity=".45" stroke-width="1.6"/>`; }
    return `<circle cx="90" cy="150" r="80" fill="url(#gHalo)" opacity=".35"/>
    ${tube('M158 150 H222 C272 150 282 108 330 108 H376',36)}
    <polygon points="40,110 140,90 140,210 40,190" fill="url(#gMetal)" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>${pleats}
    <ellipse cx="40" cy="150" rx="11" ry="40" fill="var(--red)" stroke="currentColor" stroke-width="2"/>
    <text x="40" y="154" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="8" font-weight="600" fill="#fff" transform="rotate(-90 40 150)">APR</text>
    <rect x="138" y="96" width="22" height="108" rx="4" fill="url(#gChrome)" stroke="currentColor" stroke-width="2"/>
    <rect x="170" y="130" width="12" height="40" rx="2" fill="var(--red)"/>
    <rect x="228" y="112" width="30" height="20" rx="3" fill="#0b0b0d" stroke="currentColor" stroke-width="2"/>
    <path d="M300 92 L318 92" stroke="#fff" stroke-opacity=".3" stroke-width="3"/>`;
  },
  intercooler(){
    let fins = ''; for (let x=106;x<=294;x+=6) fins += `<path d="M${x} 86 V214" stroke="currentColor" stroke-opacity=".38" stroke-width="1.4"/>`;
    let bars = ''; for (let y=110;y<=190;y+=26) bars += `<path d="M100 ${y} H300" stroke="#000" stroke-opacity=".45" stroke-width="3"/>`;
    return `${tube('M72 118 H24',24)}${tube('M328 182 H376',24)}
    <rect x="100" y="80" width="200" height="140" fill="url(#gMetal)" stroke="currentColor" stroke-width="2.5"/>${fins}${bars}
    <path d="M100 68 L68 98 V202 L100 232 Z" fill="url(#gChrome)" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M300 68 L332 98 V202 L300 232 Z" fill="url(#gChrome)" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="178" y="136" width="44" height="26" fill="var(--red)"/>
    <text x="200" y="154" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="12" font-weight="600" fill="#fff">APR</text>
    <circle cx="376" cy="182" r="40" fill="url(#gHalo)" opacity=".5"/>`;
  },
  coilover(accent='var(--red)', label='KW'){
    let z = 'M152 78'; for (let i=0;i<7;i++){ z += ` L248 ${86+i*16} L152 ${94+i*16}`; }
    let threads=''; for (let y=206;y<=238;y+=4) threads += `<path d="M174 ${y} H226" stroke="currentColor" stroke-opacity=".4" stroke-width="1.2"/>`;
    return `<circle cx="200" cy="170" r="110" fill="url(#gHalo)" opacity=".3"/>
    <rect x="190" y="50" width="20" height="150" fill="url(#gChrome)" stroke="currentColor" stroke-width="1.5"/>
    ${tube(z,13)}
    <ellipse cx="200" cy="48" rx="46" ry="10" fill="${accent}" stroke="currentColor" stroke-width="2"/>
    <rect x="176" y="30" width="48" height="16" rx="3" fill="url(#gMetal)" stroke="currentColor" stroke-width="2"/>
    <rect x="150" y="192" width="100" height="12" rx="3" fill="${accent}" stroke="currentColor" stroke-width="2"/>
    <rect x="172" y="204" width="56" height="62" rx="5" fill="url(#gMetal)" stroke="currentColor" stroke-width="2.5"/>${threads}
    <text x="200" y="258" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="10" font-weight="600" fill="currentColor">${label}</text>
    <circle cx="200" cy="280" r="12" fill="#0b0b0d" stroke="currentColor" stroke-width="2.5"/><circle cx="200" cy="280" r="4" fill="currentColor"/>`;
  },
  'coilover-st'(){ return ART.coilover('#f2c230','ST'); },
  brakes(){
    const cx=178, cy=150; let slots='', lugs='';
    for (let i=0;i<14;i++){ const a=i/14*Math.PI*2; const [x1,y1]=pol(cx,cy,62,a), [x2,y2]=pol(cx,cy,96,a+.22); slots += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="#000" stroke-opacity=".55" stroke-width="4" stroke-linecap="round"/>`; }
    for (let i=0;i<5;i++){ const [x,y]=pol(cx,cy,32,i/5*Math.PI*2-Math.PI/2); lugs += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="#0b0b0d" stroke="currentColor" stroke-width="1.5"/>`; }
    const a0=-0.85, a1=0.85, ri=94, ro=128;
    const p = (r,a)=>pol(cx,cy,r,a).map(v=>v.toFixed(1)).join(' ');
    const cal = `M${p(ro,a0)} A${ro} ${ro} 0 0 1 ${p(ro,a1)} L${p(ri,a1)} A${ri} ${ri} 0 0 0 ${p(ri,a0)} Z`;
    return `<circle cx="${cx}" cy="${cy}" r="125" fill="url(#gHalo)" opacity=".35"/>
    <circle cx="${cx}" cy="${cy}" r="112" fill="url(#gMetal)" stroke="currentColor" stroke-width="2.5"/>
    <circle cx="${cx}" cy="${cy}" r="98" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="1.5"/>${slots}
    <circle cx="${cx}" cy="${cy}" r="54" fill="url(#gChrome)" stroke="currentColor" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="46" fill="#18181d" stroke="currentColor" stroke-opacity=".5"/>${lugs}
    <circle cx="${cx}" cy="${cy}" r="14" fill="#0b0b0d" stroke="currentColor" stroke-width="2"/>
    <path d="${cal}" fill="var(--red)" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
    <text x="${cx+111}" y="${cy+4}" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="13" font-weight="600" fill="#fff" transform="rotate(90 ${cx+111} ${cy})">APR</text>`;
  },
  coils(){
    let s = '<rect x="40" y="250" width="320" height="10" rx="5" fill="url(#gHalo)" opacity=".6"/>';
    for (let i=0;i<4;i++){ const x=95+i*70;
      s += `<rect x="${x-11}" y="102" width="22" height="112" fill="url(#gMetal)" stroke="currentColor" stroke-width="2"/>
      <rect x="${x-11}" y="112" width="22" height="8" fill="var(--red)"/>
      <rect x="${x-8}" y="214" width="16" height="38" rx="4" fill="#0b0b0d" stroke="currentColor" stroke-width="2"/>
      <rect x="${x-24}" y="60" width="48" height="44" rx="6" fill="var(--red)" stroke="currentColor" stroke-width="2"/>
      <rect x="${x-10}" y="48" width="20" height="14" rx="2" fill="#0b0b0d" stroke="currentColor" stroke-width="2"/>
      <text x="${x}" y="88" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="10" font-weight="600" fill="#fff">APR</text>`; }
    return s;
  },
  shifter(){
    return `<circle cx="215" cy="90" r="80" fill="url(#gHalo)" opacity=".35"/>
    <path d="M150 128 Q215 58 282 128" fill="none" stroke="var(--red)" stroke-opacity=".7" stroke-width="2" stroke-dasharray="5 6"/>
    <path d="M88 232 L312 232 L334 262 L66 262 Z" fill="url(#gMetal)" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="104" cy="248" r="5" fill="#0b0b0d" stroke="currentColor"/><circle cx="296" cy="248" r="5" fill="#0b0b0d" stroke="currentColor"/>
    <ellipse cx="200" cy="228" rx="52" ry="12" fill="url(#gChrome)" stroke="currentColor" stroke-width="2"/>
    ${tube('M200 226 L215 108',14)}
    <circle cx="201" cy="206" r="9" fill="var(--red)" stroke="currentColor" stroke-width="2"/>
    <circle cx="217" cy="80" r="32" fill="#0d0d10" stroke="currentColor" stroke-width="2.5"/>
    <path d="M204 68 V92 M217 68 V92 M230 68 V92 M204 80 H230" stroke="var(--red)" stroke-width="3" stroke-linecap="round"/>`;
  },
  turbo(){
    let blades=''; for (let i=0;i<10;i++){ const a=i/10*Math.PI*2; const [x1,y1]=pol(160,150,10,a), [x2,y2]=pol(160,150,40,a+.55); blades += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} Q${pol(160,150,30,a+.1).map(v=>v.toFixed(1)).join(' ')} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="currentColor" stroke-width="2"/>`; }
    return `<circle cx="312" cy="160" r="90" fill="url(#gHalo)" opacity=".7"/>
    ${tube('M160 74 H262',34)}
    <circle cx="312" cy="162" r="56" fill="url(#gMetal)" stroke="currentColor" stroke-width="2.5"/>
    <circle cx="312" cy="162" r="40" fill="url(#gGlow)" opacity=".55"/>
    <circle cx="312" cy="162" r="24" fill="#0b0b0d" stroke="currentColor" stroke-width="2"/>
    <rect x="236" y="138" width="34" height="46" rx="4" fill="url(#gChrome)" stroke="currentColor" stroke-width="2"/>
    <path d="M160 70 A82 82 0 1 1 78 152" fill="url(#gMetal)" stroke="currentColor" stroke-width="2.5"/>
    <circle cx="160" cy="150" r="78" fill="url(#gMetal)" stroke="currentColor" stroke-width="2.5"/>
    <circle cx="160" cy="150" r="48" fill="#0b0b0d" stroke="currentColor" stroke-width="3"/>${blades}
    <circle cx="160" cy="150" r="8" fill="url(#gChrome)" stroke="currentColor"/>
    <rect x="110" y="214" width="52" height="20" rx="2" fill="var(--red)"/>
    <text x="136" y="228" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="11" font-weight="600" fill="#fff">PCP</text>`;
  }
};
const art = (key, variant='') => `<div class="tile ${variant}"><svg viewBox="0 0 400 300" aria-hidden="true">${ART[key]()}</svg></div>`;

const ICON = {
  chip:'<rect x="12" y="12" width="20" height="20" rx="2"/><path d="M17 12V6M22 12V6M27 12V6M17 38v-6M22 38v-6M27 38v-6M12 17H6M12 22H6M12 27H6M38 17h-6M38 22h-6M38 27h-6"/>',
  turbo:'<circle cx="20" cy="24" r="12"/><circle cx="20" cy="24" r="5"/><path d="M20 12h16v8M32 30a6 6 0 1 0 0-.1"/>',
  pipe:'<path d="M4 26h10c4 0 4-6 8-6h4"/><rect x="24" y="14" width="10" height="14" rx="5"/><path d="M34 18h6M34 24h6"/>',
  spring:'<path d="M22 4v6M22 34v6M12 10l20 4-20 4 20 4-20 4 20 4"/>',
  disc:'<circle cx="20" cy="22" r="14"/><circle cx="20" cy="22" r="5"/><path d="M32 12a16 16 0 0 1 0 20"/>',
  gear:'<circle cx="22" cy="10" r="4"/><path d="M22 14v20M12 34h20M12 34v-8M32 34v-8M12 26h20"/>',
  bolt:'<path d="M24 4L12 24h10l-2 16 12-20H22z"/>'
};
const icon = k => `<svg class="ic" viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${ICON[k]}</svg>`;

/* ---------- dyno chart ---------- */
function curve(pts){
  const out=[]; for (let r=1500;r<=6500;r+=100){
    let i=0; while (i<pts.length-2 && r>pts[i+1][0]) i++;
    const [r0,t0]=pts[i],[r1,t1]=pts[i+1]; const t=t0+(t1-t0)*Math.min(1,Math.max(0,(r-r0)/(r1-r0)));
    out.push([r,t,t*r/7022]);
  } return out;
}
function dynoChart(key){
  const W=640,H=340,L=46,R=16,T=16,B=40, ymax=600;
  const X=r=>L+(r-1500)/5000*(W-L-R), Y=v=>T+(1-v/ymax)*(H-T-B);
  const st=curve(DYNO.stock), tu=curve(DYNO[key]);
  const line=(c,idx)=>c.map((p,i)=>(i?'L':'M')+X(p[0]).toFixed(1)+' '+Y(p[idx]).toFixed(1)).join(' ');
  let g=''; for (let v=0;v<=ymax;v+=100) g+=`<path d="M${L} ${Y(v)} H${W-R}" stroke="#2a2a31" stroke-width="1"/><text x="${L-8}" y="${Y(v)+4}" text-anchor="end" font-size="11" fill="#77737c" font-family="IBM Plex Mono,monospace">${v}</text>`;
  for (let r=2000;r<=6500;r+=1000) g+=`<text x="${X(r)}" y="${H-B+20}" text-anchor="middle" font-size="11" fill="#77737c" font-family="IBM Plex Mono,monospace">${r}</text>`;
  g+=`<text x="${W-R}" y="${H-4}" text-anchor="end" font-size="11" fill="#77737c" font-family="IBM Plex Mono,monospace">RPM</text>`;
  const pk=c=>c.reduce((a,b)=>b[2]>a[2]?b:a);
  const tp=pk(tu), sp=pk(st);
  const area = line(tu,2)+` L${X(6500)} ${Y(0)} L${X(1500)} ${Y(0)} Z`;
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="גרף דיינו: כוח ומומנט, מקור מול משודרג">
    <defs><linearGradient id="gArea${key}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#df1f26" stop-opacity=".28"/><stop offset="1" stop-color="#df1f26" stop-opacity="0"/></linearGradient></defs>
    ${g}
    <path d="${area}" fill="url(#gArea${key})"/>
    <path d="${line(st,1)}" fill="none" stroke="#8d8994" stroke-width="2" stroke-dasharray="6 5"/>
    <path d="${line(st,2)}" fill="none" stroke="#8d8994" stroke-width="2.2"/>
    <path d="${line(tu,1)}" fill="none" stroke="#ff6a2a" stroke-width="2.2" stroke-dasharray="6 5"/>
    <path d="${line(tu,2)}" fill="none" stroke="#df1f26" stroke-width="3"/>
    <circle cx="${X(tp[0])}" cy="${Y(tp[2])}" r="5" fill="#df1f26" stroke="#fff" stroke-width="1.5"/>
    <text x="${X(tp[0])-8}" y="${Y(tp[2])-12}" text-anchor="end" font-size="13" font-weight="600" fill="#f3f1ee" font-family="IBM Plex Mono,monospace">${Math.round(tp[2])} HP</text>
    <circle cx="${X(sp[0])}" cy="${Y(sp[2])}" r="4" fill="#8d8994"/>
    <text x="${X(sp[0])+8}" y="${Y(sp[2])+18}" font-size="12" fill="#a19da7" font-family="IBM Plex Mono,monospace">${Math.round(sp[2])} HP</text>
  </svg>
  <div class="legend"><span><i style="background:#df1f26"></i>כוח, משודרג</span><span><i style="background:#8d8994"></i>כוח, מקור</span><span><i style="background:repeating-linear-gradient(90deg,#ff6a2a 0 5px,transparent 5px 9px)"></i>מומנט (Nm), משודרג</span><span><i style="background:repeating-linear-gradient(90deg,#8d8994 0 5px,transparent 5px 9px)"></i>מומנט, מקור</span></div>
  <small>נתוני הדגמה. ציר אנכי: כ״ס / Nm. תוצאות בפועל משתנות לפי רכב, דלק ותנאי מדידה.</small>`;
}

/* ---------- state ---------- */
const state = {cat:'all', brand:'all', car:'all', sort:'rec', homeTab:'best'};
let cart = [];
try { cart = JSON.parse(localStorage.getItem('pitstop-cart')||'[]').filter(i=>byId(i.id)); const c=localStorage.getItem('pitstop-car'); if (c && CARS[c]) state.car=c; } catch(e){}
const save = () => { try { localStorage.setItem('pitstop-cart', JSON.stringify(cart)); localStorage.setItem('pitstop-car', state.car); } catch(e){} };

/* ---------- views ---------- */
function card(p){
  const b = p.badge ? `<span class="badge ${p.badge==='מבצע'?'sale':p.badge==='חדש'?'new':''}">${p.badge}</span>` : '';
  const m = k => `<bdi>${CARS[k].model}</bdi>`; const fits = p.fit.length>2 ? `${m(p.fit[0])}, ${m(p.fit[1])} ועוד ${p.fit.length-2}` : p.fit.map(m).join(', ');
  return `<a class="card" href="product-${p.id}.html">
    <div class="shot">${b}${art(p.art)}</div>
    <div class="body">
      <span class="brand">${p.brand}</span>
      <h3>${bd(p.name)}</h3>
      <span class="fitline">${fits}</span>
      <div class="foot"><span><span class="price">${ils(p.price)}</span>${p.was?`<span class="was">${ils(p.was)}</span>`:''}</span>${p.hp?`<span class="gain ltr">+${p.hp} HP</span>`:''}</div>
    </div></a>`;
}

function finder(){
  const makes=[...new Set(Object.values(CARS).map(c=>c.make))];
  const cur = state.car!=='all' ? CARS[state.car] : null;
  return `<form class="finder" id="finder" aria-label="חיפוש חלקים לפי רכב">
    <div class="label"><b>מה ברכב שלך?</b><span>בחרו רכב ונציג רק חלקים שמתאימים</span></div>
    <div class="field"><label for="fMake">יצרן</label><select id="fMake"><option value="">בחרו יצרן</option>${makes.map(m=>`<option ${cur&&cur.make===m?'selected':''}>${m}</option>`).join('')}</select></div>
    <div class="field"><label for="fModel">דגם</label><select id="fModel">${modelOptions(cur?cur.make:'')}</select></div>
    <div class="go"><button class="btn btn-red" type="submit">הצג חלקים <span class="arrow">←</span></button></div>
  </form>`;
}
function modelOptions(make){
  if (!make) return '<option value="">בחרו קודם יצרן</option>';
  return '<option value="">בחרו דגם</option>' + Object.entries(CARS).filter(([k,c])=>c.make===make).map(([k,c])=>`<option value="${k}" ${state.car===k?'selected':''}>${c.model} (${c.years})</option>`).join('');
}

function heroArt(){
  let tips='';
  for (const cx of [190,410]){
    tips += `<g><ellipse cx="${cx}" cy="230" rx="100" ry="116" fill="url(#gChrome)" stroke="currentColor" stroke-width="2"/>
    <ellipse cx="${cx}" cy="230" rx="88" ry="103" fill="#060607" stroke="currentColor" stroke-opacity=".5" stroke-width="2"/>
    <ellipse class="glow" cx="${cx}" cy="232" rx="76" ry="90" fill="url(#gGlow)"/>
    <ellipse cx="${cx}" cy="232" rx="40" ry="48" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="10"/>
    <path d="M${cx-60} 160 Q${cx} 126 ${cx+60} 160" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/></g>`;
  }
  return `<svg viewBox="0 0 600 440" aria-hidden="true">
    <ellipse class="glow" cx="300" cy="240" rx="300" ry="190" fill="url(#gHalo)"/>
    <path d="M10 380 L590 380 L560 430 L40 430 Z" fill="#0d0d10" stroke="currentColor" stroke-opacity=".3"/>
    <path d="M70 380 L110 430 M170 380 L190 430 M300 380 V430 M430 380 L410 430 M530 380 L490 430" stroke="currentColor" stroke-opacity=".18"/>
    ${tips}
    <text x="300" y="414" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="12" letter-spacing="4" fill="currentColor" fill-opacity=".5">REMUS · STREET RACE · 4×98</text>
  </svg>`;
}

function Home(){
  const tabs = {best:'רבי מכר', engine:'מנוע ותוכנה', chassis:'שלדה ובלמים'};
  return `
  <section class="hero">
    <canvas id="smoke" aria-hidden="true"></canvas>
    <div class="wrap hero-grid">
      <div>
        <span class="eyebrow">יבואן ונציג רשמי · מאז 2002</span>
        <h1 class="display h1" style="margin-top:18px">ביצועים<br><span class="stroke">שנולדו</span> <span class="red">במסלול.</span></h1>
        <p class="lead">חלקי ביצועים מהמותגים המובילים בעולם, התקנה מקצועית וכיוון מנוע על דיינו. הכל תחת קורת גג אחת בחולון.</p>
        <div class="hero-ctas"><a class="btn btn-red" href="products.html">לקטלוג המוצרים <span class="arrow">←</span></a><a class="btn btn-ghost" href="dyno.html">קביעת תור לדיינו</a></div>
        <div class="hero-meta">
          <div><b>2002</b><span>שנת הקמה</span></div>
          <div><b>7</b><span>מותגים בייצוג רשמי</span></div>
          <div><b>DynoJet</b><span>דיינו בסדנה</span></div>
        </div>
      </div>
      <div class="hero-art">${heroArt()}</div>
    </div>
  </section>
  <div class="wrap">${finder()}</div>

  <section class="block wrap">
    <div class="promos">
      <a class="promo" href="product-apr-stage1.html"><span class="tag">חדש</span><div class="art"><svg viewBox="0 0 400 300">${ART.ecu()}</svg></div><h3>APR Stage 1<br>ל-Golf R Mk8</h3><p>עד 386 כ״ס, כולל משיכות דיינו לפני ואחרי.</p></a>
      <a class="promo" href="product-st-xta.html"><span class="tag">מבצע</span><div class="art"><svg viewBox="0 0 400 300">${ART['coilover-st']()}</svg></div><h3>סוף עונה:<br>15% על ST XTA</h3><p>מתלי כיוונון עם קמבר מתכוונן, עד גמר המלאי.</p></a>
      <a class="promo" href="dyno.html"><span class="tag">סדנה</span><div class="art"><svg viewBox="0 0 400 300">${ART.turbo()}</svg></div><h3>כמה כוח<br>יש לך באמת?</h3><p>בדיקת כוח על דיינו עם גיליון תוצאות מודפס.</p></a>
    </div>
  </section>

  <section class="wrap" style="padding-bottom:clamp(64px,8vw,112px)">
    <div class="sec-head"><div><span class="eyebrow">קטגוריות</span><h2 class="display h2">לפי מערכת ברכב</h2></div><a class="link-arrow" href="products.html">לכל המוצרים</a></div>
    <div class="cats">${Object.entries(CATS).map(([k,c])=>`<a class="cat" href="category-${k}.html">${icon(c.icon)}<b>${c.name}</b><small>${P.filter(p=>p.cat===k).length} מוצרים</small></a>`).join('')}</div>
  </section>

  <section class="block story" style="background:radial-gradient(50% 80% at 50% 100%,rgba(223,31,38,.16),transparent 70%)">
    <div class="wrap">
      <span class="eyebrow">ONE STOP SHOP לספורט מוטורי</span>
      <h2 class="display h2">נולדנו במסלול. בנויים לכביש.</h2>
      <p>מאז 2002 אנחנו מלווים נהגי מירוץ, חובבי מסלול ובעלי רכבי ספורט ויוקרה. אנחנו מייבאים ישירות מהיצרנים, מתאימים כל חלק לרכב ולתקציב, ומתקינים בלי קיצורי דרך.</p>
    </div>
  </section>

  <div class="marquee" aria-label="המותגים שלנו"><div class="marquee-track">${Array(2).fill(['KW','ST SUSPENSIONS','REMUS','APR','PCP','OMP','HOOSIER'].map(b=>`<span>${b}<i> ·</i></span>`).join('')).join('')}</div></div>

  <section class="block wrap">
    <div class="sec-head"><div><span class="eyebrow">Built to upgrade</span><h2 class="display h2">למה משדרגים</h2></div></div>
    <div class="panels">
      <div class="panel p-sound"><div class="bgart"><svg viewBox="0 0 300 200" width="80%" aria-hidden="true">${Array.from({length:40},(_,i)=>{const h=10+Math.abs(Math.sin(i*.55)*Math.cos(i*.21))*150;return `<rect x="${i*7.5}" y="${100-h/2}" width="3.5" height="${h}" fill="${i%9===4?'#df1f26':'#f3f1ee'}" fill-opacity="${i%9===4?1:.55}"/>`}).join('')}</svg></div><span class="num">01</span><h3>סאונד</h3><p>מערכות פליטה עם שסתום אלקטרוני: שקטות בעיר, מלאות במסלול.</p></div>
      <div class="panel p-power"><div class="bgart"><span class="bignum">+66</span></div><span class="num">02</span><h3>ביצועים</h3><p>תוכנה, יניקה וטורבו שמוסיפים כוח מדיד. כל שדרוג נבדק על הדיינו.</p></div>
      <div class="panel p-spirit"><div class="bgart"><img src="assets/helmet.png" alt="" width="108" height="108" style="width:52%;height:auto;filter:drop-shadow(0 0 60px rgba(223,31,38,.7))"></div><span class="num">03</span><h3>רוח מוטורספורט</h3><p>ציוד מירוצים, מתלים וצמיגי מסלול לנהגים שמתחרים באמת.</p></div>
    </div>
  </section>

  <section class="wrap" style="padding-bottom:clamp(64px,8vw,112px)">
    <div class="sec-head"><div><span class="eyebrow">Fine-tuned for the road</span><h2 class="display h2">מוצרים נבחרים</h2></div>
      <div class="tabs" role="tablist">${Object.entries(tabs).map(([k,v])=>`<button class="tab" role="tab" type="button" data-hometab="${k}" aria-selected="${state.homeTab===k}">${v}</button>`).join('')}</div></div>
    <div class="grid" id="homeGrid">${homeGrid()}</div>
    <div style="margin-top:28px;text-align:center"><a class="btn btn-ghost" href="products.html">לכל 10 המוצרים</a></div>
  </section>

  <section class="block" style="border-top:1px solid var(--line);background:#08080a">
    <div class="wrap dyno-wrap">
      <div>
        <span class="eyebrow">DynoJet · כיוון בסדנה</span>
        <h2 class="display h2" style="margin:12px 0 18px">הכוח נמדד, לא מנוחש.</h2>
        <p class="lead">כל שדרוג תוכנה אצלנו מתחיל ונגמר על הדיינו. מודדים לפני, טוענים, מכוונים ומודדים שוב. הגרף מראה Golf R Mk8 לפני ואחרי APR Stage 1.</p>
        <div class="figures"><div><b>+66</b><span>כ״ס בשיא</span></div><div><b>+110</b><span>Nm מומנט</span></div><div><b>386</b><span>כ״ס אחרי שדרוג</span></div><div><b>530</b><span>Nm אחרי שדרוג</span></div></div>
        <div style="margin-top:28px"><a class="btn btn-red" href="dyno.html">שירותי דיינו <span class="arrow">←</span></a></div>
      </div>
      <div class="chart">${dynoChart('apr1')}</div>
    </div>
  </section>

  <section class="block wrap">
    <div class="sec-head"><div><span class="eyebrow">איך זה עובד</span><h2 class="display h2">מהייעוץ ועד המשיכה הראשונה</h2></div></div>
    <div class="steps">
      <div class="step"><span class="n">01</span><h3>ייעוץ</h3><p>מתאימים את החלק לרכב, לתקציב ולאופן השימוש: כביש, מסלול או שניהם.</p></div>
      <div class="step"><span class="n">02</span><h3>הזמנה</h3><p>מהמלאי בחולון, או בייבוא ישיר מהיצרן לפי דרישה.</p></div>
      <div class="step"><span class="n">03</span><h3>התקנה</h3><p>בסדנה שלנו, בלי קיצורי דרך, עם הסבר על תחזוקה ושימוש נכון.</p></div>
      <div class="step"><span class="n">04</span><h3>כיוון ובדיקה</h3><p>מדידה על הדיינו ורישום נתונים, כדי שתדעו בדיוק מה קיבלתם.</p></div>
    </div>
  </section>`;
}
function homeGrid(){
  const sets = {best:P.filter(p=>p.badge), engine:P.filter(p=>['software','engine','exhaust','ignition'].includes(p.cat)), chassis:P.filter(p=>['suspension','brakes','drivetrain'].includes(p.cat))};
  return sets[state.homeTab].slice(0,4).map(card).join('');
}

function Products(){
  const brands=[...new Set(P.map(p=>p.brand))];
  let list = P.filter(p=>(state.cat==='all'||p.cat===state.cat)&&(state.brand==='all'||p.brand===state.brand)&&(state.car==='all'||p.fit.includes(state.car)));
  if (state.sort==='low') list=[...list].sort((a,b)=>a.price-b.price);
  if (state.sort==='high') list=[...list].sort((a,b)=>b.price-a.price);
  if (state.sort==='hp') list=[...list].sort((a,b)=>(b.hp||0)-(a.hp||0));
  const title = state.cat==='all' ? 'כל המוצרים' : CATS[state.cat].name;
  return `
  <div class="page-head"><div class="wrap">
    <nav class="crumbs" aria-label="פירורי לחם"><a href="index.html">ראשי</a><span>/</span><a href="products.html">מוצרים</a>${state.cat!=='all'?`<span>/</span><span>${title}</span>`:''}</nav>
    <h1 class="display h1" style="font-size:clamp(60px,8vw,110px)">${title}</h1>
    <p class="lead" style="margin-top:12px">חלקי ביצועים מקוריים מ-${brands.length} מותגים, עם התאמה מדויקת לרכב והתקנה בסדנה.</p>
  </div></div>
  <div class="wrap catalog">
    <aside class="filters" aria-label="סינון">
      <div><h4>הרכב שלי</h4><select class="sel" id="carSel" aria-label="סינון לפי רכב"><option value="all">כל הרכבים</option>${Object.keys(CARS).map(k=>`<option value="${k}" ${state.car===k?'selected':''}>${carName(k)}</option>`).join('')}</select></div>
      <div><h4>קטגוריה</h4><div class="fl">
        <button type="button" data-cat="all" aria-pressed="${state.cat==='all'}">הכל <small>${P.length}</small></button>
        ${Object.entries(CATS).map(([k,c])=>`<button type="button" data-cat="${k}" aria-pressed="${state.cat===k}">${c.name} <small>${P.filter(p=>p.cat===k).length}</small></button>`).join('')}
      </div></div>
      <div><h4>מותג</h4><div class="fl">
        <button type="button" data-brand="all" aria-pressed="${state.brand==='all'}">כל המותגים</button>
        ${brands.map(b=>`<button type="button" data-brand="${b}" aria-pressed="${state.brand===b}"><span class="ltr">${b}</span> <small>${P.filter(p=>p.brand===b).length}</small></button>`).join('')}
      </div></div>
    </aside>
    <div>
      <div class="toolbar">
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="muted"><span class="mono">${list.length}</span> מוצרים</span>
          ${state.car!=='all'?`<span class="chip">מתאים ל-${carName(state.car)} <button type="button" data-clearcar aria-label="ניקוי סינון רכב">✕</button></span>`:''}</div>
        <label style="display:flex;gap:10px;align-items:center"><span class="muted" style="font-size:14px">מיון</span>
          <select class="sel" id="sortSel"><option value="rec" ${state.sort==='rec'?'selected':''}>מומלץ</option><option value="low" ${state.sort==='low'?'selected':''}>מחיר: מהנמוך לגבוה</option><option value="high" ${state.sort==='high'?'selected':''}>מחיר: מהגבוה לנמוך</option><option value="hp" ${state.sort==='hp'?'selected':''}>תוספת כוח</option></select></label>
      </div>
      ${list.length ? `<div class="grid">${list.map(card).join('')}</div>` : `<div class="empty">אין מוצרים שתואמים לסינון הזה. <button class="btn btn-ghost" type="button" data-reset style="margin-top:16px">ניקוי כל הסינונים</button></div>`}
    </div>
  </div>`;
}

function ProductPage(p){
  const related = P.filter(x=>x.id!==p.id && (x.cat===p.cat || x.fit.some(f=>p.fit.includes(f)))).slice(0,4);
  const preset = p.fit.includes(state.car) ? state.car : '';
  return `
  <div class="wrap">
    <nav class="crumbs" aria-label="פירורי לחם" style="padding-top:28px"><a href="index.html">ראשי</a><span>/</span><a href="products.html">מוצרים</a><span>/</span><a href="category-${p.cat}.html">${CATS[p.cat].name}</a><span>/</span><span>${bd(p.name)}</span></nav>
    <div class="pp">
      <div class="gallery">
        <div class="main" id="mainShot">${art(p.art)}</div>
        <div class="thumbs">
          <button type="button" data-shot="" aria-pressed="true" aria-label="תמונה ראשית">${art(p.art)}</button>
          <button type="button" data-shot="v-glow" aria-pressed="false" aria-label="תאורה חמה">${art(p.art,'v-glow')}</button>
          <button type="button" data-shot="v-detail" aria-pressed="false" aria-label="תקריב">${art(p.art,'v-detail')}</button>
        </div>
      </div>
      <div class="info">
        <div class="brandrow"><span class="b">${p.brand}</span><span class="sku ltr">${p.sku}</span>${p.badge?`<span class="badge ${p.badge==='מבצע'?'sale':p.badge==='חדש'?'new':''}">${p.badge}</span>`:''}</div>
        <h1>${bd(p.name)}</h1>
        <p class="model">${p.model}</p>
        ${p.hp?`<div class="gains"><div><b>+${p.hp}</b><span>כ״ס</span></div><div><b>+${p.nm}</b><span>Nm מומנט</span></div></div>`:''}
        <p style="margin:0 0 22px;color:#d6d3da">${p.short}</p>
        <form class="buybox" id="buy" data-id="${p.id}">
          <div><span class="price">${ils(p.price)}</span>${p.was?`<span class="was">${ils(p.was)}</span>`:''} <span class="vat">כולל מע״מ</span></div>
          <span class="stock ${p.stock?'':'order'}">${p.stock?'במלאי בסדנה בחולון':'בהזמנה מיוחדת, אספקה תוך 10–14 ימי עסקים'}</span>
          <div class="field"><label for="fitSel">התאמה לרכב</label>
            <select class="sel" id="fitSel"><option value="">בחרו את הרכב שלכם</option>${p.fit.map(k=>`<option value="${k}" ${preset===k?'selected':''}>${carName(k)}</option>`).join('')}</select>
            <div class="err" id="fitErr" role="alert"></div></div>
          <label class="check"><input type="checkbox" id="instSel" ${p.installPrice===0?'checked disabled':''}><span>${p.installPrice===0?'התקנה וכיוון בסדנה כלולים במחיר':`הוספת התקנה בסדנה (<span class="mono">${ils(p.installPrice)}</span>, ${p.install})`}</span></label>
          <div style="display:flex;gap:12px;align-items:end;flex-wrap:wrap">
            <div class="field"><label for="qtyIn">כמות</label><div class="qty"><button type="button" data-q="-1" aria-label="הפחתה">−</button><input id="qtyIn" value="1" inputmode="numeric" aria-label="כמות"><button type="button" data-q="1" aria-label="הוספה">+</button></div></div>
            <button class="btn btn-red" type="submit" style="flex:1;justify-content:center">הוספה לסל</button>
          </div>
        </form>
        <ul class="facts"><li>אחריות: ${p.warranty}</li><li>זמן התקנה משוער: ${p.install}</li><li>משלוח חינם בהזמנה מעל ₪500, או איסוף מהסדנה</li></ul>
      </div>
    </div>

    <div class="ptabs" role="tablist">
      <button type="button" role="tab" data-ptab="d" aria-selected="true">תיאור</button>
      <button type="button" role="tab" data-ptab="s" aria-selected="false">מפרט טכני</button>
      <button type="button" role="tab" data-ptab="f" aria-selected="false">התאמה לרכבים</button>
    </div>
    <div class="ppanel" data-panel="d">
      <div>${p.desc.map(t=>`<p>${t}</p>`).join('')}${p.dyno?`<div class="chart" style="margin-top:24px">${dynoChart(p.dyno)}</div>`:''}</div>
      <div><h3 class="display" style="font-size:40px;margin-bottom:12px">מה מקבלים</h3><ul class="facts" style="margin:0">${p.features.map(f=>`<li>${f}</li>`).join('')}</ul></div>
    </div>
    <div class="ppanel" data-panel="s" hidden>
      <table class="spec"><tbody><tr><th>מק״ט</th><td class="mono ltr">${p.sku}</td></tr><tr><th>מותג</th><td>${p.brand}</td></tr>${p.specs.map(([k,v])=>`<tr><th>${k}</th><td>${v}</td></tr>`).join('')}</tbody></table><div></div>
    </div>
    <div class="ppanel" data-panel="f" hidden>
      <ul class="fitlist">${p.fit.map(k=>`<li>${carName(k)}<span>✓ מתאים</span></li>`).join('')}</ul>
      <p class="muted">לא מוצאים את הרכב שלכם? חלקים רבים זמינים בייבוא לפי דרישה. התקשרו אלינו: <span class="mono ltr">03-6884836</span></p>
    </div>

    <section style="padding-block:48px 24px;border-top:1px solid var(--line);margin-top:24px">
      <div class="sec-head"><h2 class="display h3">מוצרים שמשתלבים</h2><a class="link-arrow" href="products.html">לכל המוצרים</a></div>
      <div class="grid">${related.map(card).join('')}</div>
    </section>
  </div>`;
}

function About(){
  const brands = [['KW','מתלים ספורטיביים ומתלי כיוונון'],['ST SUSPENSIONS','מתלים ספורטיביים'],['REMUS','מערכות פליטה'],['APR','ניהול מנוע משודרג ומוצרי ביצועים'],['PCP','Power Code Performance: ניהול מנוע, קיטים וחלקים'],['OMP','ציוד מירוצים ובטיחות'],['HOOSIER','צמיגי מירוץ']];
  return `
  <div class="page-head"><div class="wrap">
    <nav class="crumbs"><a href="index.html">ראשי</a><span>/</span><span>אודות</span></nav>
    <span class="eyebrow">ONE STOP SHOP לספורט מוטורי</span>
    <h1 class="display h1" style="margin-top:14px">פיטסטופ.<br><span class="red">מאז 2002.</span></h1>
  </div></div>
  <section class="block wrap">
    <div class="two">
      <div><h2 class="display h2">סדנה, יבואן ושותף לדרך</h2></div>
      <div class="prose">
        <p>פיטסטופ היא סדנה לשיפור רכבים וספורט מוטורי בחולון, שפועלת מאז 2002. אנחנו משרתים נהגי מירוצים, חובבי ספורט מוטורי ובעלי רכבי ספורט ויוקרה, ומלווים כל לקוח מהבחירה בחלק ועד שהרכב חוזר לכביש או למסלול.</p>
        <p>אנחנו נציגים רשמיים בישראל של מותגים מובילים בעולם, ומייבאים חלקי ספורט מוטורי גם לפי דרישה. מעבר למכירה, אנחנו מייעצים בבחירת החלקים, מתקינים אותם ומסבירים איך לתחזק ולהשתמש בהם נכון.</p>
        <p>הסדנה שלנו כוללת אולם תצוגה, אזור המתנה ומתקנים מתקדמים, בהם מכשיר דיינו DynoJet לכיוון מנוע מותאם אישית ולאבחון ורישום נתונים.</p>
      </div>
    </div>
    <div class="stats">
      <div><b class="mono" style="font-family:var(--f-display)">2002</b><span>שנת הקמה</span></div>
      <div><b>7</b><span>מותגים בייצוג רשמי</span></div>
      <div><b>DynoJet</b><span>כיוון ומדידה בסדנה</span></div>
      <div><b>חולון</b><span>סדנה ואולם תצוגה</span></div>
    </div>
  </section>
  <section class="wrap" style="padding-bottom:clamp(64px,8vw,112px)">
    <div class="sec-head"><div><span class="eyebrow">ייצוג רשמי בישראל</span><h2 class="display h2">המותגים שלנו</h2></div></div>
    <div class="brandlist">${brands.map(([b,d])=>`<div><b>${b}</b><span>${d}</span></div>`).join('')}</div>
  </section>
  <section class="block" style="background:#08080a;border-block:1px solid var(--line)">
    <div class="wrap two">
      <div><span class="eyebrow">השירותים</span><h2 class="display h2" style="margin-top:12px">מה אנחנו עושים</h2></div>
      <ul class="svc">
        <li><b>01</b><span>מכירת מוצרים לשדרוג ביצועים: יניקה, אינטרקולרים, סלילי הצתה, מתלים ופליטה</span></li>
        <li><b>02</b><span>ציוד בטיחות וחלקים תקניים למירוצים</span></li>
        <li><b>03</b><span>ייבוא חלקי ספורט מוטורי לפי דרישה</span></li>
        <li><b>04</b><span>ייעוץ בבחירת חלקים, התקנה והדרכה לתחזוקה ושימוש נכון</span></li>
        <li><b>05</b><span>כיוון מנוע מותאם אישית על דיינו DynoJet</span></li>
        <li><b>06</b><span>אבחון ורישום נתונים (Diagnostic Logging)</span></li>
        <li><b>07</b><span>ליווי לנהגי מקצוע ולחובבי רכב, כולל סטייל, סאונד ועיצוב</span></li>
      </ul>
    </div>
  </section>
  <section class="block wrap">
    <div class="sec-head"><div><span class="eyebrow">הערכים שלנו</span><h2 class="display h2">איך אנחנו עובדים</h2></div></div>
    <div class="values">
      <div class="value"><h3>איכות</h3><p>השקעה במחקר ופיתוח לצד שירות הוגן. אנחנו עובדים רק עם מותגים שעומדים מאחורי המוצר שלהם.</p></div>
      <div class="value"><h3>מצוינות</h3><p>התאמת הציוד לתקציב ולצרכים של כל לקוח, בלי קיצורי דרך בהתקנה ובתחזוקה.</p></div>
      <div class="value"><h3>חדשנות</h3><p>סדנה מודרנית עם אולם תצוגה, אזור המתנה, דיינו ומתקנים מתקדמים.</p></div>
    </div>
  </section>
  <section class="wrap" style="padding-bottom:clamp(64px,8vw,112px)">
    <div class="sec-head"><div><span class="eyebrow">מודל העסק</span><h2 class="display h2">ארבעה מנועי הכנסה, לקוח אחד</h2></div></div>
    <div class="steps">
      <div class="step"><span class="n">01</span><h3>ייבוא ומכירה</h3><p>ייבוא ישיר מהיצרנים ומכירה באתר ובאולם התצוגה, עם חיפוש חלקים לפי רכב.</p></div>
      <div class="step"><span class="n">02</span><h3>התקנה בסדנה</h3><p>כל מוצר נמכר עם אפשרות להתקנה מקצועית, כך שהלקוח מקבל פתרון מלא.</p></div>
      <div class="step"><span class="n">03</span><h3>דיינו וכיוון</h3><p>שירות בעל ערך גבוה שמשלים את השדרוגים ומביא לקוחות חוזרים.</p></div>
      <div class="step"><span class="n">04</span><h3>מועדון לקוחות</h3><p>עדכונים על מלאי חדש ומבצעים, וייבוא לפי דרישה לחלקים שאינם במלאי.</p></div>
    </div>
  </section>`;
}

function Dyno(){
  return `
  <div class="page-head"><div class="wrap">
    <nav class="crumbs"><a href="index.html">ראשי</a><span>/</span><span>דיינו וכיוון</span></nav>
    <span class="eyebrow">DynoJet · חולון</span>
    <h1 class="display h1" style="margin-top:14px">דיינו וכיוון מנוע</h1>
    <p class="lead" style="margin-top:14px">מדידת כוח אמיתית על הגלגלים, כיוון מנוע מותאם אישית ורישום נתונים לאבחון. הכל נעשה בסדנה שלנו.</p>
  </div></div>
  <section class="block wrap">
    <div class="dyno-wrap">
      <div class="chart">${dynoChart('pcp')}</div>
      <div>
        <h2 class="display h3" style="margin-bottom:14px">דוגמה: Golf R עם טורבו PCP IS38+</h2>
        <p class="lead">לפני כל עבודה אנחנו מבצעים משיכת בסיס. אחרי ההתקנה והכיול חוזרים לדיינו ומשווים. אתם מקבלים את הגיליון ביד.</p>
        <div class="figures"><div><b>430</b><span>כ״ס בשיא</span></div><div><b>560</b><span>Nm מומנט</span></div></div>
      </div>
    </div>
  </section>
  <section class="wrap" style="padding-bottom:clamp(64px,8vw,112px)">
    <div class="two">
      <div><span class="eyebrow">מחירון</span><h2 class="display h2" style="margin-top:12px">שירותי הדיינו</h2><p class="muted" style="margin-top:12px">מחירים להדגמה, כוללים מע״מ.</p></div>
      <table class="pricelist"><tbody>
        <tr><td><b>בדיקת כוח</b><br><span class="muted">3 משיכות וגיליון תוצאות</span></td><td>₪450</td></tr>
        <tr><td><b>אבחון ורישום נתונים</b><br><span class="muted">Diagnostic Logging בכביש ועל הדיינו</span></td><td>₪350</td></tr>
        <tr><td><b>טעינת תוכנת APR</b><br><span class="muted">כולל משיכות לפני ואחרי</span></td><td>כלול ברכישה</td></tr>
        <tr><td><b>כיוון מותאם אישית</b><br><span class="muted">לרכבים עם שדרוגי חומרה</span></td><td>החל מ-₪2,500</td></tr>
      </tbody></table>
    </div>
    <div style="margin-top:40px"><a class="btn btn-red" href="contact.html">לתיאום תור <span class="arrow">←</span></a></div>
  </section>`;
}

function Contact(){
  return `
  <div class="page-head"><div class="wrap">
    <nav class="crumbs"><a href="index.html">ראשי</a><span>/</span><span>צור קשר</span></nav>
    <h1 class="display h1">דברו איתנו</h1>
    <p class="lead" style="margin-top:12px">שאלה על התאמה לרכב, הצעת מחיר או תור לדיינו. השאירו פרטים ונחזור אליכם.</p>
  </div></div>
  <section class="block wrap two">
    <form class="form" id="contactForm" novalidate>
      <div><label class="muted" for="cName">שם מלא</label><input id="cName" required autocomplete="name"></div>
      <div><label class="muted" for="cPhone">טלפון</label><input id="cPhone" required inputmode="tel" autocomplete="tel"></div>
      <div><label class="muted" for="cCar">רכב</label><select id="cCar"><option value="">לא נבחר</option>${Object.keys(CARS).map(k=>`<option ${state.car===k?'selected':''}>${carName(k)}</option>`).join('')}<option>רכב אחר</option></select></div>
      <div><label class="muted" for="cTopic">נושא</label><select id="cTopic"><option>הצעת מחיר למוצר</option><option>תור לדיינו</option><option>התקנה בסדנה</option><option>ייבוא לפי דרישה</option><option>אחר</option></select></div>
      <div class="full"><label class="muted" for="cMsg">הודעה</label><textarea id="cMsg" rows="5"></textarea></div>
      <div class="full"><div class="err" id="cErr" role="alert"></div><button class="btn btn-red" type="submit">שליחת פנייה</button></div>
      <div class="full" id="cDone" role="status"></div>
    </form>
    <div class="contact-card">
      <div><b>כתובת</b><span>החורטים 6, חולון</span></div>
      <div><b>טלפון</b><a href="tel:036884836" class="mono ltr">03-6884836</a></div>
      <div><b>פייסבוק</b><a href="https://www.facebook.com/PitStopMotorsport" class="ltr">PitStopMotorsport</a></div>
      <div><b>אתר</b><span class="ltr">pitstop.co.il</span></div>
    </div>
  </section>`;
}

/* ---------- smoke canvas ---------- */
let smokeRAF = 0;
function startSmoke(){
  cancelAnimationFrame(smokeRAF);
  const c = $('#smoke'); if (!c) return;
  const ctx = c.getContext && c.getContext('2d'); if (!ctx) return; const dpr = Math.min(2, window.devicePixelRatio||1);
  const size = () => { c.width = c.offsetWidth*dpr; c.height = c.offsetHeight*dpr; };
  size();
  const N=26, parts=[];
  const spawn = (init) => ({x: c.width*(0.15+Math.random()*0.55), y: init ? Math.random()*c.height : c.height*(0.7+Math.random()*0.4), r:(80+Math.random()*180)*dpr, vx:(Math.random()-.6)*.25*dpr, vy:-(.15+Math.random()*.35)*dpr, a:.03+Math.random()*.05, red:Math.random()<.45});
  for (let i=0;i<N;i++) parts.push(spawn(true));
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const draw = () => {
    if (!document.body.contains(c)) return;
    if (c.width !== c.offsetWidth*dpr) size();
    ctx.clearRect(0,0,c.width,c.height);
    for (const p of parts){
      const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
      const col = p.red ? '223,31,38' : '200,196,206';
      g.addColorStop(0,`rgba(${col},${p.a})`); g.addColorStop(1,`rgba(${col},0)`);
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
      if (!still){ p.x+=p.vx; p.y+=p.vy; p.r+=.12*dpr; if (p.y+p.r<0) Object.assign(p, spawn(false)); }
    }
    if (!still) smokeRAF = requestAnimationFrame(draw);
  };
  draw();
}

/* ---------- page render (multi-page site) ---------- */
const app = $('#app');
const PAGE = document.body.dataset.page || 'home';
function render(){
  let view, navKey='';
  if (PAGE==='home'){ view=Home(); }
  else if (PAGE==='products'){ state.cat='all'; view=Products(); navKey='products'; }
  else if (PAGE==='category' && CATS[document.body.dataset.cat]){ state.cat=document.body.dataset.cat; view=Products(); navKey='products'; }
  else if (PAGE==='product' && byId(document.body.dataset.id)){ view=ProductPage(byId(document.body.dataset.id)); navKey='products'; }
  else if (PAGE==='about'){ view=About(); navKey='about'; }
  else if (PAGE==='dyno'){ view=Dyno(); navKey='dyno'; }
  else if (PAGE==='contact'){ view=Contact(); navKey='contact'; }
  else { view=Home(); }
  app.innerHTML = view;
  $$('[data-nav]').forEach(a=>a.classList.toggle('active', a.dataset.nav===navKey));
  if (PAGE==='home'){ startSmoke(); if (location.hash==='#finder') setTimeout(()=>{ const f=$('#finder'); f.scrollIntoView({block:'center'}); $('#fMake').focus({preventScroll:true}); },80); }
}
function rerenderProducts(){ const y=window.scrollY; app.innerHTML=Products(); window.scrollTo(0,y); }
function updateCarPill(){ $('#carPillText').textContent = state.car!=='all' ? `${CARS[state.car].model}` : 'חיפוש לפי רכב'; }

/* ---------- cart ---------- */
function renderCart(){
  const count = cart.reduce((s,i)=>s+i.qty,0);
  $('#cartCount').textContent = count;
  const items = $('#cartItems'), foot = $('#cartFoot');
  if (!cart.length){ items.innerHTML = `<div class="empty" style="margin-top:12px">הסל ריק כרגע.<br><a class="link-arrow" href="products.html" data-close style="display:inline-block;margin-top:12px">למוצרים</a></div>`; foot.innerHTML=''; return; }
  let total=0;
  items.innerHTML = cart.map((i,idx)=>{ const p=byId(i.id); const line=(p.price+(i.install?p.installPrice:0))*i.qty; total+=line;
    return `<div class="ci"><div class="shot">${art(p.art)}</div><div>
      <h4>${bd(p.name)}</h4><small>${carName(i.car)}</small>${i.install&&p.installPrice?`<small>+ התקנה בסדנה (${ils(p.installPrice)})</small>`:''}
      <div class="row"><span class="mono">${i.qty} × ${ils(p.price)}</span><button class="rm" type="button" data-rm="${idx}">הסרה</button></div></div></div>`; }).join('');
  foot.innerHTML = `<div class="tot"><span>סה״כ כולל מע״מ</span><span class="price">${ils(total)}</span></div>
    <span class="muted" style="font-size:13px">${total>=500?'ההזמנה זכאית למשלוח חינם.':'משלוח חינם מעל ₪500'}</span>
    <button class="btn btn-red" type="button" id="checkout" style="justify-content:center">מעבר לתשלום</button><div id="coMsg"></div>`;
}
function openCart(){ $('#drawer').classList.add('open'); $('#scrim').classList.add('open'); $('#drawer').setAttribute('aria-hidden','false'); setTimeout(()=>$('#closeCart').focus(),50); }
function closeCart(){ $('#drawer').classList.remove('open'); $('#scrim').classList.remove('open'); $('#drawer').setAttribute('aria-hidden','true'); }

/* ---------- events ---------- */
document.addEventListener('click', e=>{
  const t = e.target.closest('button, a'); if (!t) return;
  if (t.dataset.hometab){ state.homeTab=t.dataset.hometab; $$('[data-hometab]').forEach(b=>b.setAttribute('aria-selected', b===t)); $('#homeGrid').innerHTML=homeGrid(); }
  if (t.dataset.cat){ location.href = t.dataset.cat==='all' ? 'products.html' : 'category-'+t.dataset.cat+'.html'; }
  if (t.dataset.brand){ state.brand=t.dataset.brand; rerenderProducts(); }
  if ('clearcar' in t.dataset){ state.car='all'; save(); updateCarPill(); rerenderProducts(); }
  if ('reset' in t.dataset){ state.brand='all'; state.car='all'; save(); updateCarPill(); location.href='products.html'; }
  if ('goFinder' in t.dataset){ if (!$('#finder')) { location.href='index.html#finder'; return; } setTimeout(()=>{ const f=$('#finder'); if (f){ f.scrollIntoView({behavior:'smooth',block:'center'}); $('#fMake').focus({preventScroll:true}); } },60); }
  if (t.dataset.shot!==undefined){ const p=byId($('#buy').dataset.id); $('#mainShot').innerHTML=art(p.art,t.dataset.shot); $$('[data-shot]').forEach(b=>b.setAttribute('aria-pressed', b===t)); }
  if (t.dataset.ptab){ $$('[data-ptab]').forEach(b=>b.setAttribute('aria-selected', b===t)); $$('[data-panel]').forEach(p=>p.hidden = p.dataset.panel!==t.dataset.ptab); }
  if (t.dataset.q){ const i=$('#qtyIn'); i.value=Math.max(1,Math.min(9,(parseInt(i.value)||1)+parseInt(t.dataset.q))); }
  if (t.dataset.rm!==undefined){ cart.splice(+t.dataset.rm,1); save(); renderCart(); }
  if ('close' in t.dataset) closeCart();
  if (t.id==='checkout'){ $('#coMsg').innerHTML='<div class="note">זהו אתר הדגמה, ולכן התשלום אינו פעיל וההזמנה לא נשלחה. להזמנה אמיתית התקשרו לסדנה: <span class="mono ltr">03-6884836</span></div>'; }
});
$('#cartBtn').addEventListener('click', ()=>{ renderCart(); openCart(); });
$('#closeCart').addEventListener('click', closeCart);
$('#scrim').addEventListener('click', closeCart);
document.addEventListener('keydown', e=>{ if (e.key==='Escape') closeCart(); });
$('#menuBtn').addEventListener('click', ()=>{ const n=$('#mobileNav'); const o=n.classList.toggle('open'); $('#menuBtn').setAttribute('aria-expanded', o); });

document.addEventListener('change', e=>{
  const t=e.target;
  if (t.id==='fMake'){ $('#fModel').innerHTML=modelOptions(t.value); }
  if (t.id==='carSel'){ state.car=t.value; save(); updateCarPill(); rerenderProducts(); }
  if (t.id==='sortSel'){ state.sort=t.value; rerenderProducts(); }
  if (t.id==='fitSel'){ $('#fitErr').textContent=''; }
});
document.addEventListener('submit', e=>{
  e.preventDefault();
  const f=e.target;
  if (f.id==='finder'){ const v=$('#fModel').value; if (!v){ $('#fModel').focus(); return; } state.car=v; save(); updateCarPill(); state.brand='all'; location.href='products.html'; }
  if (f.id==='buy'){
    const car=$('#fitSel').value; if (!car){ $('#fitErr').textContent='בחרו רכב כדי לוודא שהחלק מתאים.'; $('#fitSel').focus(); return; }
    const p=byId(f.dataset.id); const qty=Math.max(1,Math.min(9,parseInt($('#qtyIn').value)||1)); const inst=$('#instSel').checked;
    const ex=cart.find(i=>i.id===p.id&&i.car===car&&i.install===inst); if (ex) ex.qty=Math.min(9,ex.qty+qty); else cart.push({id:p.id,car,qty,install:inst});
    save(); renderCart(); openCart();
  }
  if (f.id==='contactForm'){
    if (!$('#cName').value.trim() || !$('#cPhone').value.trim()){ $('#cErr').textContent='נא למלא שם וטלפון כדי שנוכל לחזור אליכם.'; return; }
    $('#cErr').textContent='';
    $('#cDone').innerHTML='<div class="note ok">הפרטים נקלטו בדף. זהו אתר הדגמה, ולכן הפנייה לא נשלחה בפועל. לתיאום מיידי: <span class="mono ltr">03-6884836</span></div>';
  }
});

$('#footCats').innerHTML = Object.entries(CATS).map(([k,c])=>`<li><a href="category-${k}.html">${c.name}</a></li>`).join('');
updateCarPill(); renderCart(); render();
