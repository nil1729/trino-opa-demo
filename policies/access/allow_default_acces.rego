package access

import data.utils

import future.keywords.if

allow_default_access if {
	allow_execute_query
}

allow_execute_query if {
	utils.operation == "ExecuteQuery"
}
