import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UserImage from "./UserImage";
import axios from "../axios";
import { ROOT_API } from '../statics';

import Header from "./Header";
import Loading from "./Loading";
export default class NewGame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			images: [],
			userFB: "",
			loading: false,
			userAlias: null,
			userId: null
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);


	}
	componentDidMount() {

	}
	handleInputChange(event) {

		if (isNaN(event.target.value)) {


			this.setState({ userAlias: event.target.value });
		} else {
			this.setState({ userId: event.target.value });
		}
	}
	handleSubmit = (event) => {

		event.preventDefault();

		this.setState({
			loading: true,
		});
		const userData = {
			facebook_alias: this.state.userAlias,
			facebook_id: this.state.userId,
			deep_level: "fast"
		};
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
	render() {
		const displayedImages = this.state.images.slice(0, 12).map((user, index) => (
			<div key={user.id} className="col-2 mb-4 d-flex justify-content-center">
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
					<div className=" d-flex justify-content-center">
						<Form className=" d-flex flex-column align-items-start" onSubmit={this.handleSubmit}>
							<h3 className="">Điền facebookID của bạn:</h3>
							<span>VD:  https://facebook.com/hoanghiep, <br />
								https://www.facebook.com/profile.php?id=123</span>
							<div className="d-flex flex-row align-items-start mt-2 mr-2" >
								<FormGroup className="mr-3">


									<Input
										placeholder="hoanghiep hoặc 123"
										onChange={this.handleInputChange}

									/>
								</FormGroup>
								<button	 className="btn btn-primary">Tìm Kiếm</button>
							</div>
						</Form>

						
					</div>
				}
				<div className="row">{displayedImages}</div>
			</div>

		);
	}
}