import { Meteor } from 'meteor/meteor';

import { Expenses } from '../expenses/collection';

if (Meteor.isServer) {
	Meteor.publish('single', function(id){
		const selector = {_id:id};
		return Expenses.find(selector);
	});
}