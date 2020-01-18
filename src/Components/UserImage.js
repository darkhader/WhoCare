import React, { Component } from "react";

import { ROOT_API } from '../statics';
import axios from "../axios";

class UserImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            avatar: "67563683055",
        }


    }
    componentDidMount() {

        axios.post(`${ROOT_API}/api/anaRoute`, this.props.user.id).then(response => {
            if (response) {
                console.log("response2 ", response);
                this.setState({ avatar: response.data.avatar });
            }
        }).catch(error => {
            console.log(error)
        });

    }
    render() {


        return (
            <div className="box" >
                <div className=" d-flex justify-content-center">
                    {this.props.index < 5 ? <h3>Top {this.props.index}</h3> : <h3> </h3>}
                
                </div>

                <img className="user_image"
                    // style={{ width: "100%", height: "100%" }}
                    className=""
                    src={`http://graph.facebook.com/${this.state.avatar}/picture?type=large`}
                />
                <div className="text">
                    <p>{this.props.user.name}</p>
                </div>

            </div>
        );
    }
}

export default UserImage;