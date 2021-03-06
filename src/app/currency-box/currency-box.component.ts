/**
 * Currency box component
 * Author: Branislav Maksin, bane@maksin.net
 * Date: 1.9.2017
 * Copyright: MIT (c) 2017 Branislav Maksin
 * Version: 1.0.0
 */

// Dependencies
import { Component, Input, Output, EventEmitter } from '@angular/core';

// Main
import { CacheRates } from '../main';

// Currency box
import { State } from './currency-box.model';

/**
 * Component declaration
 */
@Component({
    selector: 'app-currency-box',
    templateUrl: './currency-box.component.html',
    styleUrls: [
        './currency-box.component.scss'
    ]
})

/**
 * Currency box class
 */
export class CurrencyBoxComponent {
    error: Boolean;

    // Inputs
    @Input() currencies: CacheRates;
    @Input() init: State;

    // Output
    @Output() state: EventEmitter<State> = new EventEmitter<State>();

    /**
     * Emit changes
     */
    onChange(): void {

        // Check do we have a valid number as input
        if (this.init.value && isNaN(this.init.value)) {
            this.error = true;
        } else {
            this.error = false;
            this.state.emit(this.init);
        }
    }
}
