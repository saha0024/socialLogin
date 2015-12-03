angular.module('starter.services', [])
.factory('FacebookService', function($auth, $http){

var facebookApiURL = 'https://graph.facebook.comm/v2.2';
    
    return {
    
    me: function(){
    if($auth.iaAuthenticated()){
    
    return $http.get(facebookApiURL + '/me',
                     {
                     
                         Param : {
                             
                             access-token: $auth.getToken(),
                             fields: 'id, name, link, gender, location, website, picture, relationship_status',
                             format: 'json'
                         
                        
                                  }
                     
                     });
    
    
    } else {
    
    $ionicPopup.alert({
    
    title: 'Error',
        content: 'User Not Authorized'
    
    });
    
    
    }
    
    
    
    }
    
        
        
    
    
    
    }
    
    
 

}
         
         
         .factory('httpInterceptor', function ($q, $rootScope, $log) {

    var numLoadings = 0;

    return {

        request: function (config) {

            numLoadings++;

            // Show loader
            $rootScope.$broadcast('loader_show');

            return config || $q.when(config)

        },

        response: function (response) {

            if ((--numLoadings) === 0) {

                // Hide loader
                $rootScope.$broadcast('loader_hide');

            }
            
            return response || $q.when(response)

        },
        
        responseError: function (response) {
            
            if (!(--numLoadings)) {
                
                // Hide loader
                $rootScope.$broadcast('loader_hide');
            }
            
            $rootScope.$broadcast('authentication-failed');
            
            return $q.reject(response);
            
        }

    }

});
