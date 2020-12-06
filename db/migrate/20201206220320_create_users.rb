class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email, collation: 'NOCASE'
      t.string :password_digest
      t.boolean :wants_email

      t.timestamps
    end
    add_index :users, :email, unique: true
  end
end
