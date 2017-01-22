module.exports = {
    entry:  './app.jsx',
    devtool: 'source-map',
    output: {
        path:       './public/static/build/',
        filename:   'bandle.js',
        publicPath: 'static/build'
    },
    resolve: {
        moduleDirectories: ['.', 'node_modules']
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: 'raw' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1' },
            { test: /\.jsx$/, loader: 'babel!eslint-loader', exclude: [/node_modules/, /public/] },
            { test: /\.js$/, loader: 'babel!eslint-loader', exclude: [/node_modules/, /public/] }
        ]
    },
    eslint: {
        configFile: '.eslintrc'
    },
    devServer: {
        contentBase: 'public',
        port: 8000,
        hot: true,
        compress: true,
        historyApiFallback: true
    }
};
