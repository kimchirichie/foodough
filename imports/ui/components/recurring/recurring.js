import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMeteorAuth from 'angular-meteor-auth';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import template from './recurring.html';
// import { Expenses } from '../../../api/expenses/index';
import { Recurring } from '../../../api/recurring/index';

class Recur {
	constructor($scope, $reactive, $state, $stateParams){
		'ngInject';
		$reactive(this).attach($scope);
		this.state = $state;
		this.subscribe('recurring');
		this.helpers({
			recurring() {
				return Recurring.find({});
			}
		});
	}
}

const name = 'recurring';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter,
	utilsPagination
]).component(name, {
	template: template.default,
	controllerAs: name,
	controller: Recur
})
.config(config);
 
function config($stateProvider) {
	'ngInject';
	$stateProvider.state('recurring', {
		url: '/recurring',
		template: '<recurring></recurring>',
		resolve:{
			user: ($auth) => {
				return $auth.requireUser();
			}
		}
	});
}