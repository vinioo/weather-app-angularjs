const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = [
    new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
            messages: ['Your application is running here: http://localhost:' + process.env.PORT],
        },
    }),
];
