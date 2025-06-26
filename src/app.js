import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CyberResilienceScorecard from './CyberResilienceScorecard';
import Results from './Results';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CyberResilienceScorecard} />
        <Route path="/results" component={Results} />
      </Switch>
    </Router>
  );
}

export default App;