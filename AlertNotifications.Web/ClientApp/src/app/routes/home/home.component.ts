import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services';
import { Alert } from '../../models';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  alert = { trigger: new Date(Date.now()) } as Alert;

  constructor(
    public alerter: AlertService
  ) { }

  ngOnInit() {
    this.alerter.getAlerts();
  }

  saveAlert = async () => {
    this.alerter.finalizeTime(this.alert);
    const res = await this.alerter.saveAlert(this.alert);
    res && this.alerter.getAlerts();
  }
}
