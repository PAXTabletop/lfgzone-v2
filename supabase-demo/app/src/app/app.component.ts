import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { AppState } from './_store/app.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
