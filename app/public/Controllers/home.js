/**
 * Created by Administrator on 2017/7/17.
 */
app.controller('HomeCtrl',function($scope,$http,$location,$rootScope){
    $scope.title = 'Picture Shop';
    $scope.images = [];
    $http({
        url:'/users/home',
        method:'GET'
    }).then(function successCallback(response) {
        console.log(response);
        $scope.images = response.data;
    }, function errorCallback(response) {
        console.log(response);
    });
    $scope.addToList = function(){
        console.log("add the picture to shopping list");
        $http({
            url: '/users/addShoppingList',
            method: 'POST',
            data: this.item,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        }).then(function successCallback(response) {
            $location.path('/users/home');
        }, function errorCallback(response) {
            $location.path('/users/home');
        });
    }
});