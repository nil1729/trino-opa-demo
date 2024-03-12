package admin

import future.keywords.if
import input

# this is policy
allow_admin if {
	user_is_admin
}

# validate if user is admin
user_is_admin if {
	input.context.identity.user == "admin"
}
