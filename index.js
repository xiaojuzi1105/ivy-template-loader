var loaderUtils = require("loader-utils");
var _ = require("lodash");
var UglifyJS = require('uglify-js');
var _template = require("./lib/index");

/**
 * Check the loader query and webpack config for loader options. If an option is defined in both places,
 * the loader query takes precedence.
 *
 * @param {Loader} loaderContext
 * @returns {Object}
 */
function getLoaderConfig(loaderContext) {
    var query = loaderUtils.getOptions(loaderContext) || {};
    var configKey = query.config || 'ivy-template-loader';
    var config = loaderContext.options[configKey] || {};
    delete query.config;
    return _.assign({}, config, query);
}


module.exports = function(source) {
    /* Loader 缓存 */
    if (this.cacheable) this.cacheable();

    var sourceFilename = loaderUtils.getRemainingRequest(this);

    var current = loaderUtils.getCurrentRequest(this);

    var query = getLoaderConfig(this);

    var template = '';

    try {
        if (source) {
            template = _template.compile(source, query.settings);
        }
    } catch (e) {}

    template = 'module.exports = function(' + ('data') + '){\n' + template + '}'

    if (query.minimize) {
        var ast = UglifyJS.parse(template);
        ast.figure_out_scope();
        template = ast.print_to_string({ beautify: true });
    }

    return template;
}