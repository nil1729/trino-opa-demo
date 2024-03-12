package validations

import data.users
import future.keywords.if
import future.keywords.in

user_can_access_schema(user_id, catalog_name, schema_name) if {
	schema_access := users.user_schema_access(user_id)
	some obj in schema_access
	obj.catalog == catalog_name
	obj.schema == schema_name
}
