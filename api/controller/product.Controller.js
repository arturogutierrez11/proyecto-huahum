const postgre = require('../database')
const axios = require('axios');
const productController = {
    getAll: async(req, res) => {
        try {
            // Consulta en la base de datos PostgreSQL
            const postgresResult = await postgre.query("SELECT * FROM products");
            const postgresData = postgresResult.rows;
          
            // Llamado a la API de SheetDB
            const sheetDbResponse = await axios.get('https://sheetdb.io/api/v1/utggcucu4ayvk');
            const sheetDbData = sheetDbResponse.data;
          
            // Respuesta combinada
            res.json({ msg: 'OK', postgresData, sheetDbData });
          } catch (error) {
            res.json({ msg: error.message });
          }
    },
    // getById: async(req, res) => {
    //     try {
    //         const { rows } = await postgre.query("select * from books where book_id = $1", [req.params.id])

    //         if (rows[0]) {
    //             return res.json({msg: "OK", data: rows})
    //         }

    //         res.status(404).json({msg: "not found"})
    //     } catch (error) {
    //         res.json({msg: error.msg})
    //     }
    // },
    create: async(req, res) => {
        try {
            const { name, price } = req.body

            const sql = 'INSERT INTO books(name, price) VALUES($1, $2) RETURNING *'

            const { rows } = await postgre.query(sql, [name, price])

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    // updateById: async(req, res) => {

    //     try {
    //         const { name, price } = req.body

    //         const sql = 'UPDATE books set name = $1, price = $2 where book_id = $3 RETURNING *'

    //         const { rows } = await postgre.query(sql, [name, price, req.params.id])

    //         res.json({msg: "OK", data: rows[0]})

    //     } catch (error) {
    //         res.json({msg: error.msg})
    //     }
    // },

    // deleteById: async(req, res) => {
    //     try {
    //         const sql = 'DELETE FROM books where book_id = $1 RETURNING *'

    //         const { rows } = await postgre.query(sql, [req.params.id])

    //         if (rows[0]) {
    //             return res.json({msg: "OK", data: rows[0]})
    //         }

    //         return res.status(404).json({msg: "not found"})
            

    //     } catch (error) {
    //         res.json({msg: error.msg})
    //     }
    //  }
}

module.exports = productController