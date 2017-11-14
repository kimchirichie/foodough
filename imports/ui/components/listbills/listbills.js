import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMeteorAuth from 'angular-meteor-auth';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import template from './listbills.html';
import { Bills } from '../../../api/bills';

class listBills {
	constructor($scope, $reactive, $state, $stateParams){
		'ngInject';
		$reactive(this).attach($scope);
		this.state = $state;
		this.subscribe('bills');
		this.helpers({
			bills() {
				return Bills.find({});
			}
		});
	}

	rowClick(bill) {
		this.state.go('paybill', {transaction_id : bill._id})
	}
}

const name = 'listbills';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter,
	utilsPagination
]).component(name, {
	template: template.default,
	controllerAs: name,
	controller: listBills
})
.config(config);
 
function config($stateProvider) {
	'ngInject';
	$stateProvider.state('listbills', {
		url: '/listbills',
		template: '<listbills></listbills>',
		resolve:{
			user: ($auth) => {
				return $auth.requireUser();
			}
		}
	});
}