import { Counter } from "./Counter"
import { fireEvent, screen } from "@testing-library/react"
import { componentRender } from "shared/lib/tests/componentRender/componentRender"

describe('Counter', () => {
	test('test render', () => {
		componentRender(<Counter/>, {
			initialState: { counter: { value: 10 } }
		})
		expect(screen.getByTestId("counter-value")).toHaveTextContent('10')
	})

	test('test increment-btn', () => {
		componentRender(<Counter/>, {
			initialState: { counter: { value: 10 } }
		})
		const btn = screen.getByTestId("increment-btn")
		fireEvent.click(btn)
		expect(screen.getByTestId("counter-value")).toHaveTextContent('11')
	})

	test('test decrement-btn', () => {
		componentRender(<Counter/>, {
			initialState: { counter: { value: 10 } }
		})
		const btn = screen.getByTestId("decrement-btn")
		fireEvent.click(btn)
		expect(screen.getByTestId("counter-value")).toHaveTextContent('9')
	})
})