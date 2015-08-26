window.onload = function() {
  var types = ['exo.Social.UIUserActivity', 'exo.Social.UISpaceActivity'];
  var userType = Engine.getNS(types[0]);

  var i;
  //inject 10 user activity
  for(i = 0; i < 10; i++) {
  	var userActiity1 = Engine.apply(new userType(), {
  	   title : 'user activity title ' + i,
  	   owner  : 'thanh',
  	   poster : 'thanh',
    });
    userActiity1.init('portlet1', 'component1', 'container1');
    userActiity1.appendTo('stream');
  }

  //inject 10 space activity
  var spaceType = Engine.getNS(types[1]);
  for(i = 0; i < 10; i++) {
  	var userActiity1 = Engine.apply(new spaceType(), {
  	   title : 'space activity title ' + i,
  	   owner  : 'space 1',
  	   poster : 'thanh',
    });
    userActiity1.init('portlet1', 'component1', 'container1');
    userActiity1.appendTo('stream');
  }

}