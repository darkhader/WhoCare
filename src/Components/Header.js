import React, { Component } from "react";
class Header extends Component {
    render() {
        return (
            <header className="header d-flex justify-content-between mt-2">
                <h3 style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "solid",
                    borderBottomColor: "#cecece"
                }}> <a href="/">Ai quan tâm đến bạn nhất?</a>
                </h3>
                {
                    this.props.userFB ? <h3>
                        <img className="avaFB"
                            src={`http://graph.facebook.com/${this.props.userFB.id}/picture?type=square`}
                        />
                        {this.props.userFB.name}
                    </h3> : <h3></h3>   
                }

            </header>
        )
    }
}
export default Header;

