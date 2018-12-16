'use strict'
var app = angular.module('inventory')
app.factory('InventoryService', InventoryService);
InventoryService.$inject = ['$http', '$q'];

function InventoryService($http, $q) {
    var inventoryservice = {};
    inventoryservice.getJson = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'app/site/inventory/json/inventory.json'
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
    return inventoryservice;
}
