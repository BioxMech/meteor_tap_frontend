// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export default function handler(req, res) {
  if (req.method === "POST") {
    axios.post('https://developers.onemap.sg/privateapi/auth/post/getToken', {
      email: process.env.NEXT_PUBLIC_EMAIL,
      password: process.env.NEXT_PUBLIC_PASSWORD
    }, {
      headers: { 
        'cache-control': 'no-cache, max-age=0',
        'content-type': 'application/json'
      }
    })
    .then(response => {
      res.status(200).json({ key: response.data.access_token })
    })
    .catch(error => {
      res.status(200).json({ message: "Unable to obtain token. Request for help from the Administrator" })
    })
  } else {
    res.status(200).json({ message: 'Hello' })
  }
}
