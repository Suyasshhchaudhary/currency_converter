class CurrencyConversion < ApplicationRecord
  validates :original_currency, presence: true
  validates :target_currency, presence: true
  validates :original_amount, numericality: { greater_than: 0 }
end
