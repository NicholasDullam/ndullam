import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from '../pages'

class App extends Component {
  render() {
    return (
      <div className="App" style={{ height: '100vh', width: '100%' }}>
        <Router>
          <Switch>
            <Route path='/' exact component={Home}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
