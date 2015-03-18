/* global window, document */

var _DEFAULT_ICON_PATH = ['M12 12 h 24 v 24 h -24 Z'];

var _paths = {};

var IconStore = {
	getPaths: function(iconName) {
		if (_paths[iconName]) {
			return _paths[iconName];
		}

		if (typeof window === 'undefined') {
            return _DEFAULT_ICON_PATH;
        }

        try {
            var _nodes = document.getElementById(iconName).childNodes;

        	var path = Array.prototype.slice.call(_nodes)
                .map(function(pp){
                    return pp.getAttribute('d');
                });

	        _paths[iconName] = path;

	        return path;
        }
        catch(err) {
            return _DEFAULT_ICON_PATH;
        }
	}
};

module.exports = IconStore;
