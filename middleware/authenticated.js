import axios from 'axios'

export default function ({ $warehouse, redirect }) {
  const url = process.env.DEPLOY_ENV === 'GH_PAGES' ? 'https://trackapi2.azurewebsites.net' : 'https://localhost:5001'
  if ($warehouse.get('user') === undefined) {
    $warehouse.set('user', 'f')
  }
  axios.post(`${url}/api/user/VerifyToken`, { token: $warehouse.get('user').token }).then((response) => {
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
