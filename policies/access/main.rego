package access

import data.access
import future.keywords.if

allow_resource if {
	access.allow_default_access
}

allow_resource if {
	access.allow_for_resource
}
