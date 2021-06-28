var HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(css)$/,
                use: [{
                    loader: "style-loader",
                },{
                    loader: "css-loader"
                }]
            },
            {
                test: /\.(scss)$/,
                use: [{
                    loader: "style-loader",
                },{
                    loader: "css-loader"
                },
                {
                    loader: "sass-loader"
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })   
    ]
};