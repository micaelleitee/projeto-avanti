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

// Função principal para atualizar o layout dos cards
function updateCardLayout() {
  const releasesSections = document.querySelectorAll(".releases")

  releasesSections.forEach((section, index) => {
    const container = section.querySelector(".product-container")
    const width = window.innerWidth
    let columns = 5

    if (width < 1200) columns = 4
    if (width < 900) columns = 3
    if (width < 600) columns = 2

    // Atualiza pontos do carrossel e configura navegação
    updateCarouselPoints(section, columns)
    setupCarouselNavigation(section, columns)

    // Inicializa o estado da seção
    section.dataset.sectionIndex = index
    section.dataset.currentGroup = 0
  })
}

// Atualiza os pontos de navegação do carrossel
function updateCarouselPoints(section, visibleCards) {
  const container = section.querySelector(".product-container")
  const totalCards = container.children.length
  const totalGroups = Math.ceil(totalCards / visibleCards)
  const pointsContainer = section.querySelector(".carousel-points")

  pointsContainer.innerHTML = ""

  for (let i = 0; i < totalGroups; i++) {
    const label = document.createElement("label")
    label.className = "dynamic-label"
    if (i === 0) label.classList.add("active")
    pointsContainer.appendChild(label)
  }
}

// Configura a navegação do carrossel com cálculo preciso
function setupCarouselNavigation(section, visibleCards) {
  const container = section.querySelector(".product-container")
  const cards = container.querySelectorAll(".product")

  if (cards.length === 0) return

  // Calcula a largura total de um grupo de cards visíveis incluindo o gap
  const cardStyle = window.getComputedStyle(cards[0])
  const containerStyle = window.getComputedStyle(container)
  const cardWidth = cards[0].offsetWidth
  const gap = parseFloat(containerStyle.gap)
  const scrollAmount = (cardWidth + gap) * visibleCards

  // Armazena no dataset para uso nas funções de scroll
  section.dataset.scrollAmount = scrollAmount
  section.dataset.visibleCards = visibleCards
}

// Função para navegar para a esquerda
function scrollLeft(section) {
  const container = section.querySelector(".product-container")
  const scrollAmount = parseFloat(section.dataset.scrollAmount)
  const currentGroup = parseInt(section.dataset.currentGroup || 0)

  if (currentGroup > 0) {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    section.dataset.currentGroup = currentGroup - 1
    updateActivePoint(section)
  }
}

// Função para navegar para a direita
function scrollRight(section) {
  const container = section.querySelector(".product-container")
  const scrollAmount = parseFloat(section.dataset.scrollAmount)
  const visibleCards = parseInt(section.dataset.visibleCards)
  const currentGroup = parseInt(section.dataset.currentGroup || 0)
  const totalCards = container.querySelectorAll(".product").length
  const totalGroups = Math.ceil(totalCards / visibleCards)

  if (currentGroup < totalGroups - 1) {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    section.dataset.currentGroup = currentGroup + 1
    updateActivePoint(section)
  }
}

// Atualiza o ponto de navegação ativo
function updateActivePoint(section) {
  const currentGroup = parseInt(section.dataset.currentGroup || 0)
  const pointsContainer = section.querySelector(".carousel-points")
  const points = pointsContainer.querySelectorAll("label")

  points.forEach((point, index) => {
    point.classList.toggle("active", index === currentGroup)
  })
}

// Configura eventos de scroll para atualizar pontos ativos
function setupScrollEvents() {
  document.querySelectorAll(".releases").forEach((section) => {
    const container = section.querySelector(".product-container")
    const visibleCards = parseInt(section.dataset.visibleCards) || 5

    container.addEventListener(
      "scroll",
      () => {
        const scrollPosition = container.scrollLeft
        const cardWidth = container.firstElementChild?.offsetWidth || 0
        const currentGroup = Math.round(
          scrollPosition / (cardWidth * visibleCards)
        )

        if (!isNaN(currentGroup)) {
          section.dataset.currentGroup = currentGroup
          updateActivePoint(section)
        }
      },
      { passive: true }
    )
  })
}

// Inicialização
updateCardLayout()
setupScrollEvents()

window.addEventListener("resize", () => {
  updateCardLayout()
  setupScrollEvents()
})

// Configura botões de navegação
document.querySelectorAll(".releases").forEach((section) => {
  const buttonBack = section.querySelector(".button-back-carousel")
  const buttonNext = section.querySelector(".button-next-carousel")

  if (buttonBack) {
    buttonBack.addEventListener("click", () => scrollLeft(section))
  }
  if (buttonNext) {
    buttonNext.addEventListener("click", () => scrollRight(section))
  }
})

// Restante do seu código (footer accordion e search) permanece igual
const HeaderListen = document.querySelector("header")
const MainListen = document.querySelector("main")

function initFooterAccordion() {
  const footerSections = document.querySelectorAll(".mobile-view .header-links")

  footerSections.forEach((section) => {
    const headerContainer = document.createElement("div")
    headerContainer.className = "header-container"

    const h4 = section.querySelector("h4")
    if (!h4) return

    const accordionButton = document.createElement("button")
    accordionButton.className = "accordion-button"
    accordionButton.setAttribute("type", "button")
    accordionButton.setAttribute("aria-label", "Toggle section")

    headerContainer.appendChild(h4)
    headerContainer.appendChild(accordionButton)

    const content = document.createElement("div")
    content.className = "accordion-content"

    while (section.children.length > 1) {
      content.appendChild(section.children[1])
    }

    section.innerHTML = ""
    section.appendChild(headerContainer)
    section.appendChild(content)

    accordionButton.addEventListener("click", () => {
      const isActive = accordionButton.classList.contains("active")

      document.querySelectorAll(".accordion-button").forEach((btn) => {
        btn.classList.remove("active")
      })
      document.querySelectorAll(".accordion-content").forEach((content) => {
        content.classList.remove("active")
      })

      if (!isActive) {
        accordionButton.classList.add("active")
        content.classList.add("active")
      }
    })
  })
}

document.addEventListener("DOMContentLoaded", initFooterAccordion)

const inputSeach = document.querySelector(".search-bar")
const btnBuscar = document.querySelector(".search-input-icon")
const searchContainer = document.querySelector(".search-container-main")
const contentMain = document.querySelector(".content-main")

function showNewDiv() {
  contentMain.style.display = "none"
  searchContainer.style.display = "flex"
}

inputSeach.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    updateText()
    showNewDiv()
  }
})

btnBuscar.addEventListener("click", function () {
  updateText()
  showNewDiv()
})

function updateText() {
  const spanChanged = document.querySelector(".textSearched")
  spanChanged.textContent = inputSeach.value
}

const clickLogo = document.querySelector(".logo-avanti")
clickLogo.addEventListener("click", () => {
  window.location.reload()
})
