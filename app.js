const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = []

const intern = () => {
  inquirer.prompt ([
    {
      type: 'input',
      name: 'name',
      message: 'Enter name:'
    },
    {
      type: 'input',
      name: 'id',
      message: 'Enter id:'
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter email:'
    },
    {
      type: 'input',
      name: 'school',
      message: 'Enter school:'
    }
  ])
    .then(res => {
      employees.push(new Intern(res.name, res.id, res.email, res.school))
      addAnother()
    })
    .catch(err => {console.log(err) })
}

const engineer = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter name:'
    },
    {
      type: 'input',
      name: 'id',
      message: 'Enter id:'
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter email:'
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter github username:'
    }
  ])
    .then(res => {
      employees.push(new Engineer(res.name, res.id, res.email, res.github))
      addAnother()
    })
    .catch(err => { console.log(err) })
}

const manager = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter name:'
    },
    {
      type: 'input',
      name: 'id',
      message: 'Enter id:'
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter email:'
    },
    {
      type: 'input',
      name: 'office',
      message: 'Enter office number:'
    }
  ])
    .then(res => {
      employees.push(new Manager(res.name, res.id, res.email, res.school))
      addAnother()
    })
    .catch(err => { console.log(err) })
}

const addAnother = () => {
  inquirer.prompt ([
    {
      type: 'list',
      name: 'another',
      message: 'Create another?',
      choices: ['Yes', 'No']
    }
  ])
    .then ( ({another}) => {
      if(another === "Yes") {
        selectRole()
      } else {
          fs.writeFile(outputPath, render(employees), err => {
            if (err) { console.log(err) }
          })
      }
    })
}

const selectRole = () => {
  inquirer.prompt ([
    {
      type: 'list',
      name: 'role',
      message: 'Select an employee type:',
      choices: ['Intern', 'Engineer', 'Manager']
    }
  ])
    .then (({role}) => {
      if(role === 'Intern') {
        intern()
      }
      if(role === 'Engineer') {
        engineer()
        }
      if(role === 'Manager') {
        manager()
      }
    })
    .catch (err => { console.log(err) })
}

selectRole()



// const employees = [new Intern('John Doe', 1, 'johndoe@email.com', 'USC'), new Intern('Jane Doe', 2, 'janedoe@email.com', 'UCLA'), new Engineer('Jack Doe', 1, 'jackdoe@email.com', 'jackdoe123'), new Manager('James Doe', 1, 'jamesdoe@email.com', 10)]

// fs.writeFile(outputPath, render(employees), err => {
//   if(err) { console.log(err) } 
// })

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
// for the provided `render` function to work! ```
