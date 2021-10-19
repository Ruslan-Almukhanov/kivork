import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Tickets, DetailedTicket } from "./components";
import { ApiService } from "../api";

interface AppProps {
  apiService: ApiService;
}

const App = ({ apiService }: AppProps) => {
  return (
    <div className="app">
      <div className="container">
        <Router>
          <Switch>
            <Route path="/" exact>
              <Tickets apiService={apiService} />
            </Route>
            <Route path="/:id" exact>
              <DetailedTicket apiService={apiService} />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;
