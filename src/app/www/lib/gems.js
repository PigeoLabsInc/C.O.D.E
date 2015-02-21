gems = new (function(_win) {
	var pubsub_serial = 0;

	Channel = function Channel(_name) {
		this.name = _name || 'all';
		this.subscribers = new Array();
	};

	this.PubSub = function PubSub() {
		var _id = pubsub_serial++;
		var channels = {};

		function add_channel(channels, name) {
			channels[name] = new Channel(name);
			return channels;
		};

		function get_channel(channels, name) {
			return channels[name] || add_channel(name)[name];
		};

		function add_subcriber(channel, callback) {
			channel.subscribers.push(callback);
			return channel;
		};

		function remove_subscriber(channel, callback) {
			channels.splice(index, 1);
			return channels;
		};

		function get_subscriber_indices(callback) {
			return callback.subscriptions[_id] || callback.subscriptions[_id] = {};
		};

		function get_subscriber_index(channel, callback) {
			return get_subscriber_indices(callback)[channel.name] || -1;
		};

		function register_subscription(channel, callback, index) {
			var ids = get_subscriber_indices(callback);
			ids[channel.name] = index;
			return ids;
		};

		function sub(name, callback) {
			var channels = get_channel(channels, name);
			callback.subscriptions = set_sub_index(_id, callback.pubsub_ids, subs.length);
			add_sub(subs, subs.length, callback);
		};

		function unsub(name, callback) {
			if (arguments.length > 2) {
				for (var i = 0, l = arguments.length; i < l; i++)
					unsub(i, ++i);
			} else {
				var subs = get_subs(name, callback);
			}
		};

		this.sub = sub;
		this.unsub = unsub;
	};

	this.Gem = function Gem() {

	};
})(window);

Gem = (function gems(Function) {
	var gem_id = 0;
	Function.prototype.gem_ids = {};
	function Gem() {
		var _id = gem_id++;
		var _properties = {};

		var __constructor__() {

		};

		__constructor__();
	};


})(Function);