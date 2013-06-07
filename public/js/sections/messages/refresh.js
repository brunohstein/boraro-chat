self.addEventListener('message', function(event) {
  importScripts('/js/shared/httpget.js');

  var url     = event.data.url + '.json',
      counter = event.data.counter;

  setInterval(function() {
    var data = JSON.parse(httpGet(url)),
        updates = data.messages.length - counter;

    if (updates > 0) {
      for (i = counter; i < data.messages.length; i++) {
        self.postMessage({message: data.messages[i]});
      }
    };

    counter = data.messages.length;
  }, 500);
});