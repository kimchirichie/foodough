import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './submit.html';
import { Meteor } from 'meteor/meteor';
import { Expenses } from '../../../api/expenses/index';

class Submit {
	constructor($scope, $reactive, $state, $rootScope){
		'ngInject';
		$reactive(this).attach($scope);
		this.state = $state;
		this.rootScope = $rootScope;
		this.clear();
		this.rootScope.$watch('currentUser',function(){
			console.log('currentUser changed');
			this.boot();
		}.bind(this))
	}

	boot(){
		if(!this.rootScope.currentUser){this.state.go('signin');}
	}


	record(expense){
		Expenses.insert(expense);
		console.log(expense);
		this.clear();
		this.state.go('dashboard');
	}
	clear(){
		this.expense = {}
		this.expense.userId = Meteor.userId();
		this.expense.date = new Date()
	}
}

const name = 'submit';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter
]).component(name, {
	template,
	controllerAs: name,
	controller: Submit
})
.config(config);
 
function config($stateProvider) {
	'ngInject';
	$stateProvider.state('submit', {
		url: '/submit',
		template: '<submit></submit>'
	});
}

