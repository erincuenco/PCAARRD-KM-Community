import _ from 'lodash';

(() => {
	'use strict';

	angular
		.module('layout')
		.service('LayoutHeaderService', LayoutHeaderService);

	LayoutHeaderService.$inject = ['$http', '$state', '$location'];

	function LayoutHeaderService ($http, $state, $location) {
        this.getSession = function() {
            let user = {};

            user.email = localStorage.getItem('email');
            user.fname = localStorage.getItem('fname');
            user.lname = localStorage.getItem('lname');

            return user;
        }
	}

})();
