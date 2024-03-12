package users

import data.db

import future.keywords.if
import future.keywords.in

if_user_exists(user_id) if {
	some user in db.users
	user == user_id
}
