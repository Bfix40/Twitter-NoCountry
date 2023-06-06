const API_URL = process.env.NODE_ENV === 'production'
  ? `${process.env.NEXT_PUBLIC_API_URL}`
  : `${process.env.NEXT_PUBLIC_API_URL_DEV}`

const URL_CLIENT = process.env.NODE_ENV === 'production' ? "https://twitter-nocountry-production.up.railway.app" : "http://localhost:3000"
export { API_URL, URL_CLIENT }
