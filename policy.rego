package trino

import future.keywords.contains
import future.keywords.if
import future.keywords.in

default allow = false

current_user := input.context.identity.user

user_action := input.action.operation

allow if {
	print("HELLO", input.action.resource)
	user_action == "ExecuteQuery"
}

# batch contains i if {
# 	print("BATCH", input)
# 	some i
# 	raw_resource := input.action.filterResources[i]
# 	allow with input.action.resource as raw_resource
# }

allow if {
	some user in data.trino.user.access.users
	user.name == current_user
	some action in data.trino.action.available
	action == user_action
	desired_user := data.trino.user.access.users[_]
	desired_user.name == current_user
	user_policy := desired_user.policies
	print(user_policy, input.action.operation, input.action.resource)

	# catalog level
	some policy in user_policy
	policy.catalog == input.action.resource.catalog.name
}

allow if {
	some user in data.trino.user.access.users
	user.name == current_user
	some action in data.trino.action.available
	action == user_action
	desired_user := data.trino.user.access.users[_]
	desired_user.name == current_user
	user_policy := desired_user.policies

	# schema level
	some policy in user_policy
	policy.catalog == input.action.resource.schema.catalogName
	policy.schema == input.action.resource.schema.schemaName
}

allow if {
	some user in data.trino.user.access.users
	user.name == current_user
	some action in data.trino.action.available
	action == user_action
	desired_user := data.trino.user.access.users[_]
	desired_user.name == current_user
	user_policy := desired_user.policies

	# information_schema level
	input.action.operation == "SelectFromColumns"
	input.action.resource.table.schemaName == "information_schema"
}

allow if {
	some user in data.trino.user.access.users
	user.name == current_user
	some action in data.trino.action.available
	action == user_action
	desired_user := data.trino.user.access.users[_]
	desired_user.name == current_user
	user_policy := desired_user.policies

	# table level
	some policy in user_policy
	policy.catalog == input.action.resource.table.catalogName
	policy.schema == input.action.resource.table.schemaName
	policy.table == input.action.resource.table.tableName
}

allow if {
	some user in data.trino.user.access.users
	user.name == current_user
	some action in data.trino.action.available
	action == user_action
	desired_user := data.trino.user.access.users[_]
	desired_user.name == current_user
	user_policy := desired_user.policies
	print(user_policy, input.action.operation, input.action.resource)
	1 == 2
}

# columnMask := column_mask if {
# 	print("HELLO")
# 	column_mask := "column_mask"
# 	# column_mask := cms.mask
# }
# rowFilters contains row_filter if {
# 	row_filter := "row_filter"
# }
