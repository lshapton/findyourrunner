class CreateRunners < ActiveRecord::Migration
  def change
    create_table :runners do |t|

      t.timestamps null: false
    end
  end
end
