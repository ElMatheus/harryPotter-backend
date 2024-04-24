CREATE DATABASE hpback;

CREATE TABLE witchers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    hogwartsHouse VARCHAR(100) NOT NULL,
    skill VARCHAR(100) NOT NULL,
    bloodStatus VARCHAR(100) NOT NULL,
    patrono VARCHAR(100) NOT NULL
)