package policies

import data.access
import data.admin
import data.users
import data.utils
import future.keywords.if

default allow = false

# this section handle the policies for `admin` user
allow if {
	# print(input)
	admin.allow_admin
}

# this section handle the policies for regular user
allow if {
	# print(input)
	users.if_user_exists(utils.user_id)
	access.allow_resource
}
