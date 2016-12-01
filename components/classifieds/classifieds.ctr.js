(function () {
    "use strict";

    angular.module('ngClassifieds')
        .controller('classifiedsCtrl',['$scope','$state', "classifiedsFactory",'$mdSidenav',"$mdToast","$mdDialog", function ($scope,$state,classifiedsFactory,$mdSidenav,$mdToast,$mdDialog) {
            var vm = this;

            vm.categories;
            // vm.classified;
            vm.classifieds;
            // vm.closeSidebar = closeSidebar;
            vm.deleteClassified = deleteClassified;
            // vm.editing;
            vm.editClassified = editClassified;
            vm.openSidebar = openSidebar;
            // vm.saveClassified =saveClassified;
            // vm.saveEdit = saveEdit;
            vm.toggleFilters = toggleFilters;


            // classifiedsFactory.getClassifieds().then(function (classifieds) {
            //     vm.classifieds = classifieds.data;
            //     vm.categories = getCategories(vm.classifieds);
            // });

            vm.classifieds = classifiedsFactory.ref;
            vm.classifieds.$loaded().then(function (classifieds) {
                console.log(classifieds);
                vm.categories = getCategories(classifieds)
            });
            $scope.$on('newClassified', function (event, classified) {
                vm.classifieds.$add(classified);
                // classified.id = Date.now();
                // vm.classifieds.push(classified);
                showToast('Classified Saved!');
            });
            $scope.$on('editSaved',function (event, message) {
                showToast(message);
            });

            vm.showFilters = false;

            var contact = {
                name: "John Dow",
                phone: (555)-555-5555,
                email: "johndoe@gmail.com"
            };
            function toggleFilters() {
                vm.showFilters = !vm.showFilters;
            }

            function openSidebar () {
                $state.go('classifieds.new')
            }
            // function closeSidebar () {
            //     $mdSidenav('left').close();
            // }
            // function saveClassified(classified) {
            //     if(classified){
            //         classified.contact = contact;
            //         vm.classifieds.push(classified);
            //         vm.classified = {};
            //         closeSidebar();
            //         showToast("Classified Saved!")
            //     }
            //
            // }
            function editClassified(classified) {
              $state.go('classifieds.edit', {
                  id:classified.$id
              })
            }
            // function saveEdit() {
            //     vm.editing = false;
            //     vm.classified = {};
            //     closeSidebar();
            //     showToast("Edit Saved!");
            // }
            function deleteClassified(event,classified) {
                var confirm = $mdDialog.confirm()
                    .title("Are you sure you want to delelte " + classified.title + " ?")
                    .ok("Yes")
                    .cancel("No")
                    .targetEvent(event);
                $mdDialog.show(confirm).then(function () {
                    vm.classifieds.$remove(classified);
                    showToast('Classified Deleted!');
                    // var index = vm.classifieds.indexOf(classified);
                    // vm.classifieds.splice(index,1);
                }, function () {

                });
            }
            function showToast(msg) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(msg)
                        .position('top, right')
                        .hideDelay(3000)
                );
            }
            function getCategories(classifieds) {
                var categories =[];
                angular.forEach(classifieds, function (item) {
                    angular.forEach(item.categories, function (category) {
                        categories.push(category)
                    })
                });
                return _.uniq(categories);
            }

        }])


})();