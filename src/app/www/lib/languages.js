['./gems.js'];
languages = new (function Languages() {
	this.current = 'en-CA';

	this.english = {
		splash: {
			tagline: 'Find your perfect match',
			label: 'Find your field of interest'
		},
		map: {
			message: 'We found some great matches for you!',
			CTA: 'Learn more'
		}
	};
	this.francais = {
		splash: {
			tagline: 'Trouver votre paire parfaite',
			label: 'Trouver votre domaine d\'intérêt'
		},
		map: {
			message: 'Nous avons trouvé quelques grandes matches pour vous!',
			CTA: 'Savoir plus'
		}
	};

	this.codes = {
		'en-CA': this.english,
		'fr-CA': this.francais
	};

	this.get_current = function() {
		return this.codes[this.current];
	}.bind(this);
})();