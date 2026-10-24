(() => {
  const discoveries = [
    {id:"lagos",title:"Lagos after hours",category:"Places",type:"city",location:"Lagos, Nigeria",symbol:"↗",description:"Creative energy, food, music and the places that keep the city moving.",action:"Explore guide"},
    {id:"adire",title:"The art of Adire",category:"Culture",type:"culture",location:"Yoruba heritage",symbol:"✳",description:"Discover the patterns, craft traditions and stories behind indigo-dyed textiles.",action:"Discover culture"},
    {id:"accra",title:"Accra creative scene",category:"Places",type:"city",location:"Accra, Ghana",symbol:"⌖",description:"Art spaces, design, music and independent creativity in Ghana's capital.",action:"Explore city"},
    {id:"makers",title:"Made on the continent",category:"Creators",type:"creator",location:"Creator spotlight · concept",symbol:"✦",description:"A showcase for African makers, artists, designers and digital storytellers.",action:"Meet creators"},
    {id:"sound",title:"A story carried by sound",category:"Stories",type:"story",location:"Culture & identity",symbol:"♫",description:"How rhythm, language and oral storytelling carry memories across generations.",action:"Read story"},
    {id:"build",title:"Build beyond borders",category:"Opportunities",type:"opportunity",location:"Digital opportunity",symbol:"↗",description:"A concept hub for learning, collaboration and business opportunities.",action:"View opportunities"},
    {id:"cape",title:"Cape Town in layers",category:"Places",type:"city",location:"Cape Town, South Africa",symbol:"⌁",description:"Coastlines, neighbourhoods, design and local perspectives in one discovery.",action:"Explore city"},
    {id:"kente",title:"Kente: colour and meaning",category:"Culture",type:"culture",location:"Ghanaian heritage",symbol:"▧",description:"An introduction to the symbolism and weaving traditions of Kente cloth.",action:"Discover culture"},
    {id:"future",title:"Create your digital future",category:"Opportunities",type:"opportunity",location:"Skills & learning",symbol:"◎",description:"A placeholder for learning paths and practical digital skills.",action:"Explore learning"}
  ];
  const intro = document.getElementById("intro");
  const app = document.getElementById("app");
  const toast = document.getElementById("toast");
  const dialog = document.getElementById("aboutDialog");
  let currentView = "home";
  let currentFilter = "All";
  let toastTimer;

  function enterWorld() {
    intro.classList.add("is-hidden");
    sessionStorage.setItem("ayera-intro-seen", "1");
  }
  if (sessionStorage.getItem("ayera-intro-seen") === "1") intro.classList.add("is-hidden");
  document.getElementById("enterButton").addEventListener("click", enterWorld);
  document.getElementById("skipIntro").addEventListener("click", enterWorld);

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }
  function escapeHTML(value) {
    return value.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  }
  function cardHTML(item) {
    return `<article class="feature-card"><div class="feature-art ${item.type}" data-symbol="${item.symbol}"><span class="feature-tag">${escapeHTML(item.category)}</span></div><div class="feature-body"><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.description)}</p><div class="feature-foot"><span>${escapeHTML(item.location)}</span><button data-discovery="${item.id}">${escapeHTML(item.action)} ↗</button></div></div></article>`;
  }
  function renderFeatured() {
    document.getElementById("featuredGrid").innerHTML = discoveries.slice(0,3).map(cardHTML).join("");
  }
  function renderDiscoveries() {
    const term = document.getElementById("discoverSearch").value.trim().toLowerCase();
    const filtered = discoveries.filter(item => (currentFilter === "All" || item.category === currentFilter) && `${item.title} ${item.category} ${item.location} ${item.description}`.toLowerCase().includes(term));
    document.getElementById("discoverGrid").innerHTML = filtered.map(cardHTML).join("");
    document.getElementById("discoverEmpty").hidden = filtered.length !== 0;
  }
  function navigate(view) {
    const valid = ["home","discover","connect","market","create","opportunities","world"];
    if (!valid.includes(view)) return;
    currentView = view;
    document.querySelectorAll(".view").forEach(section => section.classList.toggle("active-view", section.id === `view-${view}`));
    document.querySelectorAll("[data-view]").forEach(button => button.classList.toggle("active", button.dataset.view === view));
    document.querySelectorAll("[data-go]").forEach(button => button.setAttribute("aria-current", button.dataset.go === view ? "page" : "false"));
    document.querySelector(".main-content").scrollTo?.({top:0,behavior:"smooth"});
    window.scrollTo({top:0,behavior:"smooth"});
    document.getElementById("sidebar").classList.remove("mobile-open");
    if (view === "discover") renderDiscoveries();
  }
  document.addEventListener("click", event => {
    const viewButton = event.target.closest("[data-view]");
    if (viewButton) navigate(viewButton.dataset.view);
    const goButton = event.target.closest("[data-go]");
    if (goButton) navigate(goButton.dataset.go);
    const discoveryButton = event.target.closest("[data-discovery]");
    if (discoveryButton) {
      const item = discoveries.find(d => d.id === discoveryButton.dataset.discovery);
      showToast(`${item.title}: preview card. Full guides and verified listings will be connected in a later build.`);
    }
    const toastButton = event.target.closest("[data-toast]");
    if (toastButton) showToast(toastButton.dataset.toast);
  });
  document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
    renderDiscoveries();
  }));
  document.getElementById("discoverSearch").addEventListener("input", renderDiscoveries);
  document.getElementById("topSearch").addEventListener("click", () => {
    navigate("discover");
    setTimeout(() => document.getElementById("discoverSearch").focus(), 80);
  });
  document.getElementById("mobileMenu").addEventListener("click", () => document.getElementById("sidebar").classList.toggle("mobile-open"));
  document.querySelector(".sidebar").id = "sidebar";
  document.getElementById("notifications").addEventListener("click", () => showToast("You're all caught up. Notifications will arrive when accounts are connected."));
  document.getElementById("aboutButton").addEventListener("click", () => dialog.showModal());
  document.getElementById("closeDialog").addEventListener("click", () => dialog.close());
  document.getElementById("dialogOkay").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  document.addEventListener("keydown", event => {
    if (event.key === "/" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) {
      event.preventDefault();
      navigate("discover");
      setTimeout(() => document.getElementById("discoverSearch").focus(), 80);
    }
    if (event.key === "Escape") document.getElementById("sidebar").classList.remove("mobile-open");
  });
  const date = new Date();
  document.getElementById("dateLabel").textContent = date.toLocaleDateString(undefined,{weekday:"long",month:"short",day:"numeric"}).toUpperCase() + " · YOUR WORLD, YOUR WAY";
  renderFeatured();
  renderDiscoveries();
})();