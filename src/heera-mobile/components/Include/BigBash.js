import React, { Component } from "react";

class BigBash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="list-group px-5 mt-3">
        <table class="table table-bordered font-weight-normal">
          <tbody>
            <tr>
              <td>
                <p className="text1">
                  {" "}
                  Total match 1st over run:- Average 6 runs will be given if
                  total 20 overs is not played, only 1st innings will be
                  considered as valid
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text1">
                  Highest innings run - Only first innings is valid
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Lowest innings run - Only first innings is valid
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Total 1st 6 over run:- Average 46 runs will be given if total
                  20 overs is not played, This event is valid only for the 1st
                  innings
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Total Fours - Average 25 fours will be given in case match
                  abandoned or over reduced
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Total Sixes - Average 10 sixes will be given in case match
                  abandoned or over reduced
                </p>
              </td>
            </tr>
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
            </tr>{" "}
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
                  Total Caught out - Average 8 catch out will be given in case
                  match abandoned or over reduced
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Total Bowled out - Average 2 bowled out will be given in case
                  match abandoned or over reduced
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text1">
                  Highest 6 over run: Both innings are valid
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text1">
                  Highest Fours in individual match: Both innings are valid
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text1">
                  Highest run in individual match: Both innings are valid
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text1">
                  Highest Sixes in individual match: Both innings are valid .
                </p>
              </td>
            </tr>{" "}
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
                <p className="text1">
                  Highest Wickets in individual match: Both innings are valid
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Highest extras in individual match: Both innings are valid
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Highest match 1st over run in individual match: Only 1st
                  inning will be considered as valid valid
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text">
                  All events related to bowler are valid only for the league
                  stages, both the innings will be considered as valid. A
                  minimum of 32 overs has to be bowled else the same will be
                  voided. If the mentioned bowler has bowled one legal delivery
                  then it will be considered as 1 over even if the over is not
                  completed
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text">
                  Average for wickets taken will be given in case match
                  abandoned or over reduced or the player has not bowled single
                  legal delivery before the over got reduced
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text">
                  Fancy based on all individual teams/players/ground are valid
                  only for league stage
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text">Management decision will be final</p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text">Bellerive Oval:- Hobart</p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Total 1st over run:- Average 6 runs will be given if total 20
                  overs is not played, only 1st innings will be considered as
                  valid
                </p>
              </td>
            </tr>{" "}
          </tbody>
        </table>
      </div>
    );
  }
}

export default BigBash;
