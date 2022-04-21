module.exports = {
  async headers() {
    return [
      {
        source: '/',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ]
  },
  env: {
    API: 'https://qavservice.herokuapp.com',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}
