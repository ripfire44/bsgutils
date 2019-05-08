module.exports = (function(){
    const path = require('path');

    const module = {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    };
    const resolve = {
        extensions: ['.ts', '.js']
    }
    return {
        entry: './src/index.ts',
        module,
        resolve,
        output: {
            filename: 'angular-bsg-utils.js',
            path: path.resolve(__dirname, 'dist'),
        }
    };
}());