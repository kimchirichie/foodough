import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './verify.html';

class Verify {
	constructor($scope, $reactive, $state){
		'ngInject';
		$reactive(this).attach($scope);
		this.state = $state;
		this.verify();
	}

	verify(){
		Accounts.verifyEmail(this.state.params.token, function(error){
			if(error){
			Bert.alert(error.reason, 'danger');
			this.state.go('signin');
			}
			else{
			Bert.alert('Your email has been verified!', 'success');
			this.state.go('signin');
			}
		}.bind(this));
	}
}

const name = 'verify';

export default angular.module(name, [
	angularMeteor,
	uiRouter,
]).component(name, {
	template,
	controllerAs: name,
	controller: Verify
}).config(config);
 
function config($stateProvider) {
	'ngInject';
	$stateProvider
	.state('verify', {
		url: '/verify/:token',
		template: '<verify></verify>'
	});
}