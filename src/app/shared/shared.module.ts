/**
 * Shared module
 * Author: Branislav Maksin, bane@maksin.net
 * Date: 1.9.2017
 * Copyright: MIT (c) 2017 Branislav Maksin
 * Version: 1.0.0
 */

// Dependencies
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Shared services
import { CacheService } from './cache';

// Shared components
import { AlertModule, AlertComponent, AlertService } from './alert';

@NgModule({
    imports: [
        AlertModule
    ],
    providers: [
        CacheService,
        AlertService
    ],
    exports: [
        AlertComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModule {}
