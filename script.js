let page = 1;
const pageSize = 5;
const newsContainer = document.getElementById('news-container');
const loading = document.getElementById('loading');
const apiUrl = `https://jsonplaceholder.typicode.com/posts?_limit=${pageSize}&_page=`;

const loadArticles = async () => {
  loading.style.display = 'block';

  try {
    const response = await fetch(apiUrl + page);
    if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);

    const data = await response.json();

    if (data.length > 0) {
      data.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');
        articleElement.innerHTML = `
          <h2>${article.title}</h2>
          <p>${article.body}</p>
          <p><a href="#" target="_blank">Read more</a></p>
        `;
        newsContainer.appendChild(articleElement);
      });
    } else {
      const noMoreArticles = document.createElement('div');
      noMoreArticles.classList.add('article');
      noMoreArticles.innerHTML = `<p>No more articles available.</p>`;
      newsContainer.appendChild(noMoreArticles);
    }

    loading.style.display = 'none';
    page += 1;
  } catch (error) {
    console.error('Error fetching articles:', error.message);
    loading.style.display = 'none';
    const errorElement = document.createElement('div');
    errorElement.classList.add('article');
    errorElement.innerHTML = `<p>Error fetching articles: ${error.message}</p>`;
    newsContainer.appendChild(errorElement);
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
