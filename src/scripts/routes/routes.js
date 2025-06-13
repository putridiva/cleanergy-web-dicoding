import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import Login from '../pages/login';
import Register from '../pages/register';
import DashboardPage from '../pages/home/dashboard-page';
import PickUpPage from '../pages/pick-up';
import RiwayatPage from '../pages/history-page.js';

const routes = {
  '/login': new Login(),
  '/register': new Register(),
  '/': new HomePage(),
  '/about': new AboutPage(),
  '/dashboard': new DashboardPage(),
  '/pick-up': new PickUpPage(),
  '/riwayat': new RiwayatPage(),
};

export default routes;
