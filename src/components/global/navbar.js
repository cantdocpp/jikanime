class AppNavbar extends HTMLElement {
    constructor() {
        super();

        // Component state
        this._mobileActive = false;

        // Create a shadow root
        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Create <nav class="nav"></nav>
        const nav = document.createElement('nav');
        nav.setAttribute('class', 'nav');

        // Write some css to be applied to the shadow dom
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
        const burger = document.querySelector('app-navbar').shadowRoot.querySelector('.nav__mobile');
        const mobileCloseButton = document.querySelector('app-navbar').shadowRoot.querySelector('.nav__close');
        const mobileMenu = document.querySelector('app-navbar').shadowRoot.querySelector('.nav__menu')
        burger.addEventListener('click', () => {
            this.toggleMenu(mobileMenu);
        })
        mobileCloseButton.addEventListener('click', () => {
            this.closeToggleMenu(mobileMenu)
        })
    }

    toggleMenu(mobileMenu) {
        if (!this._mobileActive) {
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
