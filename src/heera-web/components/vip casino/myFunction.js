import React from "react";
import { Helmet } from "react-helmet";
import TvbetFrame from "./myScript";
import { Card, Row, Col } from "react-bootstrap";
class Demo extends React.Component {
    ModalOpen = (Id) => {
      let {url} =   new TvbetFrame({
            lng: "en",
            clientId: "3821",
            tokenAuth: "8fgi340g3oif039efj3jef039ejfoerjg",
            server: "https://tvbetframe27.com/",
            floatTop: "#fTop",
            containerId: "tvbet-game",
            singleGame: true,
            game_id: Id,
        });

        console.log("@@@@@@@url",url);
    }

    render() {
        return (
            <div className="application">
                <Card
                    onClick={() => {
                        this.ModalOpen(5);
                    }}
                    style={{ cursor: "pointer" }}
                >
                    <Card.Img
                        src="https://dzm0kbaskt4pv.cloudfront.net/v1/static/img/livecasino/livecasinogaming.jpg"
                        height="180px"
                    />

                    <Card.Footer
                        className="text-center casino-name text-uppercase"
                    >
                        <span className="text-white providerCard">SUPERSPADE CASINO</span>
                    </Card.Footer>
                </Card>
                
              {/* <LiveStremEvolution
                show={showLiveStrem}
                handleCloseModel={() => this.liveStremModalClose()}
                result={result}
                isLoding={isLoding}
              /> */}
            </div>
            
        );
    }
};

export default Demo;