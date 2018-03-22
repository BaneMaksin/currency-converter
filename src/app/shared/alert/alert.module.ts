/**
 * Shared alert module
 * Author: Branislav Maksin, bane@maksin.net
 * Date: 1.9.2017
 * Copyright: UNLICENSED (c) 2017 Branislav Maksin
 * Version: 1.0.0
 */

// Dependencies
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AlertComponent
    ],
    entryComponents: [
        AlertComponent
    ],
    exports: [
        AlertComponent
    ],
    providers: [
        AlertService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AlertModule {}
