/**
 * Currency box data model
 * Author: Branislav Maksin, bane@maksin.net
 * Date: 1.9.2017
 * Copyright: MIT (c) 2017 Branislav Maksin
 * Version: 1.0.0
 */

/**
 * Data interface
 */
export class State {
    constructor(
        public box?: string,
        public currency?: string,
        public disabled?: string,
        public value?: number
    ) {}
}
