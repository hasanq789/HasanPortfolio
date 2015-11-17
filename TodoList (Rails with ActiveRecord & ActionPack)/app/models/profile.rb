class Profile < ActiveRecord::Base
  belongs_to :user
  
  validates :gender, inclusion: { in: %w(male female)}
  validate :first_or_last_set, :boy_named_sue

  def first_or_last_set
  	if first_name.nil? and last_name.nil?
  		errors.add(:first_name, "and last_name cannot both be empty")
  	end
  end

  def boy_named_sue
  	if gender == "male" and first_name == "Sue"
  		errors.add(:first_name, "cannot be Sue for a boy")
  	end
  end

  def get_all_profiles(min, max)
  	Profile.where("birth_year BETWEEN ? AND ?", min, max).order(:birth_year).to_a
  end
end
