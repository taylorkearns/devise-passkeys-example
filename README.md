# README

## Running the example

Install dependencies: 

```sh
bundle
```

Follow the instructions (here)[https://admin.passwordless.dev/signup] to create a Passwordless.dev account with Bitwarden. Then create your free application. You will be given three values: An API URL, an API private key, and an API public key. Create a .env file and provide these values:

```env
BITWARDEN_PASSWORDLESS_API_URL=
BITWARDEN_PASSWORDLESS_API_PRIVATE_KEY=
BITWARDEN_PASSWORDLESS_API_PUBLIC_KEY=
```

Ensure you have Postgresql installed and running locally. Then run:

```sh
rails db:create
rails db:migrate
rails s
```


## Adding passkeys to a Rails 7 app.

1. Install [Devise](https://github.com/heartcombo/devise/tree/main]). You can optionally remove the password field before running the migration.
2. Install the [Bitwarden Passwordless.dev JS client](https://docs.passwordless.dev/guide/frontend/javascript.html) using your choice of package manager. The example uses `import-maps`
3. Add the Devise module and strategy from `lib/devise` in the example
4. [Generate the Devise controller](https://github.com/heartcombo/devise?tab=readme-ov-file#configuring-controllers) for `sessions` and configure your routes like so:
```ruby
  devise_for :users, controllers: {
    sessions: "users/sessions"
  }
```
5. Replace the contents of `app/controllers/users/sessions.rb` with the contents of the same file in the example
6. Add the Stimulus controller in `app/javascript/controllers/passwordless_controller.js`
7. [Generate the Devise views](https://github.com/heartcombo/devise?tab=readme-ov-file#configuring-views). Take the view for a new session and replace it with the contents of `app/views/devise/sessions/new.html.erb` in the example
8. Navigate to your new combined signup/login page and test it out.
