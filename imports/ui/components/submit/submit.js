import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './submit.html';
import { Meteor } from 'meteor/meteor';
import { Expenses } from '../../../api/expenses/index';

class Submit {
	constructor($scope, $reactive, $state){
		'ngInject';
		$reactive(this).attach($scope);
		this.clear();
	}

	record(expense){
		Expenses.insert(expense);
		console.log(expense);
		this.clear();
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

