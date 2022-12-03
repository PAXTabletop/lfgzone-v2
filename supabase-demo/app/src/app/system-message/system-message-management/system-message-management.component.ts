import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SystemMessage } from 'src/app/interfaces';
import { SessionService } from '../../session.service';

@Component({
  selector: 'app-system-message-management',
  templateUrl: './system-message-management.component.html',
  styleUrls: ['./system-message-management.component.css']
})
export class SystemMessageManagementComponent implements OnInit {
  errorMessage: string = '';
  form: FormGroup = new FormGroup({
    active: new FormControl(false),
    message: new FormControl('', Validators.required)
  });
  loading: boolean = true;

  constructor(private readonly session: SessionService) {}
  
  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.errorMessage = '';
    this.startLoading();
    const systemMessage = await this.session.getSystemMessage();
    this.form.setValue({
      message: systemMessage.message,
      active: systemMessage.active
    });
    this.stopLoading();
  }

  async submit() {
    if (!this.form.valid) {
      this.errorMessage = "System Message is required required. Uncheck the box to hide the message.";
      return;
    }
    this.startLoading();
    const response = await this.session.updateSystemMessage(this.form.value as SystemMessage)
    if (response?.message) {
      this.errorMessage = "Error saving message: " + response?.message;
      this.stopLoading();
    } else {
      this.loadData();
    }
  }

  startLoading() {
    this.loading = true;
    this.form.disable({emitEvent: false});
  }

  stopLoading() {
    this.loading = false;
    this.form.enable({emitEvent: false});
  }

  cancel() {
    this.loadData();
  }
}