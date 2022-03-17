import { PlElement, html, css } from "polylib";

class PlButton extends PlElement {

    static get properties() {
        return {
            label: { type: String, value: 'button' },
            disabled: { type: Boolean, reflectToAttribute: true, observer: 'disabledObserver' },
            variant: { type: String, reflectToAttribute: true, value: 'secondary' },
            size: { type: String, value: 'medium' },
            tabindex: { type: String, value: '0', reflectToAttribute: true },
            hidden: { type: Boolean, reflectToAttribute: true },
            negative: { type: Boolean, reflectToAttribute: true }
        }
    }

    static get css() {
        return css`
            :host {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                padding: 4px 12px;
                height: 32px;
                min-width: fit-content;
                box-sizing: border-box;
                border-radius: 4px;
                color: #FFFFFF;
                user-select: none;
                cursor: pointer;
                outline:none;
                transition: background .3s ease-in-out;
                flex-shrink> 0;
            }

            :host([hidden]) {
                display: none;
            }

            .prefix {
                display: flex;
            }

            .prefix ::slotted(*) {
                margin-right: 8px;
                margin-left: 0px;
                width: 16px;
                height: 16px;
            }

            .suffix {
                display: flex;
            }

            .suffix ::slotted(*) {
                margin-left: 8px;
                margin-right: 0px;
                width: 16px;
                height: 16px;
            }

            /* primary */
            :host([variant=primary]) {
                background: var(--primary-base);
            }

            :host([variant=primary]:hover),
            :host([variant=primary]:focus) {
                background: var(--primary-dark);
            }

            :host([variant=primary]:active) {
                background: var(--primary-darkest);
            }

            /* primary-negative */
            :host([variant=primary][negative]) {
                --primary-base: var(--negative-base);
                --primary-dark: var(--negative-dark);
                --primary-darkest: var(--negative-darkest);
            }

            /* secondary */
            :host([variant=secondary]) {
                background: var(--primary-lightest);
                color: var(--primary-base);
                border: 1px solid var(--primary-light);
            }

            :host([variant=secondary]:hover),:host([variant=secondary]:focus) {
                background: var(--primary-light);
                color: var(--primary-dark);
                border: 1px solid var(--primary-light);
            }

            :host([variant=secondary]:active) {
                background: var(--primary-light);
                color: var(--primary-darkest);
                border: 1px solid var(--primary-base);
            }

            /* ghost */
            :host([variant=ghost]) {
                background: transparent;
                color: var(--primary-base);
                border: 1px solid var(--primary-base);
            }

            :host([variant=ghost]:hover),:host([variant=ghost]:focus) {
                border: 1px solid var(--primary-base);
                color: var(--primary-base);
                background: var(--primary-lightest);
            }

            :host([variant=ghost]:active) {
                background: var(--primary-light);
                color: var(--primary-dark);
                border: 1px solid var(--primary-dark);
            }

            /* link */
            :host([variant=link]) {
                background: transparent;
                color: var(--primary-base);
            }

            :host([variant=link]:hover),:host([variant=link]:focus) {
                background: transparent;
                color: var(--primary-dark);
            }

            :host([variant=link]:active) {
                background: transparent;
                color:  var(--primary-darkest);
            }

            /* negative */
            :host([negative]) {
                --primary-base: var(--negative-base);
                --primary-light: var(--negative-light);
                --primary-lightest: var(--negative-lightest);
                --primary-dark: var(--negative-dark);
                --primary-darkest: var(--negative-darkest);
            }

            :host([disabled]) {
                background: var(--grey-light);
                border: none;
                color: var(--grey-dark);
                cursor: not-allowed;
                pointer-events: none;
            }
        `;
    }

    static get template() {
        return html`
            <span class="prefix">
                <slot name="prefix"></slot>
            </span>
            [[label]]
            <span class="suffix">
                <slot name="suffix"></slot>
            </span>
        `
    };

    disabledObserver(disabled) {
        if (disabled) {
            this.tabIndex = -1;
        } else {
            this.tabIndex = 0;
        }
    }
}

customElements.define('pl-button', PlButton);