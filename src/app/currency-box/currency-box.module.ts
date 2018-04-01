/**
 * Main module
 * Author: Branislav Maksin, bane@maksin.net
 * Date: 1.9.2017
 * Copyright: MIT (c) 2017 Branislav Maksin
 * Version: 1.0.0
 */

// Dependencies
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared';

// Currency box
import { CurrencyBoxComponent } from './currency-box.component';
import { CreateArrayPipe } from './create-array.pipe';
import { LocalizePipe } from './localize.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        CurrencyBoxComponent,
        CreateArrayPipe,
        LocalizePipe
    ],
    entryComponents: [
        CurrencyBoxComponent
    ],
    exports: [
        CurrencyBoxComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CurrencyBoxModule {}
