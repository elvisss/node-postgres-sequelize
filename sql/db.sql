CREATE TABLE IF NOT EXISTS project (
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name text NOT NULL CHECK (name <> ''),
    priority integer NOT NULL,
    description text,
    delivery_date date NOT NULL
);

CREATE TABLE IF NOT EXISTS task (
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre text NOT NULL CHECK (nombre <> ''),
    done boolean,
    projectid integer REFERENCES project(id)
);

-- PROJECTS

INSERT INTO project(name, priority, description, delivery_date)
VALUES ('Make a Web App', 1, 'Usando JS', '2019-05-12');

INSERT INTO project(name, priority, description, delivery_date)
VALUES ('Make a Mobile App', 2, 'Usando Dark', '2019-07-12');

INSERT INTO project(name, priority, description, delivery_date)
VALUES ('Make a Desktop App', 2, 'Usando TS', '2019-09-12');

-- TAKS

INSERT INTO task(nombre, done, projectid)
VALUES ('download vuejs', false, 1);

INSERT INTO task(nombre, done, projectid)
VALUES ('install vuejs', false, 1);

INSERT INTO task(nombre, done, projectid)
VALUES ('Download flutter', false, 2);

INSERT INTO task(nombre, done, projectid)
VALUES ('Desing UI', false, 2);
