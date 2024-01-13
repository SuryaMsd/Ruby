const pool = require('../db'); // Import your PostgreSQL connection pool

const getAllDealers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM dealers');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching dealers', error);
        res.status(500).send('Internal Server Error');
    }
};

const getDealerById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM dealers WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(`Error fetching dealer with id ${id}`, error);
        res.status(500).send('Internal Server Error');
    }
};

const createDealer = async (req, res) => {
    const { dealer_name, mobile, place } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO dealers (dealer_name, mobile, place) VALUES ($1, $2, $3) RETURNING *',
            [dealer_name, mobile, place]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error creating dealer', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { getAllDealers, getDealerById, createDealer };
