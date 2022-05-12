import React from 'react';

class VehicleModelForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            manufacturers: [],
            photo: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        const newState = {}
        newState[event.target.id] = event.target.value;
        this.setState(newState)
    }


    async componentDidMount() {
        const url = "http://localhost:8100/api/manufacturers/";
    
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          this.setState({ manufacturers: data.manufacturers })
          }
        }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.picture_url = data.photo
        data.manufacturer_id = data.manufacturer
        delete data.photo
        delete data.manufacturer
        delete data.manufacturers
        console.log(data)

        const URL = "http://localhost:8100/api/models/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(URL, fetchConfig);
        if (response.ok) {
            const newModel = await response.json();
            console.log(newModel)

            const cleared = {
                name: '',
                manufacturers: [],
                photo: '',
            };
            this.setState(cleared);
        }
    }

    render() {
        return (
            <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                  <h1>Create a New Vehicle Model</h1>
                  <form onSubmit={this.handleSubmit} id="create-model-form">
                    <div className="form-floating mb-3">
                      <input onChange={this.handleChange} value={this.state.name} placeholder="Name" required type="text" id="name" className="form-control" />
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className="mb-3">
                      <select onChange={this.handleChange} value={this.state.manufacturer} required className="form-select" id="manufacturer">
                        <option value="">Choose a manufacturer</option>
                        {this.state.manufacturers.map(manufacturer => {
                          return (
                            <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={this.handleChange} value={this.state.photo} placeholder="Photo" type="text" id="photo" className="form-control" />
                      <label htmlFor="photo">Picture URL</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                  </form>
                </div>
              </div>
            </div>
        );
    }
}

export default VehicleModelForm;