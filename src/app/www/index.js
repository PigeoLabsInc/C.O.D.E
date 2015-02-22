['./lib/pages.js'];
/*

	 ___  _                  _         _
	| . \<_> ___  ___  ___  | |   ___ | |_  ___
	|  _/| |/ . |/ ._>/ . \ | |_ <_> || . \<_-<
	|_|  |_|\_. |\___.\___/ |___|<___||___//__/
	        <___'

		> Welcome to the source code, bro.

*/
(function __main__() {
	var _app = document.getElementById('app');
	
	pages.sub('current_page', function(data) {
		var page = data.new_value;
		
		var onready = function() {
			page.unsub('ready', onready);
			_app.innerHTML = page.render();
		};
		
		if (page.ready)
			_app.innerHTML = page.render();
		else {
			page.sub('ready', onready);
			page.load();
		}
	});
	
	pages.current_page = pages.Splash;
})();