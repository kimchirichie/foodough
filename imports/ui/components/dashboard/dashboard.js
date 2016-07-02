import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './dashboard.html';
import { Expenses } from '../../../api/expenses/index';

class Dashboard {
	constructor($scope, $reactive, $state, $rootScope){
		'ngInject';

		$reactive(this).attach($scope);
		this.state = $state;
		this.rootScope = $rootScope;
		this.subscribe('expenses');
		this.helpers({
			expenses() {
				return Expenses.find({});
			}
		});
		this.rootScope.$watch('currentUser',function(){
			console.log('currentUser changed');
			this.boot();
		}.bind(this));
	}

	boot(){
		if(!this.rootScope.currentUser){this.state.go('signin');}
	}
}

const name = 'dashboard';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter
]).component(name, {
	template,
	controllerAs: name,
	controller: Dashboard
})
.config(config);
 
function config($stateProvider) {
	'ngInject';
	$stateProvider.state('dashboard', {
		url: '/dashboard',
		template: '<dashboard></dashboard>'
	});
}

