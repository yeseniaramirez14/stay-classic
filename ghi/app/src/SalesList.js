import React from 'react';
// import { format } from 'date-fns';


function formatDate(date) {
    return date
}

class SalesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sales: []
        };
    };

    async componentDidMount() {
        const url = "http://localhost:8090/api/sales/";
        const response = await fetch(url);
        console.log(`this is the response: ${response}`)
        console.log(response)



        if (response.ok) {
            const data = await response.json();
            console.log(data)

            this.setState({ sales: data.sales})
        }
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Customer name</th>
                        <th>Date and Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.sales.map(sale => {
                        console.log(sale)
                        return (
                            <tr key={sale.vin}>
                                <td>{sale.vin}</td>
                                <td>{sale.customer}</td>
                                <td>{formatDate(sale.date_time)}</td>
                                <td>{sale.technician.name}</td>
                                <td>{sale.reason}</td>
                            </tr>
                        )
                    })}
                    {/* {props.shoes.map(shoe => {
                        return (
                            <tr key={shoe.id}>
                                <td>{ shoe.manufactuer }</td>
                                <td>{ shoe.model_name }</td>
                                <td>{ shoe.color }</td>
                                <td><img src={ shoe.picture_url } alt="shoe picture" width="10%" height="10%" /></td>
                                <td>{ shoe.bin }</td>
                                <td> <button onClick={() => deleteShoe(shoe.id)} type="button" className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        );
                    })} */}
                </tbody>
            </table>
        );
    }


}

// function ShoesList(props) {

//     async function deleteShoe(shoe_id){
//         const deleteUrl = `http://localhost:8080/api/shoes/${shoe_id}/`;
//         const fetchConfig = {method: "delete"}        

//         const response = await fetch(deleteUrl, fetchConfig);
//         if (response.ok) {
//             console.log(`we deleted it`, response)
//         }
//     };
//         return (
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>Manufactuer</th>
//                         <th>Model</th>
//                         <th>Color</th>
//                         <th>Picture</th>
//                         <th>Bin</th>
//                         <th>Delete</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {props.shoes.map(shoe => {
//                         return (
//                             <tr key={shoe.id}>
//                                 <td>{ shoe.manufactuer }</td>
//                                 <td>{ shoe.model_name }</td>
//                                 <td>{ shoe.color }</td>
//                                 <td><img src={ shoe.picture_url } alt="shoe picture" width="10%" height="10%" /></td>
//                                 <td>{ shoe.bin }</td>
//                                 <td> <button onClick={() => deleteShoe(shoe.id)} type="button" className='btn btn-danger'>Delete</button>
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//         );
// }


export default SalesList;