const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util")

//-------my code----
const writeFileAsync = util.promisify(fs.writeFile);
// const readFileAsync = util.promisify(fs.readFile);
//-------end of my code----


const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
//const RoleNotDefinedError = require("./exceptions/RoleNotDefinedError");


main();

//instead of while loop using a function based approach
function main() {
    let team = [];
    start()//.catch(err=>{throw err});
    async function start() {
        //await getInfo("asfasafsf")
        roles = ["Manager", "Engineer", "Intern", "Don't want to add anyone!"]
        const { role } = await askRole(roles);
        if (role != "Don't want to add anyone!") {
            team.push(await getInfo(role))
        } else {
            teamhtml = render(team)
            writeFileAsync(`./output/output.html`,teamhtml)
            return
        }
        return start()
    }
}

//functions -  calling inquirers based on the role 
async function getInfo(role) {
    //let team = []
    try {
        let name, id, email;
        switch (role) {
            case "Manager":
                ({ name, id, email } = await askEmployeeinfo());
                let { officenumber } = await askofficeNumber();
                return new Manager(name, id, email, officenumber);
            case "Engineer":
                ({ name, id, email } = await askEmployeeinfo());
                let { githubusername } = await askgithubUsername();
                return new Engineer(name, id, email, githubusername);
            case "Intern":
                ({ name, id, email } = await askEmployeeinfo());
                let { schoolname } = await getSchool();
                return new Intern(name, id, email, schoolname);
            default: throw new RoleNotDefinedError
        }
    }
    catch (err) {
        throw err;
    }
};

//inquirer function to ask for role
function askRole(roles) {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Whats role do you want to add to the team?',
            choices: roles
        },
    ]);
}

//inquirer function to ask for employee info
function askEmployeeinfo() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Name of employee?',

        },
        {
            type: 'input',
            name: 'id',
            message: 'ID of employee?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'email of employee?',
        },
    ]);
}

//inquirer function to ask for manager office number
function askofficeNumber() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'officenumber',
            message: 'Whats the office number?',
        },
    ]);
}

//inquirer function to ask for engineer github
function askgithubUsername() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'githubusername',
            message: 'Whats the githubUsername?',
        },
    ]);
}

//inquirer function to ask for intern school
function getSchool() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'school',
            message: 'What school did he/she go to?',
        },
    ]);
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
