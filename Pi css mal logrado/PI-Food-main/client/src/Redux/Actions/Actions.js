import axios from 'axios';
import { START_GET_RECIPES, SUCCES_GET_RECIPES, ERROR_GET_RECIPES, ORDER_HEALTH_SCORE_UP,ORDER_HEALTH_SCORE_DOWN,ORDER_ALPHABETICAL_UP,ORDER_ALPHABETICAL_DOWN, START_GET_RECIPES_BY_NAME, SUCCES_GET_RECIPES_BY_NAME} from './StringActions';

const startGetRecipes = () => ({type: START_GET_RECIPES});
const succesGetRecipes = payload => ({type: SUCCES_GET_RECIPES, payload});
const errorGetRecipes = () => ({type:ERROR_GET_RECIPES, payload:'Error'});
// export const axiosQueryRecipes = payload => {
//    return async dispatch => {
//     dispatch(startGetRecipes());
//      let response = await axios('http://localhost:3005/recipes')
//      let recipes = await response.data;
//      dispatch(succesGetRecipes(recipes));
//     }
// };

export const orderHealthScoreUp = payload =>({type:ORDER_HEALTH_SCORE_UP , payload: payload});
export const orderHealthScoreDown = payload =>({type:ORDER_HEALTH_SCORE_DOWN , payload: payload});

export const orderAlphabeticalUp = payload => ({type:ORDER_ALPHABETICAL_UP , payload});
export const orderAlphabeticalDown = payload => ({type:ORDER_ALPHABETICAL_DOWN ,  payload});

export const axiosQueryRecipes = payload => {
    return  dispatch => {
     dispatch(startGetRecipes());
      axios('http://localhost:3009/recipes')
      .then(response => {
         dispatch(succesGetRecipes(response.data));
     })
     .catch( error => {
         dispatch(errorGetRecipes( 'Error action'));
   
     });
    };
 };
const startGetRecipesByname = () => ({type:START_GET_RECIPES_BY_NAME});
const succesGetRecipesByname = payload => ({type:SUCCES_GET_RECIPES_BY_NAME ,  payload});

 export const axiosQueryRecipesByname = payload => {
    return  dispatch => {
     dispatch(startGetRecipesByname());
      axios(`http://localhost:3009/recipes?name=${payload}`)
      .then(response => {
         dispatch(succesGetRecipesByname(response.data));
     })
     .catch( error => {
         dispatch(errorGetRecipes( 'Error action'));
   
     });
     };
 };