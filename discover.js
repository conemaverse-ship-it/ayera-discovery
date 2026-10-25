/* AYÉRA Discovery Hub. Static editorial seed content; ready for a future verified CMS/API. */
(() => {
  'use strict';

  const hub = document.getElementById('discovery-hub');
  const grid = document.getElementById('hub-grid');
  const search = document.getElementById('hub-search');

  if (!hub || !grid || !search) return;

  const items = [
    { type: 'culture', symbol: '✦', title: 'Food & memory', place: 'Across the continent', text: 'Recipes, markets and the stories carried through shared meals.' },
    { type: 'culture', symbol: '◈', title: 'Textiles & craft', place: 'Living traditions', text: 'Patterns, materials and makers shaping heritage and new design.' },
    { type: 'culture', symbol: '♫', title: 'Sound of Africa', place: 'Music & movement', text: 'Explore rhythms, scenes, dance and the sounds of local life.' },
    { type: 'culture', symbol: '⌂', title: 'Architecture & place', place: 'Built worlds', text: 'From historic quarters to contemporary spaces and design.' },
    { type: 'creators', symbol: '✧', title: 'Independent artists', place: 'Creator discovery', text: 'A future-ready collection for visual artists and illustrators.' },
    { type: 'creators', symbol: '◉', title: 'Music & film', place: 'Creative voices', text: 'Discover musicians, filmmakers and the scenes they build.' },
    { type: 'creators', symbol: '✎', title: 'Writers & storytellers', place: 'Words and ideas', text: 'Meet voices documenting everyday life and changing culture.' },
    { type: 'creators', symbol: '✂', title: 'Designers & makers', place: 'Contemporary craft', text: 'People reimagining fashion, objects, spaces and materials.' },
    { type: 'stories', symbol: '↗', title: 'Lagos after dark', place: 'Lagos, Nigeria', text: 'A city seen through music, food, night markets and creative energy.' },
    { type: 'stories', symbol: '⌁', title: 'Along the Swahili coast', place: 'East Africa', text: 'Coastal heritage shaped by language, trade, craft and exchange.' },
    { type: 'stories', symbol: '▤', title: 'Libraries of memory', place: 'Timbuktu, Mali', text: 'A starting point for exploring scholarship and manuscript heritage.' },
    { type: 'stories', symbol: '◎', title: 'New African design', place: 'Across the continent', text: 'A look at the ideas connecting tradition and contemporary practice.' },
    { type: 'places', symbol: '●', title: 'Lagos', place: 'Nigeria · West Africa', text: 'Music, film, fashion and a coastal creative pulse.' },
    { type: 'places', symbol: '●', title: 'Accra', place: 'Ghana · West Africa', text: 'Artists, designers, coastal neighborhoods and living history.' },
    { type: 'places', symbol: '●', title: 'Nairobi', place: 'Kenya · East Africa', text: 'Photography, film, design and a dynamic urban culture.' },
    { type: 'places', symbol: '●', title: 'Dakar', place: 'Senegal · West Africa', text: 'Visual art, fashion, music and Atlantic-facing city life.' },
    { type: 'places', symbol: '●', title: 'Marrakech', place: 'Morocco · North Africa', text: 'Craft traditions, historic streets and contemporary design.' },
    { type: 'places', symbol: '●', title: 'Cape Town', place: 'South Africa · Southern Africa', text: 'Mountain and ocean landscapes, art, food and design.' }
  ];

  let active = 'all';

  const normalize = value => String(value ?? '').trim().toLocaleLowerCase();

  function render() {
    const q = normalize(search.value);
    const matches = items.filter(item => {
      const matchesType = active === 'all' || item.type === active;
      const haystack = `${item.title} ${item.place} ${item.text} ${item.type}`.toLocaleLowerCase();
      return matchesType && haystack.includes(q);
    });

    grid.replaceChildren();

    if (!matches.length) {
      const empty = document.createElement('div');
      empty.className = 'hub-empty';
      empty.textContent = 'No matches in this starter collection. Try another search or category.';
      grid.append(empty);
      return;
    }

    matches.forEach(item => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'hub-card';
      card.setAttribute('aria-label', `${item.title}. ${item.text}`);

      const symbol = document.createElement('span');
      symbol.className = 'hub-symbol';
      symbol.textContent = item.symbol;

      const type = document.createElement('span');
      type.className = 'hub-type';
      type.textContent = item.type;

      const title = document.createElement('strong');
      title.textContent = item.title;

      const place = document.createElement('small');
      place.textContent = item.place;

      const desc = document.createElement('small');
      desc.textContent = item.text;

      card.append(symbol, type, title, place, desc);

      card.addEventListener('click', () => {
        const mapSearch = document.getElementById('place-search');

        if (item.type === 'places') {
          close();
          if (window.ayeraSelectPlace && window.ayeraSelectPlace(item.title)) {
            return;
          }
          if (mapSearch) {
            mapSearch.value = item.title;
            mapSearch.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }
      });

      grid.append(card);
    });
  }

  function open() {
    hub.hidden = false;
    document.body.style.overflow = 'hidden';
    render();
    search.focus({ preventScroll: true });
  }

  function close() {
    hub.hidden = true;
    document.body.style.overflow = '';
    document.getElementById('discover-open')?.focus();
  }

  document.getElementById('discover-open')?.addEventListener('click', open);
  hub.querySelectorAll('[data-hub-close]').forEach(el => el.addEventListener('click', close));

  hub.querySelectorAll('[data-hub-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      active = btn.dataset.hubTab;
      hub.querySelectorAll('[data-hub-tab]').forEach(b => {
        const selected = b === btn;
        b.classList.toggle('active', selected);
        b.setAttribute('aria-selected', String(selected));
      });
      render();
    });
  });

  search.addEventListener('input', render);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !hub.hidden) {
      close();
    }
  });
})();
