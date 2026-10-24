const INTRO = {"v": "assets/intro.mp4", "s": ["assets/intro-slide-1.jpg", "assets/intro-slide-2.jpg", "assets/intro-slide-3.jpg"]};
const IMG = {"a": "assets/art-a.jpg", "b": "assets/art-b.jpg", "c": "assets/art-c.jpg"};


/* ---------- Demo data (fictional creators & content; swap for a Supabase fetch layer later) ---------- */
const CATS=['Music','Fashion','Food','Art','Film','Design','Architecture','Lifestyle'];
const CRR=[
['amara','Amara Nwosu','Lagos','Nigeria','Fashion','Womenswear designer working with hand-dyed adire cloth and sharp tailoring.',152],
['kofi','Kofi Mensah','Accra','Ghana','Music','Producer layering live guitar loops over modular synthesizers.',38],
['zawadi','Zawadi Otieno','Nairobi','Kenya','Art','Photographer documenting rooms, windows and the light between them.',205],
['sanele','Sanele Dlamini','Johannesburg','South Africa','Architecture','Architect and furniture maker rethinking modernist housing blocks.',18],
['leila','Leila Benali','Marrakech','Morocco','Food','Cook and writer reworking family recipes around smoke and spice.',350],
['selam','Selam Tesfaye','Addis Ababa','Ethiopia','Film','Filmmaker making short, quiet stories about city nights.',270]
].map(a=>({type:'creator',id:a[0],n:a[1],t:a[1],city:a[2],co:a[3],cat:a[4],bio:a[5],h:a[6],sub:a[2]+', '+a[3]}));
const CR={};CRR.forEach(c=>CR[c.id]=c);
const IT=[
['indigo','Indigo Hours','Fashion','amara','Photo essay','A visual diary of dye pits and the tailors who turn cloth into silhouettes.',160],
['highlife','Highlife, Rewired','Music','kofi','Story','How one producer builds new dance tracks from old guitar lines.',45],
['rooms','The Light Between Rooms','Art','zawadi','Photo essay','Thirty quiet frames of afternoon light moving through ordinary homes.',215],
['concrete','Concrete Gardens','Architecture','sanele','Documentary','Residents and architects on giving modernist apartment blocks a second life.',25],
['saffron','Saffron and Smoke','Food','leila','Story','A cook’s notes on grilling, preserving and sharing food across generations.',10],
['dawn','Dawn Reel','Film','selam','Short film','A fictional night-bus driver crosses the city before sunrise.',280],
['stool','Modular Stool Series','Design','sanele','Project','A set of stackable stools cut from a single sheet of plywood.',60],
['sunday','Sunday Table','Lifestyle','leila','Story','Slow weekends, long tables and the rituals that hold a family together.',330],
['wax','Waxprint Remix','Fashion','amara','Project','Printed cotton recut into jackets, skirts and structured bags.',130],
['ferry','Night Ferry Sessions','Music','kofi','Short film','A fictional live set recorded on a harbour crossing after dark.',195],
['quay','Masks on the Waterfront','Architecture','sanele','Project','Concept art imagining a waterfront city whose towers carry carved mask patterns, lit by a great torch at dusk.',30,'a'],
['avenue','Silver Avenue at Night','Design','sanele','Project','Concept art of a pedestrian street under curving glass towers, with palms, passers-by and a lit screen overhead.',200,'b'],
['domes','Domes and Drone Lanes','Architecture','sanele','Project','Concept art of a city at dusk where patterned domes and thatched roofs sit beside glass towers and glowing roads.',20,'c']
].map(a=>({type:'item',id:a[0],t:a[1],cat:a[2],by:a[3],ty:a[4],d:a[5],h:a[6],img:a[7],co:CR[a[3]].co,sub:a[4]+', by '+CR[a[3]].n}));
const PL=[
['lagos','Lagos','Nigeria','Coastal','Nigeria’s largest city on the Atlantic coast, known for its music, film and fashion scenes.',150],
['accra','Accra','Ghana','Coastal','Ghana’s coastal capital, home to a busy community of musicians, designers and artists.',40],
['nairobi','Nairobi','Kenya','Creative cities','Kenya’s capital, with a growing scene of photographers, filmmakers and design studios.',205],
['marrakech','Marrakech','Morocco','Heritage','A historic city with a centuries-old medina, craft traditions and a lively contemporary design scene.',15],
['lalibela','Lalibela','Ethiopia','Heritage','A town in northern Ethiopia famous for its rock-hewn churches, a UNESCO World Heritage site.',30],
['capetown','Cape Town','South Africa','Coastal','A port city between mountain and ocean, with active design, food and art communities.',185]
].map(a=>({type:'place',id:a[0],t:a[1],co:a[2],cat:a[3],d:a[4],h:a[5],sub:a[2]+', '+a[3]}));
const ALL=[...IT,...PL,...CRR],REC={};ALL.forEach(r=>REC[r.type+':'+r.id]=r);
const STY=IT.filter(r=>r.ty!=='Project'),COUNTRIES=[...new Set(CRR.map(c=>c.co))].sort();


