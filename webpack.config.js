var path = require('path');
var webpack = require('webpack');
var mode = require('yargs').argv.env; //区分开发、生产环境

//插件
var uglifyPlugin = webpack.optimize.UglifyJsPlugin; //webpack内置插件(代码压缩)

//路径
var rootPath = path.resolve(__dirname, './');  //项目路径
var node_modules = path.resolve(rootPath, 'node_modules');



const libraryName = 'sparrow';
var plugins = [];
var filename = '';

if (mode == 'production'){  //生产环境 .min.js
  filename = libraryName + '.min.js?[hash:6]';
  plugins.push(new uglifyPlugin({minimize: true}));

} else{ //开发环境 .js
  filename = libraryName + '.js?[hash:6]';

}


console.log(mode);


var config = {
  entry: path.resolve(rootPath, 'src/index.js'),
  output: {
    path: path.resolve(rootPath, 'lib'),
    filename: filename,
    //UMD模块 添加
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  "devtool": "cheap-source-map",  //开发工具配置，可以在浏览器sources中 查看源代码
  resolve: {  //resolve配置用来影响webpack模块解析规则。解析规则也可以称之为检索，索引规则。配置索引规则能够缩短webpack的解析时间，提升打包速度。
    //root和modulesDirectory 在webpack@2.x中被舍弃了，使用了新的规则resolve.modules，这是前两者的结合体
    modules: [node_modules],
    //extension  扩展名、方便
    extensions: ['.js', '.css', '.json'],
    //alias 默认搜索路径配置
    alias: {
      // 'jquery': path.resolve(rootPath + '/scripts/lib/jquery.js'),
      // 'vue$': path.resolve(node_modules + '/vue/dist/vue.common.js'),
      // 'vue-router$': path.resolve(node_modules + '/vue-router/dist/vue-router.common.js'),
      // 'base.js': path.resolve(srcPath + '/scripts/base.js'),
      // 'base.css': path.resolve(srcPath + '/styles/base.css'),
      // 'common': path.resolve(srcPath + '/scripts/common'),
      // 'lib': path.resolve(srcPath + '/scripts/lib'),
      // 'components': path.resolve(srcPath + '/scripts/components')

      // 使用
      // import ajax from 'common/ajax';  比如说 加载common文件夹下的ajax.js 文件，就可以直接这样了
    }
  },
  resolveLoader: {  //resolveLoader相当于是针对webpack Loader 的单独 resolve 配置，做用和resolve一样，但只作用于webpack loader
    modules: [node_modules]
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },

}

module.exports = config;
