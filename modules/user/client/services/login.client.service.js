import _ from 'lodash';

(() => {
	'use strict';

	angular
		.module('user')
		.service('LoginService', LoginService);

	LoginService.$inject = ['$http', '$state', '$location'];

	function LoginService ($http, $state, $location) {
        this.setSession = function() {
            $http({
                method: 'GET',
                url: 'http://localhost:8080/auth/session'
            }).then(success, error);

            function success(response) {
                const data = response.data;
                
                localStorage.setItem('email', data.email);
                localStorage.setItem('fname', data.name[0].first);
                localStorage.setItem('lname', data.name[0].last);
            }

            function error(response) {
                // TODO: Catch error
            }
        }
	}

})();
