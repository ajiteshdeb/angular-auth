var app = angular.module("sampleApp", ["firebase","ngMessages"]);

// let's create a re-usable factory that generates the $firebaseAuth instance
app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);

// let's create a re-usable factory that generates the $firebaseObject instance
app.factory("Database", ["$firebaseObject",
  function($firebaseObject) {
    return $firebaseObject();
  }
]);

// and use it in our controller
app.controller("SampleCtrl", ["$scope", "Auth", "$firebaseObject" ,
  function($scope, Auth ,$firebaseObject) {
    $scope.createUser = function() {

      $scope.submitted=true;
      $scope.message = null;
      $scope.error = null;

      username = $scope.username;

      // Create a new user
      Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
        .then(function(firebaseUser) {
          $scope.message = "User created with uid: " + firebaseUser.uid;
          //$scope.message = "User created with username: " + username;

          // Save user data 
          userId = firebaseUser.uid;
          password = $scope.password;

          var ref = firebase.database().ref().child("users");
          // download the data into a local object
          var syncObject = $firebaseObject(ref);
          // synchronize the object with a three-way data binding
          // click on `index.html` above to see it used in the DOM!
          syncObject.$bindTo($scope, "users");

          firebase.database().ref('users/'+ userId).set({
        
            
              username: username,
              password: password
            
        
        
          });

        }).catch(function(error) {
          $scope.error = error;
        });

       

      
      
      

     

    };

    
  }
]);