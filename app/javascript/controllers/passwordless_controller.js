import { Controller } from "@hotwired/stimulus"
import { Client } from '@passwordlessdev/passwordless-client';


export default class extends Controller {
  static targets = [ "email" ]

  connect() {
    this.client = new Client({ apiKey: window.VAULT_ENV.BITWARDEN_PASSWORDLESS_API_PUBLIC_KEY });
    this.csrf_token = document.querySelector('meta[name="csrf-token"]').content
  }

  async register() {
    const email = this.emailTarget.value
    const { token: registerToken } = await fetch('/api/registrations', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
      })
    }).then(r => r.json())

    const { token, error } = await this.client.register(registerToken)
    
    if (token) {
      await this.verifyUser(token)
    }

    if (error) {
      console.log(error)
    }
  }

  async login() {
    // Generate a verification token for the user.
    const { token, error } = await this.client.signinWithAlias(this.emailTarget.value);

    if (token) {
      await this.verifyUser(token)
    }
  }

  async verifyUser(token) {
    const verifiedUser = await fetch('/users/sign_in', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        token,
        authenticity_token: this.csrf_token
      })
    }).then((r) => r.json());

    if (verifiedUser.id) {
      window.location.reload()
    }
  }
}
