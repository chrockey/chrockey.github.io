const ME = 'Chunghyun Park';

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
  const imgDir = pub.image && pub.image.endsWith('.gif') ? 'gif' : 'img';
  const hover = !pub.hover ? ''
    : pub.hover.endsWith('.mp4') ? `<video class="pub-hover" src="${pub.hover}" muted${pub.hoverLoop === false ? '' : ' loop'} playsinline preload="auto"></video>`
    : `<img class="pub-hover" src="${pub.hover}" alt="" loading="lazy">`;
  const img = pub.image ? `<div class="pub-img"><img src="/${imgDir}/${pub.image}" alt="${pub.title}">${hover}</div>` : '';
  const distinction = (pub.distinction || []).length > 0 ? ` (${pub.distinction.join(', ')})` : '';
  const awards = (pub.awards || []).map(a => `<div class="pub-award">${a}</div>`).join('');
  const links = Object.entries(pub.links || {});
  const hasAbs = pub.abstract && pub.abstract.length > 0;
  const absLink = hasAbs ? `<a href="#" onclick="this.parentElement.nextElementSibling.classList.toggle('open');return false">Abstract</a>` : '';
  const otherLinks = links.map(([label, url]) => `<a href="${url}">${label}</a>`).join('');
  const absDiv = hasAbs ? `<div class="pub-abs">${pub.abstract}</div>` : '';

  return `<div class="pub${pub.selected ? ' highlight' : ''}">
  ${img}
  <div class="pub-info">
    <div class="pub-title">${pub.title}</div>
    <div class="pub-authors">${renderAuthors(pub.authors, pub.equal || [], coauthors, pub.etAl)}</div>
    <div class="pub-venue"><em>${pub.venue}</em>, ${pub.year}${distinction}</div>
    ${awards}
    <div class="pub-links">${absLink}${otherLinks}</div>
    ${absDiv}
  </div>
</div>`;
}

/* Leading emoji in a news item, so CSS can widen the gap after it.
   HTML collapses runs of whitespace, so extra spaces in news.json would render as one. */
const NEWS_EMOJI = /^(\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic})*)/u;

function renderNews(news, container) {
  const VISIBLE = 5;
  const section = document.createElement('section');
  section.className = 'news';
  section.id = 'news';
  section.innerHTML = '<h2>News</h2>';

  news.forEach((item, i) => {
    const hidden = i >= VISIBLE ? ' news-hidden' : '';
    const text = item.text.replace(NEWS_EMOJI, '<span class="news-emoji">$1</span>');
    section.innerHTML += `<div class="news-item${hidden}"><span class="news-date">${item.date}</span><span>${text}</span></div>`;
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

/* Hover media show while the pointer is over a publication. On touch screens,
   which have no hover, tapping the publication (outside its links) toggles them instead. */
function initHoverVideos(container) {
  const noHover = window.matchMedia('(hover: none)').matches;
  container.querySelectorAll('.pub').forEach(el => {
    const hover = el.querySelector('.pub-hover');
    if (!hover) return;
    const video = hover.tagName === 'VIDEO' ? hover : null;
    const show = () => { el.classList.add('active'); if (video) video.play().catch(() => {}); };
    const hide = () => {
      el.classList.remove('active');
      if (video) { video.pause(); video.currentTime = 0; }
    };
    if (noHover) {
      el.addEventListener('click', e => {
        if (e.target.closest('a')) return;
        el.classList.contains('active') ? hide() : show();
      });
    } else {
      el.addEventListener('mouseenter', show);
      el.addEventListener('mouseleave', hide);
    }
  });
}

function renderPublications(pubs, coauthors, container) {
  container.innerHTML = pubs.map(pub => renderPub(pub, coauthors)).join('');
  initHoverVideos(container);
}

async function init() {
  const [coauthors, publications, news] = await Promise.all([
    loadJSON('/data/coauthors.json'),
    loadJSON('/data/publications.json'),
    loadJSON('/data/news.json')
  ]);

  const newsContainer = document.getElementById('news-container');
  if (newsContainer) renderNews(news, newsContainer);

  const pubContainer = document.getElementById('publication-list');
  if (pubContainer) renderPublications(publications, coauthors, pubContainer);
}

init();
