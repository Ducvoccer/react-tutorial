const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.ANALYZE,
})

const env = {
  ENVIRONMENT: process.env.ENVIRONMENT || '',
  API_BASE: process.env.API_BASE,
  PATH_AUTH: process.env.PATH_AUTH,
  PATH_STORE_FRONT: process.env.PATH_STORE_FRONT,
  PATH_VENDOR: process.env.PATH_VENDOR,
  PATH_ADMIN: process.env.PATH_ADMIN,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  API_HOSTNAME: process.env.API_HOSTNAME,
  FRONTEND_URL: process.env.FRONTEND_URL,
  CDN_DOMAIN: process.env.CDN_DOMAIN || '',
}

const sassConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles/sass')],
  },
}

const webpack = (config, _options) => {
  config.module.rules.push({
    test: /\.html$/i,
    use: 'raw-loader',
  })
  config.module.rules.push({
    test: /\.svg$/,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'removeViewBox',
                active: false,
              },
            ],
          },
        },
      },
    ],
    exclude: /(\/fonts)/,
  })
  return config
}

const settings = {
  reactStrictMode: false,
  // swcMinify: true,
  env,
  ...sassConfig,
  webpack,
  async rewrites() {
    return [
      {
        source: env.PATH_AUTH,
        destination: `${env.API_BASE}${env.PATH_AUTH}`,
      },
      {
        source: `${env.PATH_STORE_FRONT}/:path*`,
        destination: `${env.API_BASE}${env.PATH_STORE_FRONT}/:path*`,
      },
      {
        source: `${env.PATH_VENDOR}/:path*`,
        destination: `${env.API_BASE}${env.PATH_VENDOR}/:path*`,
      },
      {
        source: `${env.PATH_ADMIN}/:path*`,
        destination: `${env.API_BASE}${env.PATH_ADMIN}/:path*`,
      },
    ]
  },
  images: {
    domains: [env.API_HOSTNAME, env.CDN_DOMAIN],
  },
}

module.exports = withBundleAnalyzer(settings)
