package validations

import data.users
import future.keywords.if
import future.keywords.in

user_can_access_catalog(user_id, catalog_name) if {
	value := users.user_catalog_access(user_id)
	catalog_name in value
}
