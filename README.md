Сlick to watch lending page.Unfortunately you can't do POST request in GitHub https://ihor-novakovskyi.github.io/Food-Project/
I didn't have goals to make this project adaptive to devices.
This project was created using native JavaScript code, the fetch function, browser APIs,localStorage APIs and the Webpack builder. Through this code, I gained a deep understanding 
of the power of JavaScript when working within the V8 engine and how it can be utilized within a browser environment. It has also allowed me to better comprehend 
the React library and how JavaScript can be employed to interact with the DOM API.
To test the project yourself, follow these steps:

Click the "Code" button and copy the project's URL.
Open your preferred IDE and enter the following command in the console: "git clone" followed by the copied URL. Press Enter to clone the project onto your local machine.
Once the project is downloaded, navigate to its directory and run the command "npm i" in the console to install dependencies.
After the dependencies are installed, run the command "npx json-server db.json" in the console to start the simulated server API.
Open a new console and run the command "npm run build" to build the project using Webpack.
Once the build process is complete, you can make changes in the "js" folder, and Webpack will watch for those changes.
Next, you can use the Live Server extension in Visual Studio Code or Open Server app to launch the project in your browser. Please note that the "server.php" 
file may require some modifications as it currently does not properly save POST requests on the server side.
Also you will need to fix url adress in project if you use OpenServer or other app.
By following these steps, you will be able to load and test the "Food_Project" on your computer.
