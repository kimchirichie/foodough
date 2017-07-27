import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './signin.html';

class Signin {

	constructor($scope, $reactive, $state, $timeout){
		'ngInject';
		$reactive(this).attach($scope);
		this.state = $state;
		this.timeout = $timeout;
		this.loading = false;
	}

	login(email, pass){
		this.loading = true;
		Meteor.loginWithPassword(email, pass, function(error){
			if (error){
				Bert.alert(error.reason, 'danger', 'growl-top-right');
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
	template: template.default,
	controllerAs: name,
	controller: Signin
})
.config(config);
 
function config($stateProvider) {
    'ngInject';
    $stateProvider.state('signin', {
        url: '/signin',
        template: '<signin></signin>',
		resolve:{
			user: function($q, $state){
				var defer = $q.defer();
				Meteor.setTimeout(function(){
					var user = Meteor.user();
					if(user){
						$state.go('submit');
					} else {
						defer.resolve();
					}
				},500);
				return defer.promise;
			}
		}
    });
}

