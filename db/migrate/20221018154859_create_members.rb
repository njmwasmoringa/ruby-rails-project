class CreateMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :members do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.float :total_contribution, default: 0
      t.string :physical_address
      t.boolean :is_active, default: true

      t.timestamps
    end
  end
end
