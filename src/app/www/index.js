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
		
		page.sub('ready', function() {
			_app.innerHTML = page.render();
		});
		
		page.load();
	});
	
	pages.current_page = pages.Splash;
})();