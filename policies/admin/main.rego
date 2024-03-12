package admin

import data.context
import future.keywords.if

allow_admin if {
	user_is_admin
}

# validate if user is admin
user_is_admin if {
	context.user_id == "admin"
}
