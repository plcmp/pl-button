import { PlElement, html, css } from "polylib";

class PlButton extends PlElement {
    static properties = {
        label: { type: String, value: 'button' },
        disabled: { type: Boolean, reflectToAttribute: true, observer: 'disabledObserver' },
        variant: { type: String, reflectToAttribute: true, value: 'secondary' },
        tabindex: { type: String, value: '0', reflectToAttribute: true },
        hidden: { type: Boolean, reflectToAttribute: true },
        negative: { type: Boolean, reflectToAttribute: true }
    }

    static css = css`
            :host {
                outline:none;
                display: block;
                user-select: none;
                font: var(--text-font);
                --pl-button-background: var(--primary-base);
                --pl-button-color: var(--primary-lightest);
                --pl-button-border: 1px solid var(--primary-base);
            }

            :host([hidden]) {
                display: none;
            }

            :host([disabled]) {
                cursor: not-allowed;
                --pl-button-color: var(--grey-dark);
            }

            :host([disabled]) .wrapper{
                pointer-events: none;
            }

            /* negative */
            :host([negative]) {
                --primary-base: var(--negative-base);
                --primary-light: var(--negative-light);
                --primary-lightest: var(--negative-lightest);
                --primary-dark: var(--negative-dark);
                --primary-darkest: var(--negative-darkest);
            }

            :host .wrapper {
                display: flex;
                align-items: center;
                justify-content: center;
                height: var(--base-size-md);
                border-radius: var(--border-radius);
                border: var(--pl-button-border);
                cursor: pointer;
                padding: var(--space-xs) var(--space-sm);
                box-sizing: border-box;
                background: var(--pl-button-background);
                color: var(--pl-button-color);
                transition: background .3s ease-in-out;
            }

            ::slotted(*) {
                width: 16px;
                height: 16px;
            }

            ::slotted(*:last-of-type[slot="prefix"]) { padding-right: 8px }
            ::slotted(*:first-of-type[slot="suffix"]) { padding-left: 8px }

            :host([variant=primary]) .wrapper:hover,
            :host([variant=primary]) .wrapper:focus{
                --pl-button-background: var(--primary-dark);
            }

            :host([variant=primary]) .wrapper:active{
                --pl-button-background: var(--primary-darkest);
            }
            
            :host([variant=secondary]) .wrapper{
                --pl-button-background: var(--primary-lightest);
                --pl-button-color: var(--primary-base);
                --pl-button-border: 1px solid var(--primary-light);
            }

            :host([variant=secondary]) .wrapper:hover,
            :host([variant=secondary]) .wrapper:focus{
                --pl-button-background: var(--primary-light);
                --pl-button-color: var(--primary-dark);
                --pl-button-border: 1px solid var(--primary-light);
            }

            :host([variant=secondary]) .wrapper:active{
                --pl-button-background: var(--primary-light);
                --pl-button-color: var(--primary-darkest);
                --pl-button-border: 1px solid var(--primary-base);
            }

            /* ghost */
            :host([variant=ghost]) .wrapper{
                --pl-button-background: transparent;
                --pl-button-color: var(--primary-base);
                --pl-button-border: 1px solid var(--primary-base);
            }

            :host([variant=ghost]) .wrapper:hover,
            :host([variant=ghost]) .wrapper:focus{
                --pl-button-background: var(--primary-light);
                --pl-button-color: var(--primary-dark);
                --pl-button-border: 1px solid var(--primary-light);
            }

            :host([variant=ghost]) .wrapper:active{
                --pl-button-background: var(--primary-light);
                --pl-button-color: var(--primary-dark);
                --pl-button-border: 1px solid var(--primary-dark);
            }

            /* link */
            :host([variant=link]) {
                --pl-button-background: transparent;
                --pl-button-color: var(--primary-base);
                --pl-button-border: 1px solid transparent;
            }

            :host([variant=link]) .wrapper:hover,:host([variant=link]) .wrapper:focus{
                --pl-button-background: transparent;
                --pl-button-color: var(--primary-dark);
                text-decoration: underline;
            }

            :host([variant=link]) .wrapper:hover ::slotted(*),:host([variant=link]) .wrapper:focus ::slotted(*){
                filter: drop-shadow(0px 2px 1px rgba(51, 113, 109, 0.4));
            }

            :host([variant=link]) .wrapper:active{
                --pl-button-background: transparent;
                --pl-button-color:  var(--primary-darkest);
                text-decoration: underline;
            }

            :host([variant=link]:active) ::slotted(*){
                filter:none;
            }

            :host([variant="primary"][disabled]) .wrapper, :host([variant="secondary"][disabled]) .wrapper{
                --pl-button-background: var(--grey-light);
                --pl-button-border: 1px solid var(--grey-light);
                --pl-button-color: var(--grey-dark);
            }

            :host([disabled][variant="ghost"]) .wrapper{
                --pl-button-border: 1px solid var(--grey-light);
                --pl-button-color: var(--grey-dark);
            }

            :host([disabled][variant="link"]) .wrapper{
                --pl-button-color: var(--grey-dark);
            }

            :host([disabled][variant=link]) ::slotted(*){
                filter:none;
            }
        `;

    static template = html`
        <div class="wrapper">
            <slot name="prefix"></slot>
            [[label]]
            <slot></slot>
            <slot name="suffix"></slot>
        </div>
    `;

    constructor() {
        super();
        this.addEventListener('click', (e) => {
            if(this.disabled) {
                e.stopPropagation();
            }
        }, { capture: true })
    }

    disabledObserver(disabled) {
        if (disabled) {
            this.tabIndex = -1;
        } else {
            this.tabIndex = 0;
        }
    }
}

customElements.define('pl-button', PlButton);