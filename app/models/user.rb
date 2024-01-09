class User < ApplicationRecord
  devise :passkey_authenticatable, :rememberable, :confirmable, :timeoutable, :trackable
end
