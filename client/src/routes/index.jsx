import Dashboard from 'layouts/Dashboard/Dashboard.jsx';
import Register from '../views/Auth/Register/Register';
import Login from '../views/Auth/Login/Login';


var indexRoutes = [
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/', name: 'Home', component: Dashboard }
];

export default indexRoutes;
