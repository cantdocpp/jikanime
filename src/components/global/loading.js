class AppLoading extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Create <div class="search"></div> tag
        const div = document.createElement('div');
        div.setAttribute('class', 'loading');

        // Write some css to be applied to the shadow dom
        // This style will only be applied within this component
        const style = document.createElement('style');

        style.textContent = `
            .loading {
                font-size: 20px;
            }
        `;
        div.innerHTML = `
            <div class="loading">
                Loading...
            </div>
        `;

        // Attach the created elements to the shadow DOM
        shadowRoot.appendChild(style);
        shadowRoot.appendChild(div);
    }
}

window.customElements.define('app-loading', AppLoading);
