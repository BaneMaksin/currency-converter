/**
 * Shared cache service
 * Author: Branislav Maksin, bane@maksin.net
 * Date: 1.9.2017
 * Copyright: MIT (c) 2017 Branislav Maksin
 * Version: 1.0.0
 */

// Dependencies
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class CacheService {

    /**
     * Set data into local storage
     *
     * @param {string} key
     * @param data
     */
    set(key: string, data: any = {}): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * Get data from local storage
     *
     * @param {string} key
     * @returns {string}
     */
    get(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }

    /**
     * Remove data from local storage
     *
     * @param {string} key
     */
    remove(key: string) {
        localStorage.removeItem(key);
    }

    /**
     * Validate cache by it timestamp
     *
     * @param key
     * @param timestamp
     * @returns {boolean}
     */
    check(key: string, timestamp: number): Boolean {

        // Get cache timestamp
        const storageData = this.get(key);

        // Get dates for validation
        if (storageData) {
            const currentDate = moment.utc(timestamp).hours(6).minutes(0).seconds(0);
            const tomorrowDate = currentDate.clone().add(1, 'days');
            const yesterdayDate = currentDate.clone().subtract(1, 'days');
            const cacheDate = moment.utc(storageData.timestamp);

            // Validate the cache
            return cacheDate.isAfter(currentDate) ?
                cacheDate.isBetween(currentDate, tomorrowDate) :
                cacheDate.isBetween(yesterdayDate, currentDate);
        } else {
            return false;
        }
    }
}
