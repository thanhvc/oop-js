(function() {
	//define the Actiivty class
	Engine.define('exo.Social.UIActivity', {
		componentId : 'UIActivity',
		title : title,
		poster : poster,
		owner : owner,
		liker : [],
		comments : [],
		like : function(liker) {

		},
		unlike : function(unliker) {

		},
		toString : function() {
			var logs = [];
			logs.push('componentId = ' + this.componentId);
			//
			if (this.title) {
			  logs.push('title = ' + this.title);
			}
			if (this.poster) {
			  logs.push('poster = ' + this.poster);
			}

			if (this.owner) {
			  logs.push('owner = ' + this.owner);
			}

			return logs.join('\n');

			
		},
		introduce : function() {
			this.say(this.toString());
		}
		appendTo : function(selector) {
			var me = this;
			var domeEl = Engine.getDomEl(selector);
			var div = document.createElement('DIV');
			dic.addEventListener('click', function() {
				me.introduct();
			});
			var t = document.createTextNode();
			div.appendChild(t);
			domeEl.appendChild(div);
		}

	}, exo.Social.UIComponent);

	//define the User Actiivty class
	Engine.define('exo.Social.UIUserActivity', {
		componentId : 'UserActivity',
		type : 'USER'
	}, exo.Social.UIActivity);

	//define the Space Actiivty class
	Engine.define('exo.Social.UISpaceActivity', {
		componentId : 'SpaceActivity',
		type : 'SPACE'
	}, exo.Social.UIActivity);
}());