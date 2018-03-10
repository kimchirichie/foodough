import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMeteorAuth from 'angular-meteor-auth';
import uiRouter from 'angular-ui-router';

import template from './paybill.html';
import { Expenses } from '../../../api/expenses';
import { Bills } from '../../../api/bills';
import { moment } from 'meteor/momentjs:moment';

class PayBill {
	constructor($scope, $reactive, $state, $rootScope, $stateParams){
		'ngInject';
		$reactive(this).attach($scope);
		this.state = $state;
		this.rootScope = $rootScope;
		this.subscribe('bills');
		this.helpers({
			bill: () => Bills.findOne({_id: this.getReactively('transaction_id')})
		});
		if($stateParams.transaction_id){
			this.transaction_id = $stateParams.transaction_id;
		}
	}

	payBill(){
		if(this.bill && confirm('Are you sure?')){
			var rosetta = {
				'monthly':[1,'months'],
				'bimonthly':[15,'days'],
				'quarterly':[4,'months'],
				'every week': [1,'weeks'],
				'every 2 weeks': [2,'weeks']
			};
			// hopefully key exists
			var stone = rosetta[this.bill.frequency];
			var nextDate = moment(this.bill.date).add(stone[0],stone[1]).toDate();

			Expenses.insert({
				userId: this.bill.userId,
				date: this.bill.date,
				amount: this.bill.amount,
				category: this.bill.category,
				payment: this.bill.payment,
				description: this.bill.description
			})

			this.bill.date = nextDate;
			this.updateBill()
		}
	}

	updateBill(){
		if(this.bill) {
			Bills.update(this.bill._id, {
				$set: {
					date: this.bill.date,
					amount: this.bill.amount,
					category: this.bill.category,
					payment: this.bill.payment,
					frequency: this.bill.frequency,
					description: this.bill.description
				}
			})
			this.state.go('listbills');
		}
	}

	deleteBill() {
		if (this.bill && confirm('Are you sure?')) {
			Bills.remove(this.bill._id);
			this.state.go('listbills');
		}
	}

}

const name = 'paybill';

// create a module
export default angular.module(name, [
	angularMeteor,
	angularMeteorAuth,
	uiRouter
]).component(name, {
	template: template.default,
	controllerAs: name,
	controller: PayBill
})
.config(config);
 
function config($stateProvider) {
	'ngInject';
	$stateProvider.state('paybill', {
		url: '/paybill/:transaction_id',
		template: '<paybill></paybill>',
		resolve:{
			user: ($auth) => {
				return $auth.requireUser();
			}
		},
	});
}

