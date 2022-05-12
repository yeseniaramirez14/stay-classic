import React from 'react';

class TechnicianForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employeeNumber: '',
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
        data.employee_number = data.employeeNumber
        delete data.employeeNumber
        delete data.technicians
        console.log(data)

        const technicianURL = "http://localhost:8080/api/technicians/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(technicianURL, fetchConfig);
        if (response.ok) {
            const newService = await response.json();
            console.log(newService)

            const cleared = {
                name: '',
                employeeNumber: '',
            };
            this.setState(cleared);
        }
    }

    render() {
        return (
            <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                  <h1>Create a New Technician</h1>
                  <form onSubmit={this.handleSubmit} id="create-technician-form">
                    <div className="form-floating mb-3">
                      <input onChange={this.handleChange} value={this.state.name} placeholder="Name" required type="text" id="name" className="form-control" />
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={this.handleChange} value={this.state.employeeNumber} placeholder="Employee number" required type="text" id="employeeNumber" className="form-control" />
                      <label htmlFor="employeeNumber">Employee number</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                  </form>
                </div>
              </div>
            </div>
        );
    }
}

export default TechnicianForm;