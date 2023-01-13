const inquirer = require('inquirer');
const mysql = require('mysql');
const express = require(`express`)
const cTable = require('console.table')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "R5201reta&",
    database: "blackCompany_db"
});

console.log(db.database.department)

// make a function so you can call your way back to the beginning
inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'database_choice',
            choices: [
                `view all departments`,
                `view all roles`,
                `view all employees`,
                `add a department`,
                `add a role`,
                `add an employee`,
                `update an employee role`,],
        },
    ])
    .then((answer) => {
        console.log(answer)
        if (answer.database_choice === `view all departments`) {
            db.query(`SELECT * FROM department`, function (err, res) {
                console.log(`here`)
                err ? console.error(err) : console.table(res)
            })
        }
        else if (answer.database_choice === `view all roles`) {
            db.query(`SELECT * FROM roles`, function (err, res) {
                err ? console.error(err) : console.table(res)
            })
        }
        else if (answer.database_choice === `view all employees`) {
            db.query(`SELECT * FROM employees`, function (err, res) {
                err ? console.error(err) : console.table(res)
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
                    // make a function out of the first inquirer to take you back to the prompt
                    // make a function that will allow you to see the newly updated table
                    db.query(`INSERT INTO (department_name) department VALUES (${answers.new_department})`, function (err, res) {               
                        
                        return console.table(res)
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
                    db.query(`INSERT INTO (job_title, department, salary) roles VALUES (${answers.new_role}, ${answers.department}, ${answers.salary}) `, function (err, res) {
                        return console.log(res)
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
                    db.query(`INSERT INTO (first_name, last_name, job_title, manager) employees VALUES (${answers.first_name}, ${answers.last_name}, ${answers.job_title}, ${answers.manager})`, function (err, res) { 
                        return console.log(res)
                    })
                })
        }
        else if (answer.database_choice === `update an employee job title`) { }

    })
