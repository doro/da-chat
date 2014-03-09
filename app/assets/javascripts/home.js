var App = {
  bookmark: 0,
  username: 'anonymous',

  init: function() {
    console.log('init');
    console.log('username:' + username);

    if (username != '') App.username = username;
    App.bindSend();
    App.pollMessages();
  },

  bindSend: function() {

    $('#sendBtn').on('click', App.sendMessage);
  },

  sendMessage: function() {
  
    var msg = {txt: $('#messageText').val(), user_name: App.username};
    console.log('send: ' + msg);

    $.ajax({
      url: "messages.json",
      type: "POST",
      data: msg,
      context: App,
    }).done(function(data) {
      console.log('done');
      console.log(data);

      App.getMessages(); //FIXME: display immidiately
    });
  },

  pollMessages: function () {
    setInterval( function() {App.getMessages();}, 3000 );
  },

  updateBookmark: function(data) {
    var len = data.length;
    if (len > 0) {
      App.bookmark = data[len-1].id;
      console.log(App.bookmark);
    }
  },
  
  getMessages: function() {
    
    $.ajax({
      url: "messages.json",
      data: {bookmark: App.bookmark},
      context: App,
    }).done(function(data) {
      console.log('done');
      console.log(data);
      App.updateBookmark(data);
      App.displayMessages(data);
    });
  },

  displayMessages: function(messages) {
    var t = _.template($('#messageTemplate').html());
    var len = messages.length;
    var board = $('#messageBoard');

    for (var i=0; i < len; i++) {
      var m = {"user_name": messages[i].user_name, "txt": messages[i].txt, "timestamp": messages[i].timestamp }
      console.log(m);
      var msg = $(t(m));
      board.append(msg);
    }
  }
  

  
};







$( document ).ready(function() {
  // set the underscore template delimiter  to {{ }}
  _.templateSettings = {
    evaluate: /\{\[([\s\S]+?)\]\}/g,
    interpolate: /\{\{(.+?)\}\}/g
  };
  App.init();
});
