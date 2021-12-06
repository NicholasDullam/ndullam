import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from '../pages'

const App = (props) => {
    const [width, setWidth] = useState(0)

    const handleResize = (event) => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    })

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

export default App;
