import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import Header from './Components/Header/Header';
import  Home  from './Components/Home/Home';
import { Route } from "react-router-dom";
import Create from './Components/CreateRecipe/CreacteRecipe';
function App() {
  return (
    <div className="App">
      <Route exact path = '/'> <LandingPage /> </Route>
      <Route path = '/home'> <Header /> </Route>
      <Route exact path = '/home'> <Home/> </Route>
      <Route exact path='/home/create'> <Create /></Route>
      {/* <Route></Route> */}
    </div>
  );
};

export default App;
