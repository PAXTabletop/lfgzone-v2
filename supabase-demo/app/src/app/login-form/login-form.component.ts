import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

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
  // Allow the parent to override the client
  @Input() supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );
  @Output() authenticationComplete = new EventEmitter();
  error: string | null = null;
  
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}

  async submit() {
    if (this.form.valid) {
      const {email, password} = this.form.value
      const {success, errorMessage} = await this.login(email, password)
      if (success) {
        this.error = ''
        let loggedIn = this.supabase.auth.user()
        this.authenticationComplete.emit();
      } else {
        this.error = errorMessage
      }
    } else {
      this.error = "Email and Password are required to login"
    }
  }

  async login(email: string, password: string): Promise<AuthorizationResult> {
    const { error } = await this.supabase.auth.signIn({email, password})
    if (error) {
      return new AuthorizationResult(false, error.message)
    } else {
      return new AuthorizationResult(true)
    }
  }

}