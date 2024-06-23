-- Drop existing tables if they exist
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

-- Create the database
CREATE DATABASE IF NOT EXISTS company_db;

-- Use the database
USE company_db;

-- Create department table
CREATE TABLE IF NOT EXISTS department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Create role table
CREATE TABLE IF NOT EXISTS role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Create employee table
CREATE TABLE IF NOT EXISTS employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- Insert sample data into department table
INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('Finance');

-- Insert sample data into role table
INSERT INTO role (title, salary, department_id) VALUES 
('Sales Manager', 100000, 1), 
('Software Engineer', 120000, 2),
('Accountant', 80000, 3);

-- Insert sample data into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Robert', 'Brown', 3, NULL);
