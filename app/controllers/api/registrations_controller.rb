class Api::RegistrationsController < ApplicationApiController
    def create
        user = User.create(new_user_params)
        
        if user.valid?
            res = Excon.post(ENV['BITWARDEN_PASSWORDLESS_API_URL'] + '/register/token', 
                body: JSON.generate({
                    userId: user.id,
                    username: user.email
                }),
                headers: {
                    "ApiSecret" => ENV["BITWARDEN_PASSWORDLESS_API_PRIVATE_KEY"],
                    "Content-Type" => "application/json"
                }
            )
            
            render json: JSON.parse(res.body)
        else
            render json: user.errors
        end
    end

    private

    def new_user_params
        params.require(:registration).permit(:email)
    end
end