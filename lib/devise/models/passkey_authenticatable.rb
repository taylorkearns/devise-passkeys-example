require Rails.root.join('lib/devise/strategies/passkey_authenticatable')

module Devise  
    module Models  
        module PasskeyAuthenticatable  
            extend ActiveSupport::Concern  
        end  
    end
end