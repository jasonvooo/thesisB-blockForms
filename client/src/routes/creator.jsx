import Dashboard from 'views/User/Default/Dashboard/Dashboard.jsx';
import Notifications from 'views/User/Default/Notifications/Notifications.jsx';
import Icons from 'views/User/Default/Icons/Icons.jsx';
import Typography from 'views/User/Default/Typography/Typography.jsx';
import TableList from 'views/User/Default/TableList/TableList.jsx';
import Maps from 'views/User/Default/Maps/Maps.jsx';
import Upgrade from 'views/User/Default/Upgrade/Upgrade.jsx';
import UserPage from 'views/User/Default/UserPage/UserPage.jsx';
import WrapperForm from 'views/User/BlockForm/WrapperForm/WrapperForm';
import BuilderForm from 'views/User/BlockForm/BuilderForm/BuilderForm';
import CompleteForm from 'views/User/BlockForm/CompleteForm/CompleteForm';
import Logout from 'views/Auth/Logout/Logout';

var createrRoutes = [

  { path: '/creator/forms', name: 'Forms', icon: 'design_bullet-list-67', component: WrapperForm },
  { path: '/creator/builder', name: 'Builder', icon: 'design-2_ruler-pencil', component: BuilderForm },
  { path: '/creator/completeForm', name: 'Complete Form', icon: 'text_bold', component: CompleteForm },
  { path: '/logout', name: 'Logout', icon: 'sport_user-run', component: Logout },

  // { path: '/formProfile', name: 'Form Responses', icon: 'text_bold', component: CompleteForm },
  // { path: '/validateFile', name: 'Validate File', icon: 'text_bold', component: CompleteForm },

  // {path: "/dashboard", name: "Dashboard", icon: "design_app", component: Dashboard},
  // {path: "/icons", name: "Icons", icon: "design_image", component: Icons},
  // {path: "/maps", name: "Maps", icon: "location_map-big", component: Maps},
  // {path: "/notifications", name: "Notifications", icon: "ui-1_bell-53", component: Notifications},
  // {path: "/user-page", name: "User Profile", icon: "users_single-02", component: UserPage},
  // {path: "/extended-tables", name: "Table List", icon: "files_paper", component: TableList},
  // {path: "/typography", name: "Typography", icon: "design-2_ruler-pencil", component: Typography},
  // {pro: true, path: "/upgrade", name: "Upgrade to PRO", icon: "objects_spaceship", component: Upgrade},
  { redirect: true, path: '/', pathTo: '/creator/forms', name: 'Forms' }
];
export default createrRoutes;
