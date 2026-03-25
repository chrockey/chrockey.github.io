const ME = 'Chunghyun Park';

/* Theme toggle */
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const update = () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    btn.textContent = isLight ? '\u263E' : '\u2600';
  };
  update();
  btn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    update();
  });
}

async function loadJSON(path) {
  const res = await fetch(path);
  return res.json();
}

function renderAuthors(authors, equal, coauthors, etAl) {
  return authors.map((name, i) => {
    const star = equal.includes(i) ? '*' : '';
    const url = coauthors[name];
    if (name === ME) return `<span class="me">${name}${star}</span>`;
    if (url) return `<a href="${url}">${name}${star}</a>`;
    return `${name}${star}`;
  }).join(', ') + (etAl ? ', et al.' : '');
}

function renderPub(pub, coauthors) {
  const img = pub.image ? `<div class="pub-img"><img src="/img/${pub.image}" alt="${pub.title}"></div>` : '';
  const awards = (pub.awards || []).map(a => `<div class="pub-award">${a}</div>`).join('');
  const links = Object.entries(pub.links || {});
  const hasAbs = pub.abstract && pub.abstract.length > 0;
  const absLink = hasAbs ? `<a href="#" onclick="this.parentElement.nextElementSibling.classList.toggle('open');return false">Abstract</a>` : '';
  const otherLinks = links.map(([label, url]) => `<a href="${url}">${label}</a>`).join('');
  const absDiv = hasAbs ? `<div class="pub-abs">${pub.abstract}</div>` : '';

  return `<div class="pub">
  ${img}
  <div class="pub-info">
    <div class="pub-title">${pub.title}</div>
    <div class="pub-authors">${renderAuthors(pub.authors, pub.equal || [], coauthors, pub.etAl)}</div>
    <div class="pub-venue"><em>${pub.venue}</em>, ${pub.year}</div>
    ${awards}
    <div class="pub-links">${absLink}${otherLinks}</div>
    ${absDiv}
  </div>
</div>`;
}

function renderNews(news, container) {
  const VISIBLE = 5;
  const section = document.createElement('section');
  section.className = 'news';
  section.id = 'news';
  section.innerHTML = '<h2>News</h2>';

  news.forEach((item, i) => {
    const hidden = i >= VISIBLE ? ' news-hidden' : '';
    section.innerHTML += `<div class="news-item${hidden}"><span class="news-date">${item.date}</span><span>${item.text}</span></div>`;
  });

  if (news.length > VISIBLE) {
    const btn = document.createElement('button');
    btn.className = 'toggle';
    btn.textContent = 'Show more';
    btn.onclick = () => {
      section.classList.toggle('show-all');
      btn.textContent = btn.textContent === 'Show more' ? 'Show less' : 'Show more';
    };
    section.appendChild(btn);
  }

  container.appendChild(section);
}

function renderPublications(pubs, coauthors, container, groupByYear) {
  if (groupByYear) {
    const years = [...new Set(pubs.map(p => p.year))].sort((a, b) => b - a);
    for (const year of years) {
      container.innerHTML += `<h2 class="pub-year">${year}</h2>`;
      pubs.filter(p => p.year === year).forEach(pub => {
        container.innerHTML += renderPub(pub, coauthors);
      });
    }
  } else {
    pubs.forEach(pub => {
      container.innerHTML += renderPub(pub, coauthors);
    });
  }
}

async function init() {
  initThemeToggle();
  const [coauthors, publications, news] = await Promise.all([
    loadJSON('/data/coauthors.json'),
    loadJSON('/data/publications.json'),
    loadJSON('/data/news.json')
  ]);

  const newsContainer = document.getElementById('news-container');
  if (newsContainer) renderNews(news, newsContainer);

  const selectedContainer = document.getElementById('selected-publications');
  if (selectedContainer) {
    const selected = publications.filter(p => p.selected);
    renderPublications(selected, coauthors, selectedContainer, false);
  }

  const allContainer = document.getElementById('publications');
  if (allContainer) {
    renderPublications(publications, coauthors, allContainer, true);
  }
}

init();
