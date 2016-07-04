import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './header.html';

class Header {
	constructor($scope, $reactive, $state, $rootScope){
		'ngInject';
		$reactive(this).attach($scope);
		this.rootScope = $rootScope;
	}

	signout() {
		Meteor.logout();
	}
}

const name = 'header';

// create a module
export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs: name,
	controller: Header
});
