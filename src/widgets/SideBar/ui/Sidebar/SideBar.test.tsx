/* eslint-disable i18next/no-literal-string */
import { Sidebar } from "widgets/SideBar/index"
import { fireEvent, screen } from "@testing-library/react"
import { componentRender } from "shared/lib/tests/componentRender/componentRender"

describe('Sidebar', () => {
	test('test sidebar', () => {
		componentRender(<Sidebar/>)
		expect(screen.getByTestId("sidebar")).toBeInTheDocument()
	})

	test('test sidebar toggle', () => {
		componentRender(<Sidebar/>)
		const toggleBtn = screen.getByTestId("sidebar-toggle")
		expect(screen.getByTestId("sidebar")).toBeInTheDocument()
		expect(screen.getByTestId("sidebar")).toHaveClass('collapsed')
		fireEvent.click(toggleBtn)
		expect(screen.getByTestId("sidebar")).toHaveClass('Sidebar')
	})
})