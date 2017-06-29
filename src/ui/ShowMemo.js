import React from 'react';

import Frame from './Frame';
import Login from './Login';
import EditMemo from './EditMemo';

export default class ShowMemo extends React.Component
{
  static onRequest(page,props,pager)
  {
    const username = pager.loginService.username;
    if(!username)
      return pager.view(Login, {
        message: 'This page (show memo) requires login',
        afterLogin:()=>pager.go(0)
      });

    props = Object.assign({username}, props);

    return pager.view(page,props);
  }

  constructor(props)
  {
    super(props);

    this.state = {text:props.text};

    if(!props.text) // text not passed in. load it async
      props.pager.memoService.load(props.username)
        .then(text=>this.setState({text}));
  }

  render()
  {
    const pager = this.props.pager;
    const text = this.state.text || 'LOADING...';

    return (
      <Frame pager={pager}>
      <h1>{this.props.username}{"'s"} memo</h1>
        <div>
          <textarea rows='10' value={text} disabled={true} style={{backgroundColor:'#ff7'}}/>
        </div>
        <p style={{textAlign:'center'}}>
          <button onClick={e=>pager.push(EditMemo,{text})}>Edit</button>
        </p>
      </Frame>
    );
  }

}
