import React, { Component, useState } from 'react';
import { Form, FormGroup, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UserImage from "./UserImage";
import axios from "../axios";
import { ROOT_API } from '../statics';
import FacebookLogin from 'react-facebook-login';
import Header from "./Header";
import Loading from "./Loading";
export default class NewGame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			images: [],
			userFB: "",
			loading: false
		}

		this.fbLogin = this.fbLogin.bind(this);
		this.responseFacebook = this.responseFacebook.bind(this);


	}
	componentDidMount() {
		this.responseFacebook();




	}
	fbLogin = (scores) => { }
	responseFacebook = (response) => {

		this.setState({
			loading: true,
			userFB: response
		});
		const userData = this.state.userFB ? {
			facebook_alias: null,
			facebook_id: this.state.userFB.id,
			deep_level: "fast"
		} : "";
		

		if (userData) {
			axios.post(`${ROOT_API}/api/anaRoute`, userData).then(response => {
				if (response) {
					if (response.data.success) {
						this.setState({
							images: JSON.parse(response.data.body),
							loading: false
						});
					}
					

				}

			}).catch(error => {

				console.log(error)


			});
		}

	}

	render() {
		const displayedImages = this.state.images.slice(0, 12).map((user, index) => (
			<div key={user.id} className="col-3 mb-4 ">

				<UserImage
					hiddenReview={true}
					user={user}
					index={index + 1} />

			</div>
		));
		const { loading } = this.state;
		return (
			<div>
				{this.state.userFB ? <Header userFB={this.state.userFB} /> : <Header />}
				{loading ? <div className="text-center"><Loading /></div>
					:
					<div className="container">

						

						{this.state.userFB ? "" : <FacebookLogin
							appId="477949126119051"
							autoLoad={true}
							fields="name,email,link"
							onClick={this.fbLogin}
							callback={this.responseFacebook} />}

						<div className="row">{displayedImages}</div>
					</div>
				}
			</div>

		);
	}
}