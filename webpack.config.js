const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const redirect = (res, loc) => {
    res.statusCode = 302;
    res.statusMessage = 'Found';
    res.headers.location = loc;
};

const checkAuth = (res, req) => {
    if (req.url !== '/login' && [401].includes(res.statusCode)) {
        // not logged in, redirect to login page
        redirect(res, '/login');
    }
};

const config = {
    context: __dirname,
    entry: [
        'babel-polyfill',
        'whatwg-fetch',
        './src/index.js',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.map',
    },
    devServer: {
        contentBase: './src',
        hot: true,
        inline: true,
        stats: 'minimal',
        historyApiFallback: true,
        proxy: {
            '/api/**': {
                target: process.env.DEV_URL,
                pathRewrite: { '^/api': '' },
                cookieDomainRewrite: process.env.DEV_URL,
                changeOrigin: true,
                logLevel: 'debug',
                onProxyRes: checkAuth,
            },
        },
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: [/node_modules/, /styles/],
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader?sourceMap',
            }),
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader?name=fonts/[name].[ext]',
        }, {
            test: /\.(jpg|png|gif|svg)$/,
            loader: 'file-loader?name=images/[name].[ext]',
            include: [/images/],
        }],
    },
    resolve: {
        extensions: ['.css', '.js', '.json'],
        modules: ['node_modules'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                REV: JSON.stringify(process.env.REV),
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new ExtractTextPlugin({
            filename: 'bundle.css',
            disable: false,
            allChunks: true,
        }),
    ],
};

if (process.env.NODE_ENV === 'production') {
    config.plugins = config.plugins.concat([
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            mangle: false,
            warnings: false,
        }),
    ]);
} else {
    config.devtool = 'source-map';
    config.plugins = config.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]);
}

module.exports = config;
