CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email VARCHAR(25),
    password VARCHAR(20),
	phone VARCHAR(20),
	identification VARCHAR(20),
	position TEXT
);

INSERT INTO Users (name, email, password, phone, identification, position)
    VALUES ('superUser', 'superUser@pwa.com', '1234', '1234567', '1234567890', 'Super user');

select * from Users;

CREATE TABLE Clients(
    pk_client_id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email VARCHAR(25),
    phone VARCHAR(20),
    identification VARCHAR(20),
    type VARCHAR(20)
);

CREATE TABLE Projects(
    pk_project_id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    description TEXT,
    personInCharge int
);

CREATE TABLE Tasks(
    pk_task_id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    description TEXT,
    fk_project_id INT,
    FOREIGN KEY (fk_project_id) REFERENCES Projects(pk_project_id),
    completed BOOLEAN

);

CREATE TABLE TaskImages(
    pk_id SERIAL PRIMARY KEY,
    path VARCHAR(500),
    fk_task_id INT,
    FOREIGN KEY (fk_task_id) REFERENCES Tasks(pk_task_id)
);

CREATE TABLE TaskAudios(
    pk_id SERIAL PRIMARY KEY,
    path VARCHAR(50),
    fk_task_id INT,
    FOREIGN KEY (fk_task_id) REFERENCES Tasks(pk_task_id)
);
