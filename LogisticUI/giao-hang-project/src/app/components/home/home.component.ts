import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../../configuration';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    @Inject(AppConfig)
    public router: Router
  ) {}
  ngOnInit() {
  }
}
