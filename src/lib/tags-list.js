Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

var options = {
  stage: 'render:pre:pages'
};

var fs = require('fs-extended');

var plugin = function(params, callback) {

    console.log('Generating tags');

    'use strict';

    var assemble       = params.assemble;
    var grunt          = params.grunt;
    var pages          = assemble.options.pages;

    var tagsFound = new Array();
    pages.forEach(function(item) {
        if (item.data.tags) {
            var tags = item.data.tags;
            tags.forEach(function(item) {
                if (!tagsFound.contains(item)) {
                    tagsFound.push(item);
                }
            })
        }
    })

    var tagsPages = tagsFound;

    tagsPages.forEach(function(item) {

        fs.readFile('./src/template/pages-for-tag.hbs', 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          }
          var result = data.replace(/%TAG_NAME%/g, item);

          fs.writeFile('./src/pages/tag/' + item + '.hbs', result, 'utf8', function (err) {
             if (err) return console.log(err);
          });
        });
    })

    callback();
};

module.exports = plugin;
module.exports.options = options;