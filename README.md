# Steps to Install the Project

## Install Dependencies
Run the following command to install all required dependencies:

`npm install`

## Configure Environment Variables
- Duplicate the .env.example file in the root directory.

- Rename the duplicate file to .env
 
- You can use the following command in the terminal:

`cp .env.example .env`

- Open the .env file in your editor and update the placeholder values with your API configuration.

Example: 

`VITE_WEGLOT_API_KEY=your_actual_api_key_here`

`VITE_BACKEND_API_URL=https://your-backend-url.com`

# Start the Development Server
Run the development server to see the project in action:

`npm run dev`

The application will be available at http://localhost:5173 by default.

# Build for Production
To create a production-ready build of the project:

`npm run build`

This will generate the build files in the `dist` folder

⚠️ **Warning:**  You need to follow the `Steps to Install the Project` in order to build for production