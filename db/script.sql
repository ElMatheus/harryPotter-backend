CREATE DATABASE hpback;

CREATE TABLE witchers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    hogwartsHouse VARCHAR(100) NOT NULL,
    skill VARCHAR(100) NOT NULL,
    bloodStatus VARCHAR(100) NOT NULL,
    patrono VARCHAR(100)
)

CREATE TABLE wand (
    id SERIAL PRIMARY KEY,
    material VARCHAR(100) NOT NULL,
    length INT NOT NULL,
    core VARCHAR(100) NOT NULL,
    manufacturingDate DATE NOT NULL
)