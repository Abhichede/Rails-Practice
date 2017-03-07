class OutwordsController < ApplicationController
  def index
    @outwards = Outword.all
  end

end