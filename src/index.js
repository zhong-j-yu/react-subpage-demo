import ReactDOM from 'react-dom';
import './index.css';

import Pager from 'react-subpage';

import {LoginService, MemoService} from './services';

import HomePage from './ui/HomePage';
import Login    from './ui/Login';
import ShowMemo from './ui/ShowMemo';
import EditMemo from './ui/EditMemo';
import NotFound from './ui/NotFound';

const urlMap = {
  '/'          : HomePage,
  '/login'     : Login,
  '/memo'      : ShowMemo,
  '/memo#edit' : EditMemo,
  ':url(.*)'   : NotFound
}
const pager = new Pager(urlMap);

// dependencies
pager.memoService = new MemoService();
pager.loginService = new LoginService();

ReactDOM.render(pager.element, document.getElementById('root'));
