import React, { Component } from 'react';
// 引入路由组件；
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
// 引入组件；
import Home from './pages/home'
import Citylist from './pages/cityList'


// 跟组件建议用类组件；
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/home" component={Home}></Route>
          <Route path="/citylist" component={Citylist}></Route>
          <Link to="/home">首页</Link>
          <Link to="/citylist">Citylist</Link>
        </div>
      </Router >
    );
  }
}

export default App;