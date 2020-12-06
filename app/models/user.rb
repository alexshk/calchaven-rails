class User < ApplicationRecord
  validates :email, presence: true
  has_secure_password :password

  def as_json
    out = super
    out.delete("password_digest")
    out
  end
end
