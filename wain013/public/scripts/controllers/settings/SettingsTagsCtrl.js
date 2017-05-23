var SettingsTagsCtrl = function($scope, SettingsService) {


        $scope.eventsOptions = SettingsService.queryTags();
        
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
                tag:{
                    arabic: $scope.addArabicOption,
                    english: $scope.addEnglishOption
                },
                color: $scope.addColor
            }
            SettingsService.saveTag(item,function () {
                $('#addNewAppModal').modal('hide');
                $scope.eventsOptions = SettingsService.queryTags();
            });
        }
        
        $scope.delete = function(item){
            SettingsService.removeTag({tagId: item._id},function (response) {
                
                var index = $scope.eventsOptions.indexOf(item);
                $scope.eventsOptions.splice(index, 1);
                
                if(!response._id){
                    $scope.eventsOptions = SettingsService.queryTags();
                }
                
            });
        }

        $scope.save = function(item){
            $('#EditModel').modal('hide');
            SettingsService.updateTag({tagId: $scope.item._id},$scope.item,function (response) {
                if(!response.ok){
                    $scope.eventsOptions = SettingsService.queryTags();
                }
            })
        }

    };

module.exports = SettingsTagsCtrl;