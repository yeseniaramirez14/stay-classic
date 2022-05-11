import React from 'react';

class CustomerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: []
        };
    };

    async componentDidMount() {
        const url = "http://localhost:8090/api/customers/";
        const response = await fetch(url);
        console.log(response)

        if (response.ok) {
            const data = await response.json();
            console.log(data)

            this.setState({ customers: data.customers})
        }
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.customers.map(customer => {
                        console.log(customer)
                        return (
                            <tr>
                                <td>{customer.name}</td>
                                <td>{customer.address}</td>
                                <td>{customer.phone_number}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }

}
export default CustomerList;