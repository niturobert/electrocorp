CREATE DATABASE IF NOT EXISTS ARCHIVE;
USE ARCHIVE;

CREATE TABLE IF NOT EXISTS Pylons (
    ID      SERIAL PRIMARY KEY,
    NAME    VARCHAR(32) NOT NULL
);