import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
 
import template from './landing.html';

class Landing {

	constructor($scope, $reactive, $state){
		'ngInject';
		$reactive(this).attach($scope);
		this.state = $state;
	}
}

const name = 'landing';

export default angular.module(name, [
	angularMeteor,
	uiRouter,
]).component(name, {
	template: template.default,
	controllerAs: name,
	controller: Landing
})
.config(config);

function config($stateProvider) {
	'ngInject';
	$stateProvider.state('landing', {
		url: '/',
		template: '<landing></landing>',
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
				},600);
				return defer.promise;
			}
		}
	});
}