const $=s=>document.querySelector(s);
let store={saved:[],follow:[]};try{const savedState=JSON.parse(localStorage.getItem('ayera')||'{}');if(savedState&&typeof savedState==='object'&&!Array.isArray(savedState)){store.saved=Array.isArray(savedState.saved)?savedState.saved.filter(v=>typeof v==='string'):[];store.follow=Array.isArray(savedState.follow)?savedState.follow.filter(v=>typeof v==='string'):[]}}catch(e){/* Ignore corrupt or unavailable local storage. */}
const persist=()=>{try{localStorage.setItem('ayera',JSON.stringify(store))}catch(e){}};
const tg=(a,v)=>{const i=a.indexOf(v);i<0?a.push(v):a.splice(i,1)};
const fail=()=>{$('#load').hidden=false;$('#load').textContent='The 3D world is unavailable on this device. You can still explore the Africa map.';['#hint','#js','#nav','#zoom-controls'].forEach(s=>$(s).hidden=true);const worldButton=$('#world-mode');if(worldButton)worldButton.hidden=true;setTimeout(()=>{$('#load').hidden=true},2600)};
let booted=0,ended=0,okPlay=0;const rm0=matchMedia('(prefers-reduced-motion: reduce)').matches,ov=$('#intro'),iv=$('#iv'),tag=$('#itag');
function bootWorld(desc){if(booted)return;booted=1;window.__descent=desc;$('#load').hidden=false;setTimeout(()=>window.THREE?boot():fail(),30)}
function hideIntro(natural){if(ended)return;ended=1;ov.style.opacity=0;ov.style.pointerEvents='none';try{iv.pause()}catch(e){}bootWorld(!natural);setTimeout(()=>{ov.hidden=true},1700)}
function slides(){if(ended||okPlay)return;iv.hidden=true;const f=$('#ifb'),l=rm0?INTRO.s.slice(-1):INTRO.s;f.innerHTML=l.map((u,i)=>'<img alt="" src="'+u+'" style="animation-delay:'+(rm0?0:i*2.4)+'s'+(rm0?';animation:none;opacity:1':'')+'">').join('');f.hidden=false;
 if(rm0)setTimeout(()=>hideIntro(true),1500);else{setTimeout(()=>tag.classList.add('on'),(l.length-1)*2400);setTimeout(()=>hideIntro(true),l.length*2400+1200)}}
function replay(){if(!ended||!okPlay)return;ended=0;tag.classList.remove('on');ov.hidden=false;ov.style.pointerEvents='auto';void ov.offsetWidth;ov.style.opacity=1;iv.currentTime=0;iv.play().catch(()=>hideIntro(true))}
$('#skip').onclick=()=>hideIntro(false);$('#rp').onclick=replay;
if(rm0)slides();else{iv.src=INTRO.v;iv.onerror=slides;iv.onplaying=()=>{okPlay=1;$('#rp').hidden=false};
 iv.ontimeupdate=()=>{const d=iv.duration||7;if(!booted&&iv.currentTime>d*.55)bootWorld(false);if(iv.currentTime>d-2.8)tag.classList.add('on')};iv.onended=()=>hideIntro(true);
 const p=iv.play();if(p&&p.catch)p.catch(slides);setTimeout(()=>{if(!okPlay)slides()},3500)}
function boot(){
const T=THREE,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;let R;
try{R=new T.WebGLRenderer({antialias:true})}catch(e){return fail()}
R.setPixelRatio(Math.min(devicePixelRatio||1,1.5));R.setSize(innerWidth,innerHeight);R.xr.enabled=true;document.body.prepend(R.domElement);const cv=R.domElement;
const sc=new T.Scene(),cam=new T.PerspectiveCamera(65,innerWidth/innerHeight,.1,400),rig=new T.Group();rig.add(cam);cam.position.y=1.6;sc.add(rig);
let s=7;const rnd=()=>(s=(s*16807)%2147483647)/2147483647;
const mk=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.minFilter=T.LinearFilter;t.generateMipmaps=false;return t};
const rr=(x,a,b,w,h,r)=>{x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()};
const hsl=(h,s,l)=>new T.Color().setHSL(h/360,s,l);
/* sky, sun, water, island */
const sky=new T.Mesh(new T.SphereGeometry(180,32,16),new T.MeshBasicMaterial({map:mk(4,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);[[0,'#120e2a'],[.22,'#3d2150'],[.38,'#b4553f'],[.47,'#f2b56d'],[.5,'#f7c47e'],[.53,'#e09a58'],[1,'#7a4030']].forEach(a=>g.addColorStop(a[0],a[1]));x.fillStyle=g;x.fillRect(0,0,w,h)}),side:T.BackSide,fog:false,depthWrite:false}));sc.add(sky);
sc.fog=new T.Fog(0xd08a55,45,200);
sc.add(new T.HemisphereLight(0xffc99a,0x2a1a20,1));
const sun=new T.DirectionalLight(0xffb36b,1.2);sun.position.set(-30,25,-60);sc.add(sun);const fill=new T.DirectionalLight(0xffd7b0,.5);fill.position.set(10,20,40);sc.add(fill);
const sd=new T.Mesh(new T.SphereGeometry(10,24,16),new T.MeshBasicMaterial({color:0xffe0a8,fog:false}));sd.position.set(-45,14,-150);sc.add(sd);
const hl=new T.Mesh(new T.SphereGeometry(22,24,16),new T.MeshBasicMaterial({color:0xff9a4a,transparent:true,opacity:.22,depthWrite:false,fog:false}));hl.position.copy(sd.position);sc.add(hl);
const wm=new T.Mesh(new T.PlaneGeometry(800,800),new T.MeshStandardMaterial({color:0x1b2b33,roughness:.25,metalness:.55}));wm.rotation.x=-Math.PI/2;wm.position.y=-.2;sc.add(wm);
const gl=[];for(let i=0;i<22;i++){const t=60+i*4.5,m=new T.Mesh(new T.PlaneGeometry(1,1),new T.MeshBasicMaterial({color:0xffc477,transparent:true,opacity:.35,blending:T.AdditiveBlending,depthWrite:false,fog:false}));m.rotation.x=-Math.PI/2;m.position.set(-45*t/150+(rnd()-.5)*4,-.15,-t);m.userData.w=.6+rnd()*1.6+t*.02;m.scale.set(m.userData.w,.3+t*.004,1);sc.add(m);gl.push(m)}
const add=(g,c,x,y,z,o={})=>{const m=new T.Mesh(g,new T.MeshStandardMaterial(Object.assign({color:c,roughness:.85},o)));m.position.set(x,y,z);sc.add(m);return m};
add(new T.CylinderGeometry(54,57,1.2,56),0x4a3830,0,-.3,0);add(new T.CylinderGeometry(10,10.4,.3,48),0x6a5244,0,.3,0);
const D={culture:{c:[0,-36],f:[0,-1]},creators:{c:[36,0],f:[1,0]},stories:{c:[0,36],f:[0,1]},places:{c:[-36,0],f:[-1,0]}};
const near=[],far=[],L=(a,x,y,z)=>a.push(x,y,z);
for(const k in D){const d=D[k],[cx,cz]=d.c,[fx,fz]=d.f;add(new T.CylinderGeometry(12,12.4,.3,40),0x5a443a,cx,.3,cz);
 add(new T.BoxGeometry(fx?14:4,.12,fz?14:4),0x7a6252,fx*17,.34,fz*17);
 for(let i=0;i<24;i++){const a=i/24*6.283;L(near,cx+Math.cos(a)*12,.7,cz+Math.sin(a)*12)}
 for(let t=12;t<=24;t+=2.4){const rx=-fz,rz=fx;L(near,fx*t+rx*2.4,.8,fz*t+rz*2.4);L(near,fx*t-rx*2.4,.8,fz*t-rz*2.4)}}
