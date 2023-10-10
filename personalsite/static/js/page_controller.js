const PAGES = {
    HOME : 'HOME',
    ABOUT: 'ABOUT',
    WORK: 'WORK'
}

let currentPage = PAGES.HOME

document.addEventListener('DOMContentLoaded', () => {
    const home = document.querySelector( '.welcome__background' )
    const about = document.querySelector( '.about' )
    const work = document.querySelector( '.work' )
    
    const homeButton = document.querySelector( 'nav__link__home > button' )
    const aboutButton = document.querySelector( '.nav__link__about > button' )
    const workButton = document.querySelector( '.nav__link__work > button' )

    const togglePage = ( page ) => {
        currentPage = page
    }

    homeButton.addEventListener( 'click', togglePage( PAGES.HOME ) )
    aboutButton.addEventListener( 'click', togglePage( PAGES.ABOUT ) )
    workButton.addEventListener( 'click', togglePage( PAGES.WORK ) )

})