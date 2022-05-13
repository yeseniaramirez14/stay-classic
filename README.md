# CarCar

Team:

* Yesenia Ramirez - Service
* Corey Edwards - Sales Microservice

## Design
In our design there are three bounded contexts: Inventory, Service and Sales.
    1. Inventory
        - Manufacturer
            -Name 
        - Vehicle Model
            -Name
            -Photo
            -Manufacturer 
        - Automobile 
            -Color
            -Year
            -VIN
            -Model
    2. Sales
        - Sales Rep
            -Name
            -Employee number
        - Customer 
            -Name
            -Address
            -Phone number
        - AutomobileVO
            -VIN
            -Import href
        - Sales Record
            -Automobile
            -Sales Rep
            -Customer
            -Price
    3. Service
        - Technician
            -Name
            -Employee number
        - AutomobileVO
            -VIN
        - Service
            -VIN
            -Customer
            -Date and time
            -Technician
            -Reason
            -VIP status
            -Completion status

These three bounded contexts are connected with the Automobile model in the Inventory microservice. Both sales and service needed to poll data from Automobile to use in their own microservice. 


## Service microservice

I will install the service app into the inventory microservice and
make my models and views to show the list of my model. I will write 
the paths to my views and check my work on Insomnia. I will add to 
my view function to handle POST requests. That will complete my
back end. Then I will begin on the front-end by polling for the 
automobiles for the vin. Then I will begin creating my React files 
and building my React components to fetch and show the lists and 
complete the forms. I will implement the delete request for the 
cancel button and d-none for my finished projects. Then I will
work on the search bar for the service history. 

## Sales microservice

My plan is to create the sales micro service to work in conjunction with the inverntory microservice make my models and views to show the list of my model. I will write the paths to my views and check my work on Insomnia. I will add to my view function to handle POST, PULL, GET, and DELETE requests. I will poll the car data to complete my requests and to finish it off I will create a React webpage for my microservice to function on.