for(let i=0;i<36;i++){const a=i/36*6.283;L(near,Math.cos(a)*10.2,.75,Math.sin(a)*10.2)}
/* distant skyline */
const bm=new T.MeshStandardMaterial({color:0x2d1d26,emissive:0x1a0d0e,roughness:.8});
for(let i=0;i<44;i++){const a=i/44*6.283+rnd()*.1,r=95+rnd()*35,w=3+rnd()*4,h=6+rnd()*20,bx=Math.cos(a)*r,bz=Math.sin(a)*r,b=new T.Mesh(new T.BoxGeometry(w,h,w),bm);b.position.set(bx,h/2-.2,bz);sc.add(b);
 const ux=-bx/r,uz=-bz/r;for(let k=0;k<12;k++){const o=(rnd()-.5)*(w-.6);L(far,bx+ux*(w/2+.05)-uz*o,.5+rnd()*(h-1),bz+uz*(w/2+.05)+ux*o)}}
/* city details: trees, huts and domes, glowing roads, bridge, far isle, birds */
const dm=new T.Object3D(),ok2=(x,z)=>{const r=Math.hypot(x,z);if(r<13||r>50)return false;for(const k in D){if(Math.hypot(x-D[k].c[0],z-D[k].c[1])<15)return false}return Math.abs(x)>4.5&&Math.abs(z)>4.5};
const TN=70,trk=new T.InstancedMesh(new T.CylinderGeometry(.12,.2,2,6),new T.MeshStandardMaterial({color:0x4a3326}),TN),can=new T.InstancedMesh(new T.SphereGeometry(1,10,6),new T.MeshStandardMaterial({color:0x35602c,emissive:0x0c1a08,roughness:.9}),TN);
let tn=0;for(let i=0;tn<TN&&i<1500;i++){const a=rnd()*6.283,r=14+rnd()*36,x=Math.cos(a)*r,z=Math.sin(a)*r;if(!ok2(x,z))continue;const h=1.8+rnd()*1.6,w=1.4+rnd()*1.2;
 dm.position.set(x,.3+h/2,z);dm.rotation.set(0,0,0);dm.scale.set(1,h/2,1);dm.updateMatrix();trk.setMatrixAt(tn,dm.matrix);
 dm.position.set(x,.3+h+.1,z);dm.scale.set(w,.4+rnd()*.15,w);dm.updateMatrix();can.setMatrixAt(tn,dm.matrix);tn++}
trk.count=can.count=tn;trk.frustumCulled=can.frustumCulled=false;sc.add(trk,can);
for(let k=0;k<4;k++){const a=Math.PI/4+k*Math.PI/2,x=Math.cos(a)*44,z=Math.sin(a)*44;
 add(new T.CylinderGeometry(1.1,1.6,5,10),0x6b5240,x,2.8,z);add(new T.SphereGeometry(2.4,12,8),0x35602c,x,6,z,{emissive:0x0c1a08}).scale.y=.5}
for(let k=0;k<4;k++){const a=Math.PI/4+k*Math.PI/2,x=Math.cos(a)*20,z=Math.sin(a)*20;
 add(new T.CylinderGeometry(.8,1.1,4.5,12),0x7a3a2a,x,2.6,z,{emissive:0x2a0f0a});add(new T.SphereGeometry(1.1,14,8,0,6.283,0,1.571),0x35d9e6,x,4.8,z,{emissive:0x0f6b73,roughness:.4});
 for(let m=0;m<6;m++)L(near,x+Math.cos(m)*.95,1+m*.6,z+Math.sin(m)*.95);
 [[16,a+.3],[16,a-.3],[25,a+.18]].forEach(([r,b])=>{const hx=Math.cos(b)*r,hz=Math.sin(b)*r;add(new T.CylinderGeometry(1.3,1.4,1.3,10),0x7a4a2e,hx,1.1,hz);add(new T.ConeGeometry(1.9,1.4,10),0x8a6a3a,hx,2.45,hz);L(near,hx*.93,1,hz*.93)})}
for(const k in D){const [fx,fz]=D[k].f;for(const sd of[-1,1])add(new T.BoxGeometry(fx?14:.12,.05,fz?14:.12),0x35d9e6,fx*17-fz*sd*2.1,.42,fz*17+fx*sd*2.1,{emissive:0x35d9e6,roughness:.3})}
const br=new T.Group();br.rotation.y=Math.atan2(.707,-.707);sc.add(br);br.updateMatrixWorld(true);
const dk=new T.MeshStandardMaterial({color:0x6a5244,roughness:.7}),rail=new T.MeshStandardMaterial({color:0x6a3a22,roughness:.5}),lv=new T.Vector3();
for(let i=0;i<16;i++){const t=(i+.5)/16,r=52+23*t,y=.35+4.2*Math.sin(Math.PI*t),sl=Math.atan(4.2*Math.PI/23*Math.cos(Math.PI*t)),s=new T.Mesh(new T.BoxGeometry(4,.35,1.6),dk);s.position.set(0,y,r);s.rotation.x=-sl;br.add(s);
 for(const sd of[-1,1]){const rl=new T.Mesh(new T.BoxGeometry(.12,.7,1.6),rail);rl.position.set(sd*1.95,y+.5,r);rl.rotation.x=-sl;br.add(rl);lv.set(sd*1.95,y+1,r);br.localToWorld(lv);L(near,lv.x,lv.y,lv.z);
  if(i%3===0){const p=new T.Mesh(new T.BoxGeometry(.6,y+.3,.6),rail);p.position.set(sd*1.6,(y-.3)/2,r);br.add(p)}}}
