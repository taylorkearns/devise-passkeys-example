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

1. Install [Devise](https://github.com/heartcombo/devise/tree/main) and associate it to a `User` model. You can optionally remove the password field before running the migration.
2. Install the [Bitwarden Passwordless.dev JS client](https://docs.passwordless.dev/guide/frontend/javascript.html) using your choice of package manager. The example uses `import-maps`.
3. Add the Devise module and strategy from [lib/devise](https://github.com/JackVCurtis/devise-passkeys-example/tree/main/lib/devise) in this example.
4. [Generate the Devise controller](https://github.com/heartcombo/devise?tab=readme-ov-file#configuring-controllers) for `sessions` and configure your routes like so:

```ruby
  devise_for :users, controllers: {
    sessions: "users/sessions"
  }
```

5. Replace the contents of `app/controllers/users/sessions.rb` with the contents of the [matching file](https://github.com/JackVCurtis/devise-passkeys-example/blob/main/app/controllers/users/sessions_controller.rb) in this example.
6. Add the [Stimulus controller](https://github.com/JackVCurtis/devise-passkeys-example/blob/main/app/javascript/controllers/passwordless_controller.js) in `app/javascript/controllers/passwordless_controller.js`.
7. Navigate to your new combined signup/login page and test it out.
