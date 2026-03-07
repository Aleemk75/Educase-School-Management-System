import db from "../config/db.js";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => (degree * Math.PI) / 180;

    const R = 6371;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceInKm = R * c;
    return distanceInKm;
};

const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        if (!name || !address || latitude == null || longitude == null) {
            return res.status(400).json({ error: "Please provide name, address, latitude, and longitude." });
        }

        const latNum = parseFloat(latitude);
        const lonNum = parseFloat(longitude);

        if (isNaN(latNum) || isNaN(lonNum)) {
            return res.status(400).json({ error: "Latitude and longitude must be valid numbers." });
        }

        const sqlQuery = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
        const values = [name.trim(), address.trim(), latNum, lonNum];

        const [result] = await db.execute(sqlQuery, values);

        return res.status(201).json({
            status: "success",
            data: {
                message: "School added successfully",
                id: result.insertId,
                name: name.trim(),
                address: address.trim(),
                latitude: latNum,
                longitude: lonNum
            }
        });

    } catch (error) {
        console.error("Error inside addSchool:", error);
        return res.status(500).json({ error: "Something went wrong on the server" });
    }
};

const listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ error: "Please provide your latitude and longitude in the query." });
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        if (isNaN(userLat) || isNaN(userLon)) {
            return res.status(400).json({ error: "Latitude and longitude must be valid numbers." });
        }

        const sqlQuery = "SELECT * FROM schools";
        const [schools] = await db.execute(sqlQuery);

        const schoolsWithDistance = schools.map((school) => {
            const distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);

            return {
                id: school.id,
                name: school.name,
                address: school.address,
                latitude: school.latitude,
                longitude: school.longitude,
                distance: Number(distance.toFixed(2))
            };
        });

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        return res.status(200).json(schoolsWithDistance);

    } catch (error) {
        console.error("Error inside listSchools:", error);
        return res.status(500).json({ error: "Something went wrong on the server" });
    }
};

export { addSchool, listSchools };
