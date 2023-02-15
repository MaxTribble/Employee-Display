INSERT INTO department (department_name)
VALUES 
    ('Accounting'),
    ('HR'),
    ('Outbound'),
    ('Inbound');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Senior Accountant', 100000, 1),
    ('Junior Accountant', 65000,1),
    ('Work Place Safety', 70000, 2),
    ('Employee Complaints', 50000, 2),
    ('Picking', 30000, 3),
    ('Packing', 30000, 3),
    ('Sorting', 30000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Edward', 'Norton', 1, null),
    ('Jaque', 'Philleep', 3, null),
    ('Jean', 'Grayhound', 4, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Jacob', 2, 1),
    ('Margret', 'Changle', 5, 3),
    ('Tyler', 'Foot', 6, 3),
    ('Henry', 'Flincher', 7, 3);