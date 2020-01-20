import React, { Component } from 'react'
import './loading.css'
import logo from './lixi.png'
export default class Loading extends Component {
  render(props) {
    return (
      this.props.userImage ?
        <div >
          <img className="lixi" style={{width:"100px", height:"100px" }} src={logo} />
          <p>Xin đợi trong ít phút </p>
        </div>
        :
        <div >
          <img className="lixi" style={{width:"100px", height:"100px" }} src={logo} />
        </div>

    )
  }
}
