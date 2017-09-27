# Weather By Zip
Thank you for your time and consideration! 

# How to Build & Run
## Requisite Software
1. Git must be installed to be able to clone from a github repo. Git can be downloaded [here](https://git-scm.com).
2. If you do not already have NodeJS installed on your local machine, install the LTS version from [https://nodejs.org](https://nodejs.org) following the instructions appropriate for your operating system. Once installed, you should be able to open a terminal (or "command prompt" if using Windows) and type in `node`. If you do not get an error, then try a command like `console.log('Hello World!')` to verify proper functionality. If node is working, proceed to the next step.

## App Installation
3. In your terminal, navigate to the directory in which you would like to download
   the application.
4. Enter `git clone https://github.com/cmatzenbach/weather-by-zip`
5. Enter `cd weather-by-zip/` to navgate to the project root.
6. If you are running MacOS or Linux, you can simply run `./install.sh` to run
   the custom installation script. It will download all of the dependencies and
   setup the app. It will take around 5 minutes to complete. Then proceed to step 8.
7. If you are on Windows, or the script will not execute for whatever reason,
   installing the application is still simple! Enter `npm install` to install
   all of the back-end dependencies. Once this is complete, enter `cd client` to
   move into the client directory, where you will need to again run `npm
   install`. This will install all of the front-end (react) dependencies. Once
   this is complete, enter `cd ../` to move back into the project root, and
   proceed to step 8.
8. A `.env` file has been included in the email with the project submission. This file
    contains the API keys necessary for the application to run - please copy and
    paste this file into the project root (current directory). NOTE: Windows
    often has problems with so-called dotfiles. You will likely need to rename
    the `.env` file `.env.` and place that in the project root. If you still
    have issues, create a new .txt file in the project root, paste the contents
    of the `.env` file inside, save it, and from windows explorer rename it to `.env.`.

## Program Execution
9. Run the program by typing `npm start` (be sure you are in the project root).
    This will generate messages in the terminal about the front and back-end
    servers, and should automatically open a web browser to the address
    `http://localhost:3000`. If the app starts in the console but does not open
    a browser, please open the browser of your choice and paste in that URL. You will now see the app in your browser! 
10. Enter Ctrl + C while in your terminal to terminate the program.
