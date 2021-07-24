-- Insert the Roles.
INSERT INTO Roles (
    NAME,
    DESCRIPTION
) VALUES (
    "Administrator",
    "The system administrator"
);

INSERT INTO Roles (
    NAME,
    DESCRIPTION
) VALUES (
    "Finances",
    "The finances team"
);


-- Add the users.
INSERT INTO Users (
    NAME,
    SURNAME,
    EMAIL,
    PASSWORD,
    ROLE
) VALUES (
    "Anderson",
    "Smith",
    "admin@localhost",
    "admin",
    (SELECT ID FROM Roles WHERE NAME = "Administrator" LIMIT 1)
);

INSERT INTO Users (
    NAME,
    SURNAME,
    EMAIL,
    PASSWORD,
    ROLE
) VALUES (
    "William",
    "Blake",
    "william.blake@electrocorp.com",
    "stonks",
    (SELECT ID FROM Roles WHERE NAME = "Finances" LIMIT 1)
);

INSERT INTO Users (
    NAME,
    SURNAME,
    EMAIL,
    PASSWORD,
    ROLE
) VALUES (
    "Mario",
    "Rossi",
    "mario.rossi@electrocorp.com",
    "soldi-123",
    (SELECT ID FROM Roles WHERE NAME = "Finances" LIMIT 1)
);