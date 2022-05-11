import React from 'react';

class SalesRepList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sales_reps: []
        };
    };

    async componentDidMount() {
        const url = "http://localhost:8090/api/salesreps/";
        const response = await fetch(url);
        console.log(response)

        if (response.ok) {
            const data = await response.json();
            console.log(data)

            this.setState({ sales_reps: data.sales_reps})
        }
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Employee number</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.sales_reps.map(sales_rep => {
                        console.log(sales_rep)
                        return (
                            <tr key={sales_rep.employee_number}>
                                <td>{sales_rep.name}</td>
                                <td>{sales_rep.employee_number}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }

}
export default SalesRepList;