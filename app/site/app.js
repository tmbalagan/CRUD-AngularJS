'use strict';

angular.module('inventory', [
    'ui.router',
    'ui.bootstrap',
    'toastr'
]);
angular.module('inventory')
    .config(config)
    .config(function (toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: true,
            maxOpened: 1,
            tapToDismiss: true,
            closeButton: true,
            closeHtml: '<i class="fa fa-times"></i>'
        });
    })
    .run(run)
    .controller('MainCtrl', function ($location) {
        $location.path('/app/inventory');
    })

function run($location) {
    $location.path('/app/inventory');
}

function config($stateProvider, $urlRouterProvider, $httpProvider, $urlMatcherFactoryProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
    $urlMatcherFactoryProvider.defaultSquashPolicy(true);
    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.path(),
            normalized = path.toLowerCase();

        if (path !== normalized) {
            return normalized;
        }
    });
    $urlRouterProvider.otherwise('/app/inventory');
    $stateProvider
        .state('app', {
            url: '/app',
            controller: 'MainCtrl',
            controllerAs: 'MC',
        })
        .state('app.inventory', {
            url: '/inventory',
            controller: 'inventoryController',
            controllerAs: 'IC',
            templateUrl: 'app/site/inventory/view/inventory.html',
            resolve: {
                InventoryResolve: function (InventoryService) {
                    return InventoryService.getJson();
                }
            }
        })
}
