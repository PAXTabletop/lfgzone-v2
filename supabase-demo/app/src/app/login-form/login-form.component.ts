import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionService } from '../session.service';

class AuthorizationResult {
  success:boolean
  errorMessage: string | null
  constructor(success: boolean, errorMessage: string | null = null) {
    this.success = success
    this.errorMessage = errorMessage
  }
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {
  @Output() authenticationComplete = new EventEmitter();
  error: string | null = null;
  
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private readonly session: SessionService) {}

  ngOnInit(): void {}

  async submit() {
    if (this.form.valid) {
      const {email, password} = this.form.value
      const {success, errorMessage} = await this.login(email, password)
      if (success) {
        this.error = ''
        this.authenticationComplete.emit();
      } else {
        this.error = errorMessage
      }
    } else {
      this.error = "Email and Password are required to login"
    }
  }

  async login(email: string, password: string): Promise<AuthorizationResult> {
    return await this.session.login(email, password)
  }

}