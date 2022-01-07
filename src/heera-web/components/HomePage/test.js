
var express = require('express');
var app = express();
var fs = require("fs");
const colors = require('colors');
const signalR = require("@microsoft/signalr");

var vUri = "http://a112.thebetmarket.com/SignalR";




    var connection = new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Trace)
        .withUrl(vUri)
        .withAutomaticReconnect()
        .build();


    connection.on('Rate', function (marketrate) {

        const data = JSON.stringify(marketrate, null, 4);
        response.write(data);

        var marketData = {};
        var events = [];

        marketData['mi'] = marketrate['mi'];
        marketData['ms'] = marketrate['ms'];
        marketData['tm'] = marketrate['tm'];


        for (var key in marketrate['rt']) {

            var eventsResponse = {};
            var backCount = 0;
            var layCount = 0;

            if (!(events.find(mid => mid.SelectionId == marketrate['rt'][key]['si']))) {

                eventsResponse['SelectionId'] = marketrate['rt'][key]['si'];
                eventsResponse['BackPrice1'] = 0.0
                eventsResponse['BackSize1'] = 0.0
                eventsResponse['BackPrice2'] = 0.0
                eventsResponse['BackSize2'] = 0.0
                eventsResponse['BackPrice3'] = 0.0
                eventsResponse['BackSize3'] = 0.0
                eventsResponse['LayPrice1'] = 0.0
                eventsResponse['LaySize1'] = 0.0
                eventsResponse['LayPrice2'] = 0.0
                eventsResponse['LaySize2'] = 0.0
                eventsResponse['LayPrice3'] = 0.0
                eventsResponse['LaySize3'] = 0.0

                for (var i in marketrate['rt']) {

                    if (eventsResponse['SelectionId'] == marketrate['rt'][i]['si']) {

                        if (marketrate['rt'][i]['ib'] == true) {
                            backCount++;
                            eventsResponse['BackPrice' + backCount] = marketrate['rt'][i]['re'];
                            eventsResponse['BackSize' + backCount] = marketrate['rt'][i]['rv'];
                        }
                        else {
                            layCount++;
                            eventsResponse['LayPrice' + layCount] = marketrate['rt'][i]['re'];
                            eventsResponse['LaySize' + layCount] = marketrate['rt'][i]['rv'];
                        }

                    }

                }

                events.push(eventsResponse);
            }

        }


        marketData['events'] = events;


        try {

            fs.writeFileSync(marketrate['mi'] + '.json', JSON.stringify(marketData, null, 4));
            console.log(`${marketrate["mi"]} JSON data is saved.`.green);

        } catch (error) {
            console.error(error);
        }

    });


    connection.start()
        .then(function (vobj) {

            fs.readFile('input.json', (err, data) => {

                if (err) throw err;

                let marketIds = JSON.parse(data);

                for (var id in marketIds) {
                    connection.invoke('ConnectMarketRate', marketIds[id]['pmid']);
                }

            });
        })
        .catch(error => {
            console.error(error.message);
        });




