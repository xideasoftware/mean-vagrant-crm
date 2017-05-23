var BusinessOptionsCtrl = function($scope, BusinessService) {


        $scope.eventsOptions = BusinessService.getBusinessesOptions();
        
        $scope.showModal = function() {
            $('#addNewAppModal').modal('show');
        }
        
        $scope.editModal = function(item) {
            $scope.item = item;
            $('#EditModel').modal('show');
        }
        
        
        
        $scope.add = function(){
            var item = {
                option:{
                    arabic: $scope.addArabicOption,
                    english: $scope.addEnglishOption
                }
            }
            BusinessService.addBusinessesOption(item,function () {
                $('#addNewAppModal').modal('hide');
                $scope.eventsOptions = BusinessService.getBusinessesOptions();
            });
        }
        
        $scope.delete = function(item){
            BusinessService.removeBusinessesOption({optionId: item._id},function (response) {
                
                var index = $scope.eventsOptions.indexOf(item);
                $scope.eventsOptions.splice(index, 1);
                
                if(!response._id){
                    $scope.eventsOptions = BusinessService.getBusinessesOptions();
                }
                
            });
        }

        $scope.save = function(item){
            $('#EditModel').modal('hide');
            BusinessService.updateBusinessesOption({optionId: $scope.item._id},$scope.item,function (response) {
                if(!response.ok){
                    $scope.eventsOptions = BusinessService.getBusinessesOptions();
                }
            })
        }

    };

module.exports = BusinessOptionsCtrl;