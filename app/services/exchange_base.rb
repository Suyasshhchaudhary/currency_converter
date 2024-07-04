require 'httparty'
class ExchangeBase
  extend ActiveModel::Naming

  attr_accessor :original_currency, :target_currency, :original_amount, :exchange_rate, :converted_amount, :errors
  CUSTOM_NAMES = {'base_currency' => 'Original Currency', 'target_currency' => 'Target Currency'}.freeze

  class << self
    def convert(options)
      converter = new(original_currency: options[:original_currency],
                      target_currency: options[:target_currency],
                      original_amount: options[:original_amount])
      converter.convert
      converter
    end

    def human_attribute_name(attr, options = {})
      self::CUSTOM_NAMES[attr.to_s] || super
    end
  end

  def initialize(original_currency:, target_currency:, original_amount:)
    @original_currency = original_currency
    @target_currency = target_currency
    @original_amount = original_amount.to_f
    @errors = ActiveModel::Errors.new(self)
  end

  def success?
    @errors.empty?
  end

  def convert
    response = get_exchange_rate
    response_json = response.parsed_response
    if response.success?
      self.converted_amount = original_amount * conversion_exchange_rate(response_json)
    else
      handle_errors(response_json)
    end
  end


  private
  def get_exchange_rate
    HTTParty.get(url)
  end
end