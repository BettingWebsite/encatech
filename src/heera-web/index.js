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
import casino from "./components/HomePage/casino";
import casino_page from "./components/HomePage/casino_page";
import teenpatti_t20 from "./components/HomePage/teenpatti_t20";
import MatchdetailTest from "./components/HomePage/MatchdetailTest";
import Teenpatti from "./components/HomePage/Teenpatti";
import Dragontiger from "./components/HomePage/Dragontiger";
import OneDayDragontiger from "./components/HomePage/OneDayDragontiger";
import Logout from "./components/LoginPage/Logout";
import Unsetteledbet from "./components/Pages/Unsetteledbet";
import Profitloss from "./components/Pages/Profitloss";
import MyBetList from "./components/Pages/MyBetList";
import changePassword from "./components/Pages/change_password";
import ChangeButtonValue from "./components/Pages/ChangeButtonValue";
import qr_code_login from "./components/Pages/qr_code_login";
import one_day_poker from "./components/HomePage/one_day_poker";
import teen_patti_one_day from "./components/HomePage/teen_patti_one_day";
import teen_patti_t20 from "./components/HomePage/teen_patti_t20";
import sevensevendown from "./components/HomePage/sevensevendown";
import luckyseven from "./components/HomePage/luckyseven";
import luckysevena from "./components/HomePage/luckysevena";
import one_day_teenpatti from "./components/HomePage/one_day_teenpatti";
import dt_one_day from "./components/HomePage/dt_one_day";
import casnio_teen_patti_t20 from "./components/HomePage/casnio_teen_patti_t20";
import casnio_teen_patti_test from "./components/HomePage/casnio_teen_patti_test";
import worli2 from "./components/HomePage/worli2";
import card32a from "./components/HomePage/card32a";
import card32b from "./components/HomePage/card32b";
import poker20 from "./components/HomePage/poker20";
import ab2 from "./components/HomePage/ab2";
import IndianCasino from "./components/HomePage/Indian Casino";
import Provider from "./components/vip casino/Provider";
import Provider1 from "./components/vip casino/Provider1";
import Slots from "./components/vip casino/Slots";
import SuperSpade from "./components/vip casino/SuperSpade";
import Evolution from "./components/vip casino/Evolution";
import Ezugi from "./components/vip casino//Ezugi";
import LiveGame1 from "./components/vip casino/LiveGame1";
import TeenPatti from "./components/vip casino/TeenPatti";
import Seven from "./components/vip casino/Seven";
import A32Card from "./components/vip casino/A32Card";
import AAACard from "./components/HomePage/aaa";
import Poker from "./components/vip casino/Poker";
import Andar from "./components/vip casino/Andar";
import Worli from "./components/vip casino/Worli";
import CasinoQueen from "./components/vip casino/CasinoQueen";
import BlackJack from "./components/Include/BlackJack";
import Baccarat from "./components/Include/Baccarat";
import Roulette from "./components/Include/Roulette";
import CasinoReport from "./components/Pages/CasinoReport";
import Game from "./components/HomePage/Game";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
const Login = () => <LoginPage />;

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <div>
            <Route exact path="/" component={Index} />
            <Route exact path="/matches/:id" component={IndexMatch} />

            <Route exact path="/sport/games/:gameid" component={Game} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Route path="/receive" component={Receive} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/unsetteledbet" component={Unsetteledbet} />
            <Route path="/profitloss" component={Profitloss} />

            <Route path="/changebuttonvalue" component={ChangeButtonValue} />
            <Route path="/emailverify/:vcode" component={emailVerify} />
            <Route path="/matchdetail/:id/:id1/:date/:pmid?" component={Matchdetail} />
            <Route
              path="/matchdetail_test/:id/:id1"
              component={MatchdetailTest}
            />
            <Route path="/lottery" component={Teenpatti} />
            <Route path="/dragontiger" component={Dragontiger} />
            <Route path="/OneDayDragontiger" component={OneDayDragontiger} />

            <Route path="/bethistory" component={MyBetList} />
            <Route path="/change_password" component={changePassword} />
            <Route path="/casino/dt20" component={casino} />
            <Route path="/casino/1dt20" component={casino} />

            <Route path="/casino-page/:id" component={casino_page} />
            <Route path="/qr_code" component={qr_code} />
            <Route path="/casino/teenpatti/t20" component={teenpatti_t20} />
            <Route path="/qr_authenticator" component={qr_code_login} />
            {/* <Route path="/vip-casino" component={Provider} /> */}
            <Route path="/vip-casino" component={Provider1} />
            <Route path="/slots" component={Slots} />
            <Route path="/binary" component={teen_patti_t20} />

            <Route path="/teenpatti-one-day" component={teen_patti_one_day} />
            <Route path="/bigbash" component={one_day_teenpatti} />
            <Route
              path="/casino/teen-patti-t20"
              component={casnio_teen_patti_t20}
            />
             <Route
              path="/casino/teen-patti-test"
              component={casnio_teen_patti_test}
            />
            <Route path="/seven-up-seven-down" component={sevensevendown} />
            <Route path="/luckyseven" component={luckyseven} />

            <Route path="/one-day-poker" component={one_day_poker} />
            <Route path="/casino/dt-one-day" component={dt_one_day} />

            <Route path="/casino/worli2" component={worli2} />
            <Route path="/casino/card32a" component={card32a} />
            <Route path="/casino/card32b" component={card32b} />
            <Route path="/casino/poker20" component={poker20} />
            <Route path="/indiancasino" component={IndianCasino} />
            <Route path="/luckysevena" component={luckysevena} />
            <Route path="/super-spade" component={SuperSpade} />
            <Route path="/evolution" component={Evolution} />
            <Route path="/euzgi_casino" component={Ezugi} />
            <Route path="/games/:game_id" component={LiveGame1} />
            <Route path="/teen-patti" component={TeenPatti} />
            <Route path="/a32-card" component={A32Card} />
            <Route path="/aaa-card" component={AAACard} />
            <Route path="/seven" component={Seven} />
            <Route path="/poker" component={Poker} />
            <Route path="/andar-bahar" component={Andar} />
            <Route path="/casino-queen" component={CasinoQueen} />
            <Route path="/worli" component={Worli} />
            <Route path="/blackjack" component={BlackJack} />

            <Route path="/baccarat" component={Baccarat} />
            <Route path="/roulette" component={Roulette} />
            <Route path="/casino_report" component={CasinoReport} />
            <ToastContainer
              position={toast.POSITION.TOP_CENTER}
              autoClose={3000}
              hideProgressBar
              pauseOnFocusLoss={false}
              pauseOnHover={false}
              transition={Zoom}
            />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
