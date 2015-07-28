'use strict'

angular.module('sqwk', [])

/*****************************************************************
*
* SqwkCtrl controller
*
******************************************************************/
.controller('SqwkCtrl', function($scope, $location, Ansi, Socket) {

  Socket.on('options', function(options) {
    $scope.title = Ansi.ansi_to_html(options.title)
  })

  Socket.on('write', function(res) {
    console.log(res)
    $scope.messages = res.messages
    $scope.options = res.options
  })

  $scope.selected = function(message, index) {
    console.log(message, index)
    Socket.emit('selected', {
      message: message,
      index: index
    })
  }

})
