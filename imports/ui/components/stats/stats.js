import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './stats.html';

class Stats {

	constructor($scope, $reactive, $state){
		'ngInject';
		$reactive(this).attach($scope);
		this.state = $state;
		this.Math = window.Math;
		this.mobileCap = 3;
		this.helpers({
			monthly(){
				return Fetcher.get('results');
			}
		})
		this.now = new Date();
		var offset = (this.now).getTimezoneOffset()*60*1000;
		this.now = new Date(this.now-offset);
		 	
		this.start = new Date(this.now.getFullYear()-1,this.now.getMonth()+1);

		this.getMonthly();
	}

	getMonthly(){
		Fetcher.retrieve("results", "getMonthly");
	}


}

const name = 'stats';

// create a module
export default angular.module(name, [
	angularMeteor,
    uiRouter
]).component(name, {
	template,
	controllerAs: name,
	controller: Stats
})
.config(config);
 
function config($stateProvider) {
    'ngInject';
    $stateProvider.state('stats', {
        url: '/stats',
        template: '<stats></stats>',
		resolve:{
			user: function($q, $state){
				var defer = $q.defer();
				Meteor.setTimeout(function(){
					var user = Meteor.user();
					if(!user){
						$state.go('signin');
					} else {
						defer.resolve();
					}
				},500);
				return defer.promise;
			}
		}

    });
}

