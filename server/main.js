import { Meteor } from 'meteor/meteor';
import { Expenses } from '../imports/api/expenses';
import { Single } from '../imports/api/single';
import { moment } from 'meteor/momentjs:moment';

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
		getStats(searchString){
			if (typeof searchString !== 'string') return null;
			if (!searchString.length) return null;
			let userId = Meteor.userId();
			expenses = Expenses.find({userId:userId, description:searchString}).fetch()
			lifeTime = 0;
			yearYet = 0;
			for (i in expenses){
				if (expenses[i].date > new Date('2017')) yearYet += expenses[i].amount;
				lifeTime += expenses[i].amount;
			}
			avg = lifeTime / expenses.length
			return {lifeTime:lifeTime,yearYet:yearYet,avg:avg};
		},
		getHistory(increment, quantity){
			var incomes = ['work', 'refund', 'other income'];
			// var start = moment().endOf(increment).subtract(quantity,increment);
			var start = moment().startOf(increment).subtract(quantity-1,increment);

			let userId = Meteor.userId();
			var expenses = Expenses.find({userId:userId, date:{$gte:start.toDate()}},{sort:{date:1}}).fetch();
			var result = new Array(quantity);

			for(var i=0; i<quantity; i++){
				var date=start.clone().format();
				
				result[i]={
					date:date,
					earning:0,
					spending:0,
					dining:0,
					leisure:0,
					living:0,
					transportation:0,
					health:0,
					education:0,
					service:0,
					electronics:0,
					gift:0,
					donation:0
				};

				start.add(1,increment)
			}

			for(var j=0; j<expenses.length; j++){
				var index = quantity-1-moment().endOf(increment).diff(expenses[j].date, increment);

				if(incomes.indexOf(expenses[j].category)<0){
					result[index].spending += expenses[j].amount;
				} else {
					result[index].earning += expenses[j].amount;
				}

				if(expenses[j].category) result[index][expenses[j].category] += expenses[j].amountl


			}
			return result;

		},
	});
});