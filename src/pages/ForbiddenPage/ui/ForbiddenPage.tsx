import React, { memo } from "react"
import { Page } from "widgets/Page/Page"

const ForbiddenPage = () => {

	return (
		<Page>
			<div>
				У вас нет доступа на посещение этой страницы.
			</div>
		</Page>
	)
}

export default memo(ForbiddenPage)