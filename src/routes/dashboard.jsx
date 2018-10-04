import Dashboard from 'views/User/Dashboard/Dashboard.jsx';
import Notifications from 'views/User/Notifications/Notifications.jsx';
import Icons from 'views/User/Icons/Icons.jsx';
import Typography from 'views/User/Typography/Typography.jsx';
import TableList from 'views/User/TableList/TableList.jsx';
import Maps from 'views/User/Maps/Maps.jsx';
import Upgrade from 'views/User/Upgrade/Upgrade.jsx';
import UserPage from 'views/User/UserPage/UserPage.jsx';
import Builder from 'views/User/Builder/Builder';
import CompleteForm from 'views/User/CompleteForm/CompleteForm';
import Logout from '../views/Auth/Logout/Logout';

var dashRoutes = [

  { path: '/builder', name: 'Builder', icon: 'design-2_ruler-pencil', component: Builder },
  { path: '/completeForm', name: 'Complete Form', icon: 'text_bold', component: CompleteForm },
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
  { redirect: true, path: '/', pathTo: '/dashboard', name: 'Dashboard' }
];
export default dashRoutes;
