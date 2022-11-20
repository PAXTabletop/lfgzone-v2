import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-authorization-required',
  templateUrl: './authorization-required.component.html'
})
export class AuthorizationRequiredComponent implements OnInit {

  constructor(readonly sessionService: SessionService) { }

  ngOnInit(): void {
  }

}
