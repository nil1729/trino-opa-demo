package access

import data.context
import data.trino
import data.validations
import future.keywords.if

default allow_for_resource_catalog = false

user_id := context.user_id

catalog_name := context.resource.catalog.name

operation := context.operation

allow_for_resource_catalog if {
	operation == trino.operations.filter_catalogs
	validations.user_can_access_catalog(user_id, catalog_name)
}

allow_for_resource_catalog if {
	operation == trino.operations.show_schemas
	validations.user_can_access_catalog(user_id, catalog_name)
}

allow_for_resource_catalog if {
	operation == trino.operations.access_catalogs
	validations.user_can_access_catalog(user_id, catalog_name)
}
