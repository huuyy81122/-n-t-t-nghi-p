import { Component, Input } from '@angular/core';
import * as _ from 'lodash';

interface BreadCrum {
  name: string;
  routerLink: string;
  className: string;
  active: boolean;
  icon: string;
}

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb-router.component.html',
  styleUrls: ['./bread-crumb-router.component.scss']
})

export class BreadCrumbRouterComponent {
  @Input() breadCrumbs: any;

  ngAfterViewInit() {
    if (this.breadCrumbs.length > 0) {
      _.forEach(this.breadCrumbs, function (item: BreadCrum) {
        item.className = item.active ? 'breadcrumb-item active' : 'breadcrumb-item';
      });
    }
  }
}