const ix=.707*84,iz=-.707*84;add(new T.CylinderGeometry(9.5,10.5,1.2,32),0x4a3830,ix,-.3,iz);
add(new T.SphereGeometry(3,20,10,0,6.283,0,1.571),0x35d9e6,ix,.3,iz,{emissive:0x0f6b73,roughness:.4});const gl2=new T.PointLight(0x35d9e6,1.2,30);gl2.position.set(ix,4,iz);sc.add(gl2);
for(let i=0;i<6;i++){const a=i/6*6.283+.4,x=ix+Math.cos(a)*7,z=iz+Math.sin(a)*7;add(new T.CylinderGeometry(.12,.2,2.4,6),0x4a3326,x,1.5,z);add(new T.SphereGeometry(1.5,10,6),0x35602c,x,2.9,z,{emissive:0x0c1a08}).scale.y=.4}
const bg=new T.BufferGeometry();bg.setAttribute('position',new T.Float32BufferAttribute([0,0,-.5,-.9,0,.3,0,0,.1,0,0,-.5,0,0,.1,.9,0,.3],3));
const BN=26,bi=new T.InstancedMesh(bg,new T.MeshBasicMaterial({color:0x1a0c10,side:T.DoubleSide}),BN);bi.frustumCulled=false;sc.add(bi);
const bd=[];for(let i=0;i<BN;i++)bd.push({a:rnd()*6.283,R:28+rnd()*45,w:(.05+rnd()*.07)*(rnd()<.5?-1:1),y:11+rnd()*18,p:rnd()*6,s:1+rnd()*.8});
const bu=t=>{bd.forEach((b,i)=>{const a=b.a+b.w*t,sg=Math.sign(b.w);dm.position.set(Math.cos(a)*b.R,b.y+Math.sin(t*.6+b.p)*1.5,Math.sin(a)*b.R);dm.rotation.set(0,Math.atan2(Math.sin(a)*sg,-Math.cos(a)*sg),Math.sin(t+b.p)*.25);dm.scale.set(b.s*(.55+.45*Math.abs(Math.sin(t*5+b.p))),1,b.s);dm.updateMatrix();bi.setMatrixAt(i,dm.matrix)});bi.instanceMatrix.needsUpdate=true};bu(0);
const pts=(a,sz)=>{const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(a,3));sc.add(new T.Points(g,new T.PointsMaterial({color:0xffc477,size:sz,transparent:true,opacity:.95})))};pts(near,.18);pts(far,.9);
/* labels */
const lab=(txt,sz=1,gold)=>{const t=mk(512,96,(x,w,h)=>{x.fillStyle=gold?'rgba(201,164,92,.92)':'rgba(10,14,12,.78)';rr(x,4,4,w-8,h-8,22);x.fill();x.strokeStyle='rgba(201,164,92,.8)';x.lineWidth=3;x.stroke();let f=40;x.font='600 '+f+'px Georgia,serif';while(x.measureText(txt).width>w-36&&f>20){f-=2;x.font='600 '+f+'px Georgia,serif'}x.fillStyle=gold?'#1a1206':'#f4efe4';x.textAlign='center';x.textBaseline='middle';x.fillText(txt,w/2,h/2+2)});const p=new T.Sprite(new T.SpriteMaterial({map:t,depthWrite:false,fog:false}));p.scale.set(3.6*sz,.675*sz,1);return p};
const hits=[],spin=[];
/* plaza: carved towers that travel to districts */
const paint=(x,w,h)=>{x.fillStyle='#efe6d4';x.fillRect(0,0,w,h);x.fillStyle='#7a4528';x.fillRect(0,0,14,h);x.fillRect(w-14,0,14,h);x.fillStyle='#c98a3c';for(let y=0;y<h;y+=16){x.fillRect(3,y+2,8,8);x.fillRect(w-11,y+2,8,8)}x.fillStyle='#7a4528';for(let y=40;y<h;y+=96)x.fillRect(14,y,w-28,5);
 x.fillStyle='#8a4a26';x.beginPath();x.ellipse(64,250,30,62,0,0,7);x.fill();x.fillStyle='#2e170c';x.beginPath();x.ellipse(52,234,6,10,0,0,7);x.fill();x.beginPath();x.ellipse(76,234,6,10,0,0,7);x.fill();x.fillRect(60,258,8,36);x.strokeStyle='#d9a45c';x.lineWidth=3;x.beginPath();x.ellipse(64,250,38,70,0,0,7);x.stroke()};
const tm=new T.MeshStandardMaterial({map:mk(128,512,paint),roughness:.6,emissive:0x2a1608}),bz=new T.MeshStandardMaterial({color:0x6a3a22,roughness:.5}),bands=[];
[['culture',0,-9],['creators',9,0],['stories',0,9],['places',-9,0]].forEach(([n,x,z])=>{const h=8,w=2.4;
 const ad=(g,m,y)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);o.userData.travel=n;sc.add(o);hits.push(o);return o};
 ad(new T.BoxGeometry(w,h,w),tm,.45+h/2);ad(new T.BoxGeometry(w+.3,.35,w+.3),bz,.45+h+.17);
 const bt=new T.MeshBasicMaterial({color:0xf0b24a});bands.push(bt);ad(new T.BoxGeometry(w+.34,.16,w+.34),bt,.45+h-.45);
 spin.push(ad(new T.OctahedronGeometry(.32),new T.MeshBasicMaterial({color:0xffd27a}),.45+h+.9));
 const l=lab(n[0].toUpperCase()+n.slice(1),.9,1);l.position.set(x,.45+h+2.2,z);sc.add(l)});
