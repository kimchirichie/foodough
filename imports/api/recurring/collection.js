import { Mongo } from 'meteor/mongo';

export const Recurring = new Mongo.Collection('recurring');

Recurring.allow({
	insert(userId, recurring) {
		return userId && recurring.userId === userId;
	},
	update(userId, recurring, fields, modifier){
		return userId && recurring.userId === userId;
	},
	remove(userId, recurring){
		return userId && recurring.userId === userId;
	}
})