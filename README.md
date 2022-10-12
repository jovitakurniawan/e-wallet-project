
# Moolah E-Wallet 💰

## Background

![Moolah App](https://i.postimg.cc/13RrgRRm/Screenshot-2022-10-13-at-3-40-13-AM.png)

In NUS Fintech Programme, we learned fundamentals of product management and software development. 
As part of the course task, we are divided into groups of 5-7 to build an app in 2 weeks.

Our team decided to build an e-wallet web app called Moolah to let user to top-up, withdraw and transfer money online.


## Objective 

- To build an end-to-end working prototype for fintech application


## Business Requirements 

### 1. User Stories 

- Allow user to register and login on e-wallet 
- Allow user to top-up balance e-wallet 
- Allow user to withdraw balance from e-wallet
- Allow user to make transfer to existing user
- Allow user to view history of all past transactions

Detailed user stories can be found in this [link](https://docs.google.com/document/d/1KxPCGJi58hU98_3guJVuSNArtr_Hu6CR_EHCpL53ipg/edit?usp=sharing)


### 2. User Interaction 

![User Interaction](https://i.postimg.cc/RCf9W4qn/Screenshot-2022-10-13-at-3-20-04-AM.png)

Detailed user interactions can be found in this Figma [link](https://www.figma.com/file/Lww8yhq9jmNTqRpj1qfS44/Demo-(Moolah-App)?node-id=21%3A2)

## Technical Requirements 


### 1. Database Design 

Moolah app consists of 1 database and 5 tables: 
- tb_user: to store user information (phone number, email, etc.)
- tb_transfer: to store transfer transaction (recipient name, id, transfer amount, etc.)
- tb_withdraw: to store withdraw transaction (withdraw amount, date, etc.)
- tb_topup: to store topup transaction (topup amount, date, etc.)
- tb_balance: to store and update user wallet balance (balance amount, updated date, etc.)

Below is the database ERD (Entity Relationship Diagram) Diagram: 

![ERD](https://i.postimg.cc/ZnZTTM8Q/Screenshot-2022-10-13-at-3-29-59-AM.png)


### 2. API Design 

There are a total of 11 API endpoints created for the backend: 
- GET user all user detail 
- GET user by user id
- POST new user 
- DELETE user by user id
- GET user balance by user id
- GET topup history by user id
- POST new top up transaction 
- GET withdraw history by user id
- POST withdraw history b user id
- GET transfer history by user id
- POST transfer history 

Details of the API Design can be found in this [link](https://docs.google.com/spreadsheets/d/1oWjlTAY2y6I4pY0oJVCZh4_trMPKga6Wp2hyYrWKUTU/edit?usp=sharing) 

### 3. Front End Design 

There are a total of 7 pages to be created for the front end: 
- Login page
- Register page 
- Home page
- Top up page
- Withdraw page 
- Transfer page 
- History page 

Wireframe for front end design can be viewed in this [link](https://www.figma.com/file/Lww8yhq9jmNTqRpj1qfS44/Demo-(Moolah-App)?node-id=21%3A2)


## Stack 

### Front End 
- HTML/CSS/EJS

### Back End 
- Node.Js, Express, MySQL

## Future Enhancements 
- Currently the app can only be run on local host. We can consider hosting the app online to make it more easily accessible. 
- Enhance user experience of the app design. 
- Use react components to make the code more reusable. 

## Author 

© 2022 by Jovita Kurniawan 
