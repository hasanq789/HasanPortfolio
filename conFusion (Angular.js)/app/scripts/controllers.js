'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;

        $scope.showMenu = false;
        $scope.message = "Loading ...";

        $scope.dishes = menuFactory.getDishes()
            .query(
                function successCallback(response) {

                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function errorCallback(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );

        $scope.select = function(setTab) {
            $scope.tab = setTab;
            if (setTab === 2) {
                $scope.filtText = "appetizer";
            } else if (setTab === 3) {
                $scope.filtText = "mains";
            } else if (setTab === 4) {
                $scope.filtText = "dessert";
            } else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function(checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };

    }])

    .controller('ContactController', ['$scope', function($scope) {
        $scope.feedback = {
            mychannel: "",
            firstName: "",
            lastName: "",
            agree: false,
            email: ""
        };

        var channels = [{value: "tel", label: "Tel."},
            {value: "Email", label: "Email"}];

        $scope.channels = channels;
        $scope.invalidChannelSelection = false;
    }])

    .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
        
        $scope.sendFeedback = function() {
            console.log($scope.feedback);
            
            if ($scope.feedback.agree && 
                ($scope.feedback.mychannel === "")) {
                
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            
            } else {
                feedbackFactory.feedbackResource().save($scope.feedback);
                $scope.invalidChannelSelection = false;
                $scope.feedback = {
                            mychannel: "",firstName: "",lastName: "",agree: false,email: ""
                        };
                $scope.feedback.mychannel = "";
                $scope.feedbackForm.$setPristine();
            }
        };

    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
        
       
        $scope.showDish = false;
        $scope.message = "Loading ...";

        $scope.dish = menuFactory.getDishes()
            .get({id: parseInt($stateParams.id, 10)})
            .$promise.then(
                function successCallback(response) {
                
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function errorCallback(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }             
            );
    }])

    .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {

        //Step 1: Create a JavaScript object to hold the comment from the form
        $scope.comment = {
            author: "",
            rating: 5,
            comment: "",
            date: ""
        };
        $scope.comment.date = new Date();
            
        $scope.submitComment = function () {
                
            //Step 2: This is how you record the date
            //"The date property of your JavaScript object holding the comment" = new Date().toISOString();
            $scope.comment.date = new Date().toISOString(); 

            // Step 3: Push your comment into the dish's comment array
            $scope.dish.comments.push($scope.comment);
                
            menuFactory.getDishes().update({id: $scope.dish.id}, $scope.dish);
                
            //Step 4: reset your form to pristine
            $scope.commentForm.$setPristine();
                
            //Step 5: reset your JavaScript object that holds your comment
            $scope.comment = {
                author: "",
                rating: 5,
                comment: "",
                date: ""
            };

            $scope.comment.date = new Date();
        };
    }])

    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {

        $scope.showFeaturedDish = false;
        $scope.getDishStatusMessage = "Loading ...";

        // handling asynchronous request
        $scope.featuredDish = menuFactory.getDishes()
            .get({id: 0})
            .$promise.then(
                function successCallback(response) {

                    $scope.featuredDish = response;
                    $scope.showFeaturedDish = true;
                },
                function errorCallback(response) {
                    $scope.getDishStatusMessage = "Error: " + response.status + " " + response.statusText;
                }             
            );
        $scope.showPromotionDish = false;
        $scope.getPromotionStatusMessage = "Loading ...";
        
        $scope.promotionDish = menuFactory.getPromotion()
            .get({id:0})
            .$promise.then(
                function successCallback(response) {
                    $scope.promotionDish = response;
                    $scope.showPromotionDish = true;
                },
                function errorCallback(response) {
                    $scope.getPromotionStatusMessage = "Error: " + response.status + " " + response.statusText;
                }
            );

        $scope.showChiefInfo = false;
        $scope.getChiefInfoStatusMessage = "Loading ...";
        $scope.executiveChiefInfo = corporateFactory.getLeaders()
            .get({id:0})
            .$promise.then(
                function successCallback(response) {
                    $scope.executiveChiefInfo = response;
                    $scope.showChiefInfo = true; 
                },
                function errorCallback(response) {
                    $scope.getChiefInfoStatusMessage = "Error: " + response.status + " " + response.statusText;
                }
            );
        
    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {

        $scope.showLeaders = false;
        $scope.getLeadersStatusMessage = "Loading ...";

        $scope.leaders = corporateFactory.getLeaders()
            .query(
                function successCallback(response) {
                    $scope.leaders = response;
                    $scope.showLeaders = true; 
                },
                function errorCallback(response) {
                    $scope.getLeadersStatusMessage = "Error: " + response.status + " " + response.statusText;
                }
            );
    }])

;