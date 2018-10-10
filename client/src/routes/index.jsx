import Dashboard from 'layouts/Dashboard/Dashboard.jsx';
import Register from 'views/Auth/Register/Register';
import RegisterUser from 'views/Auth/Register/RegisterUser';
import Login from 'views/Auth/Login/Login';
import CompleteFormUnregistered from 'views/User/BlockForm/CompleteForm/CompleteFormUnregistered';
import ValidateData from 'views/User/BlockForm/ValidateData/ValidateData';

var indexRoutes = [
  { path: '/registerCreator', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/validate', name: 'Vadidate', component: ValidateData },
  { path: '/completeForm/:formId/completed', name: 'Register', component: RegisterUser },
  { path: '/completeForm/:formId', name: 'Complete Form', component: CompleteFormUnregistered },
  { path: '/', name: 'Home', component: Dashboard }
];

export default indexRoutes;
