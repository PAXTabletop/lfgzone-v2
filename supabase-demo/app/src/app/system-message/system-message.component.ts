import { Component, Input, OnInit } from '@angular/core';
import { SystemMessage } from 'src/app/interfaces';
import { SessionService } from '../session.service';
import { Subject } from "rxjs";

@Component({
  selector: 'app-system-message',
  templateUrl: './system-message.component.html',
  styleUrls: ['./system-message.component.css']
})
export class SystemMessageComponent implements OnInit {
  message = '';
  active = false;
  
  constructor(private readonly session: SessionService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(){
    this.loadData();
  }

  async loadData() {
    const systemMessage = await this.session.getSystemMessage();
    if (systemMessage) {
      this.active = systemMessage.active;
      this.message = systemMessage.message;
    }
  }

}
