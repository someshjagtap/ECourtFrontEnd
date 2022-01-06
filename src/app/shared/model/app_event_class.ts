import { AppEventType } from '@shared/constants/app_event';

export class AppEvent<T> {
  constructor(public type: AppEventType, public payload: T) {}
}
