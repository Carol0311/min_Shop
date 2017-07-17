/**
 * Created by Administrator on 2017/7/17.
 */
app.controller('NavBarCtrl',function($scope,$http,$location,$rootScope){
    $scope.logout =function() {
        console.log("log out");
        $http({
            url: '/users/logout',
            method: 'POST',
            data: $rootScope.me,
            headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj){
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        }).then(function successCallback(response) {
            $location.path('/users/home');
            $rootScope.me = null;
            delete req.session.user;
        }, function errorCallback(response) {
            $location.path('/users/login');
        });
    }
});