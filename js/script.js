function mousepass() {
  let NavContentHover = document.querySelector('.categories-hover-all');
  let containerNav = document.querySelector('.hover-container-nav');

  function show() {
    containerNav.style.display = 'flex';
  }

  function hide() {
    containerNav.style.display = 'none';
  }

  NavContentHover.addEventListener("mouseover", show);
  NavContentHover.addEventListener("mouseout", hide);
  containerNav.addEventListener("mouseover", show);
  containerNav.addEventListener("mouseout", hide);
}

mousepass();