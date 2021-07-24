CREATE DATABASE IF NOT EXISTS ARCHIVE;
USE ARCHIVE;

DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

DROP TABLE IF EXISTS power_plant_categories;
DROP TABLE IF EXISTS pylon_categories;
DROP TABLE IF EXISTS power_line_categories;

DROP TABLE IF EXISTS low_voltage_power_cabins;
DROP TABLE IF EXISTS high_voltage_power_cabins;
DROP TABLE IF EXISTS power_plants;
DROP TABLE IF EXISTS power_lines;
DROP TABLE IF EXISTS pylons;

DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS residences;
DROP TABLE IF EXISTS bills;
DROP TABLE IF EXISTS tickets;


CREATE TABLE roles (
        id INTEGER NOT NULL, 
        date_created DATETIME, 
        date_modified DATETIME, 
        name VARCHAR(128) NOT NULL, 
        description VARCHAR(409) NOT NULL, 
        PRIMARY KEY (id), 
        UNIQUE (name)
);


CREATE TABLE high_voltage_power_cabins (
        id INTEGER NOT NULL, 
        date_created DATETIME, 
        date_modified DATETIME, 
        name VARCHAR(128), 
        latitude FLOAT NOT NULL, 
        longitude FLOAT NOT NULL, 
        PRIMARY KEY (id)
);


CREATE TABLE customers (
        id INTEGER NOT NULL, 
        date_created DATETIME, 
        date_modified DATETIME, 
        name VARCHAR(64) NOT NULL, 
        surname VARCHAR(128) NOT NULL, 
        birthdate DATETIME NOT NULL, 
        fiscal_code VARCHAR(16) NOT NULL, 
        pec VARCHAR(300) NOT NULL, 
        phone_number VARCHAR(20) NOT NULL, 
        PRIMARY KEY (id)
);


CREATE TABLE power_plant_categories (
        id INTEGER NOT NULL, 
        date_created DATETIME, 
        date_modified DATETIME, 
        name VARCHAR(127) NOT NULL, 
        description VARCHAR(4096) NOT NULL, 
        PRIMARY KEY (id)
);


CREATE TABLE pylon_categories (
        id INTEGER NOT NULL, 
        date_created DATETIME, 
        date_modified DATETIME, 
        name VARCHAR(127) NOT NULL, 
        description VARCHAR(4096) NOT NULL, 
        PRIMARY KEY (id)
);


CREATE TABLE power_line_categories (
        id INTEGER NOT NULL, 
        date_created DATETIME, 
        date_modified DATETIME, 
        name VARCHAR(127) NOT NULL, 
        description VARCHAR(4096) NOT NULL, 
        PRIMARY KEY (id)
);


CREATE TABLE employees (
        id INTEGER NOT NULL, 
        date_created DATETIME, 
        date_modified DATETIME, 
        name VARCHAR(128) NOT NULL, 
        surname VARCHAR(128) NOT NULL, 
        email VARCHAR(128) NOT NULL, 
        password VARCHAR(192) NOT NULL, 
        role INTEGER NOT NULL, 
        PRIMARY KEY (id), 
        UNIQUE (email), 
        FOREIGN KEY(role) REFERENCES roles (id)
);


CREATE TABLE power_plants (
        id INTEGER NOT NULL, 
        date_created DATETIME, 
        date_modified DATETIME, 
        name VARCHAR(128) NOT NULL, 
        description VARCHAR(4096), 
        category INTEGER NOT NULL, 
        latitude FLOAT NOT NULL, 
        longitude FLOAT NOT NULL, 
        PRIMARY KEY (id), 
        FOREIGN KEY(category) REFERENCES power_plant_categories (id)
);


CREATE TABLE pylons (
        id INTEGER NOT NULL, 
        date_created DATETIME, 
        date_modified DATETIME, 
        name VARCHAR(128), 
        category INTEGER, 
        latitude FLOAT NOT NULL, 
        longitude FLOAT NOT NULL, 
        PRIMARY KEY (id), 
        FOREIGN KEY(category) REFERENCES pylon_categories (id)
);


CREATE TABLE pylon1_pylon2 (
        id INTEGER NOT NULL,
        date_created DATETIME,
        date_modified DATETIME,
        idLinea INTEGER NOT NULL,
        idTraliccio1 INTEGER NOT NULL,
        idTraliccio2 INTEGER NOT NULL,

        PRIMARY KEY (id),
        FOREIGN KEY(idLinea) REFERENCES power_lines(id),
        FOREIGN KEY (idTraliccio1) REFERENCES pylons(id),
        FOREIGN KEY (idTraliccio2) REFERENCES pylons(id)
);

CREATE TABLE low_voltage_power_cabins (
        id INTEGER NOT NULL, 
        date_created DATETIME, 
        date_modified DATETIME, 
        name VARCHAR(128), 
        latitude FLOAT NOT NULL, 
        longitude FLOAT NOT NULL, 
        power_cabin INTEGER NOT NULL, 
        PRIMARY KEY (id), 
        FOREIGN KEY(power_cabin) REFERENCES high_voltage_power_cabins (id)
);


CREATE TABLE power_lines (
        id INTEGER NOT NULL, 
        date_created DATETIME, 
        date_modified DATETIME, 
        line_name VARCHAR(128), 
        line_type INTEGER NOT NULL, 
        source INTEGER NOT NULL, 
        destination INTEGER NOT NULL, 
        PRIMARY KEY (id), 
        FOREIGN KEY(line_type) REFERENCES power_line_categories (id), 
        FOREIGN KEY(source) REFERENCES power_plants (id), 
        FOREIGN KEY(destination) REFERENCES high_voltage_power_cabins (id)
);


CREATE TABLE residences (
        id INTEGER NOT NULL, 
        date_created DATETIME, 
        date_modified DATETIME, 
        latitude FLOAT NOT NULL, 
        longitude FLOAT NOT NULL, 
        owner INTEGER NOT NULL, 
        power_cabin INTEGER NOT NULL, 
        PRIMARY KEY (id), 
        FOREIGN KEY(owner) REFERENCES customers (id), 
        FOREIGN KEY(power_cabin) REFERENCES low_voltage_power_cabins (id)
);


CREATE TABLE tickets (
        id INTEGER NOT NULL, 
        date_created DATETIME, 
        date_modified DATETIME, 
        subject VARCHAR(128) NOT NULL, 
        message VARCHAR(8192) NOT NULL, 
        solved BOOLEAN, 
        customer INTEGER NOT NULL, 
        staff INTEGER, 
        PRIMARY KEY (id), 
        FOREIGN KEY(customer) REFERENCES customers (id), 
        FOREIGN KEY(staff) REFERENCES employees (id)
);


CREATE TABLE bills (
        id INTEGER NOT NULL, 
        date_created DATETIME, 
        date_modified DATETIME, 
        consumption FLOAT NOT NULL, 
        paid BOOLEAN, 
        residence INTEGER, 
        PRIMARY KEY (id), 
        FOREIGN KEY(residence) REFERENCES residences (id)
);