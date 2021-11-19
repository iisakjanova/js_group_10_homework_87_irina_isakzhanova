import {Route, Switch} from "react-router-dom";
import {Typography} from "@material-ui/core";

import Registration from "./containers/Registration/Registration";
import Login from "./containers/Login/Login";
import Layout from "./components/UI/Layout/Layout";
import AddPost from "./containers/AddPost/AddPost";
import Posts from "./containers/Posts/Posts";
import FullPost from "./containers/FullPost/FullPost";

const App = () => {
  return (
      <Layout>
          <Switch>
              <Route path="/" exact component={Posts} />
              <Route path="/posts" exact component={Posts} />
              <Route path="/posts/add" exact component={AddPost} />
              <Route path="/posts/:id" component={FullPost} />
              <Route path="/register" component={Registration} />
              <Route path="/login" component={Login} />
              <Route render={() => <Typography variant="h4">Not found</Typography>} />
          </Switch>
      </Layout>
  );
};

export default App;