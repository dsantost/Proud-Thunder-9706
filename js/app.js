(function() {
    var app = angular.module('TwitchApp', []);

    var channelName = '';

    app.controller('StreamsController', function($scope, $http){
        Twitch.init({clientId: 'qjwmdi559xxtv5vzvhb3v8q7s7xscj1'}, function(error) {
            if (error) {
                // error encountered while loading
                console.log(error);
            }

        });
        this.setChannel = function(name){
            channelName = name;
        };

        this.call = function(search){
           getStreams($scope, $http, search);
        }


    });


    function getStreams($scope, $http, search) {
        $http.get('https://api.twitch.tv/kraken/search/streams?q=' + search).
        success(function(data) {
            $scope.streams = data;
            console.log(data);
        });
    }


    app.controller('ChannelController', function($scope, $http){
        getChannel($scope,$http);

        this.active=false;
        this.linkStream="";
        this.setActive = function(status){
            this.active=status;

        }


        this.call=function(){
            this.active = true;
            getChannel($scope, $http, this.linkStream);

        };
    });



    function buttonC(cenas){
        console.log("1asd");
        angular.element("#button").click( frameC (cenas));

    }

    function frameC(cenas){
        console.log("2asd");
        angular.element("#frame").attr("src", cenas);
    }

    function getChannel($scope, $http, linkStream) {
        $http.get('https://api.twitch.tv/kraken/streams/'+channelName).
        success(function(data) {
            $scope.channel = data;
            linkStream="http://player.twitch.tv/?channel=" + data.stream.channel.name;

            buttonC(linkStream);
            console.log(linkStream);
            console.log(data);
        });
    }

})();
