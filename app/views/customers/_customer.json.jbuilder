json.extract! customer, :id, :name, :email, :address, :cantact, :created_at, :updated_at
json.url customer_url(customer, format: :json)