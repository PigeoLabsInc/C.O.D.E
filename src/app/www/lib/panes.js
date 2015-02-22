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
		pane.setStyle('left', 100, '%');
		pane.addTransition('-webkit-transform', 500, 'ease-out', 60);
		return pane;
	};
	
	function onvanish(e) {
		e.target.removeEventListener('webkitTransitionEnd', onvanish, false);
		e.target.translation(0, 0, 0, '%');
		e.target.parentNode.removeChild(e.target);
	};
	
	function onframe() {
		this.el.translation(-100, 0, 0, '%');
		if (_previous) {
			_previous.el.translation(-200, 0, 0, '%');
			_previous.el.addEventListener('webkitTransitionEnd', onvanish, false);
		}
		_previous = this;
	};
	
	function push_pane(pane) {
		_app.appendChild(pane.el);
		requestAnimationFrame(onframe.bind(pane));
	};
	
	this.push = function(page) {
		var pane = new Pane(page, page.el || create_pane_el());
		push_pane(pane);
		pane.load_page();
	};
})(document.getElementById('app'));