const { mainMenuPrompt } = require('./utils/prompts');
const {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
} = require('./db/queries');
const inquirer = require('inquirer');
const Table = require('cli-table3');

const getMaxLength = (arr, prop) => Math.max(...arr.map(item => String(item[prop]).length));

const mainMenu = async () => {
    const { action } = await mainMenuPrompt();

    switch (action) {
        case 'View all departments':
            const [departments] = await viewAllDepartments();
            const deptTable = new Table({
                head: ['ID', 'Name'],
                colWidths: [10, 30]
            });
            departments.forEach(({ id, name }) => {
                deptTable.push([id, name]);
            });
            console.log(deptTable.toString());
            break;
        case 'View all roles':
            const [roles] = await viewAllRoles();
            const roleTable = new Table({
                head: ['ID', 'Title', 'Department', 'Salary'],
                colWidths: [10, 30, 30, 20]
            });
            roles.forEach(({ id, title, department, salary }) => {
                roleTable.push([id, title, department, salary]);
            });
            console.log(roleTable.toString());
            break;
        case 'View all employees':
            const [employees] = await viewAllEmployees();
            const empTable = new Table({
                head: ['ID', 'First Name', 'Last Name', 'Title', 'Department', 'Salary', 'Manager'],
                colWidths: [
                    getMaxLength(employees, 'id') + 2,
                    getMaxLength(employees, 'first_name') + 2,
                    getMaxLength(employees, 'last_name') + 2,
                    getMaxLength(employees, 'title') + 2,
                    getMaxLength(employees, 'department') + 2,
                    getMaxLength(employees, 'salary') + 2,
                    getMaxLength(employees, 'manager') + 2
                ]
            });
            employees.forEach(({ id, first_name, last_name, title, department, salary, manager }) => {
                empTable.push([id, first_name, last_name, title, department, salary, manager]);
            });
            console.log(empTable.toString());
            break;
        case 'Add a department':
            const { departmentName } = await inquirer.prompt({
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the department:'
            });
            await addDepartment(departmentName);
            console.log(`Added ${departmentName} to the database`);
            break;
        case 'Add a role':
            const { roleName, salary, departmentId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleName',
                    message: 'Enter the name of the role:'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary of the role:'
                },
                {
                    type: 'input',
                    name: 'departmentId',
                    message: 'Enter the department ID of the role:'
                }
            ]);
            await addRole(roleName, salary, departmentId);
            console.log(`Added ${roleName} to the database`);
            break;
        case 'Add an employee':
            const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter the first name of the employee:'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter the last name of the employee:'
                },
                {
                    type: 'input',
                    name: 'roleId',
                    message: 'Enter the role ID of the employee:'
                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: 'Enter the manager ID of the employee (null if no manager):'
                }
            ]);
            await addEmployee(firstName, lastName, roleId, managerId);
            console.log(`Added ${firstName} ${lastName} to the database`);
            break;
        case 'Update an employee role':
            const { employeeId, newRoleId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeId',
                    message: 'Enter the ID of the employee:'
                },
                {
                    type: 'input',
                    name: 'newRoleId',
                    message: 'Enter the new role ID of the employee:'
                }
            ]);
            await updateEmployeeRole(employeeId, newRoleId);
            console.log(`Updated employee's role`);
            break;
        case 'Exit':
            process.exit();
            break;
        default:
            console.log(`Invalid action: ${action}`);
    }

    mainMenu();
};

mainMenu();
