import React, { Component } from "react";

import { ROOT_API } from '../statics';
import axios from "../axios";
import Loading from "./Loading";
class UserImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            avatar: "http://graph.facebook.com/100002748713372/picture?type=large",
            loading: false
        }


    }
    componentDidMount() {
        this.setState({
            loading: true,
        });
        const userData = {
            facebook_alias: this.props.user.data.id,
            facebook_id: null
        };
     


        axios.post(`${ROOT_API}/api/userRoute`, userData).then(response => {
            if (response.data.success) {
            

                this.setState({
                    avatar: JSON.parse(response.data.body).avatar,
                    loading: false
                });
            }
        }).catch(error => {
            console.log(error)
        });

    }
    render() {
        const { loading } = this.state;

        return (
            <div className="box" >
                <div className="">
                    {this.props.index < 13 ? <h3>Top {this.props.index}</h3> : <h3> </h3>}

                </div>
                {loading ? <div className="text-center"><Loading /></div> :
                    <img className="user_image"
                        className=""
                        src={this.state.avatar}
                    />
                }
                <div className="text">
                    <p>{this.props.user.name}</p>
                </div>

            </div>
        );
    }
}

export default UserImage;