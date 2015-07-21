class AddCoordinatesToRunner < ActiveRecord::Migration
  def change
    add_column :runners, :latitude, :float
    add_column :runners, :longitude, :float
  end
end
