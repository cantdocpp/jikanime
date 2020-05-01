// This will import from '../../assets/search.svg
// Check webpack.common.js for more info
import SearchLogo from 'Assets/search.svg';

class AppSearch extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Create <div class="search"></div> tag
        const div = document.createElement('div');
        div.setAttribute('class', 'search');

        // Write some css to be applied to the shadow dom
        // This style will only be applied within this component
        const style = document.createElement('style');

        // Get placeholder attribute
        const placeholder = this.getAttribute('placeholder') || 'Search';
        const category = this.getAttribute('category') || 'all';

        style.textContent = `
            .search {
                padding: 0px 25px;
                box-sizing: border-box;
                width: 100%;
            }

            .search__input::placeholder {
                color: #eee;
            }

            .search__input__wrapper {
                position: relative;
                margin-top: 20px;
            }

            .search__input {
                width: 100%;
                background: #000;
                border: 1px solid #fff;
                border-radius: 5px;
                padding-left: 10px;
                padding-top: 10px;
                padding-bottom: 10px;
                box-sizing: border-box;
                color: #fff;
                outline: none;
                font-size: 18px;
            }

            .search__logo {
                width: 20px;
                height: 20px;
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                cursor: pointer;
            }
        `;
        
        // Write the inside of the nav tag element
        div.innerHTML = `
            <div class="search__input__wrapper">
                <img src="${SearchLogo}" class="search__logo">
                <input class="search__input" placeholder="${placeholder}">
            </div>
            <div class="search__result__wrapper"></div>
        `;

        // Attach the created elements to the shadow DOM
        shadowRoot.appendChild(style);
        shadowRoot.appendChild(div);
    }

    connectedCallback() {
        const searchData = document.querySelector('app-search').shadowRoot.querySelector('.search__input');
            
        document.addEventListener('keyup', () => {
            // Our API limit search to minimum 3 characters
            
            if (searchData.value.length > 3) {
                // https://javascript.info/dispatch-events
                let event = new CustomEvent('search', {
                    // https://javascript.info/bubbling-and-capturing
                    bubbles: false,
                    detail: {
                        search: searchData.value
                    }
                });

                // To communicate between component, we can't just create custom event and dispatch it
                // If we are dispatching the event on document. The event will never reach the component since events are not sent to every element on the page.
                // In the capture phase the event goes from document down to the event that dispatched it, 
                // Then the bubble phase walks the tree the other direction and goes from the element that dispatched it back towards document.
                // Either your component needs to add its event listener to document or your code would need to change to something like this
                // Source: https://stackoverflow.com/questions/50662528/listen-for-global-events-on-a-web-component
                setTimeout(() => {
                    document.dispatchEvent(event);
                }, 2000)
            }
        })
    }
}

window.customElements.define('app-search', AppSearch);
