/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  rewrites: () => {
    return [
      {
        source: '/about',
        destination: '/about.html'
      }
    ]
  },
}
