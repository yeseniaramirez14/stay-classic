import React from 'react';

class TechniciansList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            technicians: []
        };
    };

    async componentDidMount() {
        const url = "http://localhost:8080/api/technicians/";
        const response = await fetch(url);
        console.log(response)

        if (response.ok) {
            const data = await response.json();
            console.log(data)

            this.setState({ technicians: data.technicians})
        }
    }

    render() {
        return (
            <div>
                <h1>Technicians List</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Employee number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.technicians.map(technician => {
                            console.log(technician)
                            return (
                                <tr key={technician.employee_number}>
                                    <td>{technician.name}</td>
                                    <td>{technician.employee_number}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

}
export default TechniciansList;