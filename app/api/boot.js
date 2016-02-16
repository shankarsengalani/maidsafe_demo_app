import path from 'path'
import http from 'http';
import express from 'express';
import EventEmitter from 'events';
import bodyParser from 'body-parser';

class ServerEventEmitter extends EventEmitter {};

export default class RESTServer {
  constructor(api, port) {
    this.port = port;
    this.app = express();
    this.server = null;
    this.EVENT_TYPE = {
      ERROR: 'error',
      STARTED: 'started',
      STOPPED: 'stopped'
    };
    this.app.set('api', api);
    this.app.set('eventEmitter', new ServerEventEmitter());
    this.app.set('EVENT_TYPE', this.EVENT_TYPE);
  }

  _onError(type, eventEmitter) {
      return function(error) {
          if (error.syscall !== 'listen') {
            throw error;
          }
          eventEmitter.emit(type, error);
      }
  }

  _onClose(type, eventEmitter) {
    return function() {
        eventEmitter.emit(type);
    }
  }

  _onListening(type, eventEmitter) {
    return function() {
        eventEmitter.emit(type);
    }
  }

  start() {
    let app = this.app;
    let EVENT_TYPE = this.app.get('EVENT_TYPE');
    let eventEmitter = this.app.get('eventEmitter');

    app.use(function(req, res, next){
      if (req.headers['authorization']) {
        req.body = '';
        req.setEncoding('utf8');
        req.on('data', function(chunk){ req.body += chunk });
        req.on('end', function() {
          decryptRequest(req, res, next);
        });
      } else {
        bodyParser.json({strict: false})(req, res, next);
      }
    });

    app.use(bodyParser.urlencoded({
      extended: false
    }));

    app.use('/', versionOneRouter);
    app.use('/v1', versionOneRouter);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.send('Server Error');
    });
    app.set('port', this.port);
    this.server = http.createServer(app);
    this.server.listen(this.port);
    this.server.on('error', this._onError(this.EVENT_TYPE.ERROR, eventEmitter));
    this.server.on('close', this._onClose(this.EVENT_TYPE.STOPPED, eventEmitter));
    this.server.on('listening', this._onListening(this.EVENT_TYPE.STARTED, eventEmitter));
  }

  stop() {
    if (!server) {
      return;
    }
    server.close();
  }
}
