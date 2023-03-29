// https://cli.vuejs.org/ru/config/#vue-config-js
module.exports = {
  //mode: process.env.NODE_ENV,
  productionSourceMap: false,
  filenameHashing: true,
	assetsDir: './engine/assets/',
  pwa: {
    name: 'Diplomka',
    themeColor: '#ffffff',
    msTileColor: '#0077ff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    manifestOptions: {
      name: "Diplomka",
      short_name: "Diplomka",
      description: "Diplomka for PVKU college",
      display: "standalone",
      theme_color: "#FFFFFF",
      background_color: "#FFFFFF",
      scope: "/",
      start_url: "/",
      icons: [
        {
          src: "/engine/assets/ico/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/engine/assets/ico/android-chrome-256x256.png",
          sizes: "256x256",
          type: "image/png"
        },
        {
          src: "/engine/assets/ico/android-chrome-384x384.png",
          sizes: "384x384",
          type: "image/png"
        },
        {
          src: "/engine/assets/ico/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    },

    //https://cli.vuejs.org/ru/core-plugins/pwa.htm
    workboxPluginMode: 'GenerateSW', //InjectManifest GenerateSW
    workboxOptions: {
      //swSrc: './public/service-worker.js',
      exclude: [
        /\.map$/,
        /\.xml$/,
        /\.txt$/,
        //manifest$/,
        /\.htaccess$/,
        /service-worker\.js$/,
        /sw\.js$/,
      ],
      include: [
        /\.html$/,
        /\.js$/,
        /\.css$/,
        /\.gif$/,
        /\.jpg$/,
        /\.png$/
      ],
      /*navigateFallbackBlacklist: [
        new RegExp("^/_"),
        new RegExp("/[^/]+\\.[^/]+$")
      ],*/
      //swDest: 'sw.js',
      sourcemap: false,
      //importWorkboxFrom: "cdn",
      cleanupOutdatedCaches: true,
      maximumFileSizeToCacheInBytes: 100 * 1024 * 1024
    }
  },
	css: {
		loaderOptions: {
			sass: {
				additionalData: `
          @import "@/assets/scss/variables/Variables.scss";
        `,
			},
      css:{
        url: false
      }
		}
	},
  /*configureWebpack: {
    resolve: {
      fallback: { "timers": require.resolve('timers/promises') }
    },
  },*/
  /*configureWebpack: {
    resolve: {
      alias: {
        Theme: 'White',
      },
   },
  },
  chainWebpack: config => {
    const cssRule = config.module.rule('css')
    cssRule.uses.clear()

    config.module
      .rule('css')
      .test(/\.css$/)
      .use('css-loader')
      .loader('css-loader')
  }*/
}
  