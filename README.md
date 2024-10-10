# React Sales Entry

## Overview

This project is a **Single Page Application (SPA)** for managing sales entries using **React** and **Redux**. The application allows users to enter header information and multiple detail rows for sales transactions. It integrates with RESTful APIs to fetch and submit data, providing a complete sales management solution.

## Features

- **Header Section**: Collects necessary fields for each sales entry, including account name, and status (Active/Inactive). 
- **Detail Section**: 
  - Allows dynamic addition and removal of item rows.
  - Validates input data for items, quantities, and prices.
  - Displays the total amount based on the detail entries.
- **Data Handling**: 
  - Fetches item data from an external API.
  - Submits header and detail information to the backend for storage.
- **User Notifications**: Provides real-time feedback to users through toast notifications for errors and success.
- **Print Functionality**: Allows users to generate and print a printable version of the sales voucher using **print-react-component**.

## Technologies Used

- **Frontend**: 
  - React
  - Redux (for state management)
  - Tailwind CSS (for styling)
  - Axios (for API requests)
  - React-to-print (for printing functionality)
  - React Toastify (for notifications)
  - React Icons (for icons)

## Installation and Setup

To get this project running locally, follow these steps:

### Prerequisites
- **Node.js**: Make sure you have [Node.js](https://nodejs.org/) installed (version >= 14.x).
- **npm or yarn**: This project uses npm, but you can use yarn if preferred.

### Steps to Install:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/vijeshkr/React-Sales-Entry
    ```
   
2. **Navigate to the Project Directory**:
    ```bash
    cd <project_folder>
    ```

3. **Install Dependencies**:
    Install all the necessary packages by running:
    ```bash
    npm install
    ```
    or if you're using yarn:
    ```bash
    yarn install
    ```

4. **Set Up the API**:
    Make sure the API is running and properly configured. This app expects APIs for **header_table**, **detail_table**, and **item_master** to be accessible at `http://5.189.180.8:8010`.

5. **Start the Application**:
    Start the development server using the following command:
    ```bash
    npm run dev
    ```
    or
    ```bash
    npm start
    ```
    or for yarn:
    ```bash
    yarn start
    ```

6. **Open the App**:
    Once the development server starts, open your browser and go to `http://localhost:5173/`. You should see the application running.
