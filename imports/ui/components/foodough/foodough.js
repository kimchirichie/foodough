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
// import { name as Welcome } from '../welcome/welcome';
// import { name as userBrowse } from '../userBrowse/userBrowse';
// import { name as Profile } from '../profile/profile';
// import { name as changePassword } from '../changePassword/changePassword';
// import { name as resetPage } from '../resetPage/resetPage';
// import { name as verifyEmail } from '../verifyEmail/verifyEmail';


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
	Submit
])
.component(name, {
	template,
	controllerAs: name,
	controller: Foodough
})
.config(config);

function config($locationProvider, $urlRouterProvider) {
	'ngInject';
	$locationProvider.html5Mode({'enabled': true, 'requireBase': false});
	$urlRouterProvider.otherwise('/');
}