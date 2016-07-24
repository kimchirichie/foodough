import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './password.html';

class Password {

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

	submit(){

		this.loading = true;

		if(this.password != this.confirm){
			Bert.alert('Passwords does not match, please try again', 'danger');
			this.password = '';
			this.confirm = '';
			this.timeout(function(){this.loading = false;}.bind(this), 1300);
		}
		else {

			Accounts.resetPassword(this.state.params.token, this.password, function(error){
				if(error){
					Bert.alert(error.reason, 'danger');
					this.password = '';
					this.confirm = '';
					this.timeout(function(){this.loading = false;}.bind(this), 1300);
				}else{
					Bert.alert("You're password has been updated", 'success');
					this.loading = false;
					this.password = '';
					this.confirm = '';
					this.state.go('signin');
				}
			}.bind(this));
		}
	}
}

const name = 'password';

// create a module
export default angular.module(name, [
	angularMeteor,
    uiRouter
]).component(name, {
	template,
	controllerAs: name,
	controller: Password
})
.config(config);
 
function config($stateProvider) {
    'ngInject';
    $stateProvider.state('password', {
        url: '/password/:token',
        template: '<password></password>'
    });
}

