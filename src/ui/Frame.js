import React from 'react';

import Login from './Login';
import HomePage from './HomePage';

const Logout = ({pager})=>
  <button style={{float:'right', margin:'5px', fontSize:'16px'}}
    onClick={e=>{
      pager.loginService.logout();
      pager.push(HomePage);
    }} >  logout
  </button>


export default ({children, pager})=>
  <div>
    <div style={{backgroundColor:'#aaf'}}>
      { pager.loginService.username ? <Logout pager={pager}/> : null }
      <span style={{fontSize:'2em',paddingLeft:'10px'}}>My Memo</span>
    </div>

    <div style={{color:'#999', paddingLeft:'10px'}}>
      a demo app for react-subpage
    </div>

    <div style={{padding:'10px'}}>
      {children}
    </div>
  </div>
