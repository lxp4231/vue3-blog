const path = require('path')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
  devServer: {
    open: true, // 编译完成是否打开网页
    host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: false, // 编译失败时刷新页面
    hot: true, // 开启热加载
    hotOnly: false,
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        target: 'http://localhost:3333',
        changeOrigin: true,
        pathReWrite: {
          [`^${process.env.BASE_URL}`]: ''
        }
      }
    }, // 设置代理
    overlay: {
      warnings: true,
      errors: true
    },
    before: app => {}
  },
}