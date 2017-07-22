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
		getMonthly(){
			var now = new Date();
			var offset = (now).getTimezoneOffset()*60*1000;
				now = new Date(now-offset);

			var start = new Date(now.getFullYear()-1,now.getMonth()+1)

			let userId = Meteor.userId();
			var expenses = Expenses.find({userId:userId, date:{$gte:start}},{sort:{date:1}}).fetch();

			var spending = new Array(12).fill(0);
			var earning = new Array(12).fill(0);

			var nowMonth = now.getMonth();
			
			for (var i=0; i<expenses.length; i++){
				var yearDiff = expenses[i].date.getFullYear()-start.getFullYear();
				var index = expenses[i].date.getMonth()+(yearDiff*12-(nowMonth+1))

				if(['work', 'refund', 'other income'].indexOf(expenses[i].category)<0){
					spending[index] += expenses[i].amount;
				} else {
					earning[index] += expenses[i].amount;
				}
			}

			return {earning:earning,spending:spending};
		},
		getWeekly(){
			var incomes = ['work', 'refund', 'other income'];
			var weeksFarBack = 6;
			// day = moment().day(); //day of the week 0 -> sunday, 6 -> saturday
			var start = moment().endOf('week').subtract(weeksFarBack,'weeks');

			let userId = Meteor.userId();
			var expenses = Expenses.find({userId:userId, date:{$gte:start.toDate()}},{sort:{date:1}}).fetch();
			var result = new Array(weeksFarBack);

			for(var i=0; i<weeksFarBack; i++){
				var date=start.clone().format();
				
				result[i]={
					date:date,
					earning:0,
					spending:0
				};

				start.add(1,'week')

			}

			for(var j=0; j<expenses.length; j++){
				var index = weeksFarBack-1-moment().endOf('week').diff(expenses[j].date, 'weeks');

				if(incomes.indexOf(expenses[j].category)<0){
					result[index].spending += expenses[j].amount;
				} else {
					result[index].earning += expenses[j].amount;
				}
			}
			return result;
		}
	});
});