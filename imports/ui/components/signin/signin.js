import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './signin.html';

class Signin {

	constructor($scope, $reactive, $state, $rootScope, $timeout){
		'ngInject';
		$reactive(this).attach($scope);
		console.log('signin constructor');
		this.state = $state;
		this.rootScope = $rootScope;
		this.timeout = $timeout;
		this.loading = false;
		this.rootScope.$watch('currentUser',function(){
			console.log('signin user watch');
			this.boot();
		}.bind(this));
	}

	boot(){
		if(this.rootScope.currentUser){this.state.go('dashboard');}
	}

	login(email, pass){
		console.log('login method');
		this.loading = true;
		Meteor.loginWithPassword(email, pass, function(error){
			if (error){
				Bert.alert(error.reason, 'danger');
				this.timeout(function(){this.loading = false;}.bind(this), 1300);
			} else {
				this.state.go('dashboard');
				this.loading = false;
			}
		}.bind(this));
	}

}

const name = 'signin';

// create a module
export default angular.module(name, [
	angularMeteor,
    uiRouter
]).component(name, {
	template,
	controllerAs: name,
	controller: Signin
})
.config(config);
 
function config($stateProvider) {
    'ngInject';
    $stateProvider.state('signin', {
        url: '/signin',
        template: '<signin></signin>'
    });
}

