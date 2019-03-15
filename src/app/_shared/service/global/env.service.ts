import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EnvService {
  public env = {};
  public $env: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient) { }

  initialize() {
    return this.http.get('assets/deploy/env.json').pipe(
      tap(response => this.env = {...response}),
      tap(response => this.$env.next({...response})),
    );
  }
}
