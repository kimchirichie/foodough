import angular from "angular";
import angularMeteor from "angular-meteor";

import uiRouter from 'angular-ui-router';
// import ngMaterial from 'angular-material';
// import ngAnimate from 'angular-animate';

import template from "./foodough.html"

// COMPONENTS
import { name as Header } from '../header/header';
import { name as Footer } from '../footer/footer';
import { name as Landing } from '../landing/landing';
import { name as Signin } from '../signin/signin';
import { name as Signup } from '../signup/signup';
import { name as Dashboard } from '../dashboard/dashboard';
import { name as Submit } from '../submit/submit';
import { name as Forgot } from '../forgot/forgot';
import { name as Password } from '../password/password';
import { name as Verify } from '../verify/verify';
import { name as Stats } from '../stats/stats';

class Foodough{
	constructor($scope, $reactive, $state){
    'ngInject';
    	$reactive(this).attach($scope);
  	}
}

const name = "foodough";

export default angular.module(name,[
	angularMeteor,
	uiRouter,
	Header,
	Footer,
	Landing,
	Signin,
	Signup,
	Dashboard,
	Submit,
	Forgot,
	Password,
	Verify,
	Stats
])
.component(name, {
	template: template.default,
	controllerAs: name,
	controller: Foodough
})
.config(config)
.run(run);

function config($locationProvider, $urlRouterProvider, $qProvider) {
	'ngInject';
	$locationProvider.html5Mode({'enabled': true, 'requireBase': false});
	$urlRouterProvider.otherwise('/');
	$qProvider.errorOnUnhandledRejections(false);
}

function run ($rootScope, $state) {
	'ngInject';

	// We can catch the error thrown when the $requireUser promise is rejected
	// and redirect the user back to the main page
	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
		if (error === 'AUTH_REQUIRED') {
			$state.go('signin');
		}
	});

	// redirect to submit page if logged in
	Accounts.onLogin(function () {
		if (!$state.is('submit')) {
			$state.go('submit');
		}
	});
}