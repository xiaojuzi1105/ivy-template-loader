# ivy-template-loader
webpack template loader

模板预处理使用的是  lodash.template 机制


## Installation

`npm install ivy-template-loader`

## Usage

``` javascript
var template = require("index.tpl");
// => returns the template function compiled with template engine,like underscore (lodash).

// And then use it somewhere in your code
template(data) // Pass object with data
```

Config example using the ```ivy-template-loader``` config block.

``` javascript
module.exports = {
  rules: [
      {
        test: /\.tpl$/,
        exclude: /node_modules/,
        use: {
            loader: 'ivy-template-loader',
            options: {
                minimize: true,
                /* 可自定义 */
                settings: {
                    evaluate: /{{([\s\S]+?)}}/g,
                    interpolate: /<%=([\s\S]+?)%>/g,
                    escape: /<%-([\s\S]+?)%>/g
                }
            }
        }
      }
  ]
};
```