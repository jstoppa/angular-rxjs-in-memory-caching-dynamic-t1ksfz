import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Data, WidgetBase, Toggle } from './models';
import { BehaviorSubject } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'widget-two',
  template: `
    <ng-container *ngIf="bsub$ | async as info">
      <p><strong> WIDGET TWO </strong></p>
      <span><strong>Id:</strong> {{ info?.id }}</span>
      <p><strong>Data:</strong> {{ info?.title }}</p>
    </ng-container>
  `,
  styleUrls: ['./widget-two.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetTwoComponent implements WidgetBase  {
  static componentName = 'WidgetTwoComponent';
  _data: Data;
  _toggle: Toggle;

  @Input() bsub$: BehaviorSubject<any>;

}
