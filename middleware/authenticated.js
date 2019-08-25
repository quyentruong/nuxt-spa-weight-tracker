import axios from 'axios'

export default function ({ $warehouse, redirect }) {
  const token = $warehouse.get('user') === undefined ? '' : $warehouse.get('user').token
  axios.post(`${process.env.baseURL}/api/user/VerifyToken`, { token }).then((response) => {
    if (window.location.pathname === '/login' || window.location.pathname === '/register') { return redirect('/') }
  }).catch((error) => {
    if (error.response.status === 400) {
      // eslint-disable-next-line no-console
      console.log(error.response.data)
      $warehouse.remove('user')
      // $warehouse
      if (window.location.pathname !== '/login') { return redirect('/login') }
    }
  })
}
