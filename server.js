const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "R5201reta&",
    database: "blackCompany_db"
});

// function that allows for callback once a prompt is completed
function startup() {
inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'database_choice',
            choices: [
                `view all department`,
                `view all roles`,
                `view all employees`,
                `add a department`,
                `add a role`,
                `add an employee`,
                `update an employee role`,],
        },
    ])
    .then((answer) => {
        if (answer.database_choice === `view all department`) {
            db.query(`SELECT * FROM department`, (err, res) => {
                err ? console.error(err) : console.table(res)
                startup()
            })
        }
        else if (answer.database_choice === `view all roles`) {
            db.query(`SELECT * FROM roles`, (err, res) => {
                err ? console.error(err) : console.table(res)
                startup()
            })
        }
        else if (answer.database_choice === `view all employees`) {
            db.query(`SELECT * FROM employees`, (err, res) => {
                err ? console.error(err) : console.table(res)
                startup()
            })
        }
        else if (answer.database_choice === `add a department`) {
            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'what would you like to name the new department?',
                        name: 'new_department',
                    },

                ])
                .then((answers) => {
                    db.query(`INSERT INTO department (department_name) VALUES ("${answers.new_department}")`, (err, res) => {               
                        console.log(answers.new_department)
                        err ? console.error(err) : console.table(res)
                        startup()
                    })
                })
           
        }
        else if (answer.database_choice === `add a role`) {
            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'what would you like to name the new role?',
                        name: 'new_role',
                    },
                    {
                        type: 'input',
                        message: 'what department is this new role in?',
                        name: 'department',
                    },
                    {
                        type: 'input',
                        message: 'what is the salary for the new role?',
                        name: 'salary',
                    },

                ])
                .then((answers) => {
                    db.query(`INSERT INTO roles (job_title, department, salary) VALUES ("${answers.new_role}", "${answers.department}", "${answers.salary}")`, (err, res) => {
                        err ? console.error(err) : console.table(res)
                        startup()
                    })
                })
        }
        else if (answer.database_choice === `add an employee`) {
            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'what is the first name of the new employee?',
                        name: 'first_name',
                    },
                    {
                        type: 'input',
                        message: 'what is the last name of the new employee?',
                        name: 'last_name',
                    },
                    {
                        type: 'input',
                        message: 'what is the role/job title of the new employee?',
                        name: 'job_title',
                    },
                    {
                        type: 'input',
                        message: 'who is the manager of the new employee?',
                        name: 'manager',
                    },

                ])
                .then((answers) => {
                    db.query(`INSERT INTO employees (first_name, last_name, job_title, manager) VALUES ("${answers.first_name}", "${answers.last_name}", "${answers.job_title}", "${answers.manager}")`, (err, res) => { 
                        err ? console.error(err) : console.table(res)
                        startup()
                    })
                })
        }
        else if (answer.database_choice === `update an employee job title`) { }
        // prompting the first_name and last_name of employee
        // function that deletes the current job
        // function that ask what their new job should be and INSERTS it
    })
}
startup()
