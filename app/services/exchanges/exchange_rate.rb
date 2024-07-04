class Exchanges::ExchangeRate < ExchangeBase
  BASE_URL = 'https://open.er-api.com/v6/latest'

  private

  def url
    "#{BASE_URL}/#{original_currency}"
  end

  def conversion_exchange_rate(response_json)
    if response_json['result'] == 'success'
      errors.add(:target_currency, "Exchange rate not available") unless response_json['rates'][target_currency]
      @exchange_rate = response_json['rates'][target_currency].to_f
    else
      errors.add(:base_currency, "The currency code you entered is not supported. Please check and try again.")
      @exchange_rate = 0
    end
  end

  def handle_errors(response_json)
    response_json['errors'].each_pair do |key, value|
      errors.add(key, value.join(', '))
    end
  end
end
