import React from 'react';

import EditMemo from './EditMemo';
import Frame from './Frame';

const NotFound = ({url, pager})=>
  <Frame pager={pager}>
    <h1>404</h1>
    <p className="error">
      url not mapped to any page: <br/>
      <code>{url}</code>
    </p>
  </Frame>

NotFound.onRequest = (page,props,pager)=>
{
  if(props.url==='/memo#modify')
    return pager.replace(EditMemo);

  return pager.view(page,props);
}

export default NotFound;
