var app = angular.module("FilterApp", []);

app.controller("myRegionCtrl", function($scope) {

    $scope.selected = {name: "Worldwide", id: 0};

    // Selected should'nt be in here
    $scope.regions = [
        {name: "Europe", id: 1},
        {name: "North America ", id: 2},
        {name: "Australia", id: 3},
        {name: "New Zealand", id: 4},
        {name: "Japan", id: 5},
        {name: "China", id: 6},
        {name: "Asia", id: 7}
    ];

    $scope.setNewRegion = function(region) {
        console.log(region.name + ": " + region.id);
        // Remove region selected inside the array of objects regions and set it on top as selected
        for(var i = 0 ; i < $scope.regions.length; i++) {
            if($scope.regions[i].id == region.id)
                // // Add the old selected region back in the list
                $scope.regions[i] = $scope.selected;
        }

        $scope.selected = region;
        // $scope.regions.pop(region);
    };

});

app.controller("myPlatformCtrl", function($scope) {

    $scope.selected = {name: "All", id: 0};

    // Selected should'nt be in here
    $scope.platforms = [
        {name: "Windows", id: 6},
        {name: "3DS", id: 37},
        {name: "Wii U", id: 41},
        {name: "PS4", id: 48},
        {name: "PS3", id: 9},
        {name: "Xbox One", id: 49},
        {name: "Xbox 360", id: 12}
    ];

    $scope.setNewPlatform = function(platform) {
        console.log(platform.name + ": " + platform.id);
        // Remove platform selected inside the array of objects platforms and set it on top as selected
        for(var i = 0 ; i < $scope.platforms.length; i++) {
            if($scope.platforms[i].id == platform.id)
                // Overwrite the new platform selected with the old one
                $scope.platforms[i] = $scope.selected;
        }

        $scope.selected = platform;
        // $scope.regions.pop(region);
    };

});












