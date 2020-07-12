class CreatePositions < ActiveRecord::Migration[6.0]
  def change
    create_table :positions do |t|
      t.bigint :x
      t.bigint :y

      t.timestamps
    end
  end
end
