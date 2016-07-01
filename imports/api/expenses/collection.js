import { Mongo } from 'meteor/mongo';

export const Expenses = new Mongo.Collection('expenses');

Expenses.allow({
	insert(userId, expense) {
		return true;
	},
	update(userId, expense, fields, modifier){
		return true;
	},
	remove(userId, expense){
		return true;		
	}
})