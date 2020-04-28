const path = require('path');

module.exports = {
  // Config where add build files
  outputDir: path.resolve(__dirname, '../public/dist'),

  pwa: {
    name: 'Fit Training App',
    // themeColor: '#E08F0E',
    // msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/service-worker.js'
      // ...other Workbox options...
    }
  },

  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/_variables.scss";
        `
      }
    }
  }
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:9000'
  //     }
  //   }
  // },
};
