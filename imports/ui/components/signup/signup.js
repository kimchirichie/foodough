import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './signup.html';

class Signup {

	constructor($scope, $reactive, $state, $rootScope, $timeout){
		'ngInject';
		$reactive(this).attach($scope);
		this.state = $state;
		this.rootScope = $rootScope;
		this.timeout = $timeout;
		this.loading = false;
		this.rootScope.$watch('currentUser',function(){
			this.boot();
		}.bind(this))

	}

	boot(){
		if(this.rootScope.currentUser){this.state.go('submit');}
	}

	submit(user){

		this.loading = true;

		if (this.confirm !== user.password){
			Bert.alert('Your password does not match', 'danger');
			user.password = '';
			this.confirm = '';
			this.timeout(function(){this.loading = false;}.bind(this), 1300);
			return;
		}

		Accounts.createUser(user, function(error){
			if(error) {
				Bert.alert(error.reason, 'danger');
				this.timeout(function(){this.loading = false;}.bind(this), 1300);
			} else {
				Meteor.call('sendVerificationLink', function(error, response){
					if(error){
						// need emailer to send emails
						Bert.alert(error.reason, 'danger');
						this.timeout(function(){this.loading = false;}.bind(this), 1300);
					} else {
						user = {};
						this.loading = false;
						this.state.go('welcome');
						Bert.alert('Verification email sent!', 'success');
						Meteor.logout();
					}
				}.bind(this));
			}
		}.bind(this));
	}
}

const name = 'signup';

// create a module
export default angular.module(name, [
	angularMeteor,
    uiRouter
]).component(name, {
	template,
	controllerAs: name,
	controller: Signup
})
.config(config);
 
function config($stateProvider) {
    'ngInject';
    $stateProvider.state('signup', {
        url: '/signup',
        template: '<signup></signup>'
    });
}

