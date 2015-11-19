(function() {
	//define the Actiivty class
	Engine.define('exo.Social.UIActivity', {
		componentId : 'UIActivity',
		title : null,
		type: null,
		poster : null,
		owner : null,
		liker : [],
		comments : [],
		say : function(str) {
			alert(str);
		},
		like : function(liker) {
			console.log('like the activity');
		},
		unlike : function(unliker) {
			console.log('unlike the activity');

		},
		toString : function() {
			var logs = [];
			if (this.title) {
			  logs.push('title : ' + this.title);
			}
			if (this.type) {
			  logs.push('type : ' + this.type);
			}
			if (this.poster) {
			  logs.push('poster : ' + this.poster);
			}

			if (this.owner) {
			  logs.push('owner : ' + this.owner);
			}

			return logs.join('\n');
		},
		introduce : function() {
			this.say(this.toString());
		},
		appendTo : function(selector) {
			var me = this;
			var domeEl = Engine.getDomEl(selector);
			var div = document.createElement('DIV');
			div.addEventListener('click', function() {
				me.introduce();
			});

			var lines = me.toString().split('\n');
			var i, ln;

			for(i = 0, ln = lines.length; i< ln; i++) {
				var childDiv = document.createElement('DIV');
				var t = document.createTextNode(lines[i]);
				if (i == 0) {
					var head4 = document.createElement('h4');
					head4.appendChild(t);
					childDiv.appendChild(head4);
				} else {
					childDiv.appendChild(t);
				}
			
				div.appendChild(childDiv);
			}

			div.appendChild(document.createElement('HR'));

			domeEl.appendChild(div);
		}

	}, exo.Social.UIComponent);

	//define the User Actiivty class
	console.log('define exo.Social.UIUserActivity class');
	Engine.define('exo.Social.UIUserActivity', {
		componentId : 'UserActivity',
		type : 'USER'
	}, exo.Social.UIActivity);

	//define the Space Actiivty class
	console.log('define exo.Social.UISpaceActivity class');
	Engine.define('exo.Social.UISpaceActivity', {
		componentId : 'SpaceActivity',
		type : 'SPACE'
	}, exo.Social.UIActivity);
}());