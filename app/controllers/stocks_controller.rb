class StocksController < ApplicationController
  before_action :set_stock, only: [:show, :edit, :update, :destroy]

  # GET /stocks
  # GET /stocks.json
  def index
    @stocks = Stock.all
  end

  # GET /stocks/1
  # GET /stocks/1.json
  def show
  end

  # GET /stocks/new
  def new
    @stock = Stock.new
  end

  # GET /stocks/1/edit
  def edit
  end

  # POST /stocks
  # POST /stocks.json
  def create
    @stock = Stock.new(stock_params)

    respond_to do |format|
      if @stock.save
        format.html { redirect_to @stock, notice: 'Stock was successfully created.' }
        format.json { render :show, status: :created, location: @stock }
      else
        format.html { render :new }
        format.json { render json: @stock.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /stocks/1
  # PATCH/PUT /stocks/1.json
  def update
    respond_to do |format|
      if @stock.update(stock_params)
        format.html { redirect_to @stock, notice: 'Stock was successfully updated.' }
        format.json { render :show, status: :ok, location: @stock }
      else
        format.html { render :edit }
        format.json { render json: @stock.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /stocks/1
  # DELETE /stocks/1.json
  def destroy
    @stock.destroy
    respond_to do |format|
      format.html { redirect_to stocks_url, notice: 'Stock was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def search_stock
    if params[:search]
      @outward =  Stock.find_by(:trade_name => params[:search])
     # Stock.where('trade_name = ? OR serial_no = ?', params[:search], params[:search])
    end

    if @outward
      render json: @outward
      #render partial: 'outwords/table_data'
    else
      render status: :not_found, nothing: true
    end
  end

  def autocomplete

      @outward = Stock.where('trade_name LIKE ?', "%#{params[:term]}%")

      respond_to do |format|
        format.html
        format.json{
          render json: @outward.map(&:trade_name).to_json
        }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_stock
        @stock = Stock.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def stock_params
      params.require(:stock).permit(:serial_no, :trade_name, :pkg_size, :technicl_name, :company_name, :batch_no, :exp_date, :qty, :rate)
    end
end
