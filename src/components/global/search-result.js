import SearchItem from 'Api/search.api';

class AppSearchResult extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Component state
        this._state = {
            item: []
        }

        // Create <div class="search__result"></div> tag
        const div = document.createElement('div');
        div.setAttribute('class', 'search__result');

        // Write some css to be applied to the shadow dom
        // This style will only be applied within this component
        const style = document.createElement('style');

        style.textContent = `
            .search__loading {
                display: none;
            }

            .search__loading_active {
                display: block;
            }
        `;

        div.innerHTML = `
            <app-loading class="search__loading"></app-loading>
        `;

        // Attach the created elements to the shadow DOM
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(div);
    }

    connectedCallback() {
        document.addEventListener('search', (event) => {
            const searchString = event.detail.search;
            if (searchString.length > 3) {
                const loadingElement = this.shadowRoot.querySelector('.search__loading');
                loadingElement.classList.add('search__loading_active');
            }

            this.callSearchApi(searchString);
        })
    }

    async callSearchApi(query) {
        const searchItem = new SearchItem(1);
        const response = await searchItem.getSearchResult(query);
        this._state.item = response;
        // When finish calling API, we remove loading component
        if (response) {
            console.log(response)
            const loadingElement = this.shadowRoot.querySelector('.search__loading');
            loadingElement.classList.remove('search__loading_active');
        }
        this.loopItemtoView();
    }

    loopItemtoView() {
         // Create <div class="top__wrapper"></div> tag
         const div = document.createElement('div');
         let stateItem = this._state.item;
         div.setAttribute('class', 'search__item__wrapper');
 
         // Loop through item in state
         // And bind the data to another component
         // After that we will have to put that component inside <div class="top__wrapper"></div> that we created earlier
         stateItem.forEach(item => {
             div.innerHTML += `<app-card title="${item.title}" item-id="${item.mal_id}" image="${item.image_url}"></app-card>`
         })

         console.log(div)
 
         // Render the div
         this.displayView(div)
    }

    displayView(template) {
        // Create <div class="search__result"></div> tag
        const div = document.createElement('div');
        div.setAttribute('class', 'search__result');

        // Write some css to be applied to the shadow dom
        // This style will only be applied within this component
        const style = document.createElement('style');

        style.textContent = `
            .search__loading {
                display: none;
            }

            .search__loading_active {
                display: block;
            }

            .search__item__wrapper {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: 10px;
            }
        `;

        div.innerHTML = `
            <app-loading class="search__loading"></app-loading>
        `;

        // Attach the created elements to the shadow DOM
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(div);

        const searchElement = this.shadowRoot.querySelector('.search__result');
        searchElement.appendChild(template);
    }
}

window.customElements.define('app-search-result', AppSearchResult);
