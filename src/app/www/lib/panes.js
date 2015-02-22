['./gems.js',
'./morpheus.js'];

panes = new (function Panes(_app) {
	function Pane(_page, _el) {
		this.page = _page;
		this.el = _el;
		
		this.load_page = function() {
			if (_page.ready)
				set_element();
			else
				_page.sub('ready', onpageready);
		};
		
		function onpageready() {
			_page.unsub('ready', onpageready);
			set_element();
		};
		
		function set_element() {
			_el.innerHTML = _page.render();
			_page.el = _el;
		};
	};
	
	var _previous = null;
	
	function create_pane_el() {
		var pane = document.createElement('div');
		pane.className = 'Pane';
		pane.setCSS('top:0%;left:100%;');
		pane.addTransition('left', 500, 'ease-out', 60);
		return pane;
	};
	
	function onframe() {
		this.el.setStyle('left', 0, '%');
		if (_previous)
			_previous.el.setStyle('left', -100, '%');
		_previous = this;
	};
	
	function push_pane(pane) {
		_app.appendChild(pane.el);
		requestAnimationFrame(onframe.bind(pane));
	};
	
	this.push = function(page) {
		var pane = new Pane(page, create_pane_el());
		push_pane(pane);
		pane.load_page();
	};
})(document.getElementById('app'));