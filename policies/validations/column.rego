package validations

import data.users
import future.keywords.if
import future.keywords.in

user_can_access_column(user_id, catalog_name, schema_name, table_name, column_name) if {
	column_access := users.user_column_access(user_id)
	some obj in column_access
	obj.catalog == catalog_name
	obj.schema == schema_name
	obj.table == table_name
	column_name in obj.column
}
