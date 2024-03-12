package access

import data.context
import data.trino

import future.keywords.if

allow_default_access if {
	allow_execute_query
}

allow_execute_query if {
	context.operation == trino.operations.execute_query
}
