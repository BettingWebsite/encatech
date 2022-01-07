/* eslint-disable */
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from "./components/HomePage/Index";
import IndexMatch from "./components/HomePage/Index";
import LoginPage from "./components/LoginPage/LoginPage";
import qr_code from "./components/LoginPage/qr_code";
import Register from "./components/Register/Register";
import emailVerify from "./components/Register/emailVerify";
import Receive from "./components/Receive/Receive";
import Transactions from "./components/Transactions/Transactions";
import Matchdetail from "./components/HomePage/Matchdetail";
import Teenpatti from "./components/HomePage/Teenpatti";
import Dragontiger from "./components/HomePage/Dragontiger";
import Logout from "./components/LoginPage/Logout";
import Unsetteledbet from "./components/Pages/Unsetteledbet";
import Profitloss from "./components/Pages/Profitloss";
import MyBetList from "./components/Pages/MyBetList";
import changePassword from "./components/Pages/change_password";
import ChangeButtonValue from "./components/Pages/ChangeButtonValue";
import qr_code_login from "./components/Pages/qr_code_login";
import IndianCasino from "./components/HomePage/InPlay";
import Slots from "./components/vip casino/Slots";
import SuperSpade from "./components/vip casino/SuperSpade";
import Evolution from "./components/vip casino/Evolution";
import Ezugi from "./components/vip casino//Ezugi";
import TeenPatti from "./components/vip casino/TeenPatti";
import Seven from "./components/vip casino/Seven";
import Poker from "./components/vip casino/Poker";
import Andar from "./components/vip casino/Andar";
import BlackJack from "./components/Include/BlackJack";
import Baccarat from "./components/Include/Baccarat";
import Roulette from "./components/Include/Roulette";
import MobileCasino from "./components/Include/MobileCasino";
import Election from "./components/Header/Election";
import Binary from "./components/HomePage/Binary";
import CasinoReport from "./components/Pages/casino_report";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "./index1.css";
const Login = () => <LoginPage />;

class App extends Component {
  render() {
    return (
      <Router>
        <div className="">
          <Route exact path="/" component={Index} />
          <Route exact path="/matches/:id" component={IndexMatch} />
          <Route path="/inplay/:id" component={IndianCasino} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/receive" component={Receive} />
          <Route path="/transactions" component={Transactions} />
          <Route path="/unsetteledbet" component={Unsetteledbet} />
          <Route path="/profitloss" component={Profitloss} />

          <Route path="/changebuttonvalue" component={ChangeButtonValue} />
          <Route path="/emailverify/:vcode" component={emailVerify} />
          <Route path="/matchdetail/:id/:id1/:date" component={Matchdetail} />

          <Route path="/lottery" component={Teenpatti} />
          <Route path="/dragontiger" component={Dragontiger} />

          <Route path="/bethistory" component={MyBetList} />
          <Route path="/change_password" component={changePassword} />
          <Route path="/qr_code" component={qr_code} />
          <Route path="/qr_authenticator" component={qr_code_login} />
          <Route path="/slots" component={Slots} />
          <Route path="/binary" component={Binary} />
          <Route path="/election" component={Election} />
          <Route path="/super-spade" component={SuperSpade} />
          <Route path="/evolution" component={Evolution} />
          <Route path="/euzgi_casino" component={Ezugi} />
          <Route path="/teen-patti" component={TeenPatti} />
          <Route path="/seven" component={Seven} />
          <Route path="/poker" component={Poker} />
          <Route path="/andar-bahar" component={Andar} />
          <Route path="/blackjack" component={BlackJack} />

          <Route path="/baccarat" component={Baccarat} />
          <Route path="/roulette" component={Roulette} />
          <Route path="/casino" component={MobileCasino} />

          <Route path="/casino_report" component={CasinoReport} />
          
            <ToastContainer
              position={toast.POSITION.TOP_CENTER}
              className="px-3 pt-1 mt-1"
              autoClose={5000}
              hideProgressBar
              pauseOnFocusLoss={false}
              pauseOnHover={false}
              transition={Zoom}
            />
        </div>
      </Router>
    );
  }
}

export default App;
