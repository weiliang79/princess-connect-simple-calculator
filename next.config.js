/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

module.exports = {
      webpack: (config, options) => {
            config.module.rules.push({
                  test: /\.csv$/,
                  loader: 'csv-loader',
                  options: {
                        dynamicTyping: true,
                        header: true,
                        skipEmptyLines: true
                  }
            });

            return config;
      }
}