import React, { Component } from 'react'
import './loading.css'
export default class Loading extends Component {
  render(props) {
    return (
      this.props.userImage ?
        <div>
          <div className="lds-hourglass">
          </div>
          <p>Xin đợi trong ít phút </p>
        </div>
        :
        <div className="lds-hourglass">
        </div>
    )
  }
}
