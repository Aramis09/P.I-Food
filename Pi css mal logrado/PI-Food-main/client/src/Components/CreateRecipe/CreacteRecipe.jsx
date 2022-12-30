import { useEffect, useState } from "react";
import { testInput } from "../../Controllers/toolsForm";

const Create = () => {
    const [formValue, setFromValue] = useState({name:'', resume:'', score:'', steps:''});
    const [warning,setWarning] = useState({});
    
    useEffect(()=> {
        setWarning(testInput(formValue)); // tene cuidado con la asincronia;

    },[formValue.name,formValue.resume,formValue.score,formValue.steps]);
    
    const handlerChangesFrom = (value,typeInput) =>{
        setFromValue({...formValue, [typeInput]:value}); 
    };

    return (
        <section>
            {/* {num} */}
            <h3>Subi tu receta</h3>
            <form action="createRecipe">
                <div>
                    <p>Nombre</p>
                    <input type="text" name="form_name" onChange={(ev) => {handlerChangesFrom(ev.target.value,'name')}}/>
                    <p>{warning.name}</p>
                </div>
                <div>
                    <p>Health score</p>
                    <input type="text" name="form_score" onChange={(ev) => {handlerChangesFrom(ev.target.value,'score')}}/>
                    <p>{warning.score}</p>
                </div>
                <div>
                    <p>Resumen del plato</p>
                    <textarea name="form_resume" onChange={(ev) => {handlerChangesFrom(ev.target.value,'resume')}}></textarea>
                    <p>{warning.resume}</p>
                </div>
                <div>
                    <p>Paso a paso</p>
                    <textarea name="form_steps" onChange={(ev) => {handlerChangesFrom(ev.target.value,'steps')}}></textarea>
                    <p>{warning.steps}</p>
                </div>
                <div>
                    
                </div>
            </form>
        </section>
    );
}

export default Create;