class RenameCustomersContactColumn < ActiveRecord::Migration[5.0]
  def change
    rename_column :customers, :cantact, :contact
  end
end
