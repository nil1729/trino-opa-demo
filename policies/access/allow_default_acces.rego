package access

import data.context
import data.trino
import data.validations

import future.keywords.if
import future.keywords.in

user_id := context.user_id

operation := context.operation

allow_default_access if {
	allow_execute_query
}

allow_default_access if {
	allow_information_schema_access
}

allow_execute_query if {
	context.operation == trino.operations.execute_query
}

allow_information_schema_access if {
	catalog_name := context.resource.table.catalogName
	schema_name := context.resource.table.schemaName
	table_name := context.resource.table.tableName

	operation == trino.operations.select_from_columns
	validations.user_can_access_catalog(user_id, catalog_name)
	schema_name in trino.schemas.default_schemas
	table_name in trino.tables.information_schema
}
