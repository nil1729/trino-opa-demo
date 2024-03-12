package access

import data.context
import data.trino
import data.validations
import future.keywords.every
import future.keywords.if

default allow_for_resource_column = false

user_id := context.user_id

catalog_name := context.resource.table.catalogName

schema_name := context.resource.table.schemaName

table_name := context.resource.table.tableName

column_names := context.resource.table.columns

operation := context.operation

allow_for_resource_column if {
	operation == trino.operations.filter_columns
	check_every_column_access
}

allow_for_resource_column if {
	operation == trino.operations.select_from_columns
	check_every_column_access
}

check_every_column_access if {
	every column in column_names {
		validations.user_can_access_column(user_id, catalog_name, schema_name, table_name, column)
	}
}
