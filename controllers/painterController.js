const pool = require('../db'); // Import your PostgreSQL connection pool

const getAllPainters = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM painters');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching painters', error);
        res.status(500).send('Internal Server Error');
    }
};

const getPainterById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM painters WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(`Error fetching painter with id ${id}`, error);
        res.status(500).send('Internal Server Error');
    }
};

const createPainter = async (req, res) => {
    const { painter_name, mobile, dealer_id, place } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO painters (painter_name, mobile, dealer_id, place) VALUES ($1, $2, $3, $4) RETURNING *',
            [painter_name, mobile, dealer_id, place]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error creating painter', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { getAllPainters, getPainterById, createPainter };
