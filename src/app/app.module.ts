/**
 * Main application module
 * Author: Branislav Maksin, bane@maksin.net
 * Date: 1.9.2017
 * Copyright: MIT (c) 2017 Branislav Maksin
 * Version: 1.0.0
 */

// Dependencies
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared';
import { MainModule, MainComponent } from './main';

// Main app module
@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        SharedModule,
        MainModule
    ],
    providers: [
        { provide: Window, useValue: window },
        { provide: Document, useValue: document }
    ],
    bootstrap: [ MainComponent ]
})

export class CurrencyAppModule {}
