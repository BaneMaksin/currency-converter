/**
 * Application configuration
 * Author: Branislav Maksin, bane@maksin.net
 * Date: 1.9.2017
 * Copyright: MIT (c) 2017 Branislav Maksin
 * Version: 1.0.0
 */

// Dependencies
import { enableProdMode } from '@angular/core';
import { DEBUG_INFO_ENABLED } from './app.constants';

/**
 * Application configuration
 *
 * @constructor
 */
export function AppConfig() {

    // Disable debug data on prod profile to improve performance
    if (!DEBUG_INFO_ENABLED) {
        enableProdMode();
    }
}
