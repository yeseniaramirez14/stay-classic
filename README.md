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

In my sales microservice. I wanted to start with the customer and the sales reps because these two components are the least reliant on the others becuase in order for any of these
sales to happen we need to have cars in the inventory which requires a make and a model and the car in the inventory which is a process but once those requiresments have been met then you can go and begin to create a sales record which is almost entirely reliant on the fact that these component exist. So you can input a car from the inventory, a sales rep, a customer, and input your own price for the car and it will be sold! This will be documented in the sales records. If you really wanted to observe your employees you can go to the targeted sales records page and check to see which of your sales reps have sold what without the hassle of looking through every single record. : )