import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMeteorAuth from 'angular-meteor-auth';
import uiRouter from 'angular-ui-router';

import template from './submit.html';
import { Meteor } from 'meteor/meteor';
import { Expenses } from '../../../api/single';
import { Recurring } from '../../../api/recurring';

class Submit {
	constructor($scope, $reactive, $state, $rootScope, $stateParams){
		'ngInject';
		$reactive(this).attach($scope);
		this.state = $state;
		this.rootScope = $rootScope;
		this.subscribe('single',() => [this.getReactively('transaction_id')]);
		this.transaction_id = undefined;
		this.helpers({
			expense: () => Expenses.findOne({_id: this.getReactively('transaction_id')})
		});
		this.clear();
		if($stateParams.transaction_id){
			this.transaction_id = $stateParams.transaction_id;
		}
		if($stateParams.searchText){
			this.searchText = $stateParams.searchText;
		}
	}

	record(expense){
		if (this.expense._id){
			this.update(expense);
		} else if (this.recurring) {
			expense.frequency = this.frequency;
			Recurring.insert(expense)
			console.log('recurring')
			//dont actually return in production. this is for debuggin
			return
		} else {
			this.insert(expense);
		}
		this.clear();
		this.state.go('dashboard',{searchText:this.searchText});
	}

	insert(expense){
		Expenses.insert(expense);
	}

	update(expense){
		if(this.expense) {
			Expenses.update(this.expense._id, {
				$set: {
					date: this.expense.date,
					amount: this.expense.amount,
					category: this.expense.category,
					payment: this.expense.payment,
					description: this.expense.description
				}
			})
		}
	}

	remove() {
		if (this.expense && confirm('Are you sure?')) {
			Expenses.remove(this.expense._id);
			this.clear();
			this.state.go('dashboard',{searchText:this.searchText});
		}
	}

	clear(){
		this.expense = {}
		this.expense.category = 'dining';
		this.expense.payment = 'credit';
		this.expense.date = new Date()
		this.frequency = 'monthly'
		if (this.rootScope.currentUser) this.expense.userId = this.rootScope.currentUser._id;
	}
}

const name = 'submit';

// create a module
export default angular.module(name, [
	angularMeteor,
	angularMeteorAuth,
	uiRouter
]).component(name, {
	template: template.default,
	controllerAs: name,
	controller: Submit
})
.config(config);
 
function config($stateProvider) {
	'ngInject';
	$stateProvider.state('submit', {
		url: '/submit/:transaction_id',
		template: '<submit></submit>',
		resolve:{
			user: ($auth) => {
				return $auth.requireUser();
			}
		},
		params:{
			searchText:''
		}
	});
}

