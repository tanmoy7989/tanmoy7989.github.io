const
  fs = require('fs'),
  handlebars = require('handlebars'),
  handlebarsWax = require('handlebars-wax'),
  addressFormat = require('address-format')
  moment = require('moment'),
  Swag = require('swag');

Swag.registerHelpers(handlebars);

handlebars.registerHelper({

  removeProtocol: function (url) {
    return url.replace(/.*?:\/\//g, '');
  },

  concat: function () {
    let res = '';

    for (let arg in arguments) {
      if (typeof arguments[arg] !== 'object') {
        res += arguments[arg];
      }
    }

    return res;
  },

  formatAddress: function (address, city, region, postalCode, countryCode) {
    let addressList = addressFormat({
      address: address,
      city: city,
      subdivision: region,
      postalCode: postalCode,
      countryCode: countryCode
    });

    return addressList.join('<br/>');
  },

  formatDate: function (date) {
    return moment(date).format('MM/YYYY');
  }

});

function render(resume) {
  css = fs.readFileSync(__dirname + '/style.css', 'utf-8'),
  resumeTemplate = fs.readFileSync(__dirname + '/resume.hbs', 'utf-8');

  let Handlebars = handlebarsWax(handlebars);

  Handlebars.partials(__dirname + '/partials/**/*.{hbs,js}');

  return Handlebars.compile(resumeTemplate)({
    css: css,
    resume: resume
  });
}

module.exports = {
	render: render
};