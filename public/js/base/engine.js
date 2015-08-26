var Engine = Engine || {};
(function() {
	Engine.apply = function(object, config, defaults) {
		if (object && defaults) {
			Engine.apply(object, defaults);
		}
		//
		if (object && config && typeof config === 'object') {
			var i, j, k;

			for (i in config) {
				object[i] = config[i];
			}
		}

		return object;
	};

	Engine.apply(Engine, {
		assert : function(data) {
			function notExists(obj) {
				return (obj == null || obj == undefined);
			}

			function isExists(obj) {
				return !notExists(obj);
			}

			return {
				source : data,
				isExists : function() {
					var src = this.source;
					return isExists(src);
				},
				notExists : function() {
					var src = this.source;
					return notExists(src);
				},
				isArray : function() {
					var src = this.source;
					return (isExists(src) && src.constructor == Array);
				},
				isBoolean : function() {
					var src = this.source;
					return (isExists(src) && src.constructor == Boolean);
				},
				isFunction : function() {
					var src = this.source;
					return (isExists(src) && src instanceof Function);	
				},
				isNumber: function() {
					var src = this.source;
					return (isExists(src) && src.constructor == Number);
				},
				isElement: function() {
					var src = this.source;
					return (isExists(src) && src.tagName && 1 == src.nodeType);
				},
				isTextNode: function() {
					var src = this.source;
					return (isExists(src) && 3 == src.nodeType);
				},
				isDefined: function() {
					var src = this.source;
                    return typeof src !== 'undefined';
                }
 			}
		}
	});

    /**
    * The namespaces mechanism to define the object.
    * example: Engine.namespace('exo.Social.Util')
    * the object will be returned as:
    * exo {
	*  Social {
	*	  Util {
	*
	*	  }
	*   }
    * }
    */
	Engine.apply(Engine, {
		createNS : function(namespace) {
			var root = window, nparts, npart, i, ln;
			nparts = namespace.split('.');
			//loop through the parts and create a nested namespace if necessary
			for(i =0; ln = nparts.length ; i++) {
				var partname = nparts[i];
				//check if the current parent already has the namespace declared
				// if it isn't, then create it
				if (typeof root[partname] === 'undifined') {
					root[partname] = {};
				}
                // get a reference to the deepest element in the hierarchy so far
				root = root[partname];

			}
			// the parent is now constructed with empty namespaces and can be used.
			// we return the outermost namespace
			return root;
		},
		getNS : function(namespace) {
			var root = window, nparts, part, i, ln;
			nparts = namespace.split('.');
			for(i = 0; ln = nparts.length; i++) {
				part = nparts[i];
				if (typeof root[part] === 'undefined') {
					return null;
				}

				root = root[part];
			}

			return root;
		},
		define : function(className, options, parent) {
			if (parent && (!Engine.isFunction(parent) || !parent.prototype)) {
				throw "parent class doesn't existing."
				return null;
			}

			var nparts, namespace, ns;
			nparts = className.split('.');
			//example: className = exo.Social.Utils
			// className = Utils
			// namespace = exo.Social
			if(nparts.length > 0) {
				className = nparts.pop();
				namespace = nparts.join('.');
			}

			if (namespace) {
				ns = this.createNS(namespace);
			} else {
				ns = window;
			}

            //constructor of the class
			var constructor = function() {
				this.className = namespace + "." + className;
				if(parent) {
					this.inheritFrom = parent.className;
				}
			};

			var Class = ns[className] = constructor;
			Class.className = namespace + "." + className;
			if (parent) {
				Engine.apply(Class.prototype, parent.prototype);
			} 

			if (options) {
				Engine.apply(Class.prototype, options);
			}
		}
	});


	Engine.apply(Engine, {
    	getDomEl: function(selector) {
    		return document.getElementById(selector);
    	}
    });

}());