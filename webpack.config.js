const path = require('path')

module.exports = {
    entry: './CalendarFrontEnd/index.js', 
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    mode: 'development'
}