import React, {Component} from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Site/Footer';
import Home from './components/Site/Home';
import AdminView from './components/Site/AdminView';
import SiteNav from './components/Site/SiteNav';
import PostIndex from './components/User/Post/PostIndex';
import Favorites from './components/Search/Favorites';

type userTypes = {
  token: string
  Role: string
}

export default class App extends Component<{}, userTypes> {
  constructor(props: userTypes){
    super(props)
    this.state = {
      token: '',
      Role: '',
    }
  }

  componentDidMount() {
    if (localStorage.getItem('sessionToken')) {
      this.setState({
        token: localStorage.getItem('sessionToken')!,
      })
    }
    if (localStorage.getItem('Role')) {
      this.setState({ Role: localStorage.getItem('Role')! })
    }
  }

  updateIsAdmin = (newRole: string) => {
    localStorage.setItem('Role', newRole)
    this.setState({ Role: newRole })
  }

  updateToken = (newToken: string) => {
    localStorage.setItem('sessionToken', newToken)
    this.setState({ token: newToken})
  }

  clearToken = () => {
    localStorage.clear()
    this.setState({ token: '', Role: ''})
  }

  protectedAdminViews = () => {
    return localStorage.getItem('Role') === 'admin' ? (
      <AdminView token={this.state.token} />
    ) : (
      <Home token={this.state.token} />
    )
  }

  protectedViews = () => {
    return this.state.token === localStorage.getItem('sessionToken') ? (
      <Home token={this.state.token} />
    ) : (
      <Auth updateToken={this.updateToken} updateIsAdmin={this.updateIsAdmin} />
    )
  }

  render() {
    return (
      <div className='App'>
        {this.state.token  && (
          <SiteNav
            logout={this.clearToken}
            token={this.state.token}
            Role={this.state.Role}
            />
        )}
        <Router>
        <Switch>
          <Route exact path='/'>
            {this.protectedViews}
          </Route>
           <Route exact path='/post'>
            <PostIndex token={this.state.token} />
          </Route>
          <Route exact path='/admin' component={AdminView}>
            {this.protectedAdminViews}
          </Route>
          <Route exact path='/favorites'>
            <Favorites token={this.state.token} />
          </Route>
        </Switch> 
        </Router>
        <Footer/>
      </div>
    )
  }
}


