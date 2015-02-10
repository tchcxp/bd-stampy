/* global window, document */

// TODO: Add default/missing icon path
var _DEFAULT_ICON_PATH = 'M0 0Z';
var _paths = {};

var IconStore = {
	getPath: function(iconName) {
		if (_paths[iconName]) {
			return _paths[iconName];
		}
		
		if (typeof window === 'undefined') {
            return _DEFAULT_ICON_PATH;
        }

        try {
        	var path = document.getElementById(iconName)
        					.getElementsByTagName('path')[0]
        					.getAttribute('d');

	        _paths[iconName] = path;

	        return path;
        }
        catch(err) {
        	console.error(new Error('Could not find icon path'));
            return _DEFAULT_ICON_PATH;
        }
	}
};

module.exports = IconStore;