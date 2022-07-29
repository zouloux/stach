import { test } from "@zouloux/cli"
import { Stach } from "../dist/stach.es2022.mjs"

test("Stach", it => {
	it("Should convert one var", assert => {
		const result = Stach('Hello {{username}}', {
			username: 'James Bond'
		});
		assert( result === 'Hello James Bond' )
	})
	it("Should convert functions", assert => {
		const user = { balance: 12 }
		const result = Stach('Your current balance is {{balance}}€', {
			balance: () => user.balance
		});
		assert( result === 'Your current balance is 12€' )
	})
	const ternariesTemplate = 'Condition is {{test ? truthy : falsy}}'
	it("Should convert ternaries #1", assert => {
		const result = Stach(ternariesTemplate, { test: 0 });
		assert( result === 'Condition is falsy' )
	})
	it("Should convert ternaries #2", assert => {
		const result = Stach(ternariesTemplate, { test: true });
		assert( result === 'Condition is truthy' )
	})
	const complexTemplate = '{{name}} is {{age}} {{isAgePlural ? years : year}} old'
	it("Should convert complex #1", assert => {
		const result = Stach(complexTemplate, {
			name: 'Brad Pitt',
			age: 55,
			isAgePlural: v => v.age > 1
		});
		assert( result === 'Brad Pitt is 55 years old' )
	})
	it("Should convert complex #1", assert => {
		const result = Stach(complexTemplate, {
			name: 'Baby',
			age: 1,
			isAgePlural: v => v.age > 1
		});
		assert( result === 'Baby is 1 year old' )
	})
	it("Should use correct scope", assert => {
		const result = Stach('{{plainFunction}} == 15', {
			value: 15,
			plainFunction () { return this.value; }
		});
		assert( result === '15 == 15' )
	})
	it("Should test all", assert => {
		const template = 'Hello {{ isMale ? mr : mrs }} {{ getLastName }}. Your balance is {{ balance }}€.'
		const user = {
			name: 'James Bond',
			gender: 'male',
			balance: 15
		}
		const result = Stach(template, {
			...user,
			isMale: v => v.gender === 'male',
			getLastName: v => v.name.split(' ')[1]
		});
		assert( result === 'Hello mr Bond. Your balance is 15€.' )
	})
	it("Should use custom delimiters", assert => {
		const singleCurlyRegex = /{(.*?)}/gm
		const template = 'Hello { username }'
		const data = { username: 'Mr Bond' }
		const result = Stach( template, data, singleCurlyRegex );
		assert( result === "Hello Mr Bond" )
	})
})