import React from 'react';

import Login from './Login';
import Frame from './Frame';

export default ({pager})=>
  <Frame pager={pager}>
    <div>
      <h1>introduction</h1>
      <p> This is an app to view and edit your memo. </p>
      <p> You must login first. </p>

      <p>
        <button onClick={e=>pager.push(Login)}>Login</button>
      </p>

      <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
  </Frame>
