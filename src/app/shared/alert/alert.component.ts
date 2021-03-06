/**
 * Alert component for displaying messages
 * Author: Branislav Maksin, bane@maksin.net
 * Date: 1.9.2017
 * Copyright: MIT (c) 2017 Branislav Maksin
 * Version: 1.0.0
 */

// Dependencies
import { Component, Input } from '@angular/core';

// Alert
import { AlertService } from './alert.service';
import { Alert } from './alert.model';

// Component
@Component({
    selector: 'app-alert',
    templateUrl: 'alert.component.html',
    styleUrls: [
        './alert.component.scss'
    ],
})

/**
 * Alert component
 */
export class AlertComponent {

    // Inputs
    @Input() alerts: Alert[];

    /**
     * Class constructor
     * @constructor
     */
    constructor(
        private alertService: AlertService
    ) {
        this.alerts = alertService.list();
    }

    /**
     * Reset and close messages
     */
    close(): void {
        this.alerts.length = 0;
    }
}
