import WrapperForm from 'views/User/BlockForm/WrapperForm/WrapperForm';
import CompleteForm from 'views/User/BlockForm/CompleteForm/CompleteForm';
import Logout from 'views/Auth/Logout/Logout';

var responderRoutes = [

  { path: '/responder/forms', name: 'Forms', icon: 'design_bullet-list-67', component: WrapperForm },
  { path: '/responder/complete/:formId', name: 'Complete Form', icon: 'text_bold', component: CompleteForm },
  { path: '/logout', name: 'Logout', icon: 'sport_user-run', component: Logout },

  { redirect: true, path: '/', pathTo: '/responder/forms', name: 'Forms' }
];
export default responderRoutes;
