DROP DATABASE IF EXISTS blackCompany_db;
CREATE DATABASE blackCompany_db;

USE blackCompany_db;

CREATE TABLE department (
    id INT NOT NULL
    department_name VARCHAR(25) NOT NULL

    PRIMARY KEY (department_name)
)

CREATE TABLE roles (
    job_title VARCHAR(25) NOT NULL
    role_id INT NOT NULL
    department NOT NULL
    salary NOT NULL

    PRIMARY KEY (job_title)
    FOREIGN KEY (department)
    REFERENCES department (department_name)
    ON DELETE SET NULL
)

CREATE TABLE employees (
    employee_id INT NOT NULL
    first_name VARCHAR(15) NOT NULL
    last_name VARCHAR(15) NOT NULL
    job_title VARCHAR(25) NOT NULL
    department VARCHAR(25) NOT NULL
    salary INT NOT NULL
    manager VARCHAR(25) NOT NULL
    
    PRIMARY KEY (employee_id)
    FOREIGN KEY (job_title)
    REFERENCES roles (job_title)
    ON DELETE SET NULL
)