import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMeteorAuth from 'angular-meteor-auth';
import uiRouter from 'angular-ui-router';

import template from './bill.html';
import { Meteor } from 'meteor/meteor';
import { Recurring } from '../../../api/recurring';

class Bill {
	constructor($scope, $reactive, $state, $rootScope, $stateParams){
		'ngInject';
		$reactive(this).attach($scope);
		this.state = $state;
		this.rootScope = $rootScope;
		this.subscribe('recurring');
		this.helpers({
			recur: () => Recurring.findOne({_id: this.getReactively('transaction_id')})
		});
		if($stateParams.transaction_id){
			this.transaction_id = $stateParams.transaction_id;
		}
	}

	record(recur){
		console.log('record')
	}

	pay(recur){
		console.log('pay')
	}

	remove() {
		console.log('remove')
	}

}

const name = 'bill';

// create a module
export default angular.module(name, [
	angularMeteor,
	angularMeteorAuth,
	uiRouter
]).component(name, {
	template: template.default,
	controllerAs: name,
	controller: Bill
})
.config(config);
 
function config($stateProvider) {
	'ngInject';
	$stateProvider.state('bill', {
		url: '/bill/:transaction_id',
		template: '<bill></bill>',
		resolve:{
			user: ($auth) => {
				return $auth.requireUser();
			}
		},
	});
}

