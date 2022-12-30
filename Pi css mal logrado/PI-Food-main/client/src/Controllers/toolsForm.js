export const  WARNING_NAME = '~Por favor asegurese de poner solo letras y que la primera letra sea mayuscula.'
export const WARNING_RESUME = 'Por favor aseguerese de no execer los 300 caracteres.';
export const WARNING_SCORE = 'Por favor asegurese de introcucir un valor correcto.';
export const WARNING_STEPS = 'Por favor enumere cada paso de esta forma: 1), 2) ... no escriba numeros aparte de estos.';

export const testInput= inputValue => {
    let verification = {name:WARNING_NAME, resume:WARNING_RESUME, score:WARNING_SCORE, steps:WARNING_STEPS};

    if(testName(inputValue.name)) verification.name = 'ok';
    if(testResume(inputValue.resume)) verification.resume = 'ok';
    if(inputValue.score > 0 &&  inputValue.score <= 100) verification.score = 'ok';
    if(testSteps(inputValue.steps)) verification.steps = 'ok';
    return verification;
};


const testName = value =>{
    if(value.length === 0) return false; 
    let characters = value.split('')
    let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', ' '];
    if(characters[0].toLowerCase() === characters[0]) return false; // porque tiene que empezar con mayuscula.
    for(let i = 0 ; i < characters.length ; i++){
        if(!alphabet.includes(characters[i].toLowerCase())) return false;
    };
    return true;
};


const testResume = value => {
    if(typeof(value) === 'number') return false ;
    if(value.length > 500 || !value.length) return false;
    return true;
};

const testSteps = value =>{
    if(!value.length) return false;
    let characters = value.split('');
    let enumerate = 0;
    for (let i = 0; i < characters.length; i++) {
        if(Number(characters[i])) enumerate = enumerate + 1 ;
        if(Number(characters[i]) && characters[i+1] !== ')'){
            return false;
        };
    };
    if(!enumerate) return false; //quiere decir que el usuario no enumero nada.
    return true
};
//(expresion.test(input.value)