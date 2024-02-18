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
        source: '/new',
        destination: '/user',
      },
    ]
  }
}

module.exports = nextConfig
