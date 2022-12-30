
//HANDLER PAGINATE
/////////////////////////////////////////////////////////////////////////////////////////////////////
export const toolNextPaginate = (recipesStore,shortPage, backUp) => {
    let newState = null; //tiene este valor para que no sete el estado local.
    let newShortPage = shortPage;
    if(backUp.length === 9){
        newShortPage = { init: shortPage.init + 9 , finally: shortPage.finally + 9 };
        newState = recipesStore.slice(newShortPage.init,newShortPage.finally);

        return {newState, newShortPage};
    };
    return {newState, newShortPage};
};

export const toolPreviousPaginate = (recipesStore,shortPage) => {
    if(shortPage.init > 0){
        let newShortPage = { init: shortPage.init - 9 , finally: shortPage.finally - 9 };
        let newState = recipesStore.slice(newShortPage.init,newShortPage.finally );
        return {newState, newShortPage};
    }
    return {};
};
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

//HANDLER HEALT SCORE ORDER
/////////////////////////////////////////////////////////////////////////////////////////////////////
export const toolHealthScoreOrderUp = (storeRecipes) => {
    let newArray = storeRecipes.sort(healthScoreOrderUpFunct);
    return newArray;
};
export const toolHealthScoreOrderDown = (storeRecipes) => {
    let newArray = storeRecipes.sort(healthScoreOrderDownFunct);
    return newArray;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
//HANDLER ALPHABETICAL ORDER
/////////////////////////////////////////////////////////////////////////////////////////////////////
export const toolAlphabeticalOrderUp= (storeRecipes) => {
    let newArray = storeRecipes.sort(alphabeticalOrderUpFunct);
    return newArray; 
};
export const toolAlphabeticalOrderDown = (storeRecipes) => {
    let newArray = storeRecipes.sort(alphabeticalOrderDownFunct);
    return newArray;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////
//HANDLER FIND BY DIET
export const toolFindByDiet = (storeRecipes,diet) =>{
    let foundRecipes = findByDietsFunct(storeRecipes,diet);
    return foundRecipes;
};

//////////LOGICA///////////LOGICA/////////////LOGICA///////////////LOGICA////////////////////LOGICA/////
//ORDER HEALTH SCORE
/////////////////////////////////////////////////////////////////////////////////////////////////////
 function healthScoreOrderDownFunct(a,b){
    
    let frst = a.healthScore
    let second = b.healthScore   
    if( frst === second) return 0;
    if( frst > second ) return 1;
     if( frst < second) return -1;
};


function healthScoreOrderUpFunct(a,b){
    let frst = a.healthScore
    let second = b.healthScore   
    if( frst === second) return 0;
    if( frst > second ) return -1;
     if( frst < second) return 1;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

//ORDER ALPHABETICAL
/////////////////////////////////////////////////////////////////////////////////////////////////////
function alphabeticalOrderUpFunct(a,b){
    
    let frst = a.title.toLowerCase();
    let second = b.title.toLowerCase();
        
    if( frst === second) return 0;
    if( frst > second ) return 1;
     if( frst < second) return -1;
};

function alphabeticalOrderDownFunct(a,b){
    let frst = a.title.toLowerCase();
    let second = b.title.toLowerCase();
        
    if( frst === second) return 0;
    if( frst > second ) return -1;
     if( frst < second) return 1;
};

function findByDietsFunct(storeRecipes,dietInput) {
    let newArray = storeRecipes.filter( recipe =>{
        if(recipe.diets.includes(dietInput)) return recipe
    }
    );
    return newArray;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////