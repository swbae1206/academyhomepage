const dbConfig = require("./dbConfig");
const express = require("express");
const router = express.Router();

router.get('/orders', (req, res) => {
	const queryText = 'SELECT * FROM orders';
	const values = [
	];
	dbConfig.dbClient
		.query(queryText, values)
		.then((result) => {
			res.send(JSON.stringify(result.rows));
		})
		.catch(e => console.log(e.stack));
});

router.get('/orders/:id', (req, res) => {
	const queryText = 'SELECT * FROM orders WHERE order_id = $1';
	const values = [
		req.params.id
	];
	dbConfig.dbClient
		.query(queryText, values)
		.then((result) => {
			res.send(JSON.stringify(result.rows));
		})
		.catch(e => console.log(e.stack));
});

router.post('/orders', (req, res) => {
	const queryText = 'INSERT INTO orders VALUES($1, $2, $3, $4, $5)';
	const values = [
		req.body.order_id,
		req.body.customer_id,
		req.body.employee_id,
		req.body.order_date,
		req.body.shipper_id
	];
	dbConfig.dbClient
		.query(queryText, values)
		.then((result) => {
			res.send(result);
		})
		.catch(e => {
			res.status(500).send({ data: e.message });
		});
});

router.put('/orders/:id', (req, res) => {
	const queryText = 'UPDATE orders SET customer_id = $2, employee_id = $3, order_date = $4, shipper_id = $5 WHERE order_id = $1';
	const values = [
		req.params.id,
		req.body.customer_id,
		req.body.employee_id,
		req.body.order_date,
		req.body.shipper_id
	];
	dbConfig.dbClient
		.query(queryText, values)
		.then((result) => {
			res.send(result);
		})
		.catch(e => {
			res.status(500).send({ data: e.message });
		});
});

router.delete('/orders/:id', (req, res) => {
	const queryText = 'DELETE FROM orders WHERE order_id = $1';
	const values = [
		req.params.id,
	];
	dbConfig.dbClient
		.query(queryText, values)
		.then((result) => {
			res.send(result);
		})
		.catch(e => {
			res.status(500).send({ data: e.message });
		});
});

module.exports = router;

