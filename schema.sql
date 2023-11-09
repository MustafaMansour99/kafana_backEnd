DROP TABLE IF EXISTS user1;
DROP TABLE IF EXISTS account;

CREATE TABLE If NOT EXISTS user1 (
    ID serial PRIMARY KEY,
    Server_DateTime timestamp NOT NULL,
    DateTime_UTC timestamp NOT NULL,
    Update_DateTime_UTC timestamp NOT NULL,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR NOT NULL,
    First_Name VARCHAR NOT NULL,
    Last_Name VARCHAR NOT NULL,
    Status integer NOT NULL,
    Gender integer NOT NULL,
    Date_Of_Birth date NOT NULL
);
CREATE TABLE IF NOT EXISTS Account (
    ID serial PRIMARY KEY,
    User_ID integer NOT NULL,
    Server_DateTime timestamp NOT NULL,
    DateTime_UTC timestamp NOT NULL,
    Update_DateTime_UTC timestamp NOT NULL,
    Account_Number VARCHAR(255) NOT NULL,
    Balance money NOT NULL,
    Currency VARCHAR(255) NOT NULL,
    Status integer NOT NULL
);