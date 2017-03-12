(() => {
	'use strict';

	angular
		.module('user')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', '$state', '$http', 'LoginService'];

	function LoginController ($scope, $state, $http, LoginService) {
        $scope.email = '';
        $scope.password = '';
        $scope.form = 'default';

        $scope.toggleForm = () => {
            $scope.form = $scope.form == 'default' ? 'signup' : 'default';
        }

        $scope.login = () => {
            const data = {
                email: $scope.login.email,
                password: $scope.login.password
            }

            $http({
                method: 'POST',
                url: 'http://localhost:8080/auth/login',
                data: data
            }).then(success, error);

            function success(response) {
                LoginService.setSession();
                $state.go('home');
            }

            function error(response) {
                // TODO: Catch error
            }
        }

        $scope.signup = () => {
            const data = {
                first: $scope.signup.firstName,
                last: $scope.signup.lastName,
                email: $scope.signup.email,
                password: $scope.signup.password
            }

            $http({
                method: 'POST',
                url: 'http://localhost:8080/auth/register',
                data: data
            }).then(success, error);

            function success(response) {
                $state.go('home');
            }

            function error(response) {
                // TODO: Catch error
            }
        }
	}

})();
