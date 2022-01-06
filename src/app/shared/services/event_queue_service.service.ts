import { Injectable } from '@angular/core';
import { AppEventType } from '@shared/constants/app_event';
import { AppEvent } from '@shared/model/app_event_class';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EventQueueService {
  private eventBrocker = new Subject<AppEvent<any>>();

  on(eventType: AppEventType): Observable<AppEvent<any>> {
    return this.eventBrocker.pipe(filter(event => event.type === eventType));
  }

  dispatch<T>(event: AppEvent<T>): void {
    this.eventBrocker.next(event);
  }
}
