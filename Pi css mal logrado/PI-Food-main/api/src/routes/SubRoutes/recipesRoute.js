const { Router } = require('express');
const { findRecipeByname,findRecipeById,createID,associationRecipesWithDiets, listCompleteOfRecipes } = require('../../../Controllers/ToolsRecipe');
const { Recipe, TypesOfDiet } = require('../../db');
const router = Router();
//the max id of API DE MOCKY is 1.095.753, 
//the max id of API ORIGINAL is  1095753
router.get('/', async (req,res) => {
    try {
        if(req.query.name){
                console.log('Nombre de Recetas')
                if(typeof(req.query.name) === 'string'){
                    const { name } = req.query;
                    const recipesFind = await findRecipeByname(name);
                    if(typeof(recipesFind) === 'string') throw new Error(recipesFind);
                    return res.status(200).json(recipesFind);
                }
                throw new Error('Please, Enter a correctly name (not numbers) ');
            }
            else{
                console.log('Lista de Recetas')
                const listComplete = await listCompleteOfRecipes();
                return res.status(200).json(listComplete);
            }
    
        } 
    
    
    catch (error) {
        return res.status(400).send(error.message);
    }
});

router.get('/:id', async(req,res) => {
    try {
        const { id } = req.params
        const recipeFound = await findRecipeById(id);
        if(typeof(recipeFound) === 'string') throw new Error(recipeFound);
        return res.status(200).json(recipeFound);
        
    } catch (error) {
        return res.status(400).send(error.message);
    }
});


router.post('/', async (req,res) => {
    try {
        const { title, summary, healthScore, steps, diets } = req.body;
        const id = await createID(); // crea un id unico.
        const newRecipe = await Recipe.create({
            id, 
            title, 
            summary, 
            healthScore, 
            steps,  
        });
         await associationRecipesWithDiets(newRecipe,diets);
         return res.status(200).json(newRecipe);
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

module.exports = router;

let id = 11
let a = [{id:3},{id:10},{id:90}]; 
let s = a.find( recipe => recipe.id === id);