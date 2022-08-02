import React from 'react';

class ManufacturerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            successfulSubmit: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        const newState = {}
        newState[event.target.id] = event.target.value;
        this.setState(newState)
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.successfulSubmit;
        console.log(data)

        const URL = "http://localhost:8100/api/manufacturers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(URL, fetchConfig);
        if (response.ok) {
            const newManufacturer = await response.json();
            console.log(newManufacturer)
            this.state.successfulSubmit = true;

            const cleared = {
                name: '',
            };
            this.setState(cleared);
        }
    }

    render() {
        let formClasses = '';
        let alertClasses = 'alert alert-success d-none mb-0'
  
        if (this.state.successfulSubmit) {
          formClasses='d-none';
          alertClasses='alert alert-success mb-0'
        }

        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a New Manufacturer</h1>
                        <form onSubmit={this.handleSubmit} id="create-manufacturer-form" className={formClasses}>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleChange} value={this.state.name} placeholder="Name" required type="text" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                        </form>
                        <div className={alertClasses} id="success-message">
                        You have created a new manufacturer. 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManufacturerForm;