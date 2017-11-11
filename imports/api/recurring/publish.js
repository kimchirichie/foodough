import { Meteor } from 'meteor/meteor';

import { Recurring } from './collection';

if (Meteor.isServer) {
	Meteor.publish('recurring', function(){
		const selector = {userId:this.userId};
		return Recurring.find(selector);
	});
}