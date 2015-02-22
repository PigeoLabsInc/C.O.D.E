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

	global = new (function Global() {
		this.logged_in = false;
		
		this.extend = gems.Gem;
		this.extend();
	})();

	global.sub('logged_in', function(data) {
		console.dir(data);
	});

})();