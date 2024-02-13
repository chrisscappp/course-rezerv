import { classNames } from "shared/lib/classNames/classNames" 

describe('classNames', () => {
	test('only class', () => {
		const expected = "test"
		expect(classNames('test')).toBe(expected)
	})
	test('class with mods', () => {
		const expected = "test hovered"
		expect(classNames('test', {hovered: true}, [])).toBe(expected)
	})
	test('class with mods and additional', () => {
		const expected = "test additional another hovered"
		expect(classNames('test', {hovered: true}, ["additional", "another"])).toBe(expected)
	})
	test('class with mods and additional but one mod is false', () => {
		const expected = "test additional another hovered"
		expect(classNames('test', {hovered: true, scrollable: false}, ["additional", "another"])).toBe(expected)
	})
	test('class with mods and additional but one mod is undefined', () => {
		const expected = "test additional another hovered"
		expect(classNames('test', {hovered: true, scrollable: undefined}, ["additional", "another"])).toBe(expected)
	})
}) // обёртка над серией тестов