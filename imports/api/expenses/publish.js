import { Meteor } from 'meteor/meteor';

import { Expenses } from './collection';

if (Meteor.isServer) {
	Meteor.publish('expenses', function(){
		const selector = {userId:this.userId};
		return Expenses.find(selector);
	});
}