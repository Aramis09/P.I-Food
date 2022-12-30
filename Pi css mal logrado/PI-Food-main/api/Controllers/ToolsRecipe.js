const axios = require('axios');
const { Recipe, TypeOfDiet } = require('../src/db');

const listCompleteOfRecipes = async () => {
    let recipesDB = await listRecipesDbQuery();
    let recipesApi = await listRecipeAxiosQuery();
    const completList = recipesDB.concat(recipesApi);   
    return completList;
};

//Obtiene todas las recetas de la API externa, se cambio de api debido a las limitaciones de la original.
const listRecipeAxiosQuery = async () => {
    try {
     //axios('https://api.spoonacular.com/recipes/complexSearch?apiKey=c35a7e4387ac4d76b39907f4ae40ba6c&addRecipeInformation=true&number=100')
    const response= await axios('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5');
    const allRecipes = await response.data.results;
    return allRecipes;

    } catch (error) {
        return 'This is a flag to alert that the Api was break down'
    };
};
//Obtiene todas las resetas de la base de datos.
const listRecipesDbQuery = async () => {
    const response = await Recipe.findAll();
    const recipesInDb = [];
    await response.forEach( recipe => {
        recipesInDb.push(recipe.dataValues)
    })
    return recipesInDb;
};
//tienes que cambiarlo, si usas la busqueda que propone la api rompes el id, sin mebargo el find que usas mas abajo tampoco funciona.
const recipeFindByIdAxiosQuery = async (id) =>{
    try {
        const response = await listRecipeAxiosQuery();
        const foundApi = await response.find( recipe => Number(recipe.id) === Number(id));
        if(foundApi) return foundApi;
        const listRecipesDb = await listRecipesDbQuery();
        const foundDBb = listRecipesDb.filter( recipe => Number(recipe.id) === Number(id));
        if(foundDBb) return foundDBb;
        return 'Not found none recipe with that id'


    } catch (error) {
        return 'This is a flag to alert that the Api was break down';
    };
};

//Busca si hay coicidencias entre el nombre ingresado y el  de la api. ESto devuelvo los resultados en orden.
const findRecipeByname = async (name) => {
    try {
        const listRecipesInAPi = await listRecipeAxiosQuery();
        const listRecipesInDb = await listRecipesDbQuery();
        // const listRecipes = await listRecipeAxiosQuery();
        const listRecipes = [...listRecipesInAPi,...listRecipesInDb];
        if(typeof(listRecipes) === 'string') throw new Error('Error, The Api probably  was break down right now');
        let hightCoincidences = []; //Almacena los juegos que tienen alta coincidencia con el name pasado
        let lowCoincidences = [];   //Almacena los juegos que tienen baja coincidencia con el name pasado
        listRecipes.forEach(recipeCurrent => {
            let nameRecipeApiArray = recipeCurrent.title.toLowerCase().split(',').join('').split(' ');
            const nameRecipeSearchArray = name.toLowerCase().split(',').join('').split(' ');
            let coincidences = 0;
            for(const index in nameRecipeSearchArray){
                if(nameRecipeApiArray.includes(nameRecipeSearchArray[index])) {
                  coincidences++
                }
            }
            if(coincidences >= 2) hightCoincidences.push(recipeCurrent);
            else if(coincidences) lowCoincidences.push(recipeCurrent);
        });
        const allRecipeMatchByName = [...hightCoincidences,...lowCoincidences];
        
        if(!allRecipeMatchByName.length)  throw new Error('Cannot found Recipes with the entry name'); 
        if(allRecipeMatchByName.length < 15 && allRecipeMatchByName.length) return allRecipeMatchByName;
        if(allRecipeMatchByName.length > 15) {
        const first15Recipes = allRecipeMatchByName.slice(0,16);
        return first15Recipes;
        };
    } catch (error) {
        return error.message;
    };
};

const findRecipeById = async (id) => {
    try {
        const recipeFound = await recipeFindByIdAxiosQuery(id);
        if(typeof(recipeFound) === 'string') throw new Error('Error, The Api probably  was break down right now');
        return recipeFound
    } catch (error) {
        return error.message;
    };
};
 //arreglar esto de abajo
const createID = async () =>{
    const listRecipesDB = await Recipe.findAll();
    console.log(await listRecipesDbQuery());
    if(!listRecipesDB.length) return  id = 1195753; // mucho mayor al mayor de la api
    let mayorID = 0;
    for(let i = 0 ; i < listRecipesDB.length ; i++){
        if(mayorID < listRecipesDB[i]['dataValues']['id']) {
            mayorID = listRecipesDB[i]['dataValues']['id'];
        };
    };
    let idUnique = mayorID + 1;
    return idUnique;

};
//completar
const associationRecipesWithDiets = async (newRecipe,name) => {
    try {
        let dietReationShip = await TypeOfDiet.findAll({where:{name}});
        if(!dietReationShip) throw new Error('Please, enter a type diet valid')
        newRecipe.addTypeOfDiet(dietReationShip);
    } catch (error) {
        
    }
};

// const xx = async () => {
//     let response = await axios('https://api.spoonacular.com/recipes/complexSearch?apiKey=c35a7e4387ac4d76b39907f4ae40ba6c&addRecipeInformation=true&number=100');
//     let list = await response.data.results
//     let mayorID = 0
//     for(let i = 0 ; i < list.length ; i++){
//         console.log(mayorID)
//         if(mayorID < list[i].id) {
//             mayorID = list[i].id;
//         };
//     };
//     return mayorID;
// }
//////////////////////////////////////////DIETS//////////////////////////////////////////////



module.exports = { 
    listRecipeAxiosQuery, 
    findRecipeByname,
    findRecipeById,
    createID,
    associationRecipesWithDiets,
    listCompleteOfRecipes,
}