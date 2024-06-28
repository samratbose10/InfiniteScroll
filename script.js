let page = 1;
const blogContainer = document.getElementById('blog-container');
const loading = document.getElementById('loading');

const loadPosts = async () => {
  loading.style.display = 'block';
  const response = await fetch(`https://api.hackclub.com/v1/posts?page=${page}`);
  const data = await response.json();

  