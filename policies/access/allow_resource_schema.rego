package access

import data.context
import data.trino
import data.validations
import future.keywords.if

default allow_for_resource_schema = false

user_id := context.user_id

catalog_name := context.resource.schema.catalogName

schema_name := context.resource.schema.schemaName

operation := context.operation

allow_for_resource_schema if {
	operation == trino.operations.show_tables
	validations.user_can_access_schema(user_id, catalog_name, schema_name)
}

allow_for_resource_schema if {
	operation == trino.operations.filter_schemas
	validations.user_can_access_schema(user_id, catalog_name, schema_name)
}
