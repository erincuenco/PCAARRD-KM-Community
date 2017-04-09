import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('GroupClassificationController', GroupClassificationController);

	GroupClassificationController.$inject = ['$scope', 'GroupClassificationService', 'SharedPaginationService', '$filter', 'ngToast'];

	function GroupClassificationController ($scope, GroupClassificationService, SharedPaginationService, $filter, ngToast) {
		const {deleteOneGroupClassification} = GroupClassificationService;
		$scope.deleteOneGroupClassification = _.partial(deleteOneGroupClassification);

		$scope.addGroupClassificationFormData = {};

		$scope.paginate = SharedPaginationService;
		$scope.paginate.currentPage = 1;
		$scope.paginate.classificationsPerPage = 10;

		$scope.editedGroupClassificationFormData = null;

		$scope.clearGroupClassificationForm = () => {
			$scope.addGroupClassificationFormData = null;
		}

		$scope.validateExistingGroupClassification = (formData) => {
			GroupClassificationService.getAllGroupClassifications();

			return $scope.groupClassifications.contents.map((item) => (item.specificCommodity || item.isp).toLowerCase())
					.indexOf((formData.specificCommodity || formData.isp).toLowerCase());
		}

		$scope.getExistingGroupClassification = (existingGroupClassificationIndex) => {
			GroupClassificationService.getAllGroupClassifications();

			return $scope.groupClassifications.contents[existingGroupClassificationIndex];
		}

		$scope.onProcessGroupClassificationForm = () => {
			const existingGroupClassification = $scope.validateExistingGroupClassification($scope.addGroupClassificationFormData);

			if (existingGroupClassification < 0){	// the specific commodity or isp does not exist
				$scope.addGroupClassificationFormData.isUsed = false;

				if (!$scope.addGroupClassificationFormData.specificCommodity)
					$scope.addGroupClassificationFormData.specificCommodity = null;

				GroupClassificationService.submitGroupClassification($scope.addGroupClassificationFormData)
				.then(() => {
					$scope.clearGroupClassificationForm();
				});
			} else {
				ngToast.create({
		    		className: 'danger',
		    		content: `Error: The Specific Commodity or ISP already exists!`
		    	});
			}
		}

		$scope.onEditGroupClassification = (groupClassification) => {
			$scope.editedGroupClassificationFormData = _.cloneDeep(groupClassification);
		}

		$scope.isEditingClassification = (groupClassificationID) => {
			return $scope.editedGroupClassificationFormData && ($scope.editedGroupClassificationFormData._id === groupClassificationID);
		}

		$scope.onProcessEditedGroupClassification = () => {
			const existingGroupClassification = $scope.validateExistingGroupClassification($scope.editedGroupClassificationFormData);

			if (existingGroupClassification < 0 || $scope.getExistingGroupClassification(existingGroupClassification)._id === $scope.editedGroupClassificationFormData._id){	
				const updatedFields = {
					industry: $scope.editedGroupClassificationFormData.industry,
					sector: $scope.editedGroupClassificationFormData.sector,
					isp: $scope.editedGroupClassificationFormData.isp,
				};

				updatedFields.specificCommodity = $scope.editedGroupClassificationFormData.specificCommodity || null;

				GroupClassificationService.updateGroupClassification($scope.editedGroupClassificationFormData._id, updatedFields)
				.then(() => {
					$scope.editedGroupClassificationFormData = null;

					ngToast.create({
			    		className: 'success',
			    		content: `The Group Classification was successfully updated.`
			    	});

			    	$scope.searchClassificationsValue = "";
				});

			} else {
				ngToast.create({
		    		className: 'danger',
		    		content: `Error: The Specific Commodity or ISP already exists!`
		    	});
			}
		}

		$scope.cancelEditGroupClassification = () => {
			$scope.editedGroupClassificationFormData = null;
		}

		$scope.$watch('searchClassificationsValue', function(value){ 
			if ($scope.groupClassifications){
				GroupClassificationService.getAllGroupClassifications()
					.then(() => {
						$scope.groupClassifications.contents = $filter('filter')($scope.groupClassificationsCopy.contents, value);
						$scope.paginate.currentPage = 1;
					}, (error) => {
						// problem with loading group classifications
					});
			}
    	});

		GroupClassificationService.getAllGroupClassifications();
		$scope.groupClassifications = GroupClassificationService.getGroupClassificationList();
		$scope.groupClassificationsCopy = GroupClassificationService.getGroupClassificationListCopy();
	}

})();