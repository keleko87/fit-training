const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'),
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:9000'
  //     }
  //   }
  // },
  // pwa: {
  //   name: 'Fit Training App',
  //   themeColor: '#4DBA87',
  //   msTileColor: '#000000',
  //   appleMobileWebAppCapable: 'yes',
  //   appleMobileWebAppStatusBarStyle: 'black',

  //   // configure the workbox plugin
  //   workboxPluginMode: 'InjectManifest',
  //   workboxOptions: {
  //     // swSrc is required in InjectManifest mode.
  //     swSrc: 'dev/sw.js',
  //     // ...other Workbox options...
  //   }
  // },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/_variables.scss";
        `
      }
    }
  }
};
