// Node modules
var async = require('async')
var sqwk = require('sqwk')

// Capture user input
sqwk.init({
  title: 'Example Application',
  version: '0.0.1',
  gui: {
    module: require('sqwk-gui'),
    port: 5678,
    address: 'localhost'
  }
})

// Begin async
async.waterfall([
  function(callback) {

    // INPUT: Menu 1
    sqwk.write('Please select an option', [
      'Foo',
      'Bar',
      'Skip to end'
    ], callback)

  },
  function(selected, index, callback) {

    if(selected == 'Skip to end') {
      // Set skip to true
      return callback(null, true)
    }

    // Do some application logic then call the callback
    callback(null, false)

  },
  function(skip, callback) { 

    if(skip) {
      // Because user chose to skip assume option 5
      return callback(null, 'Option 5', 4)
    }

    // INPUT: Menu 2
    sqwk.write('Now what would you like to do?', [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
      'Option 5'
    ], callback)

  }
], function(err, selected, index) {

  if(err) {
    if(err.message == 'Cancelled by user') {
      // Do nothing
    }
    else {
      sqwk.end(err)
    }
  }
  else {
    // sqwk.write('Complete')
    sqwk.write([
      'Complete',
      selected + ' was chosen'
    ])
  }

  sqwk.end()

})
