import { Mongo } from 'meteor/mongo';

export const Bills = new Mongo.Collection('bills');

Bills.allow({
	insert(userId, bill) {
		return userId && bill.userId === userId;
	},
	update(userId, bill, fields, modifier){
		return userId && bill.userId === userId;
	},
	remove(userId, bill){
		return userId && bill.userId === userId;
	}
})