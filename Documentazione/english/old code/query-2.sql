SELECT
    PowerPlant.ID,
    PowerPlant.NAME,
    PowerPlant.DESCRIPTION,
    PowerPlant.LATITUDE,
    PowerPlant.LONGITUDE,
    PowerPlant.DATE_CREATED,
    PowerPlant.DATE_MODIFIED,
    PowerPlantCategory.NAME as CATEGORY
    
FROM
    PowerPlant
    LEFT JOIN PowerPlantCategory
    ON PowerPlant.CATEGORY = PowerPlantCategory.ID

WHERE
    CATEGORY IN (
        "Hydro",
        "Solar",
        "Wind",
        "Nuclear",
        "Geothermal"
    );