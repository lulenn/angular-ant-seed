import {Component, OnInit} from '@angular/core';
import {EnvService} from './_shared/service/global/env.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: any;
  constructor(private envService: EnvService) {}

  ngOnInit() {
    this.title = this.envService.$env;
  }
}
