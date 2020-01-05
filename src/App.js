import React, { Component } from 'react';
// 引入路由组件；
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// 引入组件；
import Home from './pages/home'
import Citylist from './pages/cityList'
import Map from './pages/Map'


// 跟组件建议用类组件；
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/home" />
              }}
            />
            {/* <Redirect exact from="/" to="/home"/> */}
            <Route path="/home" component={Home} />
            <Route path="/citylist" component={Citylist} />
            <Route path="/map" component={Map} />
          </Switch>
        </div>
      </Router >
    );
  }
}

export default App;