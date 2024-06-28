let page = 1;
const blogContainer = document.getElementById('blog-contaier');
const loading = doument.getElementById('loading');

const loadPosts = async () => {
  loading.style.display = 'block';
  const rsponse = await fetch(`https://api.hackclub.com/v1/posts?page=${page}`);
  const data = await response.json();

  data.posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.lassList.add('post');
    postElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
    blogContainer.appendChild(postElement);
  });

  loading.style.display = 'none';
  page += 1;
};

const handleScroll = () => 

  if (scrollTop + clienteight >= scrollHeight - 5) {
    loadPosts();
  }
};

window.addEventListener('scroll', handleScroll);

loadosts();