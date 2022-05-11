import React from 'react';

class SalesRecordForm extends React.Component {
  constructor(props) {        
      super(props);        
      this.state = {            
          automobile: '',
          salesRep: '',
          customer: '', 
          price: '',
          salesReps: [],
          autos: [],
          customers: [],           
      }

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }


    async componentDidMount() {
      const salesUrl = "http://localhost:8090/api/salesreps/";
      const customerUrl = "http://localhost:8090/api/customers/";
      const autoUrl = "http://localhost:8100/api/automobiles/";


        const salesResponse = await fetch(salesUrl);
        const customerResponse = await fetch(customerUrl);
        const autoResponse = await fetch(autoUrl);

        if (autoResponse.ok && customerResponse.ok && autoResponse.ok) {
            const saleData = await salesResponse.json();
            const customerData = await customerResponse.json();
            const autoData = await autoResponse.json();
            this.setState({ 
                salesReps: saleData.salesreps,
                customers: customerData.customers,
                autos: autoData.autos
             })
        }
    }  


        async handleSubmit(event) {
          event.preventDefault();
          const data = {...this.state};
          data.sales_rep = data.salesRep;        
          delete data.salesReps;
          delete data.salesRep;
          delete data.customers;               
          delete data.autos;               
          console.log(data)
      
          const salesRecordsUrl = 'http://localhost:8090/api/sales/';
          const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(salesRecordsUrl, fetchConfig);
          if (response.ok) {
            const newName = await response.json();
            console.log(newName)          
            const cleared = {
              salesRep: '',
              automobile: '',
              customer: '',
              price: '',
            }
            this.setState(cleared);
          }
        }
  
      handleChange(event) {
          const newState = {};
          newState[event.target.id] = event.target.value;
          this.setState(newState);
      }
  

    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new Sale Record</h1>
                <form onSubmit={this.handleSubmit} id="create-salesrecord-form">
                <div className="mb-3">
                        <select onChange={this.handleChange} value={this.state.automobile} required name="automobile" id="automobile" className="form-select">
                          <option value="">Choose an automobile</option>
                          {this.state.autos.map(auto => {
                            return (
                              <option key={auto.href} value={auto.vin}>
                                  {auto.year} {auto.color} {auto.model.manufacturer.name} {auto.model.name}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                <div className="mb-3">
                        <select onChange={this.handleChange} value={this.state.salesReps} required name="salesRep" id="salesRep" className="form-select">
                          <option value="">Choose a sales rep</option>
                          {this.state.salesReps.map(salesrep => {
                            return (
                              <option key={salesrep.name} value={salesrep.name}>{salesrep.name}</option>
                            )
                          })}
                        </select>
                      </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleChange} value={this.state.price} placeholder="price" type="text" id="price" className="form-control" />
                    <label htmlFor="price">Price</label>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

export default SalesRecordForm;