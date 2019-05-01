module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:9090/",
                changeOrigin: false
            }
        }
    },
    configureWebpack: {
        entry: {
            app: './src/main.js',
            style: [
                'bootstrap/dist/css/bootstrap.min.css'
            ]
        }
    }
}