const cm=new T.MeshStandardMaterial({color:0x7a4528,roughness:.5}),tgp=new T.Group();tgp.position.y=.45;sc.add(tgp);
[[new T.CylinderGeometry(.5,.8,3.2,10),1.6],[new T.CylinderGeometry(1.4,.8,.4,16),3.4]].forEach(([g,y])=>{const m=new T.Mesh(g,cm);m.position.y=y;tgp.add(m)});
const fl=new T.Mesh(new T.ConeGeometry(.9,2.4,10),new T.MeshBasicMaterial({color:0xff8a2a,transparent:true,opacity:.92}));fl.position.y=4.8;tgp.add(fl);
const fi=new T.Mesh(new T.ConeGeometry(.5,1.4,10),new T.MeshBasicMaterial({color:0xffd27a}));fi.position.y=4.5;tgp.add(fi);
const fire=new T.PointLight(0xff9a40,2,40);fire.position.set(0,5.4,0);sc.add(fire);
/* the intro video, playing on a screen above the plaza */
let vscreen=null;
{const sv=document.createElement('video');sv.muted=true;sv.loop=true;sv.setAttribute('playsinline','');sv.src=INTRO.v;const vt=new T.VideoTexture(sv);vt.minFilter=T.LinearFilter;vt.generateMipmaps=false;
 const g=new T.Group();g.position.set(0,14,0);g.visible=false;sc.add(g);g.add(new T.Mesh(new T.BoxGeometry(6.4,11.2,.25),bz));
 const vm=new T.MeshBasicMaterial({map:vt,fog:false}),a=new T.Mesh(new T.PlaneGeometry(5.6,9.96),vm),b=new T.Mesh(new T.PlaneGeometry(5.6,9.96),vm);a.position.z=.14;b.position.z=-.14;b.rotation.y=Math.PI;g.add(a,b);
 sv.onplaying=()=>{g.visible=true};sv.onerror=()=>{g.visible=false};sv.play().catch(()=>{});addEventListener('pointerdown',()=>{if(sv.paused)sv.play().catch(()=>{})});vscreen=g}
/* district exhibits */
const arc=(d,n,R0,i)=>{const [cx,cz]=d.c,[fx,fz]=d.f,rx=-fz,rz=fx,a=(n>1?-70+140*i/(n-1):0)*Math.PI/180;return [cx+R0*(Math.cos(a)*fx+Math.sin(a)*rx),cz+R0*(Math.cos(a)*fz+Math.sin(a)*rz)]};
const view=d=>new T.Vector3(d.c[0]-d.f[0]*12,0,d.c[1]-d.f[1]*12);
const mesh=(g,m,x,y,z,ud)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);Object.assign(o.userData,ud);sc.add(o);hits.push(o);return o};
const gemG=new T.IcosahedronGeometry(.45),baseG=new T.CylinderGeometry(.55,.7,.9,12),stone=new T.MeshStandardMaterial({color:0x4a3430,roughness:.8});
const caption=(t,x,y,z)=>{const l=lab(t,.8);l.position.set(x,y,z);sc.add(l)};
for(const k in D){const d=D[k],[cx,cz]=d.c,px_=cx-d.f[0]*9,pz_=cz-d.f[1]*9;
 const pad=new T.Mesh(new T.CylinderGeometry(1.1,1.1,.12,24),new T.MeshBasicMaterial({color:0xf0b24a}));pad.position.set(px_,.5,pz_);pad.userData.travel='plaza';sc.add(pad);hits.push(pad);caption('Back to plaza',px_,1.8,pz_)}
const dC=D.culture;CATS.forEach((cat,i)=>{const [x,z]=arc(dC,8,9,i),h=(i*43+20)%360;
 const b=new T.Mesh(baseG,stone);b.position.set(x,.9,z);sc.add(b);
 const g=mesh(gemG,new T.MeshStandardMaterial({color:hsl(h,.6,.5),emissive:hsl(h,.6,.22)}),x,2.1,z,{cat});g.userData.by=2.1;spin.push(g);caption(cat,x,3.2,z)});
const dE=D.creators;CRR.forEach((c,i)=>{const [x,z]=arc(dE,6,9,i),m=new T.MeshStandardMaterial({color:hsl(c.h,.55,.45),emissive:hsl(c.h,.5,.15)});
 const b=new T.Mesh(new T.CylinderGeometry(1,1.1,.3,20),stone);b.position.set(x,.6,z);sc.add(b);
 mesh(new T.CylinderGeometry(.35,.5,1.5,14),m,x,1.5,z,{rec:c});mesh(new T.SphereGeometry(.32,16,12),m,x,2.55,z,{rec:c});
 const r=new T.Mesh(new T.TorusGeometry(.8,.04,8,28),new T.MeshBasicMaterial({color:0xc9a45c}));r.rotation.x=Math.PI/2;r.position.set(x,.8,z);sc.add(r);caption(c.n,x,3.4,z)});
const dS=D.stories,vS=view(dS),tl=new T.TextureLoader();
['quay','avenue','domes','dawn','indigo','rooms','concrete','ferry'].forEach((id,i)=>{const r=REC['item:'+id],[x,z]=arc(dS,8,10,i),g=new T.Group();g.position.set(x,2.4,z);sc.add(g);
 const tex=r.img&&IMG[r.img]?tl.load(IMG[r.img]):mk(300,200,(c,w,h)=>{const gr=c.createLinearGradient(0,0,w,h);gr.addColorStop(0,'hsl('+r.h+',50%,28%)');gr.addColorStop(1,'hsl('+(r.h+50)%360+',45%,8%)');c.fillStyle=gr;c.fillRect(0,0,w,h);c.fillStyle='#f4efe4';c.font='600 26px Georgia,serif';c.textAlign='center';c.textBaseline='middle';c.fillText(r.t,w/2,h/2)});
 const bk=new T.Mesh(new T.BoxGeometry(3.3,2.3,.12),bz);g.add(bk);const fr=new T.Mesh(new T.PlaneGeometry(3,2),new T.MeshBasicMaterial({map:tex}));fr.position.z=.07;g.add(fr);
 const po=new T.Mesh(new T.CylinderGeometry(.07,.07,1.6,8),bz);po.position.y=-1.9;g.add(po);
 [bk,fr].forEach(o=>{o.userData.rec=r;hits.push(o)});g.lookAt(vS.x,2.4,vS.z);caption(r.t,x,4.2,z)});
