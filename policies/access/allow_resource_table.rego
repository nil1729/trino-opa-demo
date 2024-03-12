package access

import data.context
import data.trino
import data.validations
import future.keywords.if

default allow_for_resource_table = false

user_id := context.user_id

catalog_name := context.resource.table.catalogName

schema_name := context.resource.table.schemaName

table_name := context.resource.table.tableName

operation := context.operation

allow_for_resource_table if {
	operation == trino.operations.show_columns
	validations.user_can_access_table(user_id, catalog_name, schema_name, table_name)
}

allow_for_resource_table if {
	operation == trino.operations.filter_tables
	validations.user_can_access_table(user_id, catalog_name, schema_name, table_name)
}
