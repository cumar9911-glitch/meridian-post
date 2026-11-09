const FALLBACK_NEWS = [
  {
    category: "Business",
    title: "Markets rally as appetite for renewable energy grows across Asia.",
    summary:
      "Investors are shifting capital toward long-term clean infrastructure, driving fresh momentum in manufacturing and logistics.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
  {
    category: "Travel",
    title: "European cities expand passenger rail links to ease summer congestion.",
    summary:
      "Transit upgrades aim to improve regional mobility while reducing emissions and tourism pressure.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    category: "Science",
    title: "Researchers uncover promising advances in drought-resistant crops.",
    summary:
      "New field trials suggest targeted breeding may strengthen food systems in climate-sensitive regions.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  },
];

const API_ENDPOINTS = [
  "https://awesome.freellm.apis/api/news",
  "https://awesome.freellm.apis/news",
  "https://awesome.freellm.apis",
];

function renderNews(items) {
  const grid = document.getElementById("news-grid");
  if (!grid) return;

  grid.innerHTML = items
    .map(
      (item) => `
        <article class="news-card">
          <img
            src="${item.image || "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80"}"
            alt="${item.title}"
          />
          <div class="news-card-body">
            <div class="news-meta">${item.category || "World"}</div>
            <h3>${item.title}</h3>
            <p>${item.summary || "Latest updates from around the world."}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function normalizeApiResponse(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.articles)) return payload.articles;
  if (Array.isArray(payload?.news)) return payload.news;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

async function loadNews() {
  for (const endpoint of API_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) continue;

      const data = await response.json();
      const items = normalizeApiResponse(data).map((item) => ({
        category: item.category || item.section || "World",
        title: item.title || item.headline || "Latest update",
        summary:
          item.summary ||
          item.description ||
          item.excerpt ||
          "Breaking story from around the world.",
        image:
          item.image ||
          item.urlToImage ||
          item.thumbnail ||
          item.photo ||
          "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80",
      }));

      if (items.length) {
        renderNews(items);
        return;
      }
    } catch (error) {
      console.warn(`Failed to fetch from ${endpoint}:`, error);
    }
  }

  renderNews(FALLBACK_NEWS);
}

loadNews();
