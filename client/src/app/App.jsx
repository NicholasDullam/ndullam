import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import PaymentRouter from './PaymentRouter'
import { Create, Home, Login, NewHome } from '../pages'
import startSoundFile from '../audio/start.mp3'

const App = (props) => {
    const [width, setWidth] = useState(0)

    const handleResize = (event) => {
        setWidth(window.innerWidth)
    }

    const unlockAudio = () => {
        console.log('Unlocked audio for Safari')
        const sound = new Audio(startSoundFile);
    
        sound.play();
        sound.pause();
        sound.currentTime = 0;
    
        window.removeEventListener('click', unlockAudio)
        window.removeEventListener('touchstart', unlockAudio)
    }
    
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        window.addEventListener('click', unlockAudio)
        window.addEventListener('touchstart', unlockAudio)

        return () => {
            window.removeEventListener('click', unlockAudio)
            window.removeEventListener('touchstart', unlockAudio)
            window.removeEventListener('resize', handleResize)
        }
    })

    return (
      <div className="w-full" style={{ height: '100dvh' }}>
        <Router>
          <Switch>
            <Route path='/' exact component={NewHome}/>
            <Route path='/sandbox/:env_id' component={Home}/>
            <Route path='/sandbox' exact component={Home}/>
            <Route path='/' render={(props) => <Redirect to={'/'}/>}/>
            {/*<Route path='/login' component={Login}/>
              <Route path='/create' component={Create}/>
              <Route path='/payment' component={PaymentRouter}/>*/}
          </Switch>
        </Router>
      </div>
    )
}

export default App;
