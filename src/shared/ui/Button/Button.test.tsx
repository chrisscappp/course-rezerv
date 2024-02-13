/* eslint-disable i18next/no-literal-string */
import { Button, ButtonTheme } from "shared/ui/Button/Button" 
import { render, screen } from "@testing-library/react"

describe('Button', () => {
	test('test button comp', () => {
		render(<Button>TEST</Button>)
		expect(screen.getByText("TEST")).toBeInTheDocument()
	})
	test('test button comp with theme clear', () => {
		render(<Button theme = {ButtonTheme.CLEAR}>TEST</Button>)
		expect(screen.getByText("TEST")).toHaveClass('clear')
		screen.debug()
	})
})