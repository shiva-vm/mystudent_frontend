
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginPage from './component/login'
import SignUp from './component/signup'
import Profile from './component/profile';
import Edit from './component/Edit'
function App() {
  return (
    <Router>

      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/myprofile">
          <Profile />
        </Route>
        <Route exact path="/edit">
          <Edit/>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
