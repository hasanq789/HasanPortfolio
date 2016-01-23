'use strict';

angular.module('confusionApp')
    .constant("baseURL", "http://localhost:3000/")
    // $http is injected to handle request
    .service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.getDishes = function() {
            // handling the result is done in the controller
            return $resource(
                baseURL + "dishes/:id", 
                null,
                {'update': {method: 'PUT'}});
        };

        this.getPromotion = function() {
            return $resource(baseURL + "promotions/:id");
        };

    }])

    .factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
        var corpfac = {};
        corpfac.getLeaders = function() {
            return $resource(baseURL + "leadership/:id");
        };

        return corpfac;
    }])
    
    .service('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.feedbackResource = function() {
            return $resource(baseURL + "feedback/",
                null,
                {'save': {method: 'POST'}});
        };
    }])
;