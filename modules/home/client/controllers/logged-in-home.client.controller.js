import _ from 'lodash';
import jQuery from 'jquery';

(() => {
	'use strict';

	angular
		.module('home')
		.controller('LoggedInHomeController', LoggedInHomeController);

	LoggedInHomeController.$inject = ['$scope', '$http', 'LoggedInHomeService'];

	function LoggedInHomeController ($scope, $http, LoggedInHomeService) {
        LoggedInHomeService.auth();

        $scope.onLogin = result => {
            jQuery('.modal').modal('hide');
        }

        $scope.form = 'default';
        $scope.toggleForm = () => {
            $scope.form = $scope.form == 'default' ? 'signup' : 'default';
            console.log($scope.form);
        }

	}

})();
