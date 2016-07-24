import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './forgot.html';

class Forgot {

	constructor($scope, $reactive, $state, $rootScope, $timeout){
		'ngInject';
		$reactive(this).attach($scope);
		this.state = $state;
		this.rootScope = $rootScope;
		this.timeout = $timeout;
		this.loading = false;
		this.rootScope.$watch('currentUser',function(){
			this.boot();
		}.bind(this));
	}

	boot(){
		if(this.rootScope.currentUser){this.state.go('dashboard');}
	}

	recover(email){

		this.loading = true;

		Accounts.forgotPassword({email: email}, function(error){

			if(error){
				Bert.alert(error.reason, 'danger');
				this.timeout(function(){this.loading = false;}.bind(this), 1300);
			} else {
				this.email = undefined;
				Bert.alert('Email Sent! Please check your email to reset password', 'success');
				this.timeout(function(){
					this.loading = false;
				}.bind(this), 1300);
				this.email = '';
			}

		}.bind(this));
	}
}

const name = 'forgot';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter
]).component(name, {
	template,
	controllerAs: name,
	controller: Forgot
})
.config(config);
 
function config($stateProvider) {
	'ngInject';
	$stateProvider.state('forgot', {
		url: '/forgot',
		template: '<forgot></forgot>'
	});
}

