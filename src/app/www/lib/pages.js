['./gems.js',
'./templates.js',
'./languages.js'];

/* This class keeps track of pages and current page state. */
pages = new (function pages() {
	var Page = function Page(title, template_file) {
		var _template = new templates.register(template_file);
		this.ready = false;
		
		function create_model(model) {
			return {
				glossary: languages.get_current(),
				title: title,
				data: model
			};
		};
		
		function onready() {
			this.ready = true;
		};
		
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
	};
})();