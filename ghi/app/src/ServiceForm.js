import React from 'react';

class ShoeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            manufactuer: '',
            modelName: '',
            color: '',
            pictureUrl: '',
            bins: []
        };
        this.handleBinChange = this.handleBinChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleManufactuerChange = this.handleManufactuerChange.bind(this);
        this.handleModelNameChange = this.handleModelNameChange.bind(this);
        this.handlePictureURLChange = this.handlePictureURLChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.picture_url = data.pictureUrl;
        data.model_name = data.modelName;
        delete data.pictureUrl
        delete data.modelName
        delete data.bins
        console.log(data)

        const shoeUrl = "http://localhost:8080/api/shoes/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
            const newShoe = await response.json();
            console.log(newShoe)

            const cleared = {
                manufactuer: '',
                modelName: '',
                color: '',
                pictureUrl: '',
                bins: [],
            };
            this.setState(cleared);
        }
    }

    handleManufactuerChange(event) {
        const value = event.target.value;
        this.setState({manufactuer: value})
    }

    handleModelNameChange(event) {
        const value = event.target.value;
        this.setState({modelName: value})
    }

    handleColorChange(event) {
        const value = event.target.value;
        this.setState({color: value})
    }

    handlePictureURLChange(event) {
        const value = event.target.value;
        this.setState({pictureUrl: value})
    }

    handleBinChange(event) {
        const value = event.target.value;
        this.setState({bin: value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/bins/';
    
        const response = await fetch(url);
    
        if (response.ok) {
          const data = await response.json();
          this.setState({ bins: data.bins })
          }
        }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new shoe</h1>
                    <form onSubmit={this.handleSubmit} id="create-location-form">
                    <div className="form-floating mb-3">
                        <input value={this.state.manufactuer} onChange={this.handleManufactuerChange} placeholder="Manufactuer" required type="text" name="manufactuer" id="manufactuer" className="form-control" />
                        <label htmlFor="manufactuer">Manufactuer</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={this.state.modelName} onChange={this.handleModelNameChange} placeholder="Model name" required type="text" name="model_name" id="model_name" className="form-control" />
                        <label htmlFor="model_name">Model name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={this.state.color} onChange={this.handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                        <label htmlFor="color">Color</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={this.state.pictureUrl} onChange={this.handlePictureURLChange} placeholder="Picture URL" required type="text" name="picture_url" id="picture_url" className="form-control" />
                        <label htmlFor="picture_url">Picture URL</label>
                    </div>
                    <div className="mb-3">
                        <select value={this.state.bin} onChange={this.handleBinChange} required name="bin" id="bin" className="form-select">
                        <option value="">Choose a bin</option>
                        {this.state.bins.map(bin => {
                            return (
                                <option key={bin.href} value={bin.href}>
                                    {bin.closet_name}
                                </option>
                            );
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

export default ShoeForm;