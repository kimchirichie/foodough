import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Expenses } from './collection';

if (Meteor.isServer) {
	Meteor.publish('expenses', function(options, searchString){
		const selector = {userId:this.userId};
		if (typeof searchString === 'string' && searchString.length) {
			selector.description = {
				$regex: `.*${searchString}.*`,
				$options : 'i'
			};
		}
		Counts.publish(this, 'numberOfExpenses', Expenses.find(selector),{noReady:true});
		return Expenses.find(selector, options);
	});
}