(function () {

    'use strict';
    angular
        .module("ngClassifieds")
        .directive("classifiedCard", function () {
            return {
                templateUrl: "components/classifieds/card/classified-card.tpl.html",
                scope: {
                 classifieds: "=",
                    classifiedsFilter: "=",
                    category: "="
                },
                controller: classifiedCardController,
                controllerAs: "vm"
            }
            function classifiedCardController($state, $scope, $mdDialog) {

                var vm = this;
                vm.editClassified = editClassified;
                vm.deleteClassified = deleteClassified;

                function editClassified(classified) {
                    $state.go('classifieds.edit', {
                        id: classified.$id
                    })
                }


                function deleteClassified(event, classified) {
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
            }
        })
})();