const dP=D.places;PL.forEach((p,i)=>{const [x,z]=arc(dP,6,9,i),m=new T.MeshStandardMaterial({color:hsl(p.h,.45,.38),emissive:hsl(p.h,.5,.12),roughness:.7});
 mesh(new T.CylinderGeometry(.25,.7,3.2,4),m,x,2.05,z,{rec:p});const c=mesh(new T.OctahedronGeometry(.32),new T.MeshBasicMaterial({color:0xffd27a}),x,4,z,{rec:p});spin.push(c);caption(p.t,x,5,z)});
/* panel inside the world */
const pc=document.createElement('canvas'),px=pc.getContext('2d'),pt=new T.CanvasTexture(pc);pt.minFilter=T.LinearFilter;pt.generateMipmaps=false;
const pm=new T.Mesh(new T.PlaneGeometry(1,1),new T.MeshBasicMaterial({map:pt,transparent:true,depthTest:false,fog:false}));pm.renderOrder=99;pm.visible=false;pm.position.z=-2.2;cam.add(pm);
let P=null,PW=0,PH=0;
const wrap=(t,x0,y,mw,lh)=>{(t||'').split('\n').forEach(par=>{let line='';par.split(' ').forEach(wd=>{const q=line?line+' '+wd:wd;if(px.measureText(q).width>mw&&line){px.fillText(line,x0,y);y+=lh;line=wd}else line=q});px.fillText(line,x0,y);y+=lh});return y};
function drawP(){const x=px,pad=40;x.clearRect(0,0,PW,PH);x.fillStyle='rgba(12,16,14,.95)';rr(x,2,2,PW-4,PH-4,28);x.fill();x.strokeStyle='#c9a45c';x.lineWidth=3;x.stroke();x.textAlign='left';x.textBaseline='alphabetic';
 let y=pad+46;x.fillStyle='#f4efe4';x.font='600 46px Georgia,serif';y=wrap(P.t,pad,y,PW-pad*2,52);
 x.fillStyle='#c9a45c';x.font='28px system-ui,sans-serif';y=wrap(P.s,pad,y+2,PW-pad*2,36);
 x.fillStyle='#e9e2d2';x.font='30px system-ui,sans-serif';y=wrap(P.b,pad,y+16,PW-pad*2,40);
 x.fillStyle='#97a39c';x.font='24px system-ui,sans-serif';wrap(P.n,pad,y+12,PW-pad*2,30);
 const bw=(PW-pad*2-20*(P.btn.length-1))/P.btn.length;
 P.btn.forEach((b,i)=>{b.r=[pad+i*(bw+20),PH-pad-84,bw,84];const r=b.r;x.fillStyle=b.pri?'#1fae7a':'#161d1a';rr(x,r[0],r[1],r[2],r[3],16);x.fill();x.strokeStyle=b.pri?'#1fae7a':'#c9a45c';x.lineWidth=2;x.stroke();x.fillStyle=b.pri?'#04120c':'#f4efe4';x.font='600 32px system-ui,sans-serif';x.textAlign='center';x.fillText(b.l(),r[0]+r[2]/2,r[1]+54)});
 pt.needsUpdate=true}
function layout(){const asp=R.xr.isPresenting?1.6:innerWidth/innerHeight,vh=2*2.2*Math.tan(cam.fov*Math.PI/360),vw=vh*asp,por=asp<.9,nw=por?720:1024,nh=por?960:640;
 if(nw!==PW||nh!==PH){PW=nw;PH=nh;pc.width=PW;pc.height=PH}let h=vh*.74,w=h*PW/PH;if(w>vw*.94){w=vw*.94;h=w*PH/PW}pm.scale.set(w,h,1);if(P)drawP()}
const closeP=()=>{P=null;pm.visible=false},openP=p=>{P=p;pm.visible=true;layout()},CL={l:()=>'Close',fn:closeP};
const recPanel=r=>{if(r.type==='creator')return{t:r.n,s:r.city+', '+r.co+' · '+r.cat,b:r.bio,n:'Demonstration profile: this creator is fictional.',btn:[{pri:1,l:()=>store.follow.includes(r.id)?'Following':'Follow',fn:()=>{tg(store.follow,r.id);persist();drawP()}},CL]};
 const k=r.type+':'+r.id,it=r.type==='item';return{t:r.t,s:it?r.ty+' · '+r.cat+' · by '+CR[r.by].n:r.co+' · '+r.cat,b:r.d,n:it?(r.img?'Demonstration concept art imagining a city. It is not a real place.':'Demonstration content. No media is attached yet.'):'General overview only. No listings, addresses or opening hours.',btn:[{pri:1,l:()=>store.saved.includes(k)?'Saved. Tap to remove':'Save',fn:()=>{tg(store.saved,k);persist();drawP()}},CL]}};
