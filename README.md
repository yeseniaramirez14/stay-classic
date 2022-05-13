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

The service microservice will have 3 models: Technician, Service and AutomobileVO. 

    1. Technician
        - The Technician model will allow an employee to create a technician with a name and employee number. The employee has to be unique. 
    2. AutomobileVO
        - The AutomobileVO model will poll data from the Inventory microservice so the Service microservice has access to the automobile's VINs. 
    3. Service
        - The Service model will allow an employee to create a service appointment. To create a service appointment, you need the car's VIN, customer name, date and time, technician completing the service, and the reason for the appointment. 
        - The Service model also has two additional properties: is_vip and is_finished
            - is_vip is how I am able to track if an automobile was in our inventory and now sold okay

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

Inside of the sales microservice i have 4 models my AutomobileVO so i can poll for the VIN numbers for the cars in my inventory and thus making this entire thing function. Creation of a customer and a sales rep is mandatory as well but are things that can stand alone so not much to worry about there. Now the sales records are where the fun begins. The sales records only stand alone piece of information is the fact that you set the price. The rest of it is using data provided from you sales rep list, you customer list, and the Automobile vin numbers we polled in the beginning. Then and only then can you create a proper sales record. We also included a targeted sales record list so that way you can check the sales records of specific employees without having to read every sales record. Creation posts our data we have ways to get it with the use of the lists and if you need to delete something we included our models in the admin section.