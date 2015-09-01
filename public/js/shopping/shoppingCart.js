
Engine.define('exo.Social.SearchBox', function() {
    
    return {
        input: null,
        button : null,
        reset : null,
        init : function() {
            input = Engine.getDomEl('search_input');
            button = Engine.getDomEl('search_button');
            reset = Engine.getDomEl('quit_search');
            button.addEventListener('click', this.handleSearch);
            reset.addEventListener('click', this.quiteSearch);
        },
        destroy : function() {
            button.removeEventListener('click', this.handleSearch);
            reset.removeEventListener('click', this.quiteSearch);
            input = null;
            button = null;
            reset = null;
        },
        handleSearch : function() {
            var query = input.value;
            if (query) {
                Engine.notify('perform-search', query);
            }
        },
        quiteSearch : function() {
            input.value = "";
            Engine.notify('quit-search', null);
        }

    };
});

Engine.define('exo.Social.FilterPanel', function() {
    var filters;

    function filterProducts(e) {
        Engine.notify('change-filter', e.currentTarget.innerHTML);
    }

    return {
        init : function() {
            var me = this;
            filters = document.getElementsByTagName('a');
            var i, ln;
            for(i = 0, ln = filters.length; i < ln; i++) {
                filters[i].addEventListener('click', me.filterProducts);
            }
        },
        destroy : function() {
            var me = this;
            var i, ln;
            for(i = 0, ln = filters.length; i < ln; i++) {
                filters[i].removeEventListener('click', me.filterProducts);
            }
        },
        filterProducts : filterProducts

    };
    
});




Engine.define('exo.Social.ProductPanel', function() {
    var products;
    function eachProduct(fn) {
        var i = 0, product;
        for(; product = products[i++] ;) {
            fn(product);
        }
    }

    function reset() {
        eachProduct(function (product) { 
            product.style.opacity = '1';     
        }); 
    }

    return {
        init : function() {
            var me = this;
            var productPanelDiv = Engine.getDomEl('product-panel');
            products = productPanelDiv.getElementsByTagName('li');
            Engine.handle('change-filter', this.change_filter);
            Engine.handle('reset-fitlers', this.reset);
            Engine.handle('perform-search', this.search);
            Engine.handle('quit-search', this.reset);

            eachProduct(function (product) {
                product.addEventListener('click', me.addToCart);
            });  
        },
        reset : reset,
        destroy : function() {
            var me = this; 
                eachProduct(function (product) { 
                    product.removeEventListener('click', me.addToCart);
                
                }); 
            //sb.ignore(['change-filter', 'reset-filters', 'perform-search'
        },
        search : function(query) {
            reset(); 
            query = query.toLowerCase();
            eachProduct(function (product) {
                console.log(product.getAttribute('data-keyword')); 
                if (product.getAttribute('data-keyword').toLowerCase().indexOf(query) < 0) { 
                  product.style.opacity = '0.2'; 
                } 
            }); 

        },
        change_filter : function(filter) {
            reset(); 
            filter = filter.toLowerCase();
            eachProduct(function (product) {
                console.log(product.getAttribute('data-keyword')); 
                if (product.getAttribute('data-keyword').toLowerCase().indexOf(filter) < 0) { 
                  product.style.opacity = '0.2'; 
                } 
            }); 

        },
        addToCart : function (e) { 
            var li = e.currentTarget; 
            Engine.notify('add-item', { 
                    id : li.id, 
                    name : li.getElementsByTagName('p')[0].innerHTML, 
                    price : parseInt(li.id, 10) 
                });  
        }

    };

});





Engine.define('exo.Social.ShoppingCart', function() {
	var cart, cardItems;
	return {
		init : function () { 
            var shoppingCartDiv = Engine.getDomEl('shopping-cart');
            cart = shoppingCartDiv.getElementsByTagName('ul')[0];  
            cartItems = {}; 
            Engine.handle('add-item', this.addItem);
        }, 
        destroy : function () { 
            cart = null; 
            cartItems = null; 
        }, 
        addItem : function (product) {
        	var item = Engine.getDomEl('cart-' + product.id); 
            if (item && item.getElementsByClassName("quantity")[0]) {
                var entry = item.getElementsByClassName("quantity")[0];
                if (entry) { 
                    entry.innerHTML =  (parseInt(entry.innerHTML, 10) + 1); 
                    cartItems[product.id]++; 
                } 
            } else {                 
                entry = Engine.createElement('li', { 
                    id : "cart-" + product.id, 
                    children : [ 
                        Engine.createElement('span', { 'class' : 'product_name', text : product.name }), 
                        Engine.createElement('span', { 'class' : 'quantity', text : '1'}), 
                        Engine.createElement('span', { 'class' : 'price', text : '$' + product.price.toFixed(2) }) 
                    ],
                    'class' : 'cart_entry' }
                    ); 
 
                cart.appendChild(entry); 
                cartItems[product.id] = 1; 
            } 
            
        }

	};

});


var searchBoxType = Engine.getNS('exo.Social.SearchBox');
var searchBox = new searchBoxType();
searchBox.init();

//
var filterPanelType = Engine.getNS('exo.Social.FilterPanel');
var filterPanel = new filterPanelType();
filterPanel.init();
//
var productPanelType = Engine.getNS('exo.Social.ProductPanel');
var productPanel = new productPanelType();
productPanel.init();
//
var shoppingCartType = Engine.getNS('exo.Social.ShoppingCart');
var shoppingCart = new shoppingCartType();
shoppingCart.init();