const catPanel=c=>({t:c,s:'Culture',b:IT.filter(i=>i.cat===c).map(i=>'• '+i.t+', by '+CR[i.by].n).join('\n')||'Nothing here yet.',n:'Demonstration works. Visit Stories to see the pieces.',btn:[CL]});
const savedPanel=()=>{const a=store.saved.map(k=>REC[k]).filter(Boolean);return{t:'Saved discoveries',s:a.length+' saved on this device',b:a.length?a.map(r=>'• '+r.t).join('\n'):'Nothing saved yet. Open a story or place and tap Save.',n:'Saved items stay in this browser. Clearing site data removes them.',btn:[CL]}};
/* movement, travel, input */
const SP={plaza:{p:[0,6],y:0},culture:{p:[0,-24],y:0},creators:{p:[24,0],y:-Math.PI/2},stories:{p:[0,24],y:Math.PI},places:{p:[-24,0],y:Math.PI/2}},CEN={plaza:[0,0],culture:[0,-36],creators:[36,0],stories:[0,36],places:[-36,0]};
let yaw=0,pitch=0,tw=null,cur='';rig.position.set(0,.4,6);
if(!rm&&window.__descent!==false){rig.position.set(0,80,44);pitch=-1.15;tw={t:0,d:5,a:rig.position.clone(),b:new T.Vector3(0,.4,6),y0:0,y1:0,p0:-1.15,p1:0}}
const setNav=k=>{if(k===cur)return;cur=k;document.querySelectorAll('#nav button').forEach(b=>b.setAttribute('aria-current',b.dataset.go===k))};
function travel(k){closeP();const s=SP[k];if(rm){pitch=0;rig.position.set(s.p[0],.4,s.p[1]);yaw=s.y;return}
 const dy=((s.y-yaw+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;tw={t:0,a:rig.position.clone(),b:new T.Vector3(s.p[0],.4,s.p[1]),y0:yaw,y1:yaw+dy,p0:pitch,p1:0}}
document.querySelectorAll('#nav button').forEach(b=>b.onclick=()=>travel(b.dataset.go));$('#sv').onclick=()=>openP(savedPanel());
const rc=new T.Raycaster(),v2=new T.Vector2();
function tap(){if(pm.visible){const h=rc.intersectObject(pm)[0];if(h){const u=h.uv.x*PW,v=(1-h.uv.y)*PH,b=P.btn.find(b=>u>=b.r[0]&&u<=b.r[0]+b.r[2]&&v>=b.r[1]&&v<=b.r[1]+b.r[3]);if(b)b.fn();return}}
 const h=rc.intersectObjects(hits)[0];if(!h)return;const d=h.object.userData;if(d.travel)travel(d.travel);else if(d.cat)openP(catPanel(d.cat));else if(d.rec)openP(recPanel(d.rec))}
let pid=null,lx=0,ly=0,moved=0;
const activePointers=new Map();let pinchActive=false,pinchStartDistance=0,pinchStartFov=cam.fov;
const pointerDistance=()=>{const pts=[...activePointers.values()];return pts.length<2?0:Math.hypot(pts[0].x-pts[1].x,pts[0].y-pts[1].y)};
const applyZoom=fov=>{cam.fov=Math.max(35,Math.min(80,fov));cam.updateProjectionMatrix();const label=$('#zoom-level');if(label)label.textContent=Math.round(65/cam.fov*100)+'%'};
const zoomBy=amount=>applyZoom(cam.fov+amount);
$('#zoom-in').onclick=()=>zoomBy(-5);$('#zoom-out').onclick=()=>zoomBy(5);$('#zoom-reset').onclick=()=>applyZoom(65);
cv.addEventListener('wheel',e=>{if(R.xr.isPresenting)return;e.preventDefault();zoomBy(e.deltaY>0?2.5:-2.5)},{passive:false});
cv.onpointerdown=e=>{activePointers.set(e.pointerId,{x:e.clientX,y:e.clientY});try{cv.setPointerCapture(e.pointerId)}catch(x){}
 if(activePointers.size>=2){pinchActive=true;pid=null;pinchStartDistance=Math.max(1,pointerDistance());pinchStartFov=cam.fov;moved=10;return}
 pid=e.pointerId;lx=e.clientX;ly=e.clientY;moved=0};
cv.onpointermove=e=>{if(!activePointers.has(e.pointerId))return;activePointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
 if(pinchActive&&activePointers.size>=2){const distance=Math.max(1,pointerDistance());applyZoom(pinchStartFov*pinchStartDistance/distance);return}
 if(e.pointerId!==pid)return;const dx=e.clientX-lx,dy=e.clientY-ly;lx=e.clientX;ly=e.clientY;moved+=Math.abs(dx)+Math.abs(dy);if(!R.xr.isPresenting&&!tw){yaw-=dx*.005;pitch=Math.max(-1.2,Math.min(1.2,pitch-dy*.004))}};
cv.onpointerup=e=>{const wasPointer=activePointers.has(e.pointerId);activePointers.delete(e.pointerId);if(pinchActive){if(activePointers.size<2){pinchActive=false;pid=null}return}if(e.pointerId!==pid||!wasPointer)return;pid=null;if(moved<10){v2.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);rc.setFromCamera(v2,cam);tap()}};
cv.onpointercancel=e=>{activePointers.delete(e.pointerId);pid=null;if(activePointers.size<2)pinchActive=false};
addEventListener('keydown',e=>{if(e.key==='+'||e.key==='=')zoomBy(-3);if(e.key==='-'||e.key==='_')zoomBy(3);if(e.key==='0')applyZoom(65)});
const keys={};addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=1;if(e.key==='Escape')closeP()});addEventListener('keyup',e=>{delete keys[e.key.toLowerCase()]});
const js=$('#js'),kn=$('#kn');let jv=[0,0],jid=null;
const jm=e=>{const r=js.getBoundingClientRect();let x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;const m=Math.hypot(x,y),mx=44;if(m>mx){x*=mx/m;y*=mx/m}kn.style.transform='translate('+x+'px,'+y+'px)';jv=[x/mx,y/mx]};
js.onpointerdown=e=>{jid=e.pointerId;js.setPointerCapture(jid);jm(e)};js.onpointermove=e=>{if(e.pointerId===jid)jm(e)};js.onpointerup=js.onpointercancel=e=>{if(e.pointerId===jid){jid=null;jv=[0,0];kn.style.transform=''}};
/* VR */
for(let i=0;i<2;i++){const c=R.xr.getController(i);c.addEventListener('select',()=>{const m=new T.Matrix4().extractRotation(c.matrixWorld);rc.ray.origin.setFromMatrixPosition(c.matrixWorld);rc.ray.direction.set(0,0,-1).applyMatrix4(m);tap()});
 c.add(new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(),new T.Vector3(0,0,-4)]),new T.LineBasicMaterial({color:0xc9a45c})));rig.add(c)}
