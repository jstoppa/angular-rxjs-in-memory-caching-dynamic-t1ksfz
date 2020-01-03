import { Component, AfterViewInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { ApiService } from './api.service';
import { WidgetConfig } from './models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'my-app',
  template: `
    <button (click)="getAllItems(false)">Refresh ALL Data from Cache</button>
    <button (click)="getAllItems(true)">Refresh ALL Data from Server</button>
    <div *ngFor="let widget of widgets">
      <container [bsub$]="bsubs$[widget.apiId]" [widgetConfig]="widget"></container>
    </div>
  `,
  styleUrls: ['./root.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent implements AfterViewInit  {

  constructor(private apiService: ApiService) {}

  widgets = [
  {
    apiId: 1,
    widgetName: 'WidgetOneComponent'
  },
  {
    apiId: 1,
    widgetName: 'WidgetTwoComponent'
  },
  {
    apiId: 2,
    widgetName: 'WidgetOneComponent'
  },
  {
    apiId: 3,
    widgetName: 'WidgetTwoComponent'
  },
  {
    apiId: 4,
    widgetName: 'WidgetOneComponent'
  }] as WidgetConfig[];


  bsubs$ = this.apiService.getSubjects(this.widgets.map( ({apiId}) => apiId));

  ngAfterViewInit() {
   this.getAllItems(true);
  }

  getAllItems(forceRefreshFromServer: boolean) {
    this.getItems(this.widgets.map( ({apiId}) => apiId), forceRefreshFromServer);
  }

  getItems(apiIds: number[], forceRefreshFromServer: boolean) {
    this.apiService.getItems(apiIds, forceRefreshFromServer);
  }

}
