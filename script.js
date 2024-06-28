document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById('gallery');
  const background = document.querySelector('.background');
  const loader = document.getElementById('loader');
  const backgroundImages = [
    '91e08bc5ce5f297.png',
    'sr2638a72cfe5aws3.png',
    'https://art.pixilart.com/sr2849d344f68aws3.gif'
  ];
  let currentBackgroundIndex = 0;
  let isLoading = false;
  let imageList = [];
  let currentScrollPosition = 0;

  async function fetchImages() {
    const response = await fetch('https://api.github.com/repos/hackclub/dinosaurs/contents');
    const data = await response.json();
    const images = data
      .filter(item => item.name.endsWith('.png') || item.name.endsWith('.jpg'))
      .map(item => item.download_url);

    return images;
  }

  function displayImages(images) {
    images.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = image;
      gallery.appendChild(imgElement);
    });
  }

  async function loadInitialImages() {
    if (isLoading) return;
    isLoading = true;
    loader.style.display = 'block';
    imageList = await fetchImages();
    displayImages(imageList);
    loader.style.display = 'none';
    gallery.style.display = 'grid';
    isLoading = false;
  }

  function appendImages() {
    displayImages(imageList);
  }

  function handleScroll() {
    if (gallery.scrollTop + gallery.clientHeight >= gallery.scrollHeight) {
      appendImages();
    }
  }

  function changeBackground() {
    background.style.opacity = 0;
    setTimeout(() => {
      currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
      background.style.backgroundImage = `url(${backgroundImages[currentBackgroundIndex]})`;
      background.style.opacity = 1;
    }, 2000); 
  }

  function simulateScroll() {
    currentScrollPosition += 2; 
    gallery.scrollTop = currentScrollPosition;

    if (gallery.scrollTop + gallery.clientHeight >= gallery.scrollHeight) {
      appendImages();
    }

    requestAnimationFrame(simulateScroll);
  }

  loadInitialImages();
  simulateScroll();

  
  background.style.backgroundImage = `url(${backgroundImages[currentBackgroundIndex]})`;
  background.style.opacity = 1;
  setInterval(changeBackground, 8000);
});

