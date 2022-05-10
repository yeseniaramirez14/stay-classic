import React from 'react';

class ServicesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            services: []
        };
    };

    async componentDidMount() {
        const url = "http://localhost:8080/api/services/";
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ services: data.services})
        }
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Manufactuer</th>
                        <th>Model</th>
                        <th>Color</th>
                        <th>Picture</th>
                        <th>Bin</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.services.map(service => {
                        return (
                            <td>
                                {service.customer}
                            </td>
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


export default ServicesList;