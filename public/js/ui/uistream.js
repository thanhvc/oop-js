window.onload = function() {

  console.log('run to uistream.js');
  var types = ['exo.Social.UIUserActivity', 'exo.Social.UISpaceActivity'];
  var userType = Engine.getNS(types[0]);

  if (Engine.isFunction(userType)) {
    console.log('inject 10 user activity');
    var i;
    //inject 10 user activity
    for(i = 0; i < 10; i++) {
      var userActivity1 = Engine.apply(new userType(), {
         title : 'user activity title ' + i,
         owner  : 'thanh',
         poster : 'thanh',
      });
      userActivity1.init('portlet1', 'component1', 'container1');
      userActivity1.appendTo('stream');
    }

  }
  
  //inject 10 space activity
  var spaceType = Engine.getNS(types[1]);
  if (Engine.isFunction(spaceType)) {
    console.log('inject 10 space activity');
    for(i = 0; i < 10; i++) {
      var spaceActivity1 = Engine.apply(new spaceType(), {
         title : 'space activity title ' + i,
         owner  : 'space 1',
         poster : 'thanh',
      });
     spaceActivity1.init('portlet1', 'component1', 'container1');
     spaceActivity1.appendTo('stream');
    }
  }
  

};