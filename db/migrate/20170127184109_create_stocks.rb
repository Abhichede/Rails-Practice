class CreateStocks < ActiveRecord::Migration[5.0]
  def change
    create_table :stocks do |t|
      t.string :serial_no
      t.string :trade_name
      t.string :pkg_size
      t.string :technicl_name
      t.string :company_name
      t.string :batch_no
      t.date :exp_date
      t.integer :qty
      t.integer :rate

      t.timestamps
    end
  end
end
