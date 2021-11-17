import {Route, Switch} from "react-router-dom";
import {Typography} from "@material-ui/core";

import Registration from "./containers/Registration/Registration";
import Login from "./containers/Login/Login";

const App = () => {
  return (
      <Switch>
        <Route path="/register" component={Registration}/>
        <Route path="/login" component={Login}/>
        <Route render={() => <Typography variant="h4">Not found</Typography>} />
      </Switch>
  );
};

export default App;