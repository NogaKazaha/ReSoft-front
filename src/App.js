import { BrowserRouter, Route, Router, Switch, Re } from 'react-router-dom'
import React, {useState, useEffect} from 'react';
import Header from './Headers/Header';
import Posts from './Posts/Post.js'
import WelcomePage from './Welcome/WelcomePage'
import Footer from './Footer'
import Categories from './Categories/Categories'
import Login from './LoginPage/Login'
import Register from './RegisterPage/Register'
import PasswordReset, {ForgotPassword} from './PasswordReset/PasswordReset'
import Comments from './Comments/Comments'
import MyProfile, {UpdateMyProfile} from './MyProfile/MyProfile';
import OneCategory from './Categories/OneCategory';
import Users from './Users/Users';
import OneUser from './Users/OneUser';
import OnePost from './Posts/OnePost';
import UpdateOnePost from './Posts/UpdateOnePost';
import UpdateOneComment from './Comments/UpdateOneComment';

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={ WelcomePage }/>
          <Route path="/posts" exact component={ Posts }/>
          <Route path='/posts/:id' exact component = {OnePost} />
          <Route path='/posts/update/:id' exact component = {UpdateOnePost} />
          <Route path="/categories" exact component={ Categories }/>
          <Route path='/categories/:id' component = {OneCategory} />
          <Route path="/users" exact component={ Users }/>
          <Route path='/users/:id' component = {OneUser} />
          <Route path="/login" exact component={ Login }/>
          <Route path="/register" exact component={ Register }/>
          <Route path="/password_reset" exact component={ PasswordReset }/>
          <Route path="/password_reset/:token" exact component={ ForgotPassword }/>
          <Route path="/comments/:id" exact component={ Comments }/>
          <Route path="/comments/update/:id" exact component={ UpdateOneComment } />
          <Route path="/me" exact component={ MyProfile }/>
          <Route path="/me/update" exact component={ UpdateMyProfile }/>
        </Switch>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
