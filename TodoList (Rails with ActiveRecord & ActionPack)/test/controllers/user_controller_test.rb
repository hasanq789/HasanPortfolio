require 'test_helper'

class UserControllerTest < ActionController::TestCase
  test "should get username" do
    get :username
    assert_response :success
  end

  test "should get password_digest" do
    get :password_digest
    assert_response :success
  end

end
