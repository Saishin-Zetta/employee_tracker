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
                `update an employee role`],
        },
        // need to identify why this .then is still expectin an expression, considering I think I gave it several
        .then((answer) => {
            if(answer === `view all departments`){
                db.query(`SELECT * FROM department`, function (err, results) {
                    console.log(results)
                })
            }
            else if(answer === `view all roles`){
                db.query(`SELECT * FROM roles`, function (err, results) {
                    console.log(results)
                })
            }
            else if(answer === `view all employees`){
                db.query(`SELECT * FROM employees`, function (err, results) {
                    console.log(results)
                })
            }
            else if(answer === `add a department`){
                db.query(`INSERT INTO department`, function (err, results) {
                    // need to include an array that can take in the info needed to fill out a given table row

                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                message: 'what would you like to name the new department?',
                                name: 'new_department',
                            },
                            
                        ])
                    // come up with a .then that can place the answers in the array into the table
                    return results
                })
            }
            else if(answer === `add a role`){
                db.query(`INSERT INTO roles`, function (err, results) {
                    // need to include an array that can take in the info needed to fill out a given table row
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                message: 'what would you like to name the new role?',
                                name: 'new_role',
                            },
                            
                        ])
                        // come up with a .then that can place the answers in the array into the table
                    return results
                })
            }
            else if(answer === `add an employee`){
                db.query(`INSERT INTO employees`, function (err, results) {
                    // need to include an array that can take in the info needed to fill out a given table row
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
                        // come up with a .then that can place the answers in the array into the table
                    return results
                })
            }
            else if(answer === `update an employee job title`){}

        })
    ])