
# Bulk Mailer and User Managment

This project provides a RESTful API for managing lists and users, including creating lists, uploading users from CSV files, unsubscribing users, and sending emails to users on a list. The project is built using Node.js, Express, and MongoDB.

### Deployed Link: 
https://bulk-mailer-and-user-managment.onrender.com

## Features

- Create Lists: Create new lists with custom properties.
- Upload Users from CSV: Add users to a list by uploading a CSV file.
- Unsubscribe Users: Unsubscribe users from a list.
- Send Emails: Send personalized emails to users on a list.

## API Endpoints

### List Endpoints

- **Create List**
  - **URL**: `/api/v1/list/createList`
  - **Method**: `POST`
  - **Description**: Create a new list with custom properties.
  - **Request Body**:
    ```json
    {
      "title": "Sample List",
      "customProperties": [
        {
          "title": "Property1",
          "defaultValue": "Default1"
        },
        {
          "title": "Property2",
          "defaultValue": "Default2"
        }
      ]
    }
    ```
  ![Screenshot 2024-05-19 114126](https://github.com/AdityaKrSingh26/Bulk-Mailer-and-User-Managment/assets/128071145/aab25ab1-d0c6-445d-928e-6a0a2cee8501)
  

### User Endpoints

- **Add Users from CSV**
  - **URL**: `/api/v1/user/adduser/:listId`
  - **Method**: `POST`
  - **Description**: Add users to a list by uploading a CSV file.
  - **Request Params**: `listId` - ID of the list to add users to.
  - **Form Data**: `file` - CSV file containing user data.
![Screenshot 2024-05-19 114511](https://github.com/AdityaKrSingh26/Bulk-Mailer-and-User-Managment/assets/128071145/8b52c1b4-1f1c-451c-ae96-43852ad81c6c)


- **Unsubscribe User**
  - **URL**: `/api/v1/user/unsubscribe/:listId/:userId`
  - **Method**: `get`
  - **Description**: Unsubscribe a user from a list.
  - **Request Params**: 
    - `listId` - ID of the list.
    - `userId` - ID of the user to unsubscribe.

- **Send Emails to List**
  - **URL**: `/api/v1/user/sendemail/:listId`
  - **Method**: `POST`
  - **Description**: Send personalized emails to users on a list.
  - **Request Params**: `listId` - ID of the list.
  - **Request Body**:
    ```json
    {
      "subject": "Your Subject Here",
      "body": "Hello [name], your custom property is [Property1]."
    }
    ```
![Screenshot 2024-05-19 115057](https://github.com/AdityaKrSingh26/Bulk-Mailer-and-User-Managment/assets/128071145/37878ef8-8cf3-4751-bc9f-852be7a2e2ff)


## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing lists and users.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **Multer**: Middleware for handling `multipart/form-data` for file uploads.
- **csv-parser**: Stream-based CSV parsing for Node.js.



## Example CSV File for Upload

Your CSV file should have the following structure:

```csv
name,email,Property1,Property2
John Doe,john@example.com,Value1,Value2
Jane Smith,jane@example.com,Value3,Value4
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` : 8000

`MONGODB_URL` :

`SMTP_PORT` : (465 for gmail)

`SMTP_USER` : (email id of sender)

`SMTP_PASS` : (app password of sender)

`MAIL_SERVICE` : (gmail)
 
`PRODUCTION_URL` : (https://bulk-mailer-and-user-managment.onrender.com)


## Run Locally

Clone the project

```bash
  https://github.com/AdityaKrSingh26/Bulk-Mailer-and-User-Managment
```

- Go to the project directory

```bash
  cd Bulk-Mailer-and-User-Managment
```

- Install dependencies

```bash
  npm install
```

- Create a .env File

- Start the server

```bash
  npm start
```

