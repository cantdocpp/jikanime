class AppNavbar extends HTMLElement {
    constructor() {
        // Always call super() first in the constructor
        super();

        // Component state
        this._mobileActive = false;

        // Create a shadow root
        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Create <nav class="nav"></nav> tag
        const nav = document.createElement('nav');
        nav.setAttribute('class', 'nav');

        // Write some css to be applied to the shadow dom
        // This style will only be applied within this component
        const style = document.createElement('style');
        style.textContent = `
            .nav {
                box-sizing: border-box;
                padding: 15px 25px;
                display: flex;
                align-items: center;
            }

            .nav__logo {
                font-size: 24px;
                font-weight: 500;
                text-transform: capitalize;
            }

            .nav__mobile {
                display: none;
                position: absolute;
                left: 20px;
                vertical-align: middle;
                margin-top: 5px;
            }

            .nav__bar {
                height: 3px;
                background: #fff;
                width: 22px;
                margin-top: 4px;
                cursor: pointer;
                border-radius: 2px;
                user-select: none;
            }

            .nav__bar:first-child {
                margin-top: 0;
            }

            .nav__link {
                font-size: 15px;
                color: #fff;
                text-decoration: none;
            }

            .nav__item {
                margin-left: 20px;
            }

            .nav__menu {
                display: inline-flex;
                align-items: center;
                margin-left: 20px;
            }

            .nav__close {
                color: #000;
                font-size: 20px;
                margin-left: auto;
                cursor: pointer;
            }

            @media (max-width: 700px) {
                .nav {
                    display: block;
                    text-align: center;
                }

                .nav__mobile {
                    display: inline-block;
                    cursor: pointer;
                }

                .nav__logo__wrapper {
                    display: inline-block;
                }

                .nav__menu {
                    position: absolute;
                    margin-left: 0;
                    left: 0;
                    top: 0;
                    box-sizing: border-box;
                    padding: 20px;
                    width: 60%;
                    height: 100%;
                    z-index: 5;
                    background: #fff;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    transform: translateX(-100%);
                    transition: all 0.15s ease-in-out;
                }

                .nav__menu_open {
                    transform: translateX(0px);
                }

                .nav__item {
                    margin-left: 0;
                    margin-top: 20px;
                }

                .nav__link {
                    color: #000;
                    font-size: 20px;
                }
            }
        `;

        // Write the inside of the nav tag element
        nav.innerHTML = `
            <div class="nav__mobile">
                <div class="nav__bar"></div>
                <div class="nav__bar"></div>
                <div class="nav__bar"></div>
            </div>

            <div class="nav__logo__wrapper">
                <a class="nav__logo">
                    Jikanime
                </a>
            </div>
            <div class="nav__menu">
                <div class="nav__close">
                    x
                </div>
                <div class="nav__item">
                    <a href="#" class="nav__link">
                        Anime
                    </a>
                </div>
                <div class="nav__item">
                    <a href="#" class="nav__link">
                        Manga
                    </a>
                </div>
                <div class="nav__item">
                    <a href="#" class="nav__link">
                        Character
                    </a>
                </div>
            </div>
        `;

        // Attach the created elements to the shadow DOM
        shadowRoot.appendChild(style);
        shadowRoot.appendChild(nav);
    }


    connectedCallback() {
        // Select tag to add event listener
        // In web component, we can't just use document.querySelector('class-name')
        // We have to select the component name, then using shadowRoot, we can access our component
        const burger = document.querySelector('app-navbar').shadowRoot.querySelector('.nav__mobile');
        const mobileCloseButton = document.querySelector('app-navbar').shadowRoot.querySelector('.nav__close');
        const mobileMenu = document.querySelector('app-navbar').shadowRoot.querySelector('.nav__menu')

        // Add event when the three bar or hamburger button is clicked in mobile view
        // It's supposed to show our mobile navigation links
        burger.addEventListener('click', () => {
            this.toggleMenu(mobileMenu);
        })

        // Add event when the x close button on mobile navigation is clicked
        // It's supposed to close our mobile navigation links menu
        mobileCloseButton.addEventListener('click', () => {
            this.closeToggleMenu(mobileMenu)
        })
    }

    toggleMenu(mobileMenu) {
        // To know whether our mobile navigation is active or not, we have to access our state
        // So if the state if not active (false), we can add our class and set the state to true
        if (!this._mobileActive) {
            // Add our class to the mobileMenu (.nav__menu class) tag
            mobileMenu.classList.add('nav__menu_open');
            this._mobileActive = true;
        }
    }

    closeToggleMenu(mobileMenu) {
        if (this._mobileActive) {
            mobileMenu.classList.remove('nav__menu_open');
            this._mobileActive = false;
        }
    }
}

window.customElements.define('app-navbar', AppNavbar);
