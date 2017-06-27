var _template = require('./tpl.js');

var templatePlugin = {};

templatePlugin.compile = function(tpl, setting) {
    return _template.compile(tpl, setting);
};

templatePlugin.render = function(source, data) {
    data = data || {};
    try {
        var render = new Function('data', '_', source);
        return render(data);
    } catch (e) {
        new Error('Template execution failed: ' + e);
    }
};

module.exports = templatePlugin;