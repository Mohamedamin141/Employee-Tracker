const inquirer = require('inquirer');
const cTable = require('console.table');

const queries = require('./quiers');

class Prompts {
    constructor() {
    }

    // do initializations
    initializeProgram() {
        // this.promptPassword();
        this.promptMenu();
    };

    // prompt user for employee role
    promptMenu() {
        inquirer
            .prompt({
                type: 'list',
                name: 'menu',
                message: "\nWhat would you like to do?",
                choices: [
                    'view all departments',
                    'view all roles',
                    'view all employees',
                    'add a department',
                    'add a role',
                    'add an employee',
                    'update an employee role',
                    'quit'
                ]
            })
            // destructure role from the prompt object
            .then(({ menu }) => {
                if (menu === 'view all departments') {
                    this.viewDepartments();
                } else if (menu === 'view all roles') {
                    this.viewRoles();
                } else if (menu === 'view all employees') {
                    this.viewEmployees();
                } else if (menu === 'add a department') {
                    this.promptAddDepartment();
                } else if (menu === 'add a role') {
                    this.promptAddRole();
                } else if (menu === 'add an employee') {
                    this.promptAddEmployee();
                } else if (menu === 'update an employee role') {
                    this.promptUpdateRole();
                } else {
                    // queries.endConnection();
                    queries.endConnection();
                    console.log('Goodbye\n')
                    process.exit();
                }
            });
    };



    async viewDepartments() {
        await queries.readDepartments();
        this.promptMenu();
    };

    async viewRoles() {
        await queries.readRoles();
        this.promptMenu();
    };

    async viewEmployees() {
        await queries.readEmployees();
        this.promptMenu();
    };

    // prompt user for employee id number
    async promptAddDepartment() {
        await queries.readDepartments();
        inquirer
            .prompt({
                type: 'input',
                name: 'name',
                message: "What is the name of this new department?",
                // make this validate a number answer

                validate: verifyInput => {
                    if (verifyInput) {
                        return true;
                    } else {
                        console.log('Please enter a name for this new department.');
                        return false;
                    }
                }
            })
            // destructure id from the prompt object
            .then(({ name }) => {
                queries.addDepartment(name);
                this.promptMenu();
            });
    };

    // prompt user for employee id number
    async promptAddRole() {
        await queries.readRoles();
        inquirer
            .prompt([{
                type: 'input',
                name: 'name',
                message: "What is the name of this new role?",
                // make this validate a number answer

                validate: verifyInput => {
                    if (verifyInput) {
                        return true;
                    } else {
                        console.log('Please enter a name for this new role');
                        return false;
                    }
                }
            },
            {
                type: 'number',
                name: 'salary',
                message: "What is the default salary for this role?",
                // make this validate a number answer

                validate: verifyInput => {
                    if (typeof verifyInput === 'number') {
                        return true;
                    } else {
                        console.log('please enter a default salary for this role.');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'department',
                message: "What is the id for the department this role belongs to?",
                // make this validate a number answer

                validate: verifyInput => {
                    if (verifyInput) {
                        return true;
                    } else {
                        console.log('please enter a department id for the department this role belongs to.');
                        return false;
                    }
                }
            }
            ])
            // destructure id from the prompt object
            .then(({ name, salary, department }) => {
                queries.addRole(name, salary, department);
                this.promptMenu();
            });
    };

    // prompt user for employee id number
    async promptAddEmployee() {
        await queries.readEmployees();
        inquirer
            .prompt([{
                type: 'input',
                name: 'firstName',
                message: "What is the first name of this new employee?",
                // make this validate a number answer

                validate: verifyInput => {
                    if (verifyInput) {
                        return true;
                    } else {
                        console.log('Please enter the first name for this employee.');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'lastName',
                message: "What is the last name of this new employee?",
                // make this validate a number answer

                validate: verifyInput => {
                    if (verifyInput) {
                        return true;
                    } else {
                        console.log('Please enter the last name for this employee.');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'roleID',
                message: "What is the id for the role for this new employee?",
                // make this validate a number answer

                validate: verifyInput => {
                    if (verifyInput) {
                        return true;
                    } else {
                        console.log('Please enter the role id this new employee.');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'managerID',
                message: "What is the id of this employee's manager? \n (If no manager, enter 0 and hit return.)",
                // make this validate a number answer

                validate: verifyInput => {

                    if (verifyInput) {
                        return true;
                    } else {
                        console.log("Please enter the id of this employee's manager");
                        return false;
                    }
                }
            }
            ])
            // destructure id from the prompt object
            .then(({ firstName, lastName, roleID, managerID }) => {
                if (managerID == 0) {managerID = null};
                queries.addEmployee(firstName, lastName, roleID, managerID);
                this.promptMenu();
            });
    };

    async promptUpdateRole() {
        await queries.readEmployees();
        inquirer
            .prompt([{
                type: 'input',
                name: 'employeeID',
                message: "What is the id for the employee?",
                // make this validate a number answer

                validate: verifyInput => {
                    if (verifyInput) {
                        return true;
                    } else {
                        console.log('Please enter an id for this employee.');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'roleID',
                message: "What is the id for the employee's new role?",
                // make this validate a number answer

                validate: verifyInput => {
                    if (verifyInput) {
                        return true;
                    } else {
                        console.log("Please enter an id for the employee's new role.");
                        return false;
                    }
                }
            }
            ])
            // destructure id from the prompt object
            .then(({ employeeID, roleID }) => {
                queries.updateEmployeeRole(employeeID, roleID);
                this.promptMenu();
            });
    };

    
};

module.exports = Prompts;