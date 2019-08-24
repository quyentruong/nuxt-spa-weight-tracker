import axios from 'axios'

export default function ({ $warehouse, redirect }) {
  axios.post(`${process.env.baseURL}/api/user/VerifyToken`, { token: $warehouse.get('user').token }).then((response) => {
    // eslint-disable-next-line no-console
    console.log(response)
  }).catch((error) => {
    if (error.response.status === 400) {
      // eslint-disable-next-line no-console
      console.log(error.response.data)
      return redirect('/login')
    }
  })
}
