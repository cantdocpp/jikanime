import TopItem from 'Api/top.api'

class IndexTop extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Component state
        this._state = {
            page: 1,
            item: []
        };
    }

    async connectedCallback() {
        await this.getData();
        this.loopItemToView();

        // Listening to global search event
        // The event was fired in search.js
        document.addEventListener('search', (event) => {
            // Get tag with top class
            const topElement = this.shadowRoot.querySelector('.top');
            // Only if the search input length more than 3, that we want to remove our top
            // Else, it will render the data again
            // This is because the API that we use must have minimum 3 character to run
            if (topElement) {
                topElement.setAttribute('class', 'top_disable');
            }
        })
    }

    async getData() {
        let topPage = this._state.page;
        let topItem = new TopItem(topPage);
        let response = await topItem.getTopAnimeList();
        this._state.item = response.data.top;
        console.log(this._state.item)
    }

    loopItemToView() {
        // Create <div class="top__wrapper"></div> tag
        const div = document.createElement('div');
        let stateItem = this._state.item;
        div.setAttribute('class', 'top__wrapper');

        // Loop through item in state
        // And bind the data to another component
        // After that we will have to put that component inside <div class="top__wrapper"></div> that we created earlier
        stateItem.forEach(item => {
            div.innerHTML += `<app-card title="${item.title}" item-id="${item.mal_id}" image="${item.image_url}"></app-card>`
        })

        // Render the div
        this.displayView(div)
    }

    displayView(template) {
        // Create <div class="top__wrapper"></div> tag
        const div = document.createElement('div');
        div.setAttribute('class', 'top');

        // Write some css to be applied to the shadow dom
        // This style will only be applied within this component
        const style = document.createElement('style');

        style.textContent = `
            .top__loading {
                display: none;
            }

            .top__wrapper {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                grid-row-gap: 30px;
            }

            .top_disable {
                display: none;
            }

            .top__pagination {
                margin-top: 20px;
                display: flex;
            }

            .top__page {
                font-size: 20px;
                font-weight: 500;
                text-transform: capitalize;
                cursor: pointer;
            }

            .top__page_previous {
                justify-content: flex-start;
            }

            .top__page_next {
                ustify-content: flex-end;
            }

            @media (max-width: 700px) {
                .top__wrapper {
                    grid-template-columns: repeat(2, auto);
                }
            }
        `;

        // this prove that we can use another component/ shadow component in another component
        div.innerHTML = `
            <app-loading class="top__loading"></app-loading>
        `;

        // Attach the created elements to the shadow DOM
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(div);

        const topElement = this.shadowRoot.querySelector('.top');
        topElement.appendChild(template)
    }
}

window.customElements.define('index-top', IndexTop);
