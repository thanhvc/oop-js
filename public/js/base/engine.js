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
		isExists : function(src) {
			return !this.notExists(src);
		},
		notExists : function(src) {
			return (src == null || src == undefined);
		},
		isArray : function(src) {
			return (this.isExists(src) && src.constructor == Array);
		},
		isBoolean : function(src) {
			return (this.isExists(src) && src.constructor == Boolean);
		},
		isFunction : function(src) {
			return (this.isExists(src) && src instanceof Function);	
		},
		isNumber: function(src) {
			return (this.isExists(src) && src.constructor == Number);
		},
		isElement: function(src) {
			return (this.isExists(src) && src.tagName && 1 == src.nodeType);
		},
		isTextNode: function(src) {
			return (this.isExists(src) && 3 == src.nodeType);
		},
		isDefined: function(src) {
            return typeof src !== 'undefined';
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
			var root = window, parts, part, i, ln;
    		parts = namespace.split('.');
    		//loop through the parts and create a nested namespace if necessary
    		for (i = 0, ln = parts.length; i < ln; i++) {
    			part = parts[i];
                //check if the current parent already has the namespace declared
				// if it isn't, then create it
    			if (!root[part]) {
                    //it's empty object.
    				root[part] = {};
    			}
    			// get a reference to the deepest element in the hierarchy so far
    			root = root[part];
    		}

    	    // the parent is now constructed with empty namespaces and can be used.
			// we return the outermost namespace
    		return root;
		},
		getNS : function(namespace) {
			var root = window, parts, part, i, ln;
    		parts = namespace.split('.');
    		for (i = 0, ln = parts.length; i < ln; i++) {
    			part = parts[i];
    			if (!root[part]) {
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