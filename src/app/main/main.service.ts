/**
 * Main service
 * Author: Branislav Maksin, bane@maksin.net
 * Date: 1.9.2017
 * Copyright: MIT (c) 2017 Branislav Maksin
 * Version: 1.0.0
 */

// Dependencies
import { STORAGE_KEY } from '../app.constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { STORAGE_STATE_KEY } from '../app.constants';
import { AlertService, CacheService } from '../shared';
import * as moment from 'moment';

// Main
import { CurrencyValue, Currency, CacheRates, APIResponse } from './main.model';
import { State } from '../currency-box';

@Injectable()
export class MainService {
    timestamp: number;

    /**
     * Class constructor
     * @constructor
     */
    constructor(
        private http: HttpClient,
        private alertService: AlertService,
        private cacheService: CacheService
    ) {
        this.timestamp = moment.utc().valueOf();
    }

    /**
     * Get daily rates for calculation
     *
     * @returns {Observable<any>}
     */
    getDailyRates(): Observable<any> {

        // Class instance
        const ci = this;

        // Check should we get data from browser storage or via http request
        if (ci.cacheService.check(STORAGE_KEY, ci.timestamp)) {
            return new Observable(observer => {
                observer.next(ci.cacheService.get(STORAGE_KEY));
                observer.complete();
            });
        } else {
            return ci.http.get(`/${API_V}/exchange-rates/`).map(
                (res: Observable<HttpResponse<string>>) => ci._processResponse(res),
                (res: HttpErrorResponse) => ci.alertService.add({
                    message: res.message
                })
            );
        }
    }

    /**
     * Set current boxes state in browser storage
     *
     * @param {State} leftBox
     * @param {State} rightBox
     * @param {string} date
     * @param {number} timestamp
     */
    saveState(leftBox: State, rightBox: State, date: string, timestamp: number): void {
        this.cacheService.set(STORAGE_STATE_KEY, {
            leftBox,
            rightBox,
            date,
            timestamp
        });
    }

    /**
     * Process successful response
     *
     * @param res
     * @returns {CacheRates}
     * @private
     */
    private _processResponse(res: any): CacheRates {

        // Prepare cache data
        let cacheRates: CacheRates = {
            rates: this._filterResponse(res),
            date: res.hasOwnProperty('result') ? res.result.date : '',
            timestamp: this.timestamp
        };

        // Save filtered response into browser storage
        this.cacheService.set(STORAGE_KEY, cacheRates);

        // Return filtered rates
        return cacheRates;
    }


    /**
     * Filter response to retrieve only required currencies
     *
     * @param {APIResponse} res
     * @returns {any}
     */
    private _filterResponse(res: APIResponse): Currency {
        let exchangeRates: Currency = new Currency();

        // Check do we have proper data
        if (res.hasOwnProperty('result')) {

            // Get euro data
            if (res.result.hasOwnProperty('eur')) {
                exchangeRates.eur = this._formatValues(res.result.eur);
            }

            // Get usd data
            if (res.result.hasOwnProperty('usd')) {
                exchangeRates.usd = this._formatValues(res.result.usd);
            }

            // Manually add RSD to list
            exchangeRates.rsd = '';
        }

        // Return formatted values
        return exchangeRates;
    }

    /**
     * Format currency value
     *
     * @param {CurrencyValue} rates
     * @returns {CurrencyValue}
     * @private
     */
    private _formatValues(rates: CurrencyValue): CurrencyValue {
        Object.keys(rates).forEach(key => rates[key] =
            parseFloat(parseFloat(rates[key]).toFixed(2)));
        return rates;
    }
}
