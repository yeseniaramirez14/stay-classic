import React from 'react';

class AutomobileForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: '',
            year: '',
            vin: '',
            models: [],
            model: '',
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
        const url = "http://localhost:8100/api/models/";
    
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          this.setState({ models: data.models })
          }
        }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.model_id = data.model
        delete data.model
        delete data.models
        console.log(data)

        const URL = "http://localhost:8100/api/automobiles/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        
        const response = await fetch(URL, fetchConfig);
        if (response.ok) {
            const newAutomobile = await response.json();
            console.log(newAutomobile)

            const cleared = {
                color: '',
                year: '',
                vin: '',
                model: '',
            };
            this.setState(cleared);
        }
    }

    render() {
        return (
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a New Automobile</h1>
                <form onSubmit={this.handleSubmit} id="create-automobile-form">
                  <div className="form-floating mb-3">
                    <input onChange={this.handleChange} value={this.state.color} placeholder="Color" required type="text" id="color" className="form-control" />
                    <label htmlFor="color">Color</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleChange} value={this.state.year} placeholder="Year" required type="text" id="year" className="form-control" />
                    <label htmlFor="color">Year</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleChange} value={this.state.vin} placeholder="VIN" required type="text" id="vin" className="form-control" />
                    <label htmlFor="vin">VIN</label>
                  </div>
                  <div className="mb-3">
                    <select onChange={this.handleChange} value={this.state.model} required className="form-select" id="model">
                      <option value="">Choose an automobile model</option>
                      {this.state.models.map(model => {
                        return (
                          <option key={model.id} value={model.id}>{model.name}</option>
                        )
                      })}
                    </select>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

export default AutomobileForm;