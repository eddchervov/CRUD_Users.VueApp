var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // плагин для загрузки кода Vue

module.exports = {
    mode: 'production',
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}