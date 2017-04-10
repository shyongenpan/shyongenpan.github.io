define([], function() {
  this.dojoConfig = { async: 1 };

  return {
    proxyPort: 9000,
    proxyUrl: 'http://localhost:9000/',

    capabilities: {
      'selenium-version': '2.42.2'
    },

    environments: [{
      browserName: 'internet explorer',
      version: '10',
      platform: 'Windows 8'
    }, {
      browserName: 'internet explorer',
      version: '9',
      platform: 'Windows 7'
    }, {
      browserName: 'firefox',
      version: '23',
      platform: ['Linux', 'Windows 7']
    }, {
      browserName: 'firefox',
      version: '21',
      platform: 'Mac 10.6'
    }, {
      browserName: 'chrome',
      platform: ['Linux', 'Mac 10.8', 'Windows 7']
    }, {
      browserName: 'safari',
      version: '6',
      platform: 'Mac 10.8'
    }],

    tunnel: 'NullTunnel',

    useLoader: {
      'host-browser': 'http://js.arcgis.com/3.18/dojo/dojo.js'
    },

    loader: {
      packages: [
        {
          name: 'tests',
          location: './widgets/GRG/tests'
        }, {
          name: 'GRG',
          location: './widgets/GRG'
        },{
          name: 'esri',
          location: 'http://js.arcgis.com/3.18/esri'
        }, {
          name: 'dgrid',
          location: 'http://js.arcgis.com/3.18/dgrid'
        }, {
          name: 'put-selector',
          location: 'http://js.arcgis.com/3.18/put-selector'
        }, {
          name: 'xstyle',
          location: 'http://js.arcgis.com/3.18/xstyle'
        }, {
          name: 'dojo',
          location: 'http://js.arcgis.com/3.18/dojo'
        }, {
          name: 'dojox',
          location: 'http://js.arcgis.com/3.18/dojox'
        }, {
          name: 'dijit',
          location: 'http://js.arcgis.com/3.18/dijit'
        }, {
          name: 'jimu',
          location: '../../../jimu.js'
        }
      ]
    },

    suites: ['tests/grg-unit-test'],

    excludeInstrumentation: /^(?:test|node_modules)/
  };
});