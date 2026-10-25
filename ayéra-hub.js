(() => {
  const discoveries = [
    { id: "lagos", title: "Lagos after hours", category: "Places", type: "city", location: "Lagos, Nigeria", symbol: "↗", description: "A city guide to creative energy, food, music and the places that keep the city moving.", action: "Explore guide" },
    { id: "adire", title: "The art of Adire", category: "Culture", type: "culture", location: "Yoruba heritage", symbol: "✳", description: "Discover the patterns, craft traditions and stories behind indigo-dyed textiles.", action: "Discover culture" },
    { id: "accra", title: "Accra creative scene", category: "Places", type: "city", location: "Accra, Ghana", symbol: "⌖", description: "A starting point for exploring art spaces, design, music and independent creativity.", action: "Explore city" },
    { id: "creators", title: "Made on the continent", category: "Creators", type: "creator", location: "Creator spotlight · demo", symbol: "✦", description: "A showcase concept for African makers, artists, designers and digital storytellers.", action: "Meet creators" },
    { id: "story", title: "A story carried by sound", category: "Stories", type: "story", location: "Culture & identity", symbol: "♫", description: "Explore how rhythm, language and oral storytelling carry memories across generations.", action: "Read story" },
    { id: "market", title: "Build beyond borders", category: "Opportunities", type: "opportunity", location: "Digital opportunity", symbol: "↗", description: "A discovery card for learning, collaboration and business opportunity.", action: "View opportunities" },
    { id: "cape", title: "Cape Town in layers", category: "Places", type: "city", location: "Cape Town, South Africa", symbol: "⌁", description: "Coastlines, neighbourhoods, design and local perspectives in one discovery.", action: "Explore city" },
    { id: "kente", title: "Kente: colour and meaning", category: "Culture", type: "culture", location: "Ghanaian heritage", symbol: "▧", description: "An introduction to the symbolism and weaving traditions of Kente cloth.", action: "Discover culture" },
    { id: "digital", title: "Create your digital future", category: "Opportunities", type: "opportunity", location: "Skills & learning", symbol: "◎", description: "A placeholder for online learning, communities and practical digital skills.", action: "Explore learning" }
  ];

  const grid = document.getElementById("contentGrid");
  const search = document.getElementById("searchInput");
  const empty = document.getElementById("emptyState");
  const resultCount = document.getElementById("resultCount");
  const savedCount = document.getElementById("savedCount");
  const toast = document.getElementById("toast");

  let category = "All";
  let savedOnly = false;
  let saved = new Set();

  try {
    saved = new Set(JSON.parse(localStorage.getItem("ayera-hub-saved") || "[]"));
  } catch (error) {
    saved = new Set();
  }

  function notify(message) {
    if (!toast || !message) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(notify.timer);
    notify.timer = setTimeout(() => toast.classList.remove("show"), 2300);
  }

  function persistSaved() {
    try {
      localStorage.setItem("ayera-hub-saved", JSON.stringify([...saved]));
    } catch (error) {
      // Ignore storage errors in privacy-restricted or private browsing contexts.
    }
    if (savedCount) savedCount.textContent = String(saved.size);
  }

  function setCategory(value) {
    category = value;
    document.querySelectorAll("[data-category]").forEach(button => {
      const isQuickLink = button.classList.contains("quick-link");
      const isFilterChip = button.classList.contains("filter-chip");
      button.classList.toggle("active", isQuickLink && button.dataset.category === value);
      button.classList.toggle("selected", isFilterChip && button.dataset.category === value);
    });
    render();
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>\"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));
  }

  function render() {
    if (!grid || !search) return;

    const term = search.value.trim().toLowerCase();
    const filtered = discoveries.filter(item => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesSearch = `${item.title} ${item.category} ${item.location} ${item.description}`.toLowerCase().includes(term);
      return matchesCategory && matchesSearch && (!savedOnly || saved.has(item.id));
    });

    grid.innerHTML = filtered.map(item => `
      <article class="discovery-card">
        <div class="card-art ${item.type}" data-symbol="${item.symbol}">
          <span class="card-tag">${escapeHTML(item.category)}</span>
        </div>
        <div class="card-body">
          <div class="card-title-row">
            <h3 class="card-title">${escapeHTML(item.title)}</h3>
            <button class="save-btn ${saved.has(item.id) ? "saved" : ""}" data-save="${item.id}" aria-label="${saved.has(item.id) ? "Remove saved item" : "Save item"}">${saved.has(item.id) ? "♥" : "♡"}</button>
          </div>
          <p class="card-description">${escapeHTML(item.description)}</p>
          <div class="card-meta"><span>${escapeHTML(item.location)}</span><button class="card-action" data-open="${item.id}">${escapeHTML(item.action)} ↗</button></div>
        </div>
      </article>`).join("");

    if (empty) empty.hidden = filtered.length > 0;
    if (resultCount) resultCount.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? "discovery" : "discoveries"}`;
    if (savedCount) savedCount.textContent = String(saved.size);
  }

  document.addEventListener("click", event => {
    const categoryButton = event.target.closest("[data-category]");
    if (categoryButton) {
      savedOnly = false;
      setCategory(categoryButton.dataset.category);
    }

    const saveButton = event.target.closest("[data-save]");
    if (saveButton) {
      const id = saveButton.dataset.save;
      saved.has(id) ? saved.delete(id) : saved.add(id);
      persistSaved();
      render();
      notify(saved.has(id) ? "Saved to your AYÉRA world" : "Removed from saved discoveries");
    }

    const openButton = event.target.closest("[data-open]");
    if (openButton) {
      const item = discoveries.find(entry => entry.id === openButton.dataset.open);
      if (item) {
        notify(`${item.title} — discovery preview. Connect a verified source to publish full guides.`);
      }
    }
  });

  if (search) search.addEventListener("input", render);

  const savedToggle = document.getElementById("savedToggle");
  if (savedToggle) {
    savedToggle.addEventListener("click", () => {
      savedOnly = !savedOnly;
      savedToggle.style.color = savedOnly ? "var(--lime)" : "";
      render();
      const discoverSection = document.getElementById("discover");
      discoverSection?.scrollIntoView({ behavior: "smooth" });
      notify(savedOnly ? "Showing your saved discoveries" : "Showing all discoveries");
    });
  }

  const connectButton = document.getElementById("connectButton");
  if (connectButton) connectButton.addEventListener("click", () => notify("Connect is planned for the next build: profiles, follows and messaging."));

  const createButton = document.getElementById("createButton");
  if (createButton) createButton.addEventListener("click", () => notify("Creator publishing is planned next. Sign-in and moderation will be needed."));

  const worldButton = document.getElementById("worldButton");
  if (worldButton) worldButton.addEventListener("click", () => notify("Immersive 3D and VR spaces are on the AYÉRA roadmap."));

  document.addEventListener("keydown", event => {
    if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
      event.preventDefault();
      search?.focus();
    }
    if (event.key === "Escape") {
      if (search) search.value = "";
      savedOnly = false;
      render();
      search?.blur();
    }
  });

  persistSaved();
  render();
})();
