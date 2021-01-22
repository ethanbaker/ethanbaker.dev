// Large navigation
let banner = document.querySelector("#banner")
let largeNavbar = document.querySelector("#navbar")

const handleScroll = () => {
  if (window.scrollY-20 > banner.offsetHeight) {
    largeNavbar.classList.remove("prenavbar") 
    largeNavbar.classList.add("afternavbar")
  } else if (window.scrollY+20 < banner.offsetHeight) {
    largeNavbar.classList.add("prenavbar")
    largeNavbar.classList.remove("afternavbar")
  }
}

window.onscroll = event => handleScroll()

handleScroll()

// Small navigation
let wrap = document.querySelector("#background-wrap")
let smallNav = document.querySelector("#menu")
let smallNavOpen = document.querySelector(".smallnav button.open")
let smallNavClose = document.querySelector(".smallnav button.close")

let menuLocked
const closeMenu = event => {
  if (menuLocked) return

  smallNav.style.opacity = "0"
  smallNav.style.zIndex = "-1"
  smallNavOpen.style.visibility = "visible"

  wrap.style.filter = "blur(0)"
}

const openMenu = event => {
  smallNav.style.opacity = "1"
  smallNav.style.zIndex = "9999"
  smallNav.style.display = "flex"
  smallNavOpen.style.visibility = "collapse"

  wrap.style.filter = "blur(2px)"
  smallNav.style.background = "rgba(49, 52, 57, 0.85)"

  menuLocked = true
  smallNav.onclick = closeMenu
  setTimeout(() => menuLocked = false, 350)
}

smallNavOpen.onclick = openMenu
smallNavClose.onclick = closeMenu

let menu = document.querySelector("#menu nav")
menu.onclick = () => {
  menuLocked = true
  setTimeout(() => menuLocked = false, 350)
}

let links = document.querySelectorAll(".smallnav ul a")
for (let v of links) {
  v.onclick = closeMenu
}

// Slideshow setup
class Slideshow {
  constructor(slides, wrap, index, prev, next) {
    this.slides = slides
    this.wrap = wrap
    this.index = index
    this.active = false

    this.prev = prev
    this.next = next

    prev.onclick = () => {
      this.prevSlide()
      this.active = true
      setTimeout(() => this.active = false, 10000)
    }

    next.onclick = () => {
      this.nextSlide()
      this.active = true
      setTimeout(() => this.active = false, 10000)
    }
  }

  showSlide() {
    if (!this.slides) return

    for (let slide of this.slides) {
      slide.style.display = "none"
    }
    this.slides[this.index].style.display = "block" 
  }

  nextSlide() {
    this.slides.length-1 === this.index ? this.index = 0 : this.index++

    this.showSlide()
  }

  prevSlide() {
    this.index === 0 ? this.index = this.slides.length-1 : this.index--

    this.showSlide()
  }

  auto() {
    let slideshow = this

    setInterval(() => {
      if (!this.active) {
          this.nextSlide()
      }
    }, 6000)
  }
}

// Project slides setup
let projectSlideshow = new Slideshow(document.querySelectorAll(".slide"), document.querySelector(".slide-wrap"), 0, document.querySelector(".slide-prev"), document.querySelector(".slide-next"))
projectSlideshow.showSlide()
projectSlideshow.auto()
