['./gems.js', './hogan.js'];
/* This class keeps track of templates, dog. */

templates = new (function Templates() {
	function Template(_file) {
		this.ready = false;
		var _dom = null;
		
		var onload = function(req) {
			_dom = Hogan.compile(req.responseText);
			this.ready = true;
		}.bind(this);
		
		this.load = function() {
			fetch.file(_file, 'GET', null, onload);
		};
		
		this.render = function(model) {
			return _dom.render(model);
		};
		
		this.extend = gems.Gem;
		this.extend();
	};
	
	this.create = function(file) {
		return new Template(file);
	};
})();