// Core modules
var p = require('path')

// Node modules
var _ = require('lodash')

// Express + Socket.io
var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

// Globals
var options, winston, socket

/**
 * @exports sqwk-gui
 */
module.exports = {

  /**
   * Options
   *
   * @var {Object} options
   */
  options: false,

  /**
   * Set options and start server
   *
   * @method init
   * @param {Object} options Options
   * @param {Object} log Logging module
   */
  init: function(user_opts, log) {
    winston = log || console 

    // Set options
    options = _.defaults(user_opts, { gui: this.options })

    var address = 'http://' + options.gui.address + ':' + options.gui.port
    
    // Serve the html directory
    app.use(express.static(p.join(__dirname, '../html')))


    // On connection event
    io.on('connection', function(s){
      socket = s
      winston.log('verbose', 'Browser connected')

      // On first load emit options
      socket.emit('options', {
        title: options.formatTitle()
      })
    })

    // Launch server
    http.listen(options.gui.port, options.gui.address, function(){
      winston.log('verbose', 'Server available at: ' + address)
    })

    // Open server in browser
    if(options.open) require('open')(address)

  },

  /**
   * Write to server
   *
   * @method write
   * @param {Array} messages Messages
   * @param {Array} options Selectable menu options
   * @param {Function} callback
   */
  write: function(messages, options, callback) {
    winston.log('debug', 'sqwk-gui.write()')
    var self = this

    // Wait for socket to open 
    if( ! socket) {
      winston.log('verbose', 'Waiting for connection')
      io.on('connection', function(socket) {
        self.write(messages, options, callback)
      })
      return false
    }

    // Emit message
    io.emit('write', {
      messages: messages,
      options: options
    })

    // On receive 'selected'
    socket.on('selected', function(res) {
      // @todo verify this response is valid
      winston.log('info', 'Selected %s %s', res.message, res.index)

      // Close the listener
      socket.removeAllListeners('selected')

      // Call the callback
      callback(null, res.message, res.index)
    })

  },

  /**
   * Exit process on disconnect
   *
   * @method end
   */
   end: function() {
    winston.log('debug', 'sqwk-gui.end()')
    winston.log('info', 'Waiting for disconnect')

    // Wait for the socket to be closed before ending the process
    socket.on('disconnect', function(socket) {
      process.exit()
    })
   }
}
