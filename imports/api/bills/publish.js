import { Meteor } from 'meteor/meteor';

import { Bills } from './collection';

if (Meteor.isServer) {
	Meteor.publish('bills', function(){
		const selector = {userId:this.userId};
		return Bills.find(selector);
	});
}