'use strict';

const templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
};

const noMatch = /(.)^/;

const escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\t': 't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
};

const escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

const include = /^\s*include\s+(\S+)/;

var _template = {};

_template.compile = function(tpl, settings) {
    // console.log(settings);
    try {
        var render;

        var _defaults = function(target) {
            'use strict';
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            target = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source != null) {
                    for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }
            }
            return target;
        };

        settings = _defaults({}, settings, templateSettings);

        const matcher = new RegExp([
            (settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');

        let index = 0;

        let source = "__p+='";


        tpl && tpl.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
            source += tpl.slice(index, offset).replace(escaper, function(match) {
                return '\\' + escapes[match];
            });

            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            }

            if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            }

            if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }

            index = offset + match.length;

            return match;
        });

        source += "';\n";

        if (!settings.variable) source = 'with(data||{}){\n' + source + '}\n';

        source = "var __t,__p='',__j=Array.prototype.join," +
            "print=function(){__p+=__j.call(arguments,'');};\n" +
            source + "return __p;\n";

        return source;
    } catch (e) {
        new Error('Template execution failed: ' + e);
    }
}

module.exports = _template;