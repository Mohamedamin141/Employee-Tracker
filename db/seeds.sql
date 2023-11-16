-- Active: 1699263482640@@127.0.0.1@3306@employees_db
INSERT INTO departments (name)
VALUES
  ('Management'),
  ('Development'),
  ('Advertising'),
  ('QA');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Manager', 100000, 1),
  ('Programmer', 75000, 2),
  ('advertiser', 70000, 3),
  ('QA Specialist', 40000, 4);
  

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, null),
  ('Jack', 'London', 1, null),
  ('Robert', 'Bruce', 1, 0),
  ('Peter', 'Greenaway', 2, 1),
  ('Derek', 'Jarman', 3, 0);

