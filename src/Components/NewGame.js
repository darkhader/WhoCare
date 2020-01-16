import React, { Component, useState } from 'react';
import { Form, FormGroup, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Gallery from 'react-grid-gallery';
import axios from "../axios";
import { ROOT_API } from '../statics';
export default class NewGame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			litRuou: '',
			nongDo: '',
			canNang: '',
			gioiTinh: 0.7,
			modal: false,
			rows: [],
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderScoreRow = this.renderScoreRow.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleModal = this.handleModal.bind(this);


	}
	componentDidMount() {
		const userData = {
			facebook_alias: "danghailochp",
			facebook_id: null,
			deep_level: "fast"
		}
		axios.post(`${ROOT_API}/api/testRoute`,userData).then(response => {
			if (response) {

				console.log("response ", response);


			}

		}).catch(error => {

			console.log(error)


		});
	}
	handleSubmit = (event) => {

		event.preventDefault();
		const { litRuou, nongDo, canNang, gioiTinh } = this.state;
		if (this.state.rows.length > 0) {
			this.state.rows.length = 0;
		}

		const n = litRuou * nongDo;
		const m = canNang * gioiTinh;
		const t = n / m;
		let row = this.state.rows;
		for (let i = 0; i < 48; i++) {

			row[i] = Math.round(0.79 * 1056 * t - 15 * i);
			if (row[i] < 0) {
				row[i] = 0;
			}


			row.push(row[i])




		}

		this.setState({ rows: row });


	}
	renderScoreRow = (scores) => {

		return scores.map((score, index) => {

			return (

				scores[index] > 0 ? <tr key={index}>
					<td> {index} giờ</td>
					<td>{scores[index]}mg/100ml
					</td>
					{scores[index] <= 50 ? <td>Mức 1
					</td> : scores[index] > 50 && scores[index] < 80 ? <td>Mức 2
					</td> : scores[index] > 80 ? <td>Mức 3
					</td> : ""}

				</tr> :
					""


			)



		})
	}

	handleInputChange(event) {

		this.setState({ [event.target.name]: event.target.value });
	}
	handleSelectChange(event) {
		this.setState({ gioiTinh: event.target.value });
	}
	handleModal(event) {

		this.setState({ modal: !this.state.modal });

	}

	render() {
		const IMAGES =
			[{
				src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
				thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
				thumbnailWidth: 320,
				thumbnailHeight: 174,
				isSelected: true,
				caption: "After Rain (Jeshu John - designerspics.com)"
			},
			{
				src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
				thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
				thumbnailWidth: 320,
				thumbnailHeight: 212,
				tags: [{ value: "Ocean", title: "Ocean" }, { value: "People", title: "People" }],
				caption: "Boats (Jeshu John - designerspics.com)"
			},

			{
				src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
				thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
				thumbnailWidth: 320,
				thumbnailHeight: 212
			}]
		const scores = this.state.rows ? this.state.rows : "";
		let index = scores.includes(NaN) ? "0" : scores.indexOf(0);

		return (
			<div className="container">
				<Gallery images={IMAGES} />

			</div>
		);
	}
}