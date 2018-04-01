/**
 * Main data model
 * Author: Branislav Maksin, bane@maksin.net
 * Date: 1.9.2017
 * Copyright: MIT (c) 2017 Branislav Maksin
 * Version: 1.0.0
 */

// Currency box
import { State } from '../currency-box';

// Values constant
export class CurrencyValue {
    constructor(
        public kup: number,
        public sre: number,
        public prod: number
    ) {}
}

/**
 * Currency interface
 */
export class Currency {
    constructor(
        public eur?: CurrencyValue,
        public usd?: CurrencyValue,
        public rsd?: string
    ) {}
}

/**
 * Rates interface
 */
export class CacheRates {
    constructor(
        public rates?: Currency,
        public date?: string,
        public timestamp?: number
    ) {}
}

/**
 * Box states interface
 */
export class CacheState {
    constructor(
        public leftBox?: State,
        public rightBox?: State,
        public date?: string,
        public timestamp?: number
    ) {}
}

/**
 * API response structure
 */
export interface APIResponse {
    code: number;
    result: any;
    status: string;
}
