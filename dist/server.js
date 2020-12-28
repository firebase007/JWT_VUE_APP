"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

require("babel-polyfill");

var _cors = _interopRequireDefault(require("cors"));

var _user = _interopRequireDefault(require("../app/route/user.js"));

var _utils = _interopRequireDefault(require("../app/helpers/utils.js"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var dotenv = require('dotenv');

dotenv.config();

var _dirname = _path["default"].resolve();

var app = (0, _express["default"])(); // Add  cors middleware

app.use((0, _cors["default"])()); // Add middleware for parsing JSON and urlencoded data

app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"].json()); // Serve static files from the Vue app

app.use(_express["default"]["static"](_path["default"].join("".concat(_dirname, "/client/dist")))); // The "catchall" handler: for any request that doesn't
// match one above, send back Vue's index.html file.

app.get('/*', function (req, res) {
  res.sendFile(_path["default"].join("".concat(_dirname, "/client/dist/index.html")));
});
app.use('/api/v1', _user["default"]);
app.get('/', function (req, res) {
  res.status(200).send('Welcome to the Questions Game App');
}); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  console.log(err);
  err.status = 404;
  res.send('Route not found');
  next(err);
});
console.log(process.env.PORT, 'APP-PORT');
var server = app.listen(process.env.PORT || 3000).on('listening', function () {
  console.log("App live and listening on port: ".concat(process.env.PORT) || 3000);
});

var io = require('socket.io')(server);

var users = [];
io.use( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(socket, next) {
    var token, payload;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = socket.handshake.query.token;
            payload = _utils["default"].verifyJWT(token);
            console.log(payload, 'payload from client');

            if (payload) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", next(new Error('Authentication error')));

          case 6:
            socket.user = payload;
            next();
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()).on('connection', function (socket) {
  var userId = socket.user.id;
  console.log(userId, 'userId');
  console.log("Socket session for user: ".concat(socket.user.firstname, " with id: ").concat(socket.id, " now connected."));
  socket.on('join', function (user) {
    socket.join('questions');
    socket.broadcast.to('questions').emit('MESSAGE', 'SERVER', "".concat(user, " has connected to this room"));
  });
  socket.on('SEND_MESSAGE', function (data) {
    console.log(data, 'data on messagesend'); // socket.join(socket.id)

    io.emit('MESSAGE', {
      data: data,
      room: socket.id,
      id: userId
    }); // io.sockets.in(socket.id).emit('MESSAGE', data)
  });
  socket.on('disconnect', function () {
    console.log('user disconnected');
    delete users[userId];
    io.emit('users', users);
  });
});
var _default = app;
exports["default"] = _default;
module.exports = exports.default;