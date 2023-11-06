const gallery = document.getElementById('gallery');

window.onmousedown = (e) => {
  gallery.dataset.mouseDownAt = e.clientX;
};

window.onmouseup = () => {
  gallery.dataset.mouseDownAt = '0';
  gallery.dataset.prevPercentage = gallery.dataset.percentage;
};

window.onmousemove = (e) => {
  if (gallery.dataset.mouseDownAt === '0') return;

  const mouseDelta = parseFloat(gallery.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;
  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentage = Math.max(
    Math.min(parseFloat(gallery.dataset.prevPercentage) + percentage, 0),
    -100
  );

  gallery.dataset.percentage = nextPercentage;
  //   gallery.style.transform = `translate(${nextPercentage}%, -50%)`;
  gallery.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: 'forwards' }
  );

  // internal images parallax effect
  for (const image of gallery.getElementsByClassName('image')) {
    // image.style.objectPOsition = `${nextPercentage + 100}% 50%`;
    image.animate(
      { objectPosition: `${100 + nextPercentage}% center` },
      { duration: 1200, fill: 'forwards' }
    );
  }
};
