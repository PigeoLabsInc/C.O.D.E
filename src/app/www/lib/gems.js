gems = new (function() {
	var pubsub_serial = 0;

	var Channel = function Channel(_name) {
		this.name = _name || 'all';
		this.subscribers = new Array();
	};

	var PubSub = this.PubSub = function PubSub() {
		var _id = pubsub_serial++;
		var channels = {};

		function add_channel(channels, name) {
			var channel = channels[name] = new Channel(name);
			return channel;
		};

		function get_channel(channels, name) {
			return channels[name] || add_channel(channels, name);
		};

		function add_subscriber(channel, callback) {
			return channel.subscribers.push(callback);
		};

		function remove_subscriber(channel, index) {
			channel.subscribers.splice(index, 1);
		};
		
		function get_subscriptions(callback) {
			if (!callback.subscriptions)
				callback.subscriptions = {};
			if (!callback.subscriptions[_id])
				callback.subscriptions[_id] = {};
			return callback.subscriptions;
		};
		
		function get_subscriber_indices(callback) {
			return get_subscriptions(callback)[_id];
		};

		function get_subscriber_index(channel, callback) {
			return get_subscriber_indices(callback)[channel.name] || -1;
		};

		function register_subscription(channel, callback, index) {
			var ids = get_subscriber_indices(callback);
			return ids[channel.name] = index;
		};

		function unregister_subscription(channel, callback) {
			var ids = callback.subscriptions[_id];
			var index = ids[channel.name]
			delete ids[channel.name];
			return index;
		};

		function sub(name, callback) {
			var channel = get_channel(channels, name);
			register_subscription(
				channel,
				callback,
				add_subscriber(
					channel,
					callback
				)
			);
		};

		function unsub(name, callback) {
			var channel = get_channel(channels, name);
			remove_subscriber(
				channel,
				unregister_subscription(channel, callback)
			);
		};

		function send_data_to(items, data) {
			for (var i = 0, l = items.length; i < l; i++)
				items[i](data);
		};

		function pub(name, data) {
			var channel = get_channel(channels, name);
			send_data_to(channel.subscribers, data);
		};

		this.sub = sub;
		this.unsub = unsub;
		this.pub = pub;
	};

	this.Gem = function Gem() {
		var _props = {};

		function getter(prop) {
			return _props[prop];
		};

		function setter(prop, val) {
			var oldVal = _props[prop];
			_props[prop] = val;
			
			if (oldVal !== val) {
				var data = {
					property: prop,
					new_value: val,
					old_value: oldVal
				};
				
				this.pub(prop, data);
				this.pub('all', data);
			}
		};

		function __constructor__() {
			for (var prop in this) {
				var val = this[prop];
				if (typeof val !== 'function') {
					_props[prop] = val;
					this.__defineGetter__(prop, getter.bind(this, prop));
					this.__defineSetter__(prop, setter.bind(this, prop));
				}
			}
		};
		__constructor__.call(this);

		// Extend
		this.extend = PubSub;
		this.extend();
	};
})();