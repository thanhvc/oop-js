
var Core = (function() {
	var moduleData = {};

	return {
		register : function(moduleId, clazzType, options) {
		  moduleData[moduleId] = {
			clazzType : clazzType || {},
			instance: null,
			options : options || {}
		  };
	    },
	    start : function(moduleId) {
	    	console.log("starting " + moduleId);
	    	moduleData[moduleId].instance = new moduleData[moduleId].clazzType;
	    	moduleData[moduleId].instance.init();
	    },
	    stop: function(moduleId) {
			var data = moduleData[moduleId];
			if (data.instance) {
				data.instance.destroy();
				data.instance = null;
			}
		},
	    startAll : function() {
	      for (var moduleId in moduleData) {
			if (moduleData.hasOwnProperty(moduleId)) {
			  this.start(moduleId);
			}
		  }
	    },
	    stopAll : function() {
	      for (var moduleId in moduleData) {
			if (moduleData.hasOwnProperty(moduleId)) {
			  this.stop(moduleId);
			}
		  }
	    }

	}

	

}());