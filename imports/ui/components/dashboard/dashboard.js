import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';

import template from './dashboard.html';
import { Expenses } from '../../../api/expenses/index';

class Dashboard {
	constructor($scope, $reactive, $state, $rootScope){
		'ngInject';

		$reactive(this).attach($scope);
		this.state = $state;
		this.rootScope = $rootScope;
		this.perPage = 20;
		this.page = 1;
		this.sort = {date: -1};
		this.searchText = '';
		this.subscribe('expenses',() => [{
				limit: parseInt(this.perPage),
				skip: parseInt((this.getReactively('page') - 1) * this.perPage),
				sort: this.getReactively('sort')
			}, this.getReactively('searchText')
		]);
		this.helpers({
			expenses() {
				return Expenses.find({},{
					sort: this.getReactively('sort')
				});
			},
			expensesCount() {
				return Counts.get('numberOfExpenses');
			}
		});

		this.rootScope.$watch('currentUser',function(){
			this.boot();
		}.bind(this));
		// $(window).bind('scroll', this.scroll);
	}

	pageChanged(newPage) {
		this.page = newPage;
	}

	sortChanged() {
		this.sort = {date: -this.sort.date}
	}

	boot() {
		if(!this.rootScope.currentUser){this.state.go('signin');}
	}

	// scroll(){
	// 	console.log('scrolling');
	// }
}

const name = 'dashboard';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter,
	utilsPagination
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