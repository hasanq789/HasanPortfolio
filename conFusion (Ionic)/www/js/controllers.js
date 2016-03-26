angular.module('conFusion.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localStorage, $ionicPlatform, $cordovaCamera, $cordovaImagePicker) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.registration = {};

  // Registation modal
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.registerform = modal;
  });

  $scope.closeRegister = function() {
    $scope.registerform.hide();
  };


  $scope.register = function() {
    $scope.registerform.show();
  };

  $scope.doRegister = function() {
    console.log('Doing reservation', $scope.reservation);

    // Simulate a registration delay. Replace with registration code later
    $timeout(function() {
        $scope.closeRegister();
    }, 1000);
  };

  // Form data for the login modal
  $scope.loginData = $localStorage.getObject('userinfo', '{}');

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $localStorage.storeObject('userinfo', $scope.loginData);

    // Simulate a login delay
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $ionicModal.fromTemplateUrl('templates/reserve.html', { scope: $scope }).then(function(modal) {
    $scope.reserveform = modal;
  });

  // Triggered in the reserve modal to close it
  $scope.closeReserve = function() {
    $scope.reserveform.hide();
  };

  // Open the reserve modal
  $scope.reserve = function() {
    $scope.reserveform.show();
  };

  $scope.doReserve = function() {
    console.log('Doing reservation', $scope.reservation);
  
    // Simulate a reservation delay.
    $timeout(function() {
    $scope.closeReserve();
    }, 1000);
  };

  // Cordova camera plugin
  $ionicPlatform.ready(function() {

    // Options for $cordovaCamera
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
    };

    // Options for $cordovaImagePicker
    var imgpOptions = {
        maximumImagesCount: 1,
        width: 100,
        height: 100,
        quality: 80
    };

    $scope.takePicture = function() {
        $cordovaCamera.getPicture(options).then(function(imageData) {
            console.log(imageData);
            $scope.registration.imgSrc = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            console.log(err);
        });

        $scope.registerform.show();
    }

    $scope.getGallery = function() {

        $cordovaImagePicker.getPictures(imgpOptions)
          .then(function(imageData) {
            console.log(imageData[0]);
            $scope.registration.imgSrc = imageData[0];
          }, function(err) {
            console.log("Error getting photos; err: " + err);
          });
          $scope.registerform.show();
    }
  });

})

.controller('MenuController', ['$scope', 'dishes', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function($scope, dishes, favoriteFactory, baseURL, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {
            $scope.baseURL = baseURL;
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = true;
            $scope.message = "Loading ...";
            
            $scope.dishes = dishes;
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };

            $scope.addFavorite = function(index) {
                console.log("index is " + index);
                favoriteFactory.addToFavorites(index);
                $ionicListDelegate.closeOptionButtons();

                $ionicPlatform.ready(function() {
                    $cordovaLocalNotification.schedule({
                        id: 1, 
                        title: "Added Favorite",
                        text: $scope.dishes[index].name
                    }).then(function() {
                        console.log('Added Favorite ' + $scope.dishes[index].name);
                    },
                    function() {
                        console.log('Failed to add Notification');
                    });

                    $cordovaToast
                        .show('Added Favorite ' + $scope.dishes[index].name, 'long', 'center')
                        .then(function(success) {
                            // success
                        }, function(error) {
                            // error
                        });
                });
            };
            
        }])

        .controller('FavoritesController', ['$scope', 'dishes', 'favorites', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicPlatform', '$cordovaVibration', function($scope, dishes, favorites, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicPlatform, $cordovaVibration) {
            
            $scope.baseURL = baseURL;
            $scope.shouldShowDelete = false;

            $scope.favorites = favorites;

            $scope.dishes = dishes;

            $scope.toggleDelete = function() {
                $scope.shouldShowDelete = !$scope.shouldShowDelete;
                console.log($scope.shouldShowDelete);
            }

            $scope.deleteFavorite = function(index) {

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Delete',
                    template: 'Are you sure you want to delete this item?'
                });

                confirmPopup.then(function(res) {
                    if (res) {
                        console.log('Ok to delete');
                        favoriteFactory.deleteFromFavorites(index);

                        $ionicPlatform.ready(function(){
                            console.log("Send vibration");
                            $cordovaVibration.vibrate(100);
                        });

                    } else {
                        console.log('Canceled delete');
                    }
                });

                $scope.shouldShowDelete = false;
            }


        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.save($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'dish', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicPopover', '$ionicModal', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function($scope, $stateParams, dish, menuFactory, favoriteFactory, baseURL, $ionicPopover, $ionicModal, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {
            $scope.baseURL = baseURL;
            $scope.dish = dish;

            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};

            $ionicPopover.fromTemplateUrl('templates/dish-detail-popover.html', {
                scope: $scope
            }).then(function(popover) {
                $scope.popover = popover;
            });

            $scope.openPopover = function($event) {
                $scope.popover.show($event);
            };
            $scope.closePopover = function() {
                $scope.popover.hide();
            };
            $scope.$on('$destroy', function() {
                $scope.popover.remove();
            });

            $scope.addFavorite = function(index) {
                console.log("Add index to My Favorites: " + index);
                favoriteFactory.addToFavorites(index);

                $ionicPlatform.ready(function() {
                    console.log('Adding...' + $scope.dish.name);
                    $cordovaLocalNotification.schedule({
                        id: 1, 
                        title: "Added Favorite",
                        text: $scope.dish.name
                    }).then(function() {
                        console.log('Added Favorite ' + $scope.dish.name);
                    },
                    function() {
                        console.log('Failed to add Notification');
                    });

                    $cordovaToast
                        .show('Added Favorite ' + $scope.dish.name, 'long', 'bottom')
                        .then(function(success) {
                            // success
                        }, function(error) {
                            // error
                        });
                });

                $scope.closePopover();

            };

            // Submit Comment Modal

            $ionicModal.fromTemplateUrl('templates/dish-comment.html', { scope: $scope }).then(function(modal) {
                $scope.commentform = modal;
            });

            // Triggered in the reserve modal to close it
            $scope.closeComment = function() {
                $scope.commentform.hide();
            };

            // Open the reserve modal
            $scope.addComment = function() {
                $scope.closePopover();
                $scope.commentform.show();
            };

            $scope.doComment = function() {

                $scope.mycomment.date = new Date().toISOString();
                console.log('Adding comment: ', $scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);
                menuFactory.update({id:$scope.dish.id},$scope.dish);
                                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
                $scope.closeComment();
            };
        }])

        .controller('IndexController', ['$scope', 'dish', 'promotion', 'leader', 'menuFactory', 'promotionFactory', 'corporateFactory', 'baseURL', function($scope, dish, promotion, leader, menuFactory, promotionFactory, corporateFactory, baseURL) {
                        
                        $scope.baseURL = baseURL;           
                        $scope.leader = leader;

                        $scope.showDish = false;
                        $scope.message="Loading ...";

                        $scope.dish = dish;
                        $scope.promotion = promotion;
                    }])


        .controller('AboutController', ['$scope', 'leaders', 'baseURL', function($scope, leaders, baseURL) {
                        $scope.baseURL = baseURL;
                        $scope.leaders = leaders;
                        console.log($scope.leaders);
                    }])

        .filter('favoriteFilter', function() {
            return function(dishes, favorites) {
                var out = [];
                for (var i = 0; i < favorites.length; i++) {
                    for (var j = 0; j < dishes.length; j++) {
                        if (dishes[j].id === favorites[i].id)
                            out.push(dishes[j]);
                    }
                }
                return out;
            }
        });
