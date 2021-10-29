
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourites from './Components/favourites';
import {BrowserRouter as Router,Switch ,Route, BrowserRouter} from 'react-router-dom'
 
function App() {
  return (
    <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact render={(props)=>(
            <>
            <Banner {...props}/>
            <Movies {...props}/>
            </>
          )}/>
          <Route path='/favourites' exact component={Favourites}/>
        </Switch>
        {/* <Banner/>
        <Movies/> */}
        
    
  
    </Router>
  );
}

export default App;
