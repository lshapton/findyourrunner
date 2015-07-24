class AddIconUrlToRunner < ActiveRecord::Migration
  def change
    add_column :runners, :icon_url, :string
  end
end
