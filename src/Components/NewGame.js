import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import UserImage from "./UserImage";
import axios from "../axios";
import { ROOT_API } from '../statics';
import Loading from "./Loading";
export default class NewGame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			images: [],
			userFB: "",
			loading: false,
			showInput: true,
			userAlias: null,
			userId: null
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.callAPI = this.callAPI.bind(this);
		this.postFB = this.postFB.bind(this);

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
			showInput: false,
			loading: true,
		});
		this.callAPI();


	}
	callAPI() {
		const userData = {
			facebook_alias: this.state.userAlias,
			facebook_id: this.state.userId,
			deep_level: "fast"
		};
		axios.post(`${ROOT_API}/network`, JSON.stringify(userData), {
			headers: {
				'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjMxMjY3MjgsImlhdCI6MTU3NjcyNjcyMywic3ViIjoiZ3Vlc3QifQ.iHeDDkHYeNUXyKaUg6mGzdWzSpLXXmCUlLhz9TDzhrg',
				"Content-Type": "application/json"
			}
		}).then(async (response) => {
			if (response.status === 202) {
				await new Promise(resolve => setTimeout(resolve, 60000))
				this.callAPI();
			}
			else if (response.data) {
				this.setState({
					images: response.data,
					loading: false,
				})


			}

		}).catch(error => {

			console.log(error)


		});
	}
	postFB() {
		window.FB.ui({
			method: 'share',
			href: 'https://bangtin.vn/ai-quan-tam-nhat',
			quote: `Những người quan tâm đến tôi nhất:
			Top 1: ${this.state.images.slice(0, 5)[0].name} 
			Top 2: ${this.state.images.slice(0, 5)[1].name} 
			Top 3: ${this.state.images.slice(0, 5)[2].name}
			Top 4: ${this.state.images.slice(0, 5)[3].name}
			Top 5: ${this.state.images.slice(0, 5)[4].name}`

		}, function (response) { })


	}
	render() {
		const displayedImages = this.state.images.slice(0, 5).map((user, index) => (
			<div key={index} className="col-md-3 col-sm-4 mb-4 d-flex justify-content-center">
				<UserImage
					user={user}
					index={index} />
			</div>
		));
		const { loading, showInput } = this.state;
		return (
			<div>




				{loading ?
					<div className="text-center"><Loading userImage="false" />
					</div>
					:
					showInput === true ?
						<div className=" d-flex justify-content-center">
							<Form className=" d-flex flex-column align-items-start" onSubmit={this.handleSubmit}>
								<div className="d-flex flex-row align-items-start mt-2 mr-2" >
									<FormGroup className="mr-3">
										<Input
											onChange={this.handleInputChange}
										/>
									</FormGroup>
									<button className="btn btn-primary">Tìm Kiếm</button>
								</div>
							</Form>


						</div> :
						<div className="text-center" >
							<div className="row	d-flex justify-content-center">{displayedImages}</div>
							<button className="btn btn-primary " onClick={this.postFB}>Chia sẻ lên Facebook</button>
						</div>
				}



			</div>

		);
	}
}