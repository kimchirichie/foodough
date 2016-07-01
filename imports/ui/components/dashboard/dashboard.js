import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './dashboard.html';
import { Expenses } from '../../../api/expenses/index';

class Dashboard {
	constructor($scope, $reactive, $state){
		'ngInject';

		$reactive(this).attach($scope);
		
		this.subscribe('expenses');
		this.helpers({
			expenses() {
				return Expenses.find({});
			}
		});
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

