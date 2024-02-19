/** @type {import('next').NextConfig} */
const nextConfig = { 
  
  typescript:{
    ignoreBuildErrors: true,
  },
  images:{
    domains:['avatars.githubusercontent.com']
  },
  
  rewrites(){
    return [
      {
        source: '/rss',
        destination: '/feed.xml',
      },
      {
        source: '/rss.xml',
        destination: '/feed.xml',
      },
      {
        source: '/feed',
        destination: '/feed.xml',
      },
    ]
  }
}

module.exports = nextConfig
