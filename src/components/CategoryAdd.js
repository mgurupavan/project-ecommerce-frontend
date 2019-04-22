import React, { Component } from "react";
import axios from "../config/config";
import CategoryForm from "./CategoriesForm";

class NewCategory extends Component {
	handleSubmit = formData => {
		axios
			.post("/categories", formData)
			.then(response => {
				this.props.history.push("/categories");
			})
			.catch(err => {
				console.log(err);
			});
	};
	render() {
		return (
			<div>
				<CategoryForm handleSubmit={this.handleSubmit} />
			</div>
		);
	}
}

export default NewCategory;
