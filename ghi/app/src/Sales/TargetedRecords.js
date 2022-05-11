import React from 'react';
import { ReactFragment } from 'react';

class TargetedRecords extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            targetedRecords: []
        };
    };

    async componentDidMount() {
        const url = "http://localhost:8090/api/salesrecords/";
        const response = await fetch(url);
        console.log(`this is the response: ${response}`)
        console.log(response)

        if (response.ok) {
            const data = await response.json();
            console.log(data)

            

            this.setState({sales_records: data.salesrecord})
            
        }
    }

    render() {
        return (
            <div>
                <h1>Automobiles List</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Manufacturer</th>
                            <th>Model</th>
                            <th>Color</th>
                            <th>Year</th>
                            <th>VIN</th>
                            <th>Photo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.automobiles.map(automobile => {
                            return (
                                <tr key={automobile.id}>
                                    <td>{automobile.model.manufacturer.name}</td>
                                    <td>{automobile.model.name}</td>
                                    <td>{automobile.color}</td>
                                    <td>{automobile.year}</td>
                                    <td>{automobile.vin}</td>
                                    <td><img src={ automobile.model.picture_url } alt="car picture" width="10%" height="10%" /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

}
export default TargetedRecords;