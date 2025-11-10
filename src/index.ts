import { components } from './components';
import { pages } from './pages';

window.Webflow ||= [];
window.Webflow.push(() => {
  components();
  pages();
});
