// 给路径起别名
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'network': '@network',
                'utils': '@/utils',
                'views': '@/views'
            }
        }
    },
    publicPath: './'
}
