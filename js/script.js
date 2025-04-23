function mousepass() {
  const NavContentHover = document.querySelector(".categories-hover-all")
  const containerNav = document.querySelector(".hover-container-nav")
  let hideTimeout

  function show() {
    clearTimeout(hideTimeout)
    containerNav.style.display = "flex"
  }

  function hide() {
    hideTimeout = setTimeout(() => {
      containerNav.style.display = "none"
    }, 100)
  }

  NavContentHover.addEventListener("mouseover", show)
  NavContentHover.addEventListener("mouseout", hide)
  containerNav.addEventListener("mouseover", show)
  containerNav.addEventListener("mouseout", hide)
}

mousepass()

function updateCardLayout() {
  const lancamentosSections = document.querySelectorAll(".lancamentos")

  lancamentosSections.forEach((section) => {
    const container = section.querySelector(".product-container")
    const width = window.innerWidth
    let columns = 5

    if (width < 1200) {
      columns = 4
    }
    if (width < 900) {
      columns = 3
    }
    if (width < 600) {
      columns = 2
    }

    container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`
    updateCarouselPoints(section, columns)
  })
}

function updateCarouselPoints(section, visibleCards) {
  const container = section.querySelector(".product-container")
  const totalCards = container.children.length
  const totalGroups = Math.ceil(totalCards / visibleCards)
  const pointsContainer = section.querySelector(".carousel-points")

  // Limpa os pontos existentes
  pointsContainer.innerHTML = ""

  // Cria novos pontos baseado no número de grupos
  for (let i = 0; i < totalGroups; i++) {
    const label = document.createElement("label")
    label.className = "dynamic-label"
    if (i === 0) label.classList.add("active")
    pointsContainer.appendChild(label)
  }
}

function scrollLeft(section) {
  const container = section.querySelector(".product-container")
  const width = window.innerWidth
  let visibleCards = 5

  if (width < 1200) visibleCards = 4
  if (width < 900) visibleCards = 3
  if (width < 600) visibleCards = 2

  container.scrollBy({ left: -150 * visibleCards, behavior: "smooth" })

  const currentGroup = parseInt(section.dataset.currentGroup || 0)
  if (currentGroup > 0) {
    section.dataset.currentGroup = currentGroup - 1
    updateActivePoint(section)
  }
}

function scrollRight(section) {
  const container = section.querySelector(".product-container")
  const width = window.innerWidth
  let visibleCards = 5

  if (width < 1200) visibleCards = 4
  if (width < 900) visibleCards = 3
  if (width < 600) visibleCards = 2

  container.scrollBy({ left: 150 * visibleCards, behavior: "smooth" })

  const totalCards = container.children.length
  const totalGroups = Math.ceil(totalCards / visibleCards)
  const currentGroup = parseInt(section.dataset.currentGroup || 0)

  if (currentGroup < totalGroups - 1) {
    section.dataset.currentGroup = currentGroup + 1
    updateActivePoint(section)
  }
}

function updateActivePoint(section) {
  const currentGroup = parseInt(section.dataset.currentGroup || 0)
  const pointsContainer = section.querySelector(".carousel-points")
  const points = pointsContainer.querySelectorAll("label")

  points.forEach((point, index) => {
    point.classList.toggle("active", index === currentGroup)
  })
}

// Inicialização
updateCardLayout()

window.addEventListener("resize", updateCardLayout)

// Adiciona eventos para todas as seções de lançamentos
document.querySelectorAll(".lancamentos").forEach((section) => {
  const buttonBack = section.querySelector(".button-back-carousel")
  const buttonNext = section.querySelector(".button-next-carousel")

  if (buttonBack) {
    buttonBack.addEventListener("click", () => scrollLeft(section))
  }

  if (buttonNext) {
    buttonNext.addEventListener("click", () => scrollRight(section))
  }
})

const HeaderListen = document.querySelector("header")
const MainListen = document.querySelector("main")

function initFooterAccordion() {
  // Seleciona todas as seções do footer que precisam virar acordeon na versão mobile
  const footerSections = document.querySelectorAll(".mobile-view .header-links")

  footerSections.forEach((section) => {
    // Cria um container para o header
    const headerContainer = document.createElement("div")
    headerContainer.className = "header-container"

    // Pega o h4 existente
    const h4 = section.querySelector("h4")
    if (!h4) return

    // Cria o botão do acordeon
    const accordionButton = document.createElement("button")
    accordionButton.className = "accordion-button"
    accordionButton.setAttribute("type", "button")
    accordionButton.setAttribute("aria-label", "Toggle section")

    // Move o h4 e adiciona o botão ao container
    headerContainer.appendChild(h4)
    headerContainer.appendChild(accordionButton)

    // Envolve o conteúdo em uma div para animação
    const content = document.createElement("div")
    content.className = "accordion-content"

    // Move todo o conteúdo exceto o header para dentro da div de conteúdo
    while (section.children.length > 1) {
      content.appendChild(section.children[1])
    }

    // Limpa a seção e adiciona os novos elementos
    section.innerHTML = ""
    section.appendChild(headerContainer)
    section.appendChild(content)

    // Adiciona o evento de click no botão
    accordionButton.addEventListener("click", () => {
      const isActive = accordionButton.classList.contains("active")

      // Fecha todos os acordeons
      document.querySelectorAll(".accordion-button").forEach((btn) => {
        btn.classList.remove("active")
      })
      document.querySelectorAll(".accordion-content").forEach((content) => {
        content.classList.remove("active")
      })

      // Se não estava ativo, abre este
      if (!isActive) {
        accordionButton.classList.add("active")
        content.classList.add("active")
      }
    })
  })
}

// Executa quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", initFooterAccordion)

const inputSeach = document.querySelector(".search-bar")
const btnBuscar = document.querySelector(".search-input-icon")
const searchContainer = document.querySelector(".search-container-main")
const contentMain = document.querySelector(".content-main")

function showNewDiv() {
  contentMain.style.display = "none"
  searchContainer.style.display = "block"
}

inputSeach.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    mostrarNovaDiv()
  }
})

btnBuscar.addEventListener("click", showNewDiv)


const a = []