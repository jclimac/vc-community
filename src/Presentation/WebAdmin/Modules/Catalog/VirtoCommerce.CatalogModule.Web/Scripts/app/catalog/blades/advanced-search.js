﻿angular.module('catalogModule.blades.advancedSearch', [
    'catalogModule.blades.advancedSearchResult'
])
.controller('advancedSearchController', ['$scope', '$filter', 'itemsSearch', 'bladeNavigationService', function ($scope, $filter, itemsSearch, bladeNavigationService) {
    var propertyValues = undefined;
    $scope.filter = { searchKeyword: undefined };

    $scope.blade.refresh = function () {
        $scope.blade.isLoading = true;

        //Set filters
        prepareFilter();

        var searchResult = itemsSearch.query({ categoryId: $scope.filter.categoryId, catalogId: $scope.filter.catalogId, keyword: $scope.filter.searchKeyword, propertyValues: $scope.filter.propValues, responseGroup: 'withCatalogs, withCategories, withProperties', start: 0, count: 0 }, function () {
            $scope.blade.isLoading = false;

            // adding root element
            var rootNode = {
                children: searchResult.treeNodes
            };
            $scope.tree = [rootNode];

            //populate property filter panel
            $scope.propertyValueGroups = preparePropertyValueGroups(propertyValues, searchResult.propertyValues);
            propertyValues = searchResult.propertyValues;
            $scope.checkedPropValues = getAllCheckedPropValues(propertyValues);
        });
    };

    $scope.refreshItems = function () {
        //Set filters
        prepareFilter();
        
        var newBlade = {
            id: "searchResults",
            title: 'Search results',
            subtitle: '',
            filter: $scope.filter,
            controller: 'advancedSearchResultsController',
            template: 'Modules/Catalog/VirtoCommerce.CatalogModule.Web/Scripts/app/catalog/blades/advanced-search-results.tpl.html'
        };
        bladeNavigationService.showBlade(newBlade, $scope.blade);
    };

    $scope.uncheckAllProp = function () {
        angular.forEach($scope.checkedPropValues, function (checkedPropValue) {
            checkedPropValue.isChecked = false;
        });
        $scope.updateSelectedPropValues();
        $scope.refreshItems();
    };

    $scope.updateSelectedPropValues = function () {
        $scope.checkedPropValues = getAllCheckedPropValues(propertyValues);
    };

    $scope.blade.onClose = function (closeCallback) {
        if ($scope.blade.childrenBlades.length > 0) {
            var callback = function () {
                if ($scope.blade.childrenBlades.length == 0) {
                    closeCallback();
                };
            };
            angular.forEach($scope.blade.childrenBlades, function (child) {
                bladeNavigationService.closeBlade(child, callback);
            });
        }
        else {
            closeCallback();
        }
    };

    function prepareFilter() {
        //Set filters
        //if (selectedNode != null) {
        //    $scope.filter.categoryPath = selectedNode.path;
        //    if (selectedNode.type == "catalog") {
        //        $scope.filter.categoryId = undefined;
        //        $scope.filter.catalogId = selectedNode.id;
        //    } else {
        //        $scope.filter.categoryId = selectedNode.id;
        //        $scope.filter.catalogId = selectedNode.catalogId;
        //    }
        //}
        //$scope.filter.propValues = getAllCheckedPropValues(propertyValues);
    };

    function getAllCheckedPropValues(propValues) {
        var retVal = [];
        angular.forEach(propValues, function (propValue) {
            if (propValue.isChecked) {
                retVal.push(propValue);
            };
        });
        return retVal;
    };

    function preparePropertyValueGroups(oldPropertyValues, newPropValues) {
        var retVal = {};
        var checkedPropValues = getAllCheckedPropValues(oldPropertyValues);
        angular.forEach(newPropValues, function (propValue) {
            if (angular.isUndefined(retVal[propValue.propertyName])) {
                retVal[propValue.propertyName] = { propValues: [], showAll: false };
            };
            retVal[propValue.propertyName].propValues.push(propValue);
            propValue.isChecked = $filter('filter')(checkedPropValues, function (value) { return value.propertyName == propValue.propertyName && value.value == propValue.value; }).length > 0;
        });
        return retVal;
    };

    // actions on load
    $scope.blade.refresh();
    $scope.refreshItems();
}]);
