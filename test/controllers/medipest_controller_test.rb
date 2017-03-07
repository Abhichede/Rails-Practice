require 'test_helper'

class MedipestControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get medipest_index_url
    assert_response :success
  end

end
