(function () {
    "use strict";

    angular
        .module('ngClassifieds')
        .controller('newClassifiedsCtrl', ['$scope', '$state', '$mdSidenav', '$mdDialog', 'classifiedsFactory', '$timeout', function ($scope, $state, $mdSidenav, $mdDialog, classifiedsFactory, $timeout) {

            var vm = this;



            vm.closeSidebar = closeSidebar;
            vm.saveClassified = saveClassified;

            $timeout(function () {
                $mdSidenav('left').open();
            });
            $scope.$watch('vm.sidenavOpen', function (sidenav) {
                if (sidenav === false) {
                    $mdSidenav('left')
                        .close()
                        .then(function () {
                            $state.go('classifieds')
                        })
                }
            });
            function closeSidebar() {
                vm.sidenavOpen = false;
            }
            function saveClassified(classified) {
                classified.contact = {
                    name: "John Dow",
                    phone: (555)-555-5555,
                    email: "johndoe@gmail.com"
                };
                if(classified){
                    $scope.$emit('newClassified', classified);
                    vm.sidenavOpen = false;
                }
            }

        }])
})();