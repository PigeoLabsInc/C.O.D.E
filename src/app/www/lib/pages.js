['./gems.js',
'./templates.js',
'./languages.js'];

/* This class keeps track of pages and current page state. */
pages = new (function pages() {
	var Page = function Page(title, template_file) {
		var _template = new templates.create(template_file);
		this.ready = false;

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

		this.render = function(model) {
			return _template.render(create_model(model));
		};

		this.extend = gems.Gem;
		this.extend();
	};

	this.current_page = null;

	this.Splash = new (function Splash() {
		this.extend = Page;
		this.extend('Splash', '/html/splash.html');
	})();

	this.extend = gems.Gem;
	this.extend();
})();