const { Router } = require('express');
const router = Router();
const { addDietsToDB } = require('../../../Controllers/ToolsDiet');
// const { TypeOfDiet } = require('../../db');
router.get('/', async (req, res) => {
    try {
        const listDiets = await addDietsToDB();
        return res.status(200).json(listDiets);
    } catch (error) {
        return res.status(500).send('Opss, server is dead');
    };


});

module.exports = router;