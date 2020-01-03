import { Component, Input, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Data, WidgetBase, Toggle } from './models';
import { BehaviorSubject } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'widget-one',
  template: `
    <ng-container *ngIf="bsub$ | async as info">
      <p><strong> WIDGET ONE </strong></p>
      <span><strong>Id:</strong> {{ info?.id }}</span>
      <p><strong>Data:</strong> {{ info?.title }}</p>
    </ng-container>
  `,
  styleUrls: ['./widget-one.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetOneComponent implements WidgetBase {
  static componentName = 'WidgetOneComponent';
  _data: Data;
  _toggle: Toggle;

  @Input() bsub$: BehaviorSubject<Data>;
}
