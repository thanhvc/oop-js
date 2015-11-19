/*
~ $('document').ready(function() {
});
*/
var pureObject = {};
var functionObject = function() {
  console.log('functionObject');
}

window.onload = function(e) {
function getAllMethods(object) {
  return Object.getOwnPropertyNames(object).filter(function(property) {
    return typeof object[property] == 'function';
  });
}

appendTo = function(selector) {
	var domEl = Engine.getDomEl(selector);
	var div = document.createElement('DIV');
	var methods = getAllMethods(Engine); 
	console.log(methods.join(',\n'));
	var t = document.createTextNode(methods.join(', '));
	div.appendChild(t);
	domEl.appendChild(div);
}

this.appendTo("content");
}