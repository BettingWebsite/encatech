import React, { Component } from "react";

class LounchFavourite extends Component {
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
                <p className="text">
                  1. The team which is favourite at lunch will be considered as
                  lunch favourite or the team which is favourite after first
                  inning last ball will be considered as lunch favourite in our
                  exchange.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text">
                  2. In any circumstances management decision will be final.
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text">
                  3. In case of tie in T20 or one day in lunch favourite game ,
                  all bets will be deleted in our exchange.
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text">
                  4. In case overs are reduced in a match, the team which
                  favourite at lunch will be considered as lunch favourite.
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  4.1 For example :- if match is reduced to 18 over per side in
                  t20 or Oneday then after 18 over the team which is favourite
                  at lunch will be considered as lunch favourite.
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text">
                  5. In case of weather, 1st innings match overs are reduced and
                  direct target is given to team which will bat in 2nd inning
                  then lunch favourite will be considered after target is given
                  at lunch.
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  5.1 For example :- in T20 match rain comes at 14 over and
                  match is interrupted due to rain and direct target is given to
                  2nd batting team, then team which is favourite in match odds
                  after target is given in match, will be considered as lunch
                  favourite.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default LounchFavourite;
