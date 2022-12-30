import style from './style/recipe.module.css';
import { Link } from "react-router-dom";
import icon from './style/images/icon.png';
 const Recipe = (dataRecipe) => {
    return (
        <div className={style.recipeOne}>
            <button className={style.buttonFavorite}>Favorite<img src={icon} alt="" className={style.favorite}/></button>
            <p>{dataRecipe.title}</p>
            <img src= {dataRecipe.image} alt="img_recetas" className={style.images} />
            <p>{dataRecipe.healthScore}</p>
            <Link><button>Detalles</button></Link>
        </div>
    );


};

export default Recipe;