if(navigator.xr&&navigator.xr.isSessionSupported)navigator.xr.isSessionSupported('immersive-vr').then(ok=>{if(ok)$('#vr').hidden=false}).catch(()=>{});
$('#vr').onclick=async()=>{try{R.xr.setSession(await navigator.xr.requestSession('immersive-vr',{optionalFeatures:['local-floor']}));layout()}catch(e){$('#hint').style.opacity=1;$('#hint').textContent='VR could not start on this device.'}};
/* other visitors, live through the room capability */
const peersMap=new Map(),avG=[new T.CylinderGeometry(.3,.42,1.4,12),new T.SphereGeometry(.28,14,10),new T.BoxGeometry(.3,.08,.12)],visorM=new T.MeshBasicMaterial({color:0xf0b24a}),vc=$('#vc'),myHue=Math.floor(Math.random()*360);
let room=null,lastSend=0,lastSent='';
function mkAvatar(p){const g=new T.Group(),h=Number.isFinite(p.presence.h)?p.presence.h:200,m=new T.MeshStandardMaterial({color:hsl(h,.6,.5),emissive:hsl(h,.5,.18)});
 const b=new T.Mesh(avG[0],m);b.position.y=.75;const hd=new T.Mesh(avG[1],m);hd.position.y=1.7;const v=new T.Mesh(avG[2],visorM);v.position.set(0,1.72,-.27);g.add(b,hd,v);
 const l=lab('Visitor '+p.peer.slice(-3).toUpperCase(),.7);l.position.y=2.5;g.add(l);sc.add(g);return{g,l,init:0}}
const num=v=>typeof v==='number'&&isFinite(v),cl70=v=>Math.max(-70,Math.min(70,v));
function avUpdate(dt){peersMap.forEach(a=>{if(!a.init)return;const k=Math.min(1,dt*8);a.g.position.x+=(a.tx-a.g.position.x)*k;a.g.position.z+=(a.tz-a.g.position.z)*k;a.g.position.y=.4;const d=((a.tw-a.g.rotation.y+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;a.g.rotation.y+=d*k});
 const now=performance.now();if(room&&now-lastSend>100){lastSend=now;const x=+rig.position.x.toFixed(1),z=+rig.position.z.toFixed(1),w=+yaw.toFixed(2),key=x+','+z+','+w;if(key!==lastSent){lastSent=key;room.presence({h:myHue,x,z,w})}}}
if(window.claude&&claude.use)claude.use('room').then(r=>{if(!r)return;room=r;room.presence({h:myHue,x:rig.position.x,z:rig.position.z,w:yaw});
 room.onPeers(ch=>{const live=new Set();ch.peers.forEach(p=>{if(p.isMe)return;live.add(p.peer);let a=peersMap.get(p.peer);if(!a){a=mkAvatar(p);peersMap.set(p.peer,a)}const q=p.presence;
  if(num(q.x)&&num(q.z)){a.tx=cl70(q.x);a.tz=cl70(q.z);a.tw=num(q.w)?q.w:0;if(!a.init){a.g.position.set(a.tx,.4,a.tz);a.init=1}a.g.visible=true}else a.g.visible=false});
  peersMap.forEach((a,k)=>{if(!live.has(k)){sc.remove(a.g);a.l.material.map.dispose();a.l.material.dispose();peersMap.delete(k)}});
  vc.hidden=false;vc.textContent=peersMap.size?peersMap.size+' here':'Just you'})}).catch(()=>{});
/* loop */
const clock=new T.Clock();let first=1;
function update(dt,t){avUpdate(dt);
 if(tw){tw.t+=dt/(tw.d||1.4);const k=Math.min(1,tw.t),e=k*k*(3-2*k);rig.position.lerpVectors(tw.a,tw.b,e);yaw=tw.y0+(tw.y1-tw.y0)*e;pitch=tw.p0+(tw.p1-tw.p0)*e;if(tw.t>=1)tw=null}
 else{const mx=jv[0]+(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0),mz=jv[1]+(keys.s||keys.arrowdown?1:0)-(keys.w||keys.arrowup?1:0);
  if(mx||mz){const sp=4*dt,c=Math.cos(yaw),sn=Math.sin(yaw);rig.position.x+=(mx*c+mz*sn)*sp;rig.position.z+=(-mx*sn+mz*c)*sp;const r=Math.hypot(rig.position.x,rig.position.z);if(r>50){rig.position.x*=50/r;rig.position.z*=50/r}}}
 rig.rotation.y=yaw;if(!R.xr.isPresenting)cam.rotation.x=pitch;sky.position.set(rig.position.x,0,rig.position.z);
 let best='plaza',bd=1e9;for(const k in CEN){const d=Math.hypot(rig.position.x-CEN[k][0],rig.position.z-CEN[k][1]);if(d<bd){bd=d;best=k}}setNav(best);
 if(!rm){bu(t);if(vscreen){vscreen.rotation.y=t*.12;vscreen.position.y=14+Math.sin(t*.5)*.4}spin.forEach((m,i)=>{m.rotation.y=t*1.2;if(m.userData.by)m.position.y=m.userData.by+Math.sin(t*1.5+i)*.12});bands.forEach((b,i)=>b.color.setHSL(.11,.8,.5+.1*Math.sin(t*2+i)));
  fl.scale.y=1+.12*Math.sin(t*9)+.06*Math.sin(t*17);fire.intensity=2+.5*Math.sin(t*11);gl.forEach((m,i)=>m.scale.x=m.userData.w*(1+.25*Math.sin(t*1.5+i)))}}
R.setAnimationLoop(()=>{update(Math.min(.05,clock.getDelta()),clock.elapsedTime);R.render(sc,cam);if(first){first=0;$('#load').style.opacity=0;setTimeout(()=>$('#load').remove(),600)}});
addEventListener('resize',()=>{R.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();layout()});
layout();
setTimeout(()=>{$('#hint').textContent='Drag to look. Walk with the stick or W A S D. Tap glowing objects.'},5200);setTimeout(()=>{$('#hint').style.opacity=0},13000);
}

