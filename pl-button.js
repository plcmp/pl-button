import { PlElement, html, css } from "polylib";

class PlButton extends PlElement {
    
    static get properties() {
        return {
            label: { type: String, value: 'button' },
            disabled: { type: Boolean, reflectToAttribute: true, observer: 'disabledObserver' },
            variant: { type: String, value: 'secondary', reflectToAttribute: true },
            size: { type: String, value: 'medium' },
            tabindex: { type: String, value: '0', reflectToAttribute: true}
        }
    }

    static get css() {
        return css`
            :host {
                display: inline-flex;
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
                transition: all .3s ease-in-out;
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

            :host([variant=primary]:hover),:host([variant=primary]:focus) {
                background: var(--primary-dark);
                outline:none;
            }

            :host([variant=primary]:active) {
                background: var(--primary-darkest);
            }

            :host([disabled][variant=primary]) {
                background: var(--grey-light);
                border: none;
                color: var(--grey-dark);
                cursor: not-allowed;
                pointer-events: none;
            }

            /* secondary */
            :host([variant=secondary]) {
                background: var(--white);
                color: var(--primary-base);
                border: 1px solid var(--primary-base);
                
            }

            :host([variant=secondary]:hover),:host([variant=secondary]:focus) {
                background: var(--primary-lightest);
                border: 1px solid var(--primary-dark);
                box-sizing: border-box;
                outline:none;
            }

            :host([variant=secondary]:active) {
                background: var(--primary-light);
                border: 1px solid var(--primary-darkest);
                color:  var(--primary-darkest);
                box-sizing: border-box;
            }

            :host([disabled][variant=secondary]) {
                background: var(--grey-light);
                border: 1px solid var(--grey-light);
                color: var(--grey-dark);
                cursor: not-allowed;
                pointer-events: none;
            }

            /* ghost */
            :host([variant=ghost]) {
                background: transparent;
                color: var(--black-base);
                border: 1px solid var(--grey-base);
            }

            :host([variant=ghost]:hover),:host([variant=ghost]:focus) {
                border: 1px solid var(--grey-dark);
                background: var(--grey-lightest);
                box-sizing: border-box;
                outline:none;
            }

            :host([variant=ghost]:active) {
                background: var(--grey-light);
                border: 1px solid var(--grey-darkest);
                color:  var(--primary-darkest);
                box-sizing: border-box;
            }

            :host([disabled][variant=ghost]) {
                background: transparent;
                border: 1px solid var(--grey-light);
                color: var(--grey-dark);
                cursor: not-allowed;
                pointer-events: none;
            }

            /* link */
            :host([variant=link]) {
                background: transparent;
                color: var(--primary-base);
                border: 1px solid transparent;
            }

            :host([variant=link]:hover),:host([variant=link]:focus) {
                background: transparent;
                color: var(--primary-dark);
                border: 1px solid transparent;
                outline:none;
            }

            :host([variant=link]:active) {
                background: transparent;
                color:  var(--primary-darkest);
                border: 1px solid transparent;
            }

            :host([disabled][variant=link]) {
                background: transparent;
                border: 1px solid var(--grey-light);
                color: var(--grey-dark);
                cursor: not-allowed;
                pointer-events: none;
            }

            /* negative */
            :host([variant=negative]) {
                background: var(--negative-base);
            }

            :host([variant=negative]:hover),:host([variant=negative]:focus) {
                background: var(--negative-dark);
                outline:none;
            }

            :host([variant=negative]:active) {
                background: var(--negative-darkest);
            }

            :host([disabled][variant=negative]) {
                background: var(--grey-light);
                border: none;
                color: var(--grey-dark);
                cursor: not-allowed;
                pointer-events: none;
            }`;
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

    disabledObserver(disabled){
        if(disabled.value) {
            this.tabIndex = -1;
        } else {
            this.tabIndex = 0;
        }
    }
}

customElements.define('pl-button', PlButton);