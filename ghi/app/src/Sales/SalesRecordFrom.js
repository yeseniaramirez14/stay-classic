import React from 'react';

class SalesRecordForm extends React.Component {
  constructor(props) {        
      super(props);        
      this.state = {            
          price: '',
          salesReps: [],
          autos: [],
          customers: [],      
          successfulSubmit: false, 
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
                salesReps: saleData.salesrep,
                customers: customerData.customer,
                autos: autoData.autos
             })
        }
    }  


        async handleSubmit(event) {
          event.preventDefault();
          const data = {...this.state};
          data.sales_rep = data.salesRep; 
          delete data.salesReps     
          delete data.salesRep;
          delete data.customers;               
          delete data.autos; 
          delete data.successfulSubmit;              
          console.log(data)
      
          const salesRecordsUrl = 'http://localhost:8090/api/salesrecords/';
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
            this.state.successfulSubmit = true;
          
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
      let formClasses = '';
      let alertClasses = 'alert alert-success d-none mb-0'

      if (this.state.successfulSubmit) {
        formClasses='d-none';
        alertClasses='alert alert-success mb-0'
      }
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new Sale Record</h1>
                <form onSubmit={this.handleSubmit} id="create-salesrecord-form" className={formClasses}>
                <div className="mb-3">
                        <select onChange={this.handleChange} value={this.state.automobile} required name="automobile" id="automobile" className="form-select">
                          <option value="">Choose an automobile</option>
                          {this.state.autos.map(auto => {
                            console.log(this.state.autos)
                            return (
                              <option key={auto.href} value={auto.vin}>
                                  {auto.year} {auto.color} {auto.model.manufacturer.name} {auto.model.name}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                <div className="mb-3">
                        <select onChange={this.handleChange} value={this.state.salesRep} required name="salesRep" id="salesRep" className="form-select">
                          <option value="">Choose a sales rep</option>
                          {this.state.salesReps.map(salesrep => {
                            return (
                              <option key={salesrep.name} value={salesrep.name}>{salesrep.name}</option>
                            )
                          })}
                        </select>
                      </div>  
                <div className="mb-3">
                        <select onChange={this.handleChange} value={this.state.customer} required name="customer" id="customer" className="form-select">
                          <option value="">Choose a Customer</option>
                          {this.state.customers.map(customer => {
                            return (
                              <option key={customer.name} value={customer.name}>{customer.name}</option>
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
                <div className={alertClasses} id="success-message">
                  You have created a new sales record. 
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default SalesRecordForm;