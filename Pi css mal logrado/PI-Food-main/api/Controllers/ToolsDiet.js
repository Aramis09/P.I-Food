const { TypeOfDiet }= require('../src/db');


const addDietsToDB= async () =>{
    try {
        let dietsInDB = await TypeOfDiet.findAll();
        console.log(dietsInDB)
        if(dietsInDB.length) return dietsInDB;
        let diets = [
            {id:1,name:"gluten free"},
            {id:2,name:"dairy free"},
            {id:3,name:"lacto ovo vegetarian"},
            {id:4,name:"vegan"},
            {id:5,name:"paleolithic"},
            {id:6,name:"primal"},
            {id:7,name:"whole 30"},
            {id:8,name:"pescatarian"},
            {id:9,name:"ketogenic"},
            {id:10,name:"fodmap friendly"},
            {id:11,name:"vegetarian"},
            {id:12,name:"lacto vegetarian"},
            {id:13,name:"ovo vegetarian"},
            {id:14,name:"paleo"},
            {id:15,name:"low fodmap"}
        ];
        const list = await TypeOfDiet.bulkCreate(diets);
        return list;
    } catch (error) {
        return error.message; 
    }
};

module.exports ={ 
    addDietsToDB,
};