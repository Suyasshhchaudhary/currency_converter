class Api::CurrencyConversionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  def index
    render json: CurrencyConversion.order(created_at: :desc)
  end

  def create
    free_currency_converter = currency_conversion_class.convert(currency_conversion_params)
    currency_conversion = CurrencyConversion.new(currency_conversion_params)
    currency_conversion.converted_amount = free_currency_converter.converted_amount
    currency_conversion.exchange_rate = free_currency_converter.exchange_rate
    if free_currency_converter.success? && currency_conversion.save
      render json: currency_conversion, status: :created
    else
      render json: (free_currency_converter.errors || currency_conversion.errors).full_messages.join(','), status: :unprocessable_entity
    end
  end

  def show
    render json: CurrencyConversion.find(params[:id])
  end

  def available_exchanges
    render json: get_available_exchanges, status: :ok
  end

  private

  def currency_conversion_params
    params.require(:currency_conversion).permit(:original_currency, :target_currency, :original_amount)
  end

  def currency_conversion_class
    "Exchanges::#{params[:exchange]}".classify.constantize rescue Exchanges::FreeCurrency
  end

  def get_available_exchanges
    exchange_directory = Rails.root.join('app','services', 'exchanges')
    Dir.entries(exchange_directory).map { |f| !File.directory?(f) ? File.basename(f, File.extname(f)).camelcase : nil }.compact
  end
end

