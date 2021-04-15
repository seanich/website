const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const sharp = require('sharp');

module.exports = {
    entry: './src/styles.css',
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'javascript/auto'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            gaId: process.env.GA_ID
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/images',
                    to: 'images',
                    transform: content => sharp(content).resize(160).toBuffer()
                }
            ]
        }),
        new ImageMinimizerPlugin({
            severityError: 'warning',
            minimizerOptions: {
                plugins: ['mozjpeg']
            },
            loader: false
        })
    ],
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    }
}