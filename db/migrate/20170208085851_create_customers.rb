class CreateCustomers < ActiveRecord::Migration[5.0]
  def change
    create_table :customers do |t|
      t.string :name
      t.string :email
      t.text :address
      t.string :cantact

      t.timestamps
    end
  end
end
