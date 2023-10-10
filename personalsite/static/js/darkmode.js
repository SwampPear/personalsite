let darkMode = false

document.addEventListener('DOMContentLoaded', () => {
    const darkModeButton = document.querySelector( '.nav__darkmode-button' )

    const body = document.querySelector( 'body' )
    const navLinkBrand = document.querySelector( '.nav__link__brand' )
    const navLinks = document.querySelectorAll( '.nav__link' )
    const navDarkmodeButtonIcon = document.querySelector('.nav__darkmode-button__icon')


    const toDarkMode = () => {
        body.classList.remove( 'body__from-darkmode' )
        body.classList.add( 'body__to-darkmode' )

        navLinkBrand.classList.remove( 'nav__link__from-darkmode' )
        navLinkBrand.classList.add( 'nav__link__to-darkmode' )

        navLinks.forEach( ( elem ) => {
            elem.classList.remove( 'nav__link__from-darkmode' )
            elem.classList.add( 'nav__link__to-darkmode' )
        })

        navDarkmodeButtonIcon.classList.remove( 'nav__darkmode-button__icon__from-darkmode' )
        navDarkmodeButtonIcon.classList.add( 'nav__darkmode-button__icon__to-darkmode' )
    }

    const fromDarkMode = () => {
        body.classList.remove( 'body__to-darkmode' )
        body.classList.add( 'body__from-darkmode' )

        navLinkBrand.classList.remove( 'nav__link__to-darkmode' )
        navLinkBrand.classList.add( 'nav__link__from-darkmode' )

        navLinks.forEach( ( elem ) => {
            elem.classList.remove( 'nav__link__to-darkmode' )
            elem.classList.add( 'nav__link__from-darkmode' )
        })

        navDarkmodeButtonIcon.classList.remove( 'nav__darkmode-button__icon__to-darkmode' )
        navDarkmodeButtonIcon.classList.add( 'nav__darkmode-button__icon__from-darkmode' )
    }

    const toggleDarkmode = () => {
        if ( !darkMode ) {
            toDarkMode()
            darkMode = true
        } else {
            fromDarkMode()
            darkMode = false
        }
    }

    darkModeButton.addEventListener( 'click', toggleDarkmode )
})