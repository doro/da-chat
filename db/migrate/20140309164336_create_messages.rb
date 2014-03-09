class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :user_name
      t.datetime :timestamp
      t.string :txt

      t.timestamps
    end
  end
end
