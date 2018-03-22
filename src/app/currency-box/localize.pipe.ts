/**
 * Currency box pipe for localize input string
 * Author: Branislav Maksin, bane@maksin.net
 * Date: 1.9.2017
 * Copyright: UNLICENSED (c) 2017 Branislav Maksin
 * Version: 1.0.0
 */
import { Pipe, PipeTransform } from '@angular/core';

// Pipe name
@Pipe({
    name: 'localize'
})

/**
 * Pipe class declaration
 */
export class LocalizePipe implements PipeTransform {

    /**
     * Convert objects into array
     *
     * @param input {string} Input
     * @param args {array} Optional params
     * @returns {string} Localize string
     */
    transform(input, args: string[]): string {
        return input.toLocaleString();
    }
}
