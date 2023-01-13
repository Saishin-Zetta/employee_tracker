DROP DATABASE IF EXISTS blackCompany_db;
CREATE DATABASE blackCompany_db;

USE blackCompany_db;

CREATE TABLE department(
    id INT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT NOT NULL,
    job_title VARCHAR(30) NOT NULL,   
    department_id INT NOT NULL,
    salary INT NOT NULL,

    PRIMARY KEY (id)
    FOREIGN KEY (department_id)
    REFERENCES department (id)
);

CREATE TABLE employees(
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
        
    PRIMARY id
    FOREIGN KEY (role_id)
    REFERENCES role (id)
    FOREIGN KEY (manager_id)
    REFERENCES employees (id)
    ON DELETE SET NULL
);