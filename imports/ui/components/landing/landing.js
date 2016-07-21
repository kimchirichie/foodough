import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
 
import template from './landing.html';

class Landing {

	constructor($scope, $reactive, $state, $rootScope){
		'ngInject';
		console.log('landing constructor');
		$reactive(this).attach($scope);
		this.state = $state;
		this.rootScope = $rootScope;
		this.rootScope.$watch('currentUser',function(){
			console.log('landing user watch');
			this.boot();
		}.bind(this));
	}

	boot(){
		if(this.rootScope.currentUser){this.state.go('dashboard');}
	}
}

const name = 'landing';

export default angular.module(name, [
	angularMeteor,
	uiRouter,
]).component(name, {
	template,
	controllerAs: name,
	controller: Landing
})
.config(config);

function config($stateProvider) {
	'ngInject';
	$stateProvider.state('landing', {
		url: '/',
		template: '<landing></landing>'
	});
}