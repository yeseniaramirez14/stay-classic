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

    async deleteService(technician_id){
        const deleteUrl = `http://localhost:8080/api/technicians/${technician_id}/`;
        const fetchConfig = {method: "delete"}        

        const response = await fetch(deleteUrl, fetchConfig);
        if (response.ok) {
            console.log(response)
            window.location.reload();
        }
    };

    render() {
        return (
            <div>
                <h1>Technicians List</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Employee number</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.technicians.map(technician => {
                            return (
                                <tr key={technician.employee_number}>
                                    <td>{technician.name}</td>
                                    <td>{technician.employee_number}</td>
                                    <td> 
                                        <button onClick={() => this.deleteService(technician.id)} type="button" className='btn btn-danger'>Delete</button>
                                    </td>
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