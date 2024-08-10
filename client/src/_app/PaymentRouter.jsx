import { useEffect, useState } from "react"
import { Route, Switch } from "react-router"
import { FriendNav, PaymentNav } from "../components"
import { PaymentHome } from "../pages"
import { Loading } from '../components'

const PaymentRouter = (props) => {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Loading/>
            <PaymentNav className="flex-none"/>
            <div className="flex grow h-full">
                <FriendNav/>
                <div className="w-full h-full bg-neutral-100 text-black overflow-y-scroll p-7">
                    <Switch>
                        <Route path={props.match.url + '/'} component={PaymentHome}/>
                        <Route path={'/'}/>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default PaymentRouter