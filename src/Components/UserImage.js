import React, { Component } from "react";

import { ROOT_API } from '../statics';
import axios from "../axios";
import Loading from "./Loading";
class UserImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            avatar: "https://res.cloudinary.com/teepublic/image/private/s--p3xh8d8B--/c_crop,x_10,y_10/c_fit,h_1109/c_crop,g_north_west,h_1260,w_1260,x_-228,y_-70/co_rgb:ffffff,e_colorize,u_Misc:One%20Pixel%20Gray/c_scale,g_north_west,h_1260,w_1260/fl_layer_apply,g_north_west,x_-228,y_-70/bo_157px_solid_white/e_overlay,fl_layer_apply,h_1260,l_Misc:Art%20Print%20Bumpmap,w_1260/e_shadow,x_6,y_6/c_limit,h_1134,w_1134/c_lpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1558628658/production/designs/4911172_0.jpg",
            loading: false
        }
        this.callAPI = this.callAPI.bind(this);


    }
    async componentDidMount() {
        this.setState({
            loading: true,
        });
        await new Promise(resolve => setTimeout(resolve, this.props.index * 2000))
        this.callAPI();
    }
    callAPI() {

        const userData = this.props.user.data.type === "facebook_alias" ? {
            facebook_alias: this.props.user.data.id,
            facebook_id: null
        } :
            {
                facebook_alias: null,
                facebook_id: this.props.user.data.id
            };
        axios.post(`${ROOT_API}/profile`, JSON.stringify(userData), {
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjMxMjY3MjgsImlhdCI6MTU3NjcyNjcyMywic3ViIjoiZ3Vlc3QifQ.iHeDDkHYeNUXyKaUg6mGzdWzSpLXXmCUlLhz9TDzhrg',
                "Content-Type": "application/json"
            }
        }).then(async (response) => {
            if (response.status === 202) {

                await new Promise(resolve => setTimeout(resolve, 20000))
                this.callAPI();
            }
            else if (response.data) {
                if (response.data.avatar) {
                    this.setState({
                        avatar: response.data.avatar,
                        loading: false
                    });
                }
                else
                    this.setState({
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
            <div className="box justify-content-center align-items-center mt-1"  >
                <div>
                    {this.props.index < 10 ?
                        <div className="p-2 d-flex justify-content-center align-items-center" >
                            <span className="top">Top {this.props.index + 1}</span>

                        </div>
                        : <div className="p-2 d-flex justify-content-center align-items-center" >
                            <span className="top">Top {this.props.index + 1}</span>

                        </div>}

                    {loading ? <div className="text-center"><Loading /></div> :
                        <a className="linkfb" target="_blank" href={`https://www.facebook.com/${this.props.user.data.id}`} >
                            <img className="user_image"
                                src={this.state.avatar}
                            />
                        </a>
                    }
                    {this.props.user ?
                        <div className="text ml-2 text d-flex justify-content-center align-items-center">
                            <a className="linkfb" target="_blank" href={`https://www.facebook.com/${this.props.user.data.id}`} >
                                <span className="name">{this.props.user.name}</span>
                            </a>
                        </div>
                        : ""
                    }
                </div>

            </div>
        );
    }
}

export default UserImage;