package validations

import data.users
import future.keywords.if
import future.keywords.in

user_can_access_table(user_id, catalog_name, schema_name, table_name) if {
	table_access := users.user_table_access(user_id)
	some obj in table_access
	obj.catalog == catalog_name
	obj.schema == schema_name
	table_name in obj.table
}
