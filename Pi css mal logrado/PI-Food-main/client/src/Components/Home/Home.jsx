import style from './styles/home.module.css'; // hay un problema y se me mezcla los css
import { axiosQueryRecipes,axiosQueryRecipesByname, orderHealthScoreDown, orderHealthScoreUp,orderAlphabeticalUp,orderAlphabeticalDown } from "../../Redux/Actions/Actions";
import { connect } from 'react-redux';
import { useState  ,useEffect } from "react";
import { toolHealthScoreOrderDown, toolHealthScoreOrderUp, toolNextPaginate, toolPreviousPaginate,toolAlphabeticalOrderUp, toolAlphabeticalOrderDown,toolFindByDiet } from '../../Controllers/toolsHome';
import Recipe from '../Recipe/Recipe';
 const Home = ({recipes,foundByname,axiosQueryRecipes,orderHealthScoreUp,orderHealthScoreDown,orderAlphabeticalUp,orderAlphabeticalDown,searchByname }) =>{
    const [recipesLocal,setRecipesLocal] = useState([]);
    const [shortPage,setShortPage] = useState({init:0, finally: 9});
    const [dietsSerach,setDietsSearch] = useState([]);
/////////////////////////////////////////////////////////////////////////////////
    console.log(shortPage);
    useEffect( () => {
        if(!recipes.loaded){
            const getRecipes = async () => {
                axiosQueryRecipes();
            }
            getRecipes();
        };
        if(recipes.loaded) {
            recipes.recipes.forEach(recipe => console.log(recipe.diets))
            let numberOnePage = recipes.recipes.slice(0,9);//
            setRecipesLocal(numberOnePage);
        }
    },[recipes.loaded]);
///////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if(typeof(recipes.order) === 'string') {
            setRecipesLocal(recipes.recipes.slice(0,9))
        };
    },[recipes.order]);

///////////////////////////////////////////////////////////////////////////////////////
useEffect(() => {
    if(foundByname.load) {
        setRecipesLocal(foundByname.matchedRecipes);
        console.log(foundByname.matchedRecipes);
    };
},[foundByname.load]);
    
    function handlerNextPaginate() {
            let recipesStore = recipes.recipes;
            const {newState ,newShortPage} = toolNextPaginate(recipesStore,shortPage,recipesLocal);
            newState? setRecipesLocal(newState) : setRecipesLocal(recipesLocal);
            if(newShortPage)setShortPage(newShortPage);  
    };

    const handlerPreviusPaginate = () => {
        let recipesStore = recipes.recipes;
        const {newState ,newShortPage} = toolPreviousPaginate(recipesStore,shortPage);
        newState? setRecipesLocal(newState) : setRecipesLocal(recipesLocal);
        if(newShortPage)setShortPage(newShortPage);
        
    };
    
    const handlerOrderHealthScoreUp = () => {
        orderHealthScoreUp(toolHealthScoreOrderUp(recipes.recipes));
    };
    const handlerOrderHealthScoreDown = () => {
        orderHealthScoreDown(toolHealthScoreOrderDown(recipes.recipes));
    };
    const handlerOrderalphAbeticalUp = () => {
        orderAlphabeticalUp(toolAlphabeticalOrderUp(recipes.recipes));
    };
    const handlerOrderalphAbeticalDown = () => {
        orderAlphabeticalDown(toolAlphabeticalOrderDown(recipes.recipes));
    };
    const handlerSearchName = (name) => {
        searchByname(name);
        // evento.preventDefault()
        console.log(name)
    };
    const handlerFindByDiet =  dietsString =>{
        let matched = toolFindByDiet(recipes.recipes,dietsString);
        setRecipesLocal(matched);
    };
    
    return(
        <div className={style.fondo}>
            
            {
                recipesLocal.length?
            
            <section>
                <div className={style.types}>
                    <p>Type Diets</p>
                    <hr />
                    <ul>
                        <li><button onClick={() => handlerFindByDiet('gluten free')}>gluten free</button></li>
                        <li><button onClick={() => handlerFindByDiet('dairy free')}>dairy free</button> </li>
                        <li><button onClick={() => handlerFindByDiet('lacto ovo vegetarian')}>lacto ovo vegetarian</button></li>
                        <li><button onClick={() => handlerFindByDiet('vegan')}>vegan</button></li>
                        <li><button onClick={() => handlerFindByDiet('paleolithic')}>paleolithic</button></li>
                        <li><button onClick={() => handlerFindByDiet('primal')}>primal</button></li>
                        <li><button onClick={() => handlerFindByDiet('whole 30')}>whole 30</button></li>
                        <li><button onClick={() => handlerFindByDiet('pescatarian')}>pescatarian</button></li>
                        <li><button onClick={() => handlerFindByDiet('ketogenic')}>ketogenic</button></li>
                        <li><button onClick={() => handlerFindByDiet('fodmap friendly')}>fodmap friendly</button></li>
                        <li><button onClick={() => handlerFindByDiet('vegetarian')}>vegetarian</button></li>
                        <li><button onClick={() => handlerFindByDiet('lacto vegetarian')}>lacto vegetarian</button></li>
                        <li><button onClick={() => handlerFindByDiet('ovo vegetarian')}>ovo vegetarian</button></li>
                        <li><button onClick={() => handlerFindByDiet('paleo')}>paleo</button></li>
                        <li><button onClick={() => handlerFindByDiet('low fodmap')}>low fodmap</button></li>

                    </ul>
            </div>
            <section className={style.filters}>
                <form className={style.search} onSubmit={ ev => {ev.preventDefault();handlerSearchName(ev.target.inputSearch.value)}}>
                            <input type="text" id= 'inputSearch'  /> 
                            <button onClick={() =>  handlerSearchName('Nigerian')}>search</button>
                </form>
                    
                <section className={style.order}>
                    <button onClick={() => handlerOrderHealthScoreUp()}>Healt Score UP</button>
                    <button onClick={() => handlerOrderHealthScoreDown()}>Healt Score Down</button>
                    <button onClick={() => handlerOrderalphAbeticalUp()}>Alphabetical UP</button>
                    <button onClick={() => handlerOrderalphAbeticalDown()}>Alphabetical Down</button>
                </section>
            </section>
            <section className={style.recipes}>
                {
                    (recipesLocal.map( recipe => {
                            const {id, title, healthScore, image} = recipe;
                        
                        return (
                            <Recipe
                            key = {id}
                            title = {title}
                            healthScore = {healthScore}
                            image = {image}
                                
                             />
                        )
                    }))
                }
            </section>
                        <ul>
                            <li><button onClick = {() => handlerNextPaginate()} >siguiente</button></li>
                            <li><button onClick={() => handlerPreviusPaginate()} >anterior</button></li>
                        </ul>
            </section>
            : <p>Cargando ...</p> 
            
            }
        </div>       

    );
};


const mapStateToProps = state => ({
    recipes: state.recipes,
    foundByname: state.recipeByName,
});

const mapDispatchToProps = dispatch => ({
    axiosQueryRecipes: () => dispatch (axiosQueryRecipes()),
    orderHealthScoreUp: (arg) => dispatch(orderHealthScoreUp(arg)),
    orderHealthScoreDown: (arg) => dispatch(orderHealthScoreDown(arg)),
    orderAlphabeticalUp: (arg) => dispatch(orderAlphabeticalUp(arg)),
    orderAlphabeticalDown:(arg) => dispatch(orderAlphabeticalDown(arg)),
    searchByname:(arg) => dispatch(axiosQueryRecipesByname(arg)),
});

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);