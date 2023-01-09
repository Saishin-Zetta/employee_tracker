const inquirer = require('inquirer');
const mysql = require('mysql');
const express = require(`express`)

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "R5201reta&",
    database: "blackCompany_db"
});

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
        if(choices === `view all departments`){
            db.query(`SELECT * FROM department`, function (err, results) {
                console.log(results)
            })
        }
        else if(choices === `view all roles`){
            db.query(`SELECT * FROM roles`, function (err, results) {
                console.log(results)
            })
        }
        else if(choices === `view all employees`){
            db.query(`SELECT * FROM employees`, function (err, results) {
                console.log(results)
            })
        }
        else if(choices === `add a department`){
            db.query(`INSERT INTO department`, function (err, results) {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'what would you like to name the new department?',
                            name: 'new_department',
                        },
                        
                    ])
                .then((answers) => {
                    VALUES (answers)
                })
                return console.log(results)
            })
        }
        else if(choices === `add a role`){
            db.query(`INSERT INTO roles`, function (err, results) {
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
                        VALUES (answers.new_role, answers.department, answers.salary)
                    })
                return console.log(results)
            })
        }
        else if(choices === `add an employee`){
            db.query(`INSERT INTO employees`, function (err, results) {            
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
                        VALUES (answers.first_name, answers.last_name, answers.job_title, answers.manager)
                    })
                    
                return console.log(results)
            })
        }
        else if(answer === `update an employee job title`){}

    })
    