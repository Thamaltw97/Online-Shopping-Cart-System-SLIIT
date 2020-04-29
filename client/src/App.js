import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import Navigation from "./components/Shared/Navigation";

class App extends React.Component {

  render() {
    return (
        <div>
            {(
                <div>
                    <Router>
                        <Navigation/>
                    </Router>
                </div>
            )}
        </div>
    );
  }

}

export default App;
