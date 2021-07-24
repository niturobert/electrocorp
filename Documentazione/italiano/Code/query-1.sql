-- Get all the employees that are in the << Finances >> role.
SELECT
    NAME,
    SURNAME,
    EMAIL,
    ROLE

FROM
    Users


WHERE
    ROLE = (SELECT ID FROM Roles WHERE NAME = "Finances");