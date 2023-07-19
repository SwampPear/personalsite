class Scrolling {
  constructor() {
    this.welcome = document.querySelector('.welcome__background')
    this.about = document.querySelector('.about__wrapper')
    this.work = document.querySelector('.nav__link__work')
    this.contact = document.querySelector('.nav__link__contact')
    this.scrollDuration = 750

    this.selectedSection = 'welcome'
  }

  /**
    * Computes a cubic bezier normalization for a given number [0, 1].
    */
  easeInOutCubic = (x) => {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  /**
    * Scrolls an element into view using a cubic bezier easing function.
    * 
    */
  scrollToElement = (element) => {
    let startingY = window.pageYOffset
    let elementY = element.getBoundingClientRect().top + window.scrollY
    console.log(elementY)
    let diff = elementY - startingY
    let start

    const step = (timestamp) => {
      if (!start) start = timestamp
    
      let time = timestamp - start
      let percent = Math.min(time / this.scrollDuration, 1)        
      let easing = this.easeInOutCubic(percent)

      window.scrollTo(0, startingY + diff * easing)               

      if (time < this.scrollDuration) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }
}