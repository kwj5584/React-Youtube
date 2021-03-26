import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import VideoUploadPage from './views/VideoUploadPage/VideoUploadPage'
import VideoDetailPage from './views/VideoDetailPage/VideoDetailPage'
import SubscriptionPage from './views/SubscriptionPage/SubscriptionPage'
import SearchPage from './views/SearchPage/SearchPage'
import UserPage from './views/UserPage/UserPage';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      {/* <NavBar /> */}
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          {/* <LandingPage/> */}
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path='/video/upload' component={Auth(VideoUploadPage, true)}/> {/** false : 로그인 한 사람은 안되게 , true : 로그인 한 사람만 되게*/}
          <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} />
          <Route exact path="/subscription" component={Auth(SubscriptionPage, null)} />
          <Route exact path="/result" component={Auth(SearchPage, null)}/>
          <Route exact path="/userPage/:userId" component={Auth(UserPage, null)}/>
        </Switch>
      </div>
      {/* <Footer /> */}
    </Suspense>
  );
}

export default App;
