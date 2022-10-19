class CreateContributions < ActiveRecord::Migration[7.0]
  def change
    create_table :contributions do |t|
      t.integer :member_id
      t.float :amount
      t.datetime :date

      t.timestamps
    end
  end
end
