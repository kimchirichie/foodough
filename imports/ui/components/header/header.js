import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './header.html';

class Header {
	constructor($scope, $reactive, $state, $rootScope){
		'ngInject';
		$reactive(this).attach($scope);
		this.rootScope = $rootScope;
		this.state = $state;
	}

	signout() {
		Meteor.logout();
		this.state.go('landing');
	}
}

const name = 'header';

// create a module
export default angular.module(name, [
	angularMeteor
]).component(name, {
	template: template.default,
	controllerAs: name,
	controller: Header
});
