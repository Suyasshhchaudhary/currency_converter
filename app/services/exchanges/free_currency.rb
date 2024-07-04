class Exchanges::FreeCurrency < ExchangeBase
  API_KEY = Rails.application.credentials.currency_api_key
  BASE_URL = 'https://api.freecurrencyapi.com/v1/latest'

  private

  def url
    "#{BASE_URL}?apikey=#{API_KEY}&base_currency=#{original_currency}"
  end

  def conversion_exchange_rate(response_json)
    errors.add(:target_currency, "Exchange rate not available") unless response_json['data'][target_currency]
    @exchange_rate = response_json['data'][target_currency].to_f
  end

  def handle_errors(response_json)
    response_json['errors'].each_pair do |key, value|
      errors.add(key, value.join(', '))
    end
  end
end
