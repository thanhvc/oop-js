var thanh = {name : 'thanh'};
Engine.installTo(thanh);

thanh.subscribe('nameChange', function(arg) {
	console.log('object subscribe = ' + this.name);
	console.log('arg = ' + arg);
});

Engine.publish('nameChange', 'binh');

var obj = {name : 'same'};

Engine.installTo(obj);
obj.subscribe('nameChange', function(arg) {
    console.log('object subscribe = ' + this.name);
	console.log('arg = ' + arg);
});
 
obj.publish('nameChange', 'john'); //sam, john