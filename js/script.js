function mousepass() {
  const NavContentHover = document.querySelector('.categories-hover-all');
  const containerNav = document.querySelector('.hover-container-nav');
  let hideTimeout;

  function show() {
    clearTimeout(hideTimeout);
    containerNav.style.display = 'flex';
  }

  function hide() {
    hideTimeout = setTimeout(() => {
      containerNav.style.display = 'none';
    }, 100); // Delay de 200ms para evitar desaparecimento abrupto
  }

  NavContentHover.addEventListener("mouseover", show);
  NavContentHover.addEventListener("mouseout", hide);
  containerNav.addEventListener("mouseover", show);
  containerNav.addEventListener("mouseout", hide);
}

mousepass();

function updateCardLayout() {
  const container = document.querySelector('.product-carousel');
  const width = window.innerWidth;
  let columns = 5;

  if (width < 1200) {
    columns = 4;
  }
  if (width < 900) {
    columns = 3;
  }
  if (width < 600) {
    columns = 2;
  }
  
  container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
}

// Chamar ao carregar
updateCardLayout();

// Chamar quando redimensionar
window.addEventListener('resize', updateCardLayout);