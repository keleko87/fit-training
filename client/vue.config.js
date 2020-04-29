const path = require('path');
const manifestJSON = require('./public/manifest.json');

module.exports = {
  // Performance optimization
  // configureWebpack: {
  //   optimization: {
  //     runtimeChunk: 'single',
  //     splitChunks: {
  //       chunks: 'all',
  //       maxInitialRequests: Infinity,
  //       minSize: 0,
  //       cacheGroups: {
  //         vendor: {
  //           test: /[\\/]node_modules[\\/]/,
  //           name(module) {
  //             const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
  //             return `npm.${packageName.replace('@', '')}`;
  //           }
  //         }
  //       }
  //     }
  //   }
  // },

  // Config where add build files
  outputDir: path.resolve(__dirname, '../public/dist'),

  pwa: {
    name: manifestJSON.short_name,
    themeColor: manifestJSON.theme_color,
    msTileColor: manifestJSON.background_color,
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [/\.map$/, /manifest\.json$/]
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
};
