import { BrowserRouter, Route, Router, Switch, Re } from 'react-router-dom'
import Header from './Headers/Header';
import Preview from './Headers/Preview';
import Posts from './Posts/Post.js'
import WelcomePage from './Welcome/WelcomePage'
import Footer from './Footer'
import Categories from './Categories/Categories'
import Help from './Help/Help'
import Login from './LoginPage/Login'
import Register from './RegisterPage/Register'
import RemindPass from './PasswordRemind/PasswordRemind'
import Comments from './Comments/Comments'

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Preview />
          {<Route path="/" exact component={ WelcomePage }/>}
          <Route path="/posts" exact component={ Posts }/>
          <Route path="/categories" exact component={ Categories }/>
          <Route path="/help" exact component={ Help }/>
          <Route path="/login" exact component={ Login }/>
          <Route path="/register" exact component={ Register }/>
          <Route path="/password_remind" exact component={ RemindPass }/>
          <Route path="/posts/id/comments" exact component={ Comments }/>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
