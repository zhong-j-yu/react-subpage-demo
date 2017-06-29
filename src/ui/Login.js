import React from 'react';

import Frame from './Frame';
import ShowMemo from './ShowMemo';


export default class Login extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      username : '',
      password : '',
      error    : null,
      waiting  : false
    }

    const afterLogin = props.afterLogin ||
      ((login)=>props.pager.push(ShowMemo));

    this.handleUsername = e=>
      this.setState({username: e.target.value});

    this.handlePassword = e=>
      this.setState({password: e.target.value});

    this.handleSubmit = e=>{
      this.setState({waiting: true});
      props.pager.loginService
        .login(this.state.username, this.state.password)
        .then(afterLogin, error=>{
          this.setState({waiting:false, error:'Error: '+error.message});
        });
    }

  }

  render()
  {
    const waiting = this.state.waiting;
    return (
      <Frame pager={this.props.pager}>
        <div>
          <h1>login</h1>
          <p style={{backgroundColor:'#ff0'}}>{this.props.message}</p>

          <p>(any username/password would work)</p>
          <p>
            <input placeholder='username' size='10'
             value={this.state.username} onChange={this.handleUsername} />
          </p>
          <p>
            <input placeholder='password' size='10'
             value={this.state.password} onChange={this.handlePassword} />
          </p>

          <p className='error'>{this.state.error}</p>
          <button disabled={waiting} onClick={this.handleSubmit} >
            {waiting? "logging in ..." : "Login"}
          </button>
        </div>
      </Frame>
    );
  }

}
