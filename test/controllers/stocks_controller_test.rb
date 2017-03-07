require 'test_helper'

class StocksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @stock = stocks(:one)
  end

  test "should get index" do
    get stocks_url
    assert_response :success
  end

  test "should get new" do
    get new_stock_url
    assert_response :success
  end

  test "should create stock" do
    assert_difference('Stock.count') do
      post stocks_url, params: { stock: { batch_no: @stock.batch_no, company_name: @stock.company_name, exp_date: @stock.exp_date, pkg_size: @stock.pkg_size, qty: @stock.qty, rate: @stock.rate, serial_no: @stock.serial_no, technicl_name: @stock.technicl_name, trade_name: @stock.trade_name } }
    end

    assert_redirected_to stock_url(Stock.last)
  end

  test "should show stock" do
    get stock_url(@stock)
    assert_response :success
  end

  test "should get edit" do
    get edit_stock_url(@stock)
    assert_response :success
  end

  test "should update stock" do
    patch stock_url(@stock), params: { stock: { batch_no: @stock.batch_no, company_name: @stock.company_name, exp_date: @stock.exp_date, pkg_size: @stock.pkg_size, qty: @stock.qty, rate: @stock.rate, serial_no: @stock.serial_no, technicl_name: @stock.technicl_name, trade_name: @stock.trade_name } }
    assert_redirected_to stock_url(@stock)
  end

  test "should destroy stock" do
    assert_difference('Stock.count', -1) do
      delete stock_url(@stock)
    end

    assert_redirected_to stocks_url
  end
end
