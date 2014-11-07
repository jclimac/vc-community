﻿angular.module('catalogModule.blades.itemPropertyDetail', [
   'catalogModule.resources.items',
    'catalogModule.resources.properties',
	'ui.bootstrap.typeahead',
    'ngSanitize'
])
.controller('itemPropertyController', ['$rootScope', '$scope', 'items', 'properties', 'bladeNavigationService', 'dialogService', '$injector', function ($rootScope, $scope, items, properties, bladeNavigationService, dialogService, $injector) {
    $scope.blade.origItem = {};
    $scope.blade.item = {};

    $scope.blade.refresh = function (parentRefresh) {
        items.get({ id: $scope.blade.itemId }, function (data) {
            $scope.blade.item = angular.copy(data);
            $scope.blade.origItem = data;
            $scope.blade.isLoading = false;
            if (parentRefresh) {
                $scope.blade.parentBlade.refresh();
            }
        });
    }

    function isDirty() {
        return !angular.equals($scope.blade.item, $scope.blade.origItem);
    };

    function saveChanges() {
        $scope.blade.isLoading = true;
        var changes = { id: $scope.blade.item.id, properties: $scope.blade.item.properties };
        items.updateitem({}, changes, function (data, headers) {
            $scope.blade.refresh(true);
        });
    };

    $scope.blade.onClose = function (closeCallback) {
        if (isDirty()) {
            var dialog = {
                id: "confirmItemChange",
                title: "Save changes",
                message: "The item has been modified. Do you want to save changes?"
            };
            dialog.callback = function (needSave) {
                if (needSave) {
                    saveChanges();
                }
                closeCallback();
            };
            dialogService.showConfirmationDialog(dialog);
        }
        else {
            closeCallback();
        }
    };

    $scope.editProperty = function (prop) {
        var newBlade = {
            id: 'editCategoryProperty',
            currentEntityId: prop.id,
            title: 'Edit category property',
            subtitle: 'enter property information',
            controller: 'propertyDetailController',
            template: 'Modules/Catalog/VirtoCommerce.CatalogModule.Web/Scripts/app/catalog/blades/property-detail.tpl.html'
        };

        bladeNavigationService.showBlade(newBlade, $scope.blade);
    };

    $scope.getPropValues = function (propId, keyword) {
        return properties.query({ propertyId: propId, keyword: keyword }).$promise.then(function (result) {
            return result;
        });
    };

    var formScope;
    $scope.setForm = function (form) {
        formScope = form;
    }

    $scope.bladeToolbarCommands = [
		{
		    name: "Save", icon: 'icon-floppy',
		    executeMethod: function () {
		        saveChanges();
		    },
		    canExecuteMethod: function () {
		        return isDirty() && formScope && formScope.$valid;
		    }
		},
        {
            name: "Reset", icon: 'icon-undo',
            executeMethod: function () {
                angular.copy($scope.origItem, $scope.blade.item);
            },
            canExecuteMethod: function () {
                return isDirty();
            }
        }
    ];

    $scope.blade.refresh();
}]);
