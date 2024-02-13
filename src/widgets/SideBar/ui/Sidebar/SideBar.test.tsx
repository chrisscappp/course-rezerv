/* eslint-disable i18next/no-literal-string */
import { Sidebar } from "widgets/SideBar/index"
import { fireEvent, render, screen } from "@testing-library/react"

describe('Sidebar', () => {
	test('test sidebar', () => {
		render(<Sidebar/>)
		expect(screen.getByTestId("sidebar")).toBeInTheDocument()
	})

	test('test sidebar toggle', () => {
		render(<Sidebar/>)
		const toggleBtn = screen.getByTestId("sidebar-toggle")
		expect(screen.getByTestId("sidebar")).toBeInTheDocument()
		expect(screen.getByTestId("sidebar")).toHaveClass('collapsed')
		fireEvent.click(toggleBtn)
		expect(screen.getByTestId("sidebar")).toHaveClass('Sidebar')
	})
})