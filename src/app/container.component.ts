import { Component, Input, ChangeDetectionStrategy,
ComponentFactoryResolver, Type, ViewChild, ViewContainerRef, OnInit, ElementRef, OnDestroy } from '@angular/core';

import { WidgetConfig } from './models';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { tap, delay, filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'container',
  template: `
    <div class="widget" #tile>
      <ng-container #target></ng-container>
      <button (click)="getItem(false)">Refresh Data from Cache</button>
      <button (click)="getItem(true)">Refresh Data from Server</button>
    </div>
  `,
  styleUrls: ['./container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements OnInit, OnDestroy {
  @ViewChild('target', { read: ViewContainerRef, static: true }) target: ViewContainerRef;
  @ViewChild('tile', {static: true}) tile: ElementRef;

  constructor(
    private apiService: ApiService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  @Input() widgetConfig: WidgetConfig;
  @Input() bsub$: BehaviorSubject<any>;

  destroy$ = new Subject<boolean>();

  ngOnInit(): void {

    this.bsub$.pipe(
      filter(data => data && data.id),
      tap(_ => this.tile.nativeElement.style.backgroundColor = 'pink'),
      delay(200),
      tap(_ => this.tile.nativeElement.style.backgroundColor = 'aquamarine'),
      takeUntil(this.destroy$)
    ).subscribe();

    const factories = Array.from(this.componentFactoryResolver['_factories'].keys());
    const type = factories.find((x: any) => x.componentName === this.widgetConfig.widgetName) as Type<Component>;
    const factory = this.componentFactoryResolver.resolveComponentFactory(type);

    const comp = this.target.createComponent(factory);
    (comp as any).instance.bsub$ = this.bsub$;
  }

  getItem(forceRefreshFromServer: boolean) {
    this.apiService.getItems([this.widgetConfig.apiId], forceRefreshFromServer);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
