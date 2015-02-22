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
			channels[name] = new Channel(name);
			return channels;
		};

		function get_channel(channels, name) {
			return channels[name] || add_channel(name)[name];
		};

		function add_subcriber(channel, callback) {
			return channel.subscribers.push(callback);
		};

		function remove_subscriber(channel, index) {
			channel.subscribers.splice(index, 1);
		};

		function get_subscriber_indices(callback) {
			if (!callback.subscriptions)
				callback.subscriptions = {};
			var indices = callback.subscriptions[_id];
			if (!indices)
				callback.subscriptions[_id] = indices = {};
			return indices;
		};

		function get_subscriber_index(channel, callback) {
			return get_subscriber_indices(callback)[channel.name] || -1;
		};

		function register_subscription(channel, callback, index) {
			var ids = get_subscriber_indices(callback);
			ids[channel.name] = index;
			return ids;
		};
		
		function unregister_subscription(channel, callback) {
			var ids = callback.subscriptions[_id];
			var index = ids[channel.name]
			delete ids[channel.name];
			return index;
		};

		function sub(name, callback) {
			var channel = get_channel(channels, name);
			callback.subscriptions = register_subscription(
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
			var func;
			if (func = items.shift()) {
				func(data);
				send_data_to(items, data);
			}
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
			_props[prop] = val;
			this.pub(prop, val);
			this.pub('all', {
				property: prop,
				value: val
			});
		};
		
		function __constructor__() {
			for (var prop in this) {
				var val = this[pubprop];
				if (val.constructor !== Function) {
					_props[pubprop] = val;
					this.__defineGetter__(pubprop, getter.bind(this, pubprop));
					this.__defineSetter__(pubprob, setter.bind(this, pubprop));
				}
			}
		};
		__constructor__.call(this);
		
		// Extend
		this.extend = PubSub;
		this.extend();
	};
})();