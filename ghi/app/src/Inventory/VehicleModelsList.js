import React from 'react';

class VehicleModelsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            models: []
        };
    };


    async componentDidMount() {
        const url = "http://localhost:8100/api/models/";
        const response = await fetch(url);
        console.log(response)

        if (response.ok) {
            const data = await response.json();
            console.log(data)

            this.setState({ models: data.models})
        }
    }


    render() {
        return (
            <div>
                <h1>Vehicle Models List</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Manufacturer</th>
                            <th>Photo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.models.map(model => {
                            return (
                                <tr key={model.id}>
                                    <td>{model.name}</td>
                                    <td>{model.manufacturer.name}</td>
                                    <td><img src={ model.picture_url } alt="car" height="110" /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

}
export default VehicleModelsList;