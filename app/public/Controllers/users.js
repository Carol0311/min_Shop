/**
 * Created by Administrator on 2017/7/16.
 */
app.controller('RegCtrl',function($scope,$http,$location){
    $scope.title = 'Sign Up';
    $scope.save =function() {
        console.log("sign up save");
        $http({
            url: '/users/reg',
            method: 'POST',
            data: $scope.user,
            headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj){
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        }).then(function successCallback(response) {
            $location.path('/users/login');
        }, function errorCallback(response) {
            $location.path('/users/reg');
        });
    }
});
app.controller('LoginCtrl',function($rootScope,$scope,$location,$http){
    $scope.title = 'Sign in';
    $scope.save =function() {
        console.log("sign in save");
        $http({
            url: '/users/login',
            method: 'POST',
            data: $scope.user,
            headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj){
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        }).then(function successCallback(response) {
            $rootScope.me = response.data;
            $rootScope.alreadyLogin = true;
            $location.path('/users/home');
        }, function errorCallback(response) {
            $location.path('/users/login');
        });
    }
});
app.controller('ListCtrl',function($rootScope,$scope,$location,$http) {
    $scope.keyword = "";
    $scope.ware = {};
    $scope.filter = function () {
    }
    $scope.wares = [];
    $http({
        url: '/users/getShoppingList',
        method: 'GET'
    }).then(function successCallback(response) {
        $scope.wares = response.data;
        var length = $scope.wares.length;
        console.log($scope.pages);
    }, function errorCallback(response) {
        $location.path('/users/home');
    });
    $scope.pages = [1];
    $scope.delete = function(){
        $http({
            url: '/users/deleteShoppingList',
            method: 'POST',
            data: this.ware,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        }).then(function successCallback(response) {
            $location.path('/users/list');
        }, function errorCallback(response) {
            $location.path('/users/home');
        });
    }
});
