var init = function(cb) {
  if (geddy.config.environment != 'development') {
    process.addListener('uncaughtException', function (err) {
      var msg = err.message;
      if (err.stack) {
        msg += '\n' + err.stack;
      }
      if (!msg) {
        msg = JSON.stringify(err);
      }
      geddy.log.error(msg);
    });
  }
  cb();
};

exports.init = init;
