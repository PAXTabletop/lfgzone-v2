import { Component, OnInit } from '@angular/core';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js'
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private supabase: SupabaseClient
  email = "user@email.com"
  password = "123123"
  loggedIn = false

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    )
    this.loggedIn = !!this.supabase.auth.user()
  }

  ngOnInit(): void {
  }

  async createUser() {
    const { data: user, error } = await this.supabase.auth.api.createUser({
      email: this.email,
      password: this.password,
      email_confirm: true,
    })
    if (error) {
      alert(error.message)
    } else {
      alert('User created')
    }
  }

  async login() {
    const { user, error } = await this.supabase.auth.signIn({
      email: this.email,
      password: this.password
    })
    if (error) {
      alert(error.message)
    } else {
      this.loggedIn = true
    }
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut()
    if (error) {
      alert(error.message)
    } else {
      this.loggedIn = false
      location.reload()
    }
  }

}
