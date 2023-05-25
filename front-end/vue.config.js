// https://cli.vuejs.org/ru/config/#vue-config-js
module.exports = {
  //mode: process.env.NODE_ENV,
  productionSourceMap: false,
  filenameHashing: true,
	assetsDir: './engine/',
  pwa: {
    name: 'Unicode Store',
    themeColor: '#ffffff',
    msTileColor: '#0077ff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',

    manifestOptions: {
      name: "Unicode Store",
      short_name: "UStore",
      description: "Graduation project for PVKU college",
      display: "standalone",
      theme_color: "#FFFFFF",
      background_color: "#FFFFFF",
      scope: "/",
      start_url: "/",
      icons: [
        {
          src: "/engine/assets/ico/android-chrome-144x144.png",
          sizes: "144x144",
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
}
  