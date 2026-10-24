/* AYÉRA geographic exploration. Country coverage + curated city/place content. */
(() => {
  'use strict';

  const countries = [
    ['Algeria','North Africa',28.0339,1.6596,'Algiers'],['Angola','Central Africa',-11.2027,17.8739,'Luanda'],['Benin','West Africa',9.3077,2.3158,'Cotonou'],['Botswana','Southern Africa',-22.3285,24.6849,'Gaborone'],['Burkina Faso','West Africa',12.2383,-1.5616,'Ouagadougou'],['Burundi','East Africa',-3.3731,29.9189,'Gitega'],['Cabo Verde','West Africa',15.1201,-23.6052,'Praia'],['Cameroon','Central Africa',7.3697,12.3547,'Yaoundé'],['Central African Republic','Central Africa',6.6111,20.9394,'Bangui'],['Chad','Central Africa',15.4542,18.7322,'N’Djamena'],['Comoros','East Africa',-11.6455,43.3333,'Moroni'],['Democratic Republic of the Congo','Central Africa',-4.0383,21.7587,'Kinshasa'],['Republic of the Congo','Central Africa',-0.2280,15.8277,'Brazzaville'],['Côte d’Ivoire','West Africa',7.5400,-5.5471,'Abidjan'],['Djibouti','East Africa',11.8251,42.5903,'Djibouti'],['Egypt','North Africa',26.8206,30.8025,'Cairo'],['Equatorial Guinea','Central Africa',1.6508,10.2679,'Malabo'],['Eritrea','East Africa',15.1794,39.7823,'Asmara'],['Eswatini','Southern Africa',-26.5225,31.4659,'Mbabane'],['Ethiopia','East Africa',9.1450,40.4897,'Addis Ababa'],['Gabon','Central Africa',-0.8037,11.6094,'Libreville'],['The Gambia','West Africa',13.4432,-15.3101,'Banjul'],['Ghana','West Africa',7.9465,-1.0232,'Accra'],['Guinea','West Africa',9.9456,-9.6966,'Conakry'],['Guinea-Bissau','West Africa',11.8037,-15.1804,'Bissau'],['Kenya','East Africa',-0.0236,37.9062,'Nairobi'],['Lesotho','Southern Africa',-29.6099,28.2336,'Maseru'],['Liberia','West Africa',6.4281,-9.4295,'Monrovia'],['Libya','North Africa',26.3351,17.2283,'Tripoli'],['Madagascar','East Africa',-18.7669,46.8691,'Antananarivo'],['Malawi','East Africa',-13.2543,34.3015,'Lilongwe'],['Mali','West Africa',17.5707,-3.9962,'Bamako'],['Mauritania','West Africa',21.0079,-10.9408,'Nouakchott'],['Mauritius','East Africa',-20.3484,57.5522,'Port Louis'],['Morocco','North Africa',31.7917,-7.0926,'Rabat'],['Mozambique','Southern Africa',-18.6657,35.5296,'Maputo'],['Namibia','Southern Africa',-22.9576,18.4904,'Windhoek'],['Niger','West Africa',17.6078,8.0817,'Niamey'],['Nigeria','West Africa',9.0820,8.6753,'Abuja'],['Rwanda','East Africa',-1.9403,29.8739,'Kigali'],['São Tomé and Príncipe','Central Africa',0.1864,6.6131,'São Tomé'],['Senegal','West Africa',14.4974,-14.4524,'Dakar'],['Seychelles','East Africa',-4.6796,55.4920,'Victoria'],['Sierra Leone','West Africa',8.4606,-11.7799,'Freetown'],['Somalia','East Africa',5.1521,46.1996,'Mogadishu'],['South Africa','Southern Africa',-30.5595,22.9375,'Pretoria'],['South Sudan','East Africa',6.8770,31.3070,'Juba'],['Sudan','North Africa',12.8628,30.2176,'Khartoum'],['Tanzania','East Africa',-6.3690,34.8888,'Dodoma'],['Togo','West Africa',8.6195,0.8248,'Lomé'],['Tunisia','North Africa',33.8869,9.5375,'Tunis'],['Uganda','East Africa',1.3733,32.2903,'Kampala'],['Zambia','Southern Africa',-13.1339,27.8493,'Lusaka'],['Zimbabwe','Southern Africa',-19.0154,29.1549,'Harare']
  ].map(([name, region, lat, lng, capital]) => ({ id: `country-${name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`, name, region, coords:[lat,lng], capital, type:'country', description:`Explore ${name}: its places, communities, cultural traditions and creative life across ${region}.` }));

  const places = [
    {id:'lagos',name:'Lagos',country:'Nigeria',region:'West Africa',coords:[6.5244,3.3792],description:'A coastal creative capital known for music, film, fashion and a restless energy.',kind:'City', discoveries:['Victoria Island','Lagos Island','Lekki']},
    {id:'abuja',name:'Abuja',country:'Nigeria',region:'West Africa',coords:[9.0765,7.3986],description:'Nigeria’s planned capital, set among rolling hills and a growing cultural scene.',kind:'City',discoveries:['Central Area','Jabi','Wuse']},
    {id:'accra',name:'Accra',country:'Ghana',region:'West Africa',coords:[5.6037,-0.1870],description:'A coastal capital with a vibrant community of musicians, designers and artists.',kind:'City',discoveries:['Osu','Jamestown','Labadi']},
    {id:'kumasi',name:'Kumasi',country:'Ghana',region:'West Africa',coords:[6.6885,-1.6244],description:'A historic Ashanti city with living craft, market and cultural traditions.',kind:'City',discoveries:['Kejetia Market','Manhyia','Adum']},
    {id:'nairobi',name:'Nairobi',country:'Kenya',region:'East Africa',coords:[-1.2921,36.8219],description:'A creative hub for photography, film, design and contemporary culture.',kind:'City',discoveries:['Westlands','Kibera','Karen']},
    {id:'mombasa',name:'Mombasa',country:'Kenya',region:'East Africa',coords:[-4.0435,39.6682],description:'An Indian Ocean port shaped by Swahili heritage and centuries of exchange.',kind:'City',discoveries:['Old Town','Nyali','Likoni']},
    {id:'marrakech',name:'Marrakech',country:'Morocco',region:'North Africa',coords:[31.6295,-7.9811],description:'A historic city where craft traditions meet contemporary design.',kind:'City',discoveries:['Medina','Gueliz','Jemaa el-Fnaa']},
    {id:'rabat',name:'Rabat',country:'Morocco',region:'North Africa',coords:[34.0209,-6.8416],description:'A coastal capital with historic quarters, gardens and contemporary cultural spaces.',kind:'City',discoveries:['Kasbah of the Udayas','Hassan','Agdal']},
    {id:'lalibela',name:'Lalibela',country:'Ethiopia',region:'East Africa',coords:[12.0319,39.0473],description:'A highland town known for its remarkable rock-hewn churches and heritage.',kind:'Place',discoveries:['Rock-hewn churches','Old town']},
    {id:'addis-ababa',name:'Addis Ababa',country:'Ethiopia',region:'East Africa',coords:[8.9806,38.7578],description:'A highland capital with museums, music, coffee culture and a dynamic arts scene.',kind:'City',discoveries:['Piazza','Bole','Merkato']},
    {id:'cape-town',name:'Cape Town',country:'South Africa',region:'Southern Africa',coords:[-33.9249,18.4241],description:'A port city framed by mountain and ocean, with active art, food and design communities.',kind:'City',discoveries:['Bo-Kaap','Woodstock','Kalk Bay']},
    {id:'johannesburg',name:'Johannesburg',country:'South Africa',region:'Southern Africa',coords:[-26.2041,28.0473],description:'A major urban centre with influential music, design, art and contemporary history.',kind:'City',discoveries:['Maboneng','Soweto','Braamfontein']},
    {id:'dakar',name:'Dakar',country:'Senegal',region:'West Africa',coords:[14.7167,-17.4677],description:'A peninsula city with influential music, visual art and fashion scenes.',kind:'City',discoveries:['Plateau','Almadies','Île de Gorée']},
    {id:'cairo',name:'Cairo',country:'Egypt',region:'North Africa',coords:[30.0444,31.2357],description:'A major historic metropolis with layered architecture, craft and cultural life.',kind:'City',discoveries:['Historic Cairo','Zamalek','Khan el-Khalili']},
    {id:'stone-town',name:'Stone Town',country:'Tanzania',region:'East Africa',coords:[-6.1622,39.1921],description:'A historic Swahili coastal town shaped by centuries of Indian Ocean exchange.',kind:'Place',discoveries:['Forodhani Gardens','Old Fort','Darajani']},
    {id:'kigali',name:'Kigali',country:'Rwanda',region:'East Africa',coords:[-1.9441,30.0619],description:'A green, hilly city with a growing creative and design community.',kind:'City',discoveries:['Kiyovu','Kimihurura','Kimironko']},
    {id:'luanda',name:'Luanda',country:'Angola',region:'Central Africa',coords:[-8.8390,13.2894],description:'An Atlantic-facing capital with rich music, dance and visual culture.',kind:'City',discoveries:['Marginal','Ilha do Cabo','Cidade Alta']},
    {id:'timbuktu',name:'Timbuktu',country:'Mali',region:'West Africa',coords:[16.7666,-3.0026],description:'A historic Saharan city associated with scholarship, manuscripts and trans-Saharan exchange.',kind:'Place',discoveries:['Old town','Manuscript heritage']},
    {id:'abidjan',name:'Abidjan',country:'Côte d’Ivoire',region:'West Africa',coords:[5.3600,-4.0083],description:'A lagoon city with a lively music scene, contemporary art and food culture.',kind:'City',discoveries:['Cocody','Treichville','Plateau']},
    {id:'kinshasa',name:'Kinshasa',country:'Democratic Republic of the Congo',region:'Central Africa',coords:[-4.4419,15.2663],description:'A vast river city known for music, fashion, dance and energetic urban creativity.',kind:'City',discoveries:['Gombe','Matonge','Kintambo']},
    {id:'tunis',name:'Tunis',country:'Tunisia',region:'North Africa',coords:[36.8065,10.1815],description:'A Mediterranean capital where a historic medina meets contemporary city life.',kind:'City',discoveries:['Medina','Sidi Bou Said','La Marsa']},
    {id:'maputo',name:'Maputo',country:'Mozambique',region:'Southern Africa',coords:[-25.9692,32.5732],description:'A coastal city with distinctive architecture, music, markets and food culture.',kind:'City',discoveries:['Baixa','Polana','Costa do Sol']},
    {id:'windhoek',name:'Windhoek',country:'Namibia',region:'Southern Africa',coords:[-22.5609,17.0658],description:'A highland capital and a gateway to Namibia’s diverse landscapes and cultures.',kind:'City',discoveries:['City Centre','Katutura']},
    {id:'gaborone',name:'Gaborone',country:'Botswana',region:'Southern Africa',coords:[-24.6282,25.9231],description:'A growing capital with contemporary arts, markets and nearby nature.',kind:'City',discoveries:['Main Mall','Broadhurst']},
    {id:'libreville',name:'Libreville',country:'Gabon',region:'Central Africa',coords:[0.4162,9.4673],description:'An Atlantic coastal capital surrounded by rainforest and shaped by Gabonese culture.',kind:'City',discoveries:['Bord de Mer','Louis']},
    {id:'antananarivo',name:'Antananarivo',country:'Madagascar',region:'East Africa',coords:[-18.8792,47.5079],description:'Madagascar’s highland capital, known for its hilltop heritage, crafts and markets.',kind:'City',discoveries:['Upper Town','Analakely']},
    {id:'freetown',name:'Freetown',country:'Sierra Leone',region:'West Africa',coords:[8.4657,-13.2317],description:'A coastal city with a distinctive history, music, markets and nearby beaches.',kind:'City',discoveries:['Aberdeen','Central Freetown']},
    {id:'kampala',name:'Kampala',country:'Uganda',region:'East Africa',coords:[0.3476,32.5825],description:'A lively city of hills, music, food, markets and creative communities.',kind:'City',discoveries:['Kololo','Nakasero','Kampala Old Taxi Park']}
  ].map(p=>({...p,type:'place'}));

  const shell = document.getElementById('map-shell');
  const mapElement = document.getElementById('africa-map');
  if (!shell || !mapElement) return;
  let map = null, markerLayer = null, initialized = false;
  const markerById = new Map();
  const search = document.getElementById('place-search');
  const results = document.getElementById('search-results');
  const clearButton = document.getElementById('search-clear');
  const allItems = [...countries, ...places];
  let activeCountry = null;

  const escapeHTML = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const countryFor = name => countries.find(c => c.name.toLocaleLowerCase() === String(name).toLocaleLowerCase());
  const itemsForCountry = name => places.filter(p => p.country.toLocaleLowerCase() === String(name).toLocaleLowerCase());

  function popupContent(place) {
    return `<strong>${escapeHTML(place.name)}</strong><small>${escapeHTML(place.country)} · ${escapeHTML(place.region)}</small><p>${escapeHTML(place.description)}</p>`;
  }

  function ensureDetailsPanel() {
    if (document.getElementById('place-details')) return;
    const panel = document.createElement('aside');
    panel.id = 'place-details'; panel.className = 'place-details'; panel.hidden = true;
    panel.setAttribute('aria-live','polite'); panel.setAttribute('aria-label','Location details');
    shell.appendChild(panel);
  }

  function renderDetails(item) {
    ensureDetailsPanel();
    const panel = document.getElementById('place-details');
    if (!panel || !item) return;
    const isCountry = item.type === 'country';
    const cities = isCountry ? itemsForCountry(item.name) : [];
    const parentCountry = isCountry ? item : countryFor(item.country);
    panel.innerHTML = `
      <button class="details-close" type="button" aria-label="Close location details">×</button>
      <div class="details-eyebrow">${isCountry ? 'COUNTRY EXPLORER' : `${escapeHTML(item.kind || 'FEATURED PLACE').toUpperCase()} · ${escapeHTML(item.region).toUpperCase()}`}</div>
      <h2>${escapeHTML(item.name)}</h2>
      <p class="details-country">${isCountry ? escapeHTML(item.region) : `${escapeHTML(item.country)} · ${escapeHTML(item.region)}`}</p>
      <p class="details-description">${escapeHTML(item.description)}</p>
      ${isCountry ? `<div class="details-stat"><span>Capital</span><strong>${escapeHTML(item.capital)}</strong></div><div class="details-section-title">Featured places</div>${cities.length ? `<div class="details-list">${cities.map(p=>`<button class="detail-place" type="button" data-place="${escapeHTML(p.id)}"><span>${escapeHTML(p.name)}<small>${escapeHTML(p.kind)} · ${escapeHTML(p.region)}</small></span><b aria-hidden="true">↗</b></button>`).join('')}</div>` : `<p class="details-muted">City and neighborhood guides for this country are being curated. Search for the capital to explore its map location.</p><button class="details-action" type="button" data-capital="${escapeHTML(item.capital)}">Locate ${escapeHTML(item.capital)} ↗</button>`}` : `<div class="details-section-title">Explore nearby discoveries</div><div class="discovery-chips">${(item.discoveries || []).map(d=>`<span>${escapeHTML(d)}</span>`).join('')}</div><p class="details-muted">These are curated starting points, not a complete local directory.</p><button class="details-action" type="button" data-country="${escapeHTML(item.country)}">Explore ${escapeHTML(item.country)} ↗</button>`}
      <div class="details-footer">AYÉRA · PLACE STORIES</div>`;
    panel.hidden = false;
    panel.querySelector('.details-close')?.addEventListener('click',()=>{panel.hidden=true;});
    panel.querySelectorAll('[data-place]').forEach(btn=>btn.addEventListener('click',()=>selectItem(places.find(p=>p.id===btn.dataset.place))));
    panel.querySelector('[data-capital]')?.addEventListener('click',()=>{
      const q = panel.querySelector('[data-capital]').dataset.capital;
      const capital = places.find(p=>p.name.toLocaleLowerCase()===q.toLocaleLowerCase());
      if (capital) selectItem(capital); else { map?.flyTo(item.coords,6,{duration:0.8}); showNotice(`Capital location: ${q}. A detailed city guide is not available yet.`); }
    });
    panel.querySelector('[data-country]')?.addEventListener('click',()=>{ const c=countryFor(item.country); if(c) selectItem(c); });
  }

  function showNotice(message) {
    const note = document.querySelector('.map-bottom-note span:nth-child(2)');
    if (note) { note.textContent = message; window.setTimeout(()=>{ if(note.isConnected) note.textContent='Discover Africa, one place at a time'; },3500); }
  }

  function selectItem(item) {
    if (!map || !item) return;
    activeCountry = item.type === 'country' ? item.name : item.country;
    const zoom = item.type === 'country' ? (['Algeria','Democratic Republic of the Congo','Libya','Sudan','Chad','Niger','Angola','Mali','South Africa'].includes(item.name) ? 4.5 : 5.5) : 8;
    map.flyTo(item.coords, Math.max(map.getZoom() > zoom ? Math.min(map.getZoom(), zoom+1) : zoom, zoom), {duration:0.9});
    const marker = markerById.get(item.id);
    if (marker && item.type === 'place') marker.openPopup();
    if (results) results.hidden = true;
    renderDetails(item);
    showNotice(`${item.name} · ${item.type === 'country' ? 'Country' : 'Featured location'}`);
  }

  function initMap() {
    if (initialized || !window.L) return;
    initialized = true;
    map = L.map(mapElement,{center:[1,18],zoom:3,minZoom:2,maxZoom:17,zoomControl:false,scrollWheelZoom:true,worldCopyJump:true,zoomSnap:0.5,preferCanvas:true});
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{
      attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a>',subdomains:'abcd',maxZoom:19
    }).addTo(map);
    markerLayer=L.layerGroup().addTo(map);
    places.forEach(place=>{
      const marker=L.marker(place.coords,{title:`${place.name}, ${place.country}`,alt:`${place.name}, ${place.country}`,icon:L.divIcon({className:'',html:'<span class="africa-pin"></span>',iconSize:[18,18],iconAnchor:[9,9]})}).addTo(markerLayer);
      marker.bindPopup(popupContent(place),{closeButton:true,autoPanPadding:[28,28]});
      marker.on('click',()=>{ if(search) search.value=''; renderResults(''); renderDetails(place); activeCountry=place.country; });
      markerById.set(place.id,marker);
    });
    document.getElementById('map-zoom-in')?.addEventListener('click',()=>map.zoomIn());
    document.getElementById('map-zoom-out')?.addEventListener('click',()=>map.zoomOut());
    document.getElementById('map-reset')?.addEventListener('click',fitAfrica);
    document.getElementById('map-home')?.addEventListener('click',()=>setMode('map'));
    document.getElementById('world-mode')?.addEventListener('click',()=>setMode('world'));
    search?.addEventListener('input',()=>renderResults(search.value));
    clearButton?.addEventListener('click',()=>{search.value='';renderResults('');search.focus();});
    map.on('zoomend',updateZoomLabel);
    map.whenReady(()=>setTimeout(()=>{map.invalidateSize();updateZoomLabel();},100));
    window.addEventListener('resize',()=>map.invalidateSize());
    renderResults('');
  }

  function updateZoomLabel() {
    const label=document.getElementById('map-zoom-level');
    if(label && map) label.textContent=map.getZoom() < 4 ? 'CONTINENT' : map.getZoom() < 6 ? 'COUNTRY' : map.getZoom() < 9 ? 'CITY' : 'LOCAL';
  }

  function fitAfrica() {
    if(!map)return;
    map.flyTo([1,18],3,{duration:0.8});map.closePopup();
    const panel=document.getElementById('place-details');if(panel)panel.hidden=true;
    activeCountry=null;showNotice('Discover Africa, one place at a time');
  }

  function setMode(mode) {
    const world=mode==='world';document.body.classList.toggle('world-mode',world);
    document.getElementById('map-home')?.setAttribute('aria-pressed',String(!world));
    document.getElementById('world-mode')?.setAttribute('aria-pressed',String(world));
    if(world) mapElement.setAttribute('aria-hidden','true');
    else {mapElement.removeAttribute('aria-hidden');setTimeout(()=>map?.invalidateSize(),80);}
  }

  function renderResults(query) {
    if(!results)return;
    const q=String(query||'').trim().toLocaleLowerCase();results.replaceChildren();
    if(!q){results.hidden=true;if(clearButton)clearButton.hidden=true;return;}
    if(clearButton)clearButton.hidden=false;
    const matches=allItems.filter(item=>`${item.name} ${item.country||''} ${item.region} ${item.capital||''}`.toLocaleLowerCase().includes(q)).sort((a,b)=>{
      const aExact=a.name.toLocaleLowerCase().startsWith(q)?0:1,bExact=b.name.toLocaleLowerCase().startsWith(q)?0:1;
      return aExact-bExact || (a.type==='country'?-1:1);
    }).slice(0,9);
    results.hidden=false;
    if(!matches.length){const empty=document.createElement('div');empty.className='search-empty';empty.textContent='No match in AYÉRA’s current index. Try a country, capital or featured city.';results.appendChild(empty);return;}
    matches.forEach(item=>{
      const button=document.createElement('button');button.type='button';button.className='search-result';
      const subtitle=item.type==='country'?`Country · ${item.region} · Capital: ${item.capital}`:`${item.country} · ${item.region}`;
      button.innerHTML=`<span>${escapeHTML(item.name)}<small>${escapeHTML(subtitle)}</small></span><span class="arrow" aria-hidden="true">↗</span>`;
      button.addEventListener('click',()=>selectItem(item));results.appendChild(button);
    });
  }

  function waitForLeaflet(attempt=0) {
    if(window.L){initMap();return;}
    if(attempt<40){window.setTimeout(()=>waitForLeaflet(attempt+1),150);return;}
    const note=document.querySelector('.map-bottom-note span:nth-child(2)');if(note)note.textContent='Map requires internet access. Please reload when online.';
  }
  waitForLeaflet();
})();
