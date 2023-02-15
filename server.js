const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const app = express();

require('dotenv').config()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`),
);


const initialPrompt = () => {
    inquirer.prompt ([
        {
          type: 'list',
          name: 'choices', 
          message: 'What would you like to do?',
          choices:[
            'View All Employees',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Quit'
          ]
        }
    ])
    .then((answers) => {
        answer = answers.choices
        if(answer === 'View All Employees'){
            viewEmployees()
        } else if (answer === 'Update Employee Role'){
            updateEmployeeRoll()
        } else if (answer === 'View All Roles'){
            viewRolls()
        } else if (answer === 'Add Role'){
            addRoll()
        } else if (answer === 'View All Departments'){
            viewDepartments()
        } else if (answer === 'Add Department'){
            addDepartment()
        } else if (answer === 'Quit'){
            db.end()
        }

    })
};
initialPrompt()

const viewEmployees = () => {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
            console.table(rows)
            initialPrompt()
        })
    };

const viewRolls = () => {
    db.query(`SELECT role.id AS id, role.title AS title, role.salary, department.department_name FROM role 
    INNER JOIN department ON role.department_id = department.id`, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
            }
            console.table(rows)
            initialPrompt()
        })
    };

const viewDepartments = () => {
    db.query(`SELECT department.id AS id, department.department_name AS department FROM department`, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
            console.table(rows)
            initialPrompt()
        })
    };

    const addDepartment = () => {
        inquirer.prompt ([
            {
              type: 'input',
              name: 'newDepartment', 
              message: 'What is the name of the department?'
            }
        ]).then((answers) => {
            console.log(answers.newDepartment)
            db.query(`INSERT INTO department (department_name)
            VALUES ('${answers.newDepartment}')`, (err, res) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                    viewDepartments()
                    initialPrompt()
                  })
        })
    };

    const addRoll = async () => {
        departmentId = []
        const roleName = await inquirer.prompt ([
            {
              type: 'input',
              name: 'newRoll', 
              message: 'What is the new roll you want to add?'
            }
        ])
        console.log(roleName.newRoll)
        const roleSalary = await inquirer.prompt ([
            {
              type: 'input',
              name: 'salary', 
              message: 'What is the salary of the new role?'
            }
        ])
        console.log(roleSalary.salary)
            db.query(`SELECT * FROM department`, async function (err, results) {
            const departmentChoices = results.map(({ department_name, id }) => ({ name: department_name, value: id }));
            const roleDepartment = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'department', 
                    message: 'What department is this under?',
                    choices: departmentChoices
                  }
                
            ])
            await departmentId.pop()
            await departmentId.push(roleDepartment.department)
            console.log(departmentId[0])  
            console.log('-----------------------------------------------')  
            db.query(`INSERT INTO role (title, salary, department_id)
            VALUES ('${roleName.newRoll}', ${roleSalary.salary}, ${departmentId[0]})`, (err, res) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                    viewRolls()
                    initialPrompt()
                  })
            
          })
        }

        const updateEmployeeRoll = () => {

        };
