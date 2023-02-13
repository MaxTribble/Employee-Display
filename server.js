const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const PORT = process.env.PORT || 3001;
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
  console.log(`Connected to the employees_db database.`)
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
            // updateEmployee()
        } else if (answer === 'View All Roles'){
            viewRolls()
        } else if (answer === 'Add Role'){
            // addRoll()
        } else if (answer === 'View All Departments'){
            viewDepartments()
        } else if (answer === 'Add Department'){
            // addDepartment()
        } else if (answer === 'Quit'){
            db.end()
        }

    })
};
initialPrompt()
// // Hardcoded query: DELETE FROM course_names WHERE id = 3;
const viewEmployees = () => {
    db.query(`SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name FROM employee`, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
            console.table(rows)
            initialPrompt()
        })
    };

const viewRolls = () => {
    db.query(`SELECT role.id AS id, role.title AS title, role.salary, department.department_name FROM role INNER JOIN department ON role.department_id = department.id`, (err, rows) => {
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



// // Query database
// db.query('SELECT * FROM course_names', function (err, results) {
//   console.log(results);
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
