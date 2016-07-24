import { Meteor } from 'meteor/meteor';
import { Expenses } from '../imports/api/expenses';
import { Single } from '../imports/api/single';

Meteor.startup(() => {
	var email = process.env.EMAIL;
	var password = process.env.PASSWORD;
	process.env.MAIL_URL = 'smtp://' + email + ':' + password + '@smtp.gmail.com:465/';

	Meteor.methods({
		sendVerificationLink(){
			let userId = Meteor.userId();
			if(userId){
				return Accounts.sendVerificationEmail(userId);
			}
		},
	});
});