/**
 * Main initialization
 * Author: Branislav Maksin, bane@maksin.net
 * Date: 1.9.2017
 * Copyright: UNLICENSED (c) 2017 Branislav Maksin
 * Version: 1.0.0
 */

// Icon fonts generator
import '../../currency.font.js';

// Dependencies
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Application
import { AppConfig } from './app.config';
import { CurrencyAppModule } from './app.module';
AppConfig();

// Bootstrapping the main application module
platformBrowserDynamic().bootstrapModule(CurrencyAppModule);
