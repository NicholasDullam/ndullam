import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PaymentRouter from './PaymentRouter'
import { Create, Home, Login } from '../pages'

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
      <div className="h-screen w-full">
        <Router>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/create' component={Create}/>
            <Route path='/payment' component={PaymentRouter}/>
          </Switch>
        </Router>
      </div>
    )
}

export default App;
