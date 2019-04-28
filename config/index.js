// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      //士应的电脑 http://192.168.4.44:8080/cqedu-cms-web/
      //u小兔正式 http://172.16.146.21:8089/cqedu-cms-web/
      //广东熊猫测试 http://172.16.146.56:8280/cqedu-cms-web/
      //广东熊猫乐园正式 http://172.16.146.22:8089/cqedu-cms-web/
      //lcb本地 http://192.168.2.242:7001/system/user/login.utvgo
      //nodejs原环境 http://172.16.146.32:9090/panda-cms-node/captcha
      //nodejs环境ng配置测试 http://172.16.146.32/panda-cms-node/
      //ng配置 http://localhost:8888/panda-cms-node/system/verificationCode/getCode.utvgo
      '/panda-cms-node': { // /cqedu-cms-web
        //target: 'http://172.16.146.56:8280/',
        target: 'http://172.16.146.22:8089/',
        //target: 'http://192.168.4.44:8080/',
        //target:'http://192.168.2.242:8888/',
        //target: 'http://172.16.146.32:9090/',
        changeOrigin: true,
        pathRewrite: {
          '^/cqedu-cms-web': 'cqedu-cms-web'
          //'^/panda-cms-node': 'panda-cms-node'
          //'^/panda-cms-node': 'panda-cms-node'
        }
      },
      '/service': { // 
        target: 'http://10.117.156.94:8080/',
        changeOrigin: true,
        pathRewrite: {
          '^/service': 'service'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
