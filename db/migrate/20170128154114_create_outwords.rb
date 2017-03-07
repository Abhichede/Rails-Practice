class CreateOutwords < ActiveRecord::Migration[5.0]
  def change
    create_table :outwords do |t|
      t.string :serial_no
      t.string :trade_name
      t.string :rate
      t.string :qty
      t.string :discount
      t.string :vat
      t.datetime :created_at
      t.datetime :updates_at

      t.timestamps
    end
  end
end
