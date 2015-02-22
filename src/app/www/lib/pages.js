['./gems.js',
'./templates.js',
'./languages.js'];

/* This class keeps track of pages and current page state. */
pages = new (function pages() {
	var Page = function Page(title, template_file) {
		var _template = templates.create(template_file);
		this.ready = false;
		this.model = null;
		this.el = null;

		function create_model(model) {
			return {
				glossary: languages.get_current(),
				title: title,
				data: model
			};
		};

		var onready = function() {
			this.ready = true;
		}.bind(this);

		this.load = function() {
			if (_template.ready)
				this.ready = true;
			else {
				_template.sub('ready', onready);
				_template.load();
			}
		}.bind(this);

		this.render = function() {
			return _template.render(create_model(this.model));
		}.bind(this);

		this.extend = gems.Gem;
		this.extend();
		
		this.sub('model', this.render);
	};

	this.current_page = null;

	this.Splash = new (function Splash() {
		this.extend = Page;
		this.extend('Splash', '/html/splash.html');
		
		var ondom = function(data) {
			//
		}.bind(this);
		
		this.sub('el', ondom);
	})();
	
	this.Map = new (function Map() {
		this.extend = Page;
		this.extend('Map', '/html/map.html');
		
		function onclick(e) {
			console.log(e.target);
		};
		
		var ondom = function(data) {
			console.log(this.el);
			this.el.addEventListener('click', onclick, false);
		}.bind(this);
		
		this.sub('el', ondom);
	})();
	
	this.Matches = new (function Matches() {
		this.extend = Page;
		this.extend('Matches', 'html/matches.html');
		
		var ondom = function(data) {
			console.log(this.el);
		}.bind(this);
		
		this.sub('el', ondom);
	})();

	this.extend = gems.Gem;
	this.extend();
})();