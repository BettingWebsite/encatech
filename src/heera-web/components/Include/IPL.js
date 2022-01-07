import React, { Component } from "react";

class IPL extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="list-group px-5 mt-3">
        <table class="table table-bordered1 font-weight-normal">
          <tbody>
            <tr>
              <td>
                <p className="text">
                  {" "}
                  If IPL fixture of 60 matches gets reduced due to any reason,
                  then all the special fancies will be voided (Match abandoned
                  due to rain/bad light will not be considered in this)
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text">Management decision will be final</p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text">
                  Fancy based on all individual teams and ground are valid only
                  for league stage
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  If any mentioned player doesn't play for 3 consecutive
                  matches, then the bets will be voided. Bets will be voided
                  post the last match the player has played
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Total 1st over runs: Average 6 runs will be given in case
                  match abandoned or over reduced (only 1st innings valid)
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Total 1st 6 over run:- Average 45 runs will be given in case
                  match abandoned or over reduced (Only 1st Innings valid)
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text1">
                  Total fours: Average 25 fours will be given in case match
                  abandoned or over reduced
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Total sixes: Average 10 sixes will be given in case match
                  abandoned or over reduced
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Total Wickets - Average will 12 Wickets be given in case match
                  abandoned or over reduced
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Total Wides - Average 8 wides will be given in case match
                  abandoned or over reduced
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text1">
                  Total Extras - Average 14 extras will be given in case match
                  abandoned or over reduced
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Total Fifties - Average 2 fifties will be given in case match
                  abandoned or over reduced
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text1">
                  Total Caught outs: Average 9 caught out will be given in case
                  match abandoned or over reduced
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text1">
                  Total Bowled:- Average 2 Bowled out will be given in case
                  match abandoned or over reduced
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text1">
                  Total LBW:- Average 1 LBW will be given in case match
                  abandoned or over reduced
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text">
                  At any situation if result is given for any particular event
                  based on the rates given for the same, then the particular
                  result will be considered valid, similarly if the tournament
                  gets canceled due to any reason the previously given result
                  will be considered valid
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Highest innings run - Only first innings is valid .
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Lowest innings run - Only first innings is valid
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text1">
                  Highest over run: Both innings are valid.
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Highest 1st over run in individual match: only first innings
                  is valid.
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Highest Sixes in individual match: Both innings are valid .
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text1">
                  Highest Extras in individual match: Both innings are valid
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text1">
                  Highest Wicket in individual match: Both innings are valid.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text1">
                  Highest 6 over run: - Both innings are valid.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text">Super over will not be included .</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text">
                  In case of any change in venues then the result of ground
                  based events will be calculated based on the actual fixtures
                  at the start time .
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text1">
                  In fastest fifty always the first 50 runs will be considered,
                  for example of R Sharma scores 1st fifty in 17 balls and
                  scores 100 in next 14 balls, fastest 50 will be given based on
                  the balls for the 1st fifty runs .
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text">Sharjah:-</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text1">
                  Total runs in Sharjah:- Average 325 runs will be given in case
                  match abandoned or over reduced (Both innings included)
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text1">
                  Total 1st over runs in Sharjah: Average 6 runs will be given
                  in case match abandoned or over reduced (only 1st innings
                  valid)
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default IPL;
