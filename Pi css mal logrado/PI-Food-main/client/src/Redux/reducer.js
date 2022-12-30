import { START_GET_RECIPES, SUCCES_GET_RECIPES ,ERROR_GET_RECIPES, ORDER_HEALTH_SCORE_DOWN, ORDER_HEALTH_SCORE_UP,ORDER_ALPHABETICAL_UP,ORDER_ALPHABETICAL_DOWN, START_GET_RECIPES_BY_NAME,SUCCES_GET_RECIPES_BY_NAME} from './Actions/StringActions';



const initialState = {
    recipes: {
        loading: false, 
        loaded: false,
        order: false,
        recipes: null 
    },
    recipeByName:{
        searching:false,
        load:null,
        matchedRecipes: null,
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case START_GET_RECIPES : 
            return {
                ...state,
                recipes:{
                    loading:true,
                    loaded: false,
                    order: false,
                    recipes: null
                }, 
            };
        case SUCCES_GET_RECIPES : 
            return {
                ...state,
                recipes:{
                    loading:false,
                    loaded: true,
                    order: false,
                    recipes: action.payload,
                },
            };
        case ERROR_GET_RECIPES:
            return {
                ...state,
                recipes: {
                    loading:false,
                    loaded: false,
                    order: false,
                    recipes:null,
                    error:action.payload
                }
            };
        case ORDER_HEALTH_SCORE_DOWN :
            return {
                ...state,
                recipes: {
                    loading:false,
                    loaded: true,
                    order: 'healthScore_down',
                    recipes:action.payload,
                    error:action.payload
                }
            };
        case ORDER_HEALTH_SCORE_UP :
            return {
                ...state,
                recipes: {
                    loading:false,
                    loaded: true,
                    order: 'healthScore_up',
                    recipes:action.payload,
                    error:action.payload
                }
            };
        case ORDER_ALPHABETICAL_UP:
            return {
                ...state,
                recipes:{
                    loading:false,
                    loaded: true,
                    order: 'alphabetical_up',
                    recipes:action.payload,
                    error:action.payload
                }
            };
        case ORDER_ALPHABETICAL_DOWN: 
            return{
                ...state,
                recipes:{
                    loading:false,
                    loaded: true,
                    order: 'alphabetical_down',
                    recipes:action.payload,
                    error:action.payload
                }
            };
        case START_GET_RECIPES_BY_NAME:
            return {
                ...state,
                recipeByName:{
                    searching:true,
                    load:false,
                    matchedRecipes: null,
                },
            };
        case SUCCES_GET_RECIPES_BY_NAME:
            return {
                ...state,
                recipeByName:{
                    searching:false,
                    load:true,
                    matchedRecipes: action.payload,
                },
            };

        default:
            return { ...state };
    };

};

export default reducer;