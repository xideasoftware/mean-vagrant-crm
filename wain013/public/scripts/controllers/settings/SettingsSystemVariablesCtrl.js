var SettingsSystemVariablesCtrl = function($scope, SettingsService) {

    $scope.typeList = ["STRING","BOOLEAN","NUMBER"];
    $scope.new = {};
    $scope.addType = $scope.typeList[0];


        $scope.eventsOptions = SettingsService.querySystemVariables();
        console.log($scope.eventsOptions);
        $scope.showModal = function() {
            $('#addNewAppModal').modal('show');
        }
        
        $scope.editModal = function(item) {
            $scope.item = item;
            $('#EditModel').modal('show');
        }

        var defaultColor = "#6d5cae";
        $scope.addColor = defaultColor;
        
        $scope.add = function(){
            var item = {

                    title: $scope.addTitle,
                    key: $scope.addKey,
                    group: $scope.addGroup,
                    type: $scope.addType,
                    isSerializable: $scope.addIsSerializable,
                    isHidden: false,
                    order: $scope.addOrder,
                    value: $scope.addValue

            }
            SettingsService.saveSystemVariable(item,function () {
                $('#addNewAppModal').modal('hide');
                $scope.eventsOptions = SettingsService.querySystemVariables();
            });
        }
        
        $scope.delete = function(item){
            SettingsService.removeSystemVariable({systemVariable: item._id},function (response) {
                
                var index = $scope.eventsOptions.indexOf(item);
                $scope.eventsOptions.splice(index, 1);
                
                if(!response._id){
                    $scope.eventsOptions = SettingsService.querySystemVariables();
                }
                
            });
        }

        $scope.save = function(item){
            $('#EditModel').modal('hide');
            SettingsService.updateSystemVariable({systemVariable: $scope.item._id},$scope.item,function (response) {
                if(!response.ok){
                    $scope.eventsOptions = SettingsService.querySystemVariables();
                }
            })
        }

    };

module.exports = SettingsSystemVariablesCtrl;