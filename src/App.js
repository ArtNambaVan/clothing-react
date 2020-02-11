import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions'
import PageWrapper from './components/page-wrapper/page-wrapper.component'

import './App.css';



class App extends React.Component {
    unsubscribeFromAuth = null

    componentDidMount() {
        const { setCurrentUser } = this.props

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    })
                })
            } else {
                setCurrentUser(userAuth)
            }
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth()
    }
    
    render() {
        return (
            <div className="page">
                <Header/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route exact path='/signin' render={() => {
                        return this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage/>)
                    }}/>
                </Switch>
                <PageWrapper hidden={this.props.hidden}/>
            </div>
        );
    }
}

const mapStateToProps = ({ user, cart }) => ({
    currentUser: user.currentUser,
    hidden: cart.hidden
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
