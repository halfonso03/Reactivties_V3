import { makeAutoObservable } from "mobx";

export default class CounterStore {
	title = "counter Store";
	count = 42;
	events: string[] = [`Initial count is ${this.count}`];

	constructor() {
		makeAutoObservable(this);
	}

	increment = (amount = 1) => {
		this.count += amount;

		this.events.push(`increemtns by ${amount}. Count is now ${this.count}`);
	};

	decrement = (amount = 1) => {
		this.count -= amount;

		this.events.push(
			`decremented by ${amount}. Count is now ${this.count}`
		);
	};

	get eventCount() {
		return this.events.length;
	}
}
