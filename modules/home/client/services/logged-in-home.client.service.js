import _ from 'lodash';

(() => {
	'use strict';

	angular
		.module('home')
		.service('LoggedInHomeService', LoggedInHomeService);

	LoggedInHomeService.$inject = ['$http', '$state', '$location'];

	function LoggedInHomeService ($http, $state, $location) {
        this.auth = function() {
            if(localStorage.getItem('email') == null) {
                $state.go('entry');
            }
        }
	}

})();
