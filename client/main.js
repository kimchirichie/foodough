import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
import { name as Foodough } from "../imports/ui/components/foodough/foodough";

function onReady() {
  angular.bootstrap(document, [
    Foodough
  ], {
    strictDi: true
  });
}
 
if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}