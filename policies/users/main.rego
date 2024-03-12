package users

import data.db

import future.keywords.if
import future.keywords.in

if_user_exists(user_id) if {
	some user in db.users
	user == user_id
}

user_catalog_access(user_id) := value if {
	desired_obj := db.catalog[_]
	desired_obj.user == user_id
	value := desired_obj.access
}
