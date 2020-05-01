class AppCard extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Create <div class="search"></div> tag
        const div = document.createElement('div');
        div.setAttribute('class', 'card');

        // Write some css to be applied to the shadow dom
        // This style will only be applied within this component
        const style = document.createElement('style');

        // Get title and id attribute in the tag
        const title = this.getAttribute('title') || '';
        const id = this.getAttribute('item-id') || 1;
        const imageUrl = this.getAttribute('image') || '#';

        style.textContent = `
            .card {
                cursor: pointer;
            }

            .card__title {
                margin-top: 10px;
                font-size: 15px;
                word-wrap: break-word;
            }
        `;

         // Write the inside of the nav tag element
        div.innerHTML = `
            <div class="card__image__wrapper">
                <img src="${imageUrl}" class="card__image" alt="card image">
            </div>
            <div class="card__title">
                ${title}
            </div>
        `;

        // Attach the created elements to the shadow DOM
        shadowRoot.appendChild(style);
        shadowRoot.appendChild(div);
    }
}

window.customElements.define('app-card', AppCard);
