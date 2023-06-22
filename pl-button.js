import { PlElement, html, css } from "polylib";

/**
 * @summary Buttons represent actions that are available to the user.
 * @documentation https://plcmp.github.io/docs/#/components/pl-button
 */
export default class PlButton extends PlElement {
    static properties = {
        /**
        * The button's label
        * @type {string}
        */
        label: { type: String },
        /**
         * The button's disabled state.
         * Reflects to attribute.
         * @type {boolean}
        */
        disabled: { type: Boolean, reflectToAttribute: true, observer: 'disabledObserver' },
        /**
         * The button's visual variant.
         * Reflects to attribute.
         * @type {string}
         * @allowedvalues `primary | secondary | ghost | link`
         * @defaultvalue `secondary`
        */
        variant: { type: String, reflectToAttribute: true, value: 'secondary' },
        /**
         * The button's hidden state.
         * Reflects to attribute.
         * @type {boolean}
        */
        hidden: { type: Boolean, reflectToAttribute: true },
        /**
         * The button's negative state.
         * Reflects to attribute.
         * @type {boolean}
        */
        negative: { type: Boolean, reflectToAttribute: true },
        /**
         * The button's loading state.
         * Reflects to attribute.
         * @type {boolean}
        */
        loading: { type: Boolean, reflectToAttribute: true, observer: 'disabledObserver' }
    }

    static css = css`
            :host {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 var(--space-sm);
                box-sizing: border-box;
                width: fit-content;
                height: var(--base-size-md);
                background: var(--primary-base);
                color: var(--background-color);
                border: 1px solid var(--primary-base);
                border-radius: var(--border-radius);
                font: var(--text-font);
                flex-shrink: 0;
                overflow: hidden;
                outline: none;
                user-select: none;
                cursor: pointer;
                transition: background .3s ease-in-out, border .3s ease-in-out, color .3s ease-in-out;;
            }

            :host([hidden]) {
                display: none;
            }

            :host([disabled]) {
                cursor: not-allowed;
                color: var(--grey-dark);
            }

            :host([loading]){
                cursor: wait;
            }

            :host ::slotted(*[slot="prefix"]) { padding-inline-end: var(--space-sm) }
            :host ::slotted(*[slot="suffix"]) { padding-inline-start: var(--space-sm) }

            :host([variant=primary]:hover:not([loading],[disabled])),
            :host([variant=primary]:focus-visible:not([loading],[disabled])){
                background: var(--primary-dark);
                border: 1px solid var(--primary-darkest);
            }

            :host([variant=primary]:active:not([loading],[disabled])){
                background: var(--primary-darkest);
                border: 1px solid var(--primary-darkest);
            }
            
            :host([variant=secondary]){
                background: var(--primary-lightest);
                color: var(--primary-base);
                border: 1px solid var(--primary-light);
            }

            :host([variant=secondary]:hover:not([loading],[disabled])),
            :host([variant=secondary]:focus-visible:not([loading],[disabled])){
                background: var(--primary-light);
                color: var(--primary-dark);
                border: 1px solid var(--primary-light);
            }

            :host([variant=secondary]:active:not([loading],[disabled])){
                background: var(--primary-light);
                color: var(--primary-darkest);
                border: 1px solid var(--primary-darkest);
            }

            /* ghost */
            :host([variant=ghost]){
                background: transparent;
                color: var(--primary-base);
                border: 1px solid var(--primary-base);
            }

            :host([variant=ghost]:hover:not([loading],[disabled])),
            :host([variant=ghost]:focus-visible:not([loading],[disabled])){
                background: var(--primary-light);
                color: var(--primary-dark);
                border: 1px solid var(--primary-light);
            }

            :host([variant=ghost]:active:not([loading],[disabled])){
                background: var(--primary-light);
                color: var(--primary-dark);
                border: 1px solid var(--primary-dark);
            }

            /* link */
            :host([variant=link]) {
                background: transparent;
                color: var(--primary-base);
                border: 1px solid transparent;
            }

            :host([variant=link]:hover:not([loading],[disabled])),:host([variant=link]:focus-visible:not([loading],[disabled])){
                background: transparent;
                color: var(--primary-dark);
                text-decoration: underline;
            }

            :host([variant=link]:hover:not([loading],[disabled])) ::slotted(*),
            :host([variant=link]:focus-visible:not([loading],[disabled])) ::slotted(*){
                filter: drop-shadow(0px 2px 1px rgba(51, 113, 109, 0.4));
            }

            :host([variant=link]:active:not([loading],[disabled])){
                background: transparent;
                color:  var(--primary-darkest);
                text-decoration: underline;
            }

            :host([variant=link]:active:not([loading],[disabled])) ::slotted(*){
                filter:none;
            }

            :host([variant="primary"][disabled]), :host([variant="secondary"][disabled]){
                background: var(--grey-light);
                border: 1px solid var(--grey-light);
                color: var(--grey-dark);
            }

            :host([disabled][variant="ghost"]){
                background: transparent;
                border: 1px solid var(--grey-light);
                color: var(--grey-dark);
            }

            :host([disabled][variant="link"]){
                background: transparent;
                color: var(--grey-dark);
                text-decoration: none;
            }

            :host([disabled][variant=link]) ::slotted(*){
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

        `;

    static template = html`
        <slot name="prefix"></slot>
        [[label]]
        <slot></slot>
        <slot name="suffix"></slot>
    `;

    constructor() {
        super();
        this.addEventListener('click', (e) => {
            if (this.disabled || this.loading) {
                e.stopPropagation();
            }
        }, { capture: true });
        
        this.tabIndex = this.tabIndex != -1 ? this.tabIndex : 0;
    }

    disabledObserver(disabled) {
        if (disabled) {
            this.lastTabIndex = this.tabIndex;
            this.tabIndex = -1;
        } else {
            this.tabIndex = this.lastTabIndex;
        }
    }
}

customElements.define('pl-button', PlButton);