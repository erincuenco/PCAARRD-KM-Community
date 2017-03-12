import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';

	angular
		.module('layout')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$scope', '$state', 'LayoutHeaderService'];

	function HeaderController ($scope, $state, LayoutHeaderService) {
        $scope.user = LayoutHeaderService.getSession();
	}

})();
