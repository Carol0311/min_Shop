/**
 * Created by Administrator on 2017/7/16.
 */
app.controller('ManageCtrl',function($rootScope,$scope,$location,$http,fileReader) {
    $scope.keyword = "";
    $scope.ware = {};
    $scope.filter = function () {
    }
    $scope.wares = [];
    $scope.pages = [];
    $http({
        url: '/manage/getAllList',
        method: 'GET'
    }).then(function successCallback(response) {
        $scope.wares = response.data;
        var length = $scope.wares.length;
        $scope.pageLength = Math.ceil(length/10);
        for(var i = 1;i< $scope.pageLength + 1;i++){
            $scope.pages[i] = i+1;
        }
    }, function errorCallback(response) {
        $location.path('/users/home');
    });
    $scope.delete = function(){
        $http({
            url: '/manage/deletePictureList',
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
            $location.path('/users/home');
        }, function errorCallback(response) {
            $location.path('/manage/manage');
        });
    }
    $scope.save = function () {
     console.log("add the picture to picture list");
     $http({
         url: '/manage/addPictureList',
         method: 'POST',
         data: $scope.ware,
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         transformRequest: function (obj) {
             var str = [];
             for (var p in obj) {
                 str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
             }
             return str.join("&");
         }
     }).then(function successCallback(response) {
         $location.path('/manage/manage');
     }, function errorCallback(response) {
         $location.path('/users/home');
     });
    };
    $scope.edit = function(e){
        $scope.pictures = [];
        $scope.pictures.push(JSON.parse(e.target.attributes.getNamedItem("listValue").value));
    }
    $scope.getFile = function(){
        var s = fileReader.readAsDataUrl($scope.file,$scope);
        s.then(function(result){
            $scope.ware.imgSrc = result;
        })
    }
});
app.directive('addPicture',function(){

    return {
        link:function($scope,element,attrs){
            element.click(function(){
                $scope.$apply(function(){
                    $scope.ware = {};
                });
                $('#addDialog').modal(true);
            });
        }
    }
});
app.directive('editPicture',function(){
    return {
        scope:{},
        link:function($scope,element,attrs){
            element.click(function(e){
                $scope.$apply(function(){
                    $scope.pictures = [];
                    $scope.pictures.push(JSON.parse(e.target.attributes.getNamedItem("listValue").value));
                });
                $('#editDialog').modal(true);
            });
        }
    }
});
app.directive('fileModel',function(){
        return {
            link:function(scope,element,attrs){
                element.bind('change',function(event){
                    scope.file = element[0].files[0];
                    scope.getFile();
                });
            }
        }
    });
 app.factory('fileReader',function($q){
        //读取文件成功后触发
        var onLoad = function(reader,deferred,scope){
            return function(){
                scope.$apply(function(){
                    deferred.resolve(reader.result);
                });
            }
        }
        //读取失败后触发
        var onError = function(reader,deferred,scope){
            return function(){
                scope.$apply(function(){
                    deferred.reject(reader.result);
                });
            }
        }
        //获取文件读取器
        var getReader = function(deferred,scope){
            var reader = new FileReader();
            reader.onload = onLoad(reader,deferred,scope);
            reader.onerror = onError(reader,deferred,scope);
            return reader;
        }
        //读取为dataurl
        var readAsDataURL = function(file,scope){
            var deferred = $q.defer();
            var reader = getReader(deferred,scope);
            reader.readAsDataURL(file);
            return deferred.promise;
        }
        return {
            readAsDataUrl:readAsDataURL
        }
 });
