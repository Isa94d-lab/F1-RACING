class RaceApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.races = [];
        this.shadowRoot.innerHTML = `
            <add-race-form></add-race-form>
            <race-track-table></race-track-table>
        `;
    }
    
    connectedCallback() {
        this.shadowRoot.addEventListener("add-race", (event) => {
            this.races.push(event.detail);
            this.shadowRoot.querySelector("race-track-table").setData(this.races);
        });
    }
}
customElements.define('race-app', RaceApp);