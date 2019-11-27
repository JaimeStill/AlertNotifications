import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SnackerService } from './snacker.service';
import { Alert } from '../models';

@Injectable()
export class AlertService {
  private trigger = new BehaviorSubject<Date>(null);
  private alerts = new BehaviorSubject<Alert[]>(null);

  trigger$ = this.trigger.asObservable();
  alerts$ = this.alerts.asObservable();

  constructor(
    private http: HttpClient,
    private snacker: SnackerService
  ) { }

  finalizeTime = (alert: Alert) => alert.trigger.setMinutes(
    alert.trigger.getMinutes() - alert.trigger.getTimezoneOffset()
  );

  getAlerts = () => this.http.get<Alert[]>(`/api/test/getAlerts`)
    .subscribe(
      data => this.alerts.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    );

  testAlertTrigger = (alert: Alert): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post<Date>(`/api/test/testAlertTrigger`, alert)
        .subscribe(
          data => {
            this.trigger.next(data);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          }
        );
    });

  saveAlert = (alert: Alert): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post(`/api/test/saveAlert`, alert)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`Alert successfully saved`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          }
        );
    });
}
