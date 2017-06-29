import React from 'react';

import Frame from './Frame';
import HomePage from './HomePage';
import ShowMemo from './ShowMemo';

export default class EditMemo extends React.Component
{
  static onRequest(page,props,pager)
  {
    const username = pager.loginService.username;
    if(!username)
      return pager.replace(HomePage);

    props = {username, text:props.text};

    if(props.text)
      return pager.view(page,props);

    // text is not passed in. e.g. directly enter url '/memo#edit'.

    // load text async; meanwhile show a loading page.
    // we can do that within the EditMemo component.
    // but for demo, we use a different LoadingPage component.
    pager.view(LoadingPage);
    pager.memoService.load(props.username)
      .then(text=>pager.view(EditMemo,{username,text}));
  }

  constructor(props)
  {
    super(props);

    this.state = {
      saving : false,
      text: props.text
    }

    this.handleChange = e=>{
      this.setState({text: e.target.value});
    }

    this.handleSave = e=>{
      this.setState({saving: true});
      props.pager.memoService
        .save(props.username, this.state.text)
        .then(()=>props.pager.push(ShowMemo,{text:this.state.text}));
    }
  }

  render()
  {
    const saving = this.state.saving
    return (
      <Frame pager={this.props.pager}>
        <h1>editing...</h1>
        <div>
          <textarea rows='10' value={this.state.text} onChange={this.handleChange}
           style={{backgroundColor:'#faa'}}/>
        </div>
        <p style={{textAlign:'center'}}>
          <button disabled={saving} onClick={this.handleSave} >
            {saving? "saving ..." : "Save"}
          </button>
        </p>
      </Frame>
    );
  }

}

const LoadingPage = ({pager}) =>
  <Frame pager={pager}>
    <div>
      <h1>edit memo</h1>
      <p>
        Loading ....
      </p>
    </div>
  </Frame>
