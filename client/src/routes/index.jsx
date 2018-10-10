import Dashboard from 'layouts/Dashboard/Dashboard.jsx';
import Register from 'views/Auth/Register/Register';
import RegisterUser from 'views/Auth/Register/RegisterUser';
import Login from 'views/Auth/Login/Login';
import CompleteFormUnregistered from 'views/User/BlockForm/CompleteForm/CompleteFormUnregistered';

var indexRoutes = [
  { path: '/registerCreater', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/completeForm/:formId/completed', name: 'Register', component: RegisterUser },
  { path: '/completeForm/:formId', name: 'Complete Form', component: CompleteFormUnregistered },
  { path: '/', name: 'Home', component: Dashboard }
];

export default indexRoutes;
