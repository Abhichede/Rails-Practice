json.extract! stock, :id, :serial_no, :trade_name, :pkg_size, :technicl_name, :company_name, :batch_no, :exp_date, :qty, :rate, :created_at, :updated_at
json.url stock_url(stock, format: :json)