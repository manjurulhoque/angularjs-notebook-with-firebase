'use strict';

//console.log("From contacts....");

angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/contacts', {
            templateUrl: 'contacts/contacts.html',
            controller: 'ContactsCtrl'
        })
        .when('/about', {
            templateUrl: 'contacts/about.html',
            controller: 'ContactsCtrl'
        });
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {

    var ref = firebase.database().ref().child("contacts");
    // create a synchronized array
    // click on `index.html` above to see it used in the DOM!
    $scope.contacts = $firebaseArray(ref);

    //$scope.name = "John Doe";

    var id;

    $scope.addFormSubmit = function () {
        var name = $scope.name;
        var email = $scope.email;
        var company = $scope.company;

        $scope.contacts.$add({
            name: name,
            email: email,
            company: company
        }).then(function (ref) {
            //var id = ref.key();
            //console.log("Adding contacts with id " + id);
        });
        clearfields();
        close();
    }

    $scope.removeContact = function (contact) {
        $scope.contacts.$remove(contact);
        console.log("Contact removed...");
    }

    $scope.editContact = function (contact) {
        id = contact;
        //console.log(id.$id);
        $scope.name_update = contact.name;
        $scope.email_update = contact.email;
        $scope.company_update = contact.company;
    }
    
    $scope.showContact = function(contact)
    {
        
    }

    $scope.EditFormSubmit = function () {
        //        firebase.database().ref().update({
        //            ame: $scope.name_update,
        //            email: $scope.email_update,
        //            company: $scope.company_update
        //        });
        var record = $scope.contacts.$getRecord(id.$id);
        record.name = $scope.name_update;
        record.email = $scope.email_update;
        record.company = $scope.company_update;

        $scope.contacts.$save(record);
        //console.log(id.$id);
        //console.log($scope.contacts.$getRecord(id.$id));
        close2();
        //$scope.msg = "Contacts updated";
        timeOut();
    }
    
    $scope.showContact = function(contact)
    {
        console.log('Single contact showing...');
        
        $scope.name = contact.name;
        $scope.email = contact.email;
        $scope.company = contact.company;
        
        $scope.contactShow = true;
    }
    
    $scope.contactHide = function()
    {
        $scope.contactShow = false;
    }

}]);

function timeOut() {
    var msg = document.getElementById("msg");
    msg.innerHTML = "Contacts updated"

    setTimeout(function () {
        document.getElementById("msg").innerHTML = '';
    }, 3000);
}

function close() {
    $('#squarespaceModal').modal('hide');
}

function close2() {
    $('#squarespaceModal2').modal('hide');
}

function clearfields()
{
    $("form").trigger('reset');
}
