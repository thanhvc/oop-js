(function() {
	Engine.define('exo.Social.UIComponent', {
		componentId : null,
		portletId : null,
		containerId : null,
		init: function(portletId, componentId, containerId) {
			this.portletId = portletId;
			this.componentId = componentId;
			this.containerId = containerId;
		},
		getComponentId : function() {
			return this.componentId;
		},
		getPortletId : function() {
			return this.portletId;
		},
		say : function(message) {
			alert(message);
		},
		introduce : function() {
			var logs = [];
			logs.push('Hello !!!');
			if (this.componentId) {
				logs.push('I am ' + componentId);
			}

			this.say(logs.join('\n'));
		}
	});

}());
