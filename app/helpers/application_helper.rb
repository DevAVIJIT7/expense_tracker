module ApplicationHelper
  def active_page?(current_page)
		return unless request.path.include?(current_page.to_s)

		'active'
	end
end
