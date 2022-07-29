import React from "react";

class EditService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // vin: '',
      // customer: '',
      // dateTime: '',
      technicians: [],
      technician: "",
      // reason: '',
      successfulSubmit: false,
      services: [],
      service: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateService = this.updateService.bind(this);
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  async componentDidMount() {
    const technicianUrl = "http://localhost:8080/api/technicians/";
    const servicesUrl = "http://localhost:8080/api/services/";

    const technicianResponse = await fetch(technicianUrl);
    const servicesResponse = await fetch(servicesUrl);

    if (technicianResponse.ok && servicesResponse.ok) {
      const technicianData = await technicianResponse.json();
      const servicesData = await servicesResponse.json();

      this.setState({
        technicians: technicianData.technicians,
        services: servicesData.services,
      });
    }
  }

  async updateService(event, service_id){
    event.preventDefault();
    const data = this.state.technician
    console.log("helllooooo", service_id)
    console.log("data okay", data)
    const putURL = `http://localhost:8080/api/services/${service_id}/`;
    const fetchConfig = {
        method: "put",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };

    const response = await fetch(putURL, fetchConfig);
    if (response.ok) {
        console.log(response)
    }
};

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    // data.date_time = data.dateTime
    // delete data.dateTime
    delete data.technicians;
    delete data.successfulSubmit;
    console.log(data);

    const serviceURL = `http://localhost:8080/api/services/`;
    // const serviceURL = `http://localhost:8080/api/services`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(serviceURL, fetchConfig);
    if (response.ok) {
      const newService = await response.json();
      console.log(newService);
      this.state.successfulSubmit = true;

      const cleared = {
        // vin: '',
        // customer: '',
        // dateTime: '',
        technician: "",
        // reason: '',
      };
      this.setState(cleared);
    }
  }

  render() {
    let formClasses = "";
    let alertClasses = "alert alert-success d-none mb-0";

    if (this.state.successfulSubmit) {
      formClasses = "d-none";
      alertClasses = "alert alert-success mb-0";
    }
    return (
      <div className="row">
        <div className="mb-3">
          <h1>Choose a service to edit</h1>
          <select
            onChange={this.handleChange}
            value={this.state.service.customer}
            required
            name="service"
            id="service"
            className="form-select"
          >
            <option value="">Choose a service</option>
            {this.state.services.map((service) => {
              return (
                <>
                  <option key={service.id} value={service.id}>
                    {service.reason} for {service.customer} by{" "}
                    {service.technician.name}
                  </option>
                </>
              );
            })}
          </select>
        </div>
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Edit a New Service Appointment</h1>
            <form id="create-service-form" className={formClasses}>
              <div className="mb-3">
                <select
                  onChange={this.handleChange}
                  value={this.state.technician}
                  required
                  className="form-select"
                  id="technician"
                >
                  <option value="">Choose a technician</option>
                  {this.state.technicians.map((technician) => {
                    return (
                      <option
                        key={technician.id}
                        value={technician.id}
                      >
                        {technician.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* {console.log("weird", this.state.technician)} */}
              <button onClick={this.updateService} className="btn btn-primary">Update</button>
            </form>
            <div className={alertClasses} id="success-message">
              You have updated the service appointment.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditService;
