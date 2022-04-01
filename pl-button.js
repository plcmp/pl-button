import { PlElement, html, css } from "polylib";

class PlButton extends PlElement {

    static get properties() {
        return {
            label: { type: String, value: 'button' },
            disabled: { type: Boolean, reflectToAttribute: true, observer: 'disabledObserver' },
            variant: { type: String, reflectToAttribute: true, value: 'secondary' },
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
                padding: var(--space-xs) var(--space-sm);
                height: var(--base-size-md);
                min-width: fit-content;
                box-sizing: border-box;
                border-radius: var(--border-radius);
                color: var(--primary-lightest);
                user-select: none;
                cursor: pointer;
                outline:none;
                transition: all .3s ease-in-out;
                flex-shrink: 0;
                font: var(--text-font);
            }

            :host([hidden]) {
                display: none;
            }

            .prefix {
                display: flex;
            }

            .prefix ::slotted(*) {
                margin-right: var(--space-sm);
                width: 16px;
                height: 16px;
            }

            .suffix {
                display: flex;
            }

            .suffix ::slotted(*) {
                margin-left: var(--space-sm);
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
                text-decoration: underline;
            }

            :host([variant=link]:hover) ::slotted(*),:host([variant=link]:focus) ::slotted(*){
                filter: drop-shadow(0px 2px 1px rgba(51, 113, 109, 0.4));
            }

            :host([variant=link]:active) {
                background: transparent;
                color:  var(--primary-darkest);
                text-decoration: underline;
            }

            :host([variant=link]:active) ::slotted(*),:host([variant=link]:focus) ::slotted(*){
                filter:none;
            }

            /* negative */
            :host([negative]) {
                --primary-base: var(--negative-base);
                --primary-light: var(--negative-light);
                --primary-lightest: var(--negative-lightest);
                --primary-dark: var(--negative-dark);
                --primary-darkest: var(--negative-darkest);
            }

            :host([disabled][variant="primary"]) {
                background: var(--grey-light);
                border: none;
                color: var(--grey-dark);
                cursor: not-allowed;
                pointer-events: none;
            }

            :host([disabled][variant="secondary"]) {
                border: 1px solid var(--grey-light);
                background: var(--grey-lightest);
                color: var(--grey-dark);
                cursor: not-allowed;
                pointer-events: none;
            }

            :host([disabled][variant="ghost"]) {
                border: 1px solid var(--grey-light);
                background: transparent;
                color: var(--grey-dark);
                cursor: not-allowed;
                pointer-events: none;
            }

            :host([disabled][variant="link"]) {
                border: none
                background: treansparent;
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