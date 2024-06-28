let page = 1;
const pageSize = 5;
const newsContainer = document.getElementById('news-container');
const loading = document.getElementById('loading');

const apiKey = 'fbb23737fde64638a0cc9c652a6b255a'; 
const apiUrl = `https://newsapi.org/v2/top-headlines?category=technology&pageSize=${pageSize}&apiKey=${apiKey}&page=`;

const loadArticles = async () => {
  loading.style.display = 'block';

  try {
    const response = await fetch(apiUrl + page);
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();

    data.articles.forEach(article => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('article');
      articleElement.innerHTML = `<h2>${article.title}</h2><p>${article.description}</p><p><a href="${article.url}" target="_blank">Read more</a></p>`;
      newsContainer.appendChild(articleElement);
    });

    loading.style.display = 'none';
    page += 1;
  } catch (error) {
    console.error('Error fetching articles:', error);
    loading.style.display = 'none';
  }
};

const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loadArticles();
  }
};

window.addEventListener('scroll', handleScroll);

loadArticles();
