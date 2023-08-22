const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = 
{
  devServer:
  {
    host: "localhost",
    port: 8081,
    proxy:
    {
        '^/api':
        {
            target: 'http://localhost:5000',
            changeOrigin: true,
            logLevel: 'debug',
            pathRewrite:
            {
              '^/api':'/'
            }
        }
    }
  }

}