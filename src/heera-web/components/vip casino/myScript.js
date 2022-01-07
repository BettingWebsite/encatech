

export default function TvbetFrame(params) {
    this.params = {
        'lng': 'en',
        'tokenAuth': false,
        'clientId': false,
        'server': false,
        'containerId': 'tvbet-game',
        'scrollContainer': false,
        'game_id': false,
        'page': false,
        'nojackpot': false,
        'nosoon': false,
        'nofloat': false,
        'floatTop': false,
        'exitUrl': false,
        'singleGame': false,
        'checkAccess': true,
        'pinned': false,
    };

    this.extend = function (oldParams, newParams) {
        newParams = newParams || {};
        var objs = [oldParams, newParams],
            result = objs.reduce(function (r, o) {
                Object.keys(o).forEach(function (k) {
                    r[k] = o[k];
                });
                return r;
            }, {});
        return result;
    };

    this.getUrl = function () {
        var url = this.params.server;
        var p = [];
        var nav = '';
        for (var key in this.params) {
            var param = this.params[key];
            switch (key) {
                case 'server':
                case 'floatTop':
                case 'containerId':
                    break;
                case 'game_id': {
                    if (param) {
                        nav = '#/game_id/' + param;
                    }
                    break;
                }
                case 'page': {
                    if (param) {
                        nav = '#/';
                        if (Array.isArray(param)) {
                            nav = nav + param.join("/");
                        } else {
                            nav = nav + param;
                        }
                    }
                    break;
                }
                case 'checkAccess': {
                    if (param === false || param === 'false') {
                        p.push(key + "=false");
                    }
                    break;
                }
                default: {
                    if (param) {
                        if (param === true || param === 'true') {
                            p.push(key + "=" + 1);
                        } else {
                            p.push(key + "=" + encodeURIComponent(param));
                        }
                    }
                }
            }

        }
        url = this.params.server + "?" + p.join("&") + nav;
        return url;
    };
    // this.setFrame = function (url) {

    //     var ifrm = document.createElement('iframe');
    //     ifrm.style.width = '1px';
    //     ifrm.style.minWidth = '100%';
    //     ifrm.setAttribute('src', url);
    //     ifrm.setAttribute('frameborder', 0);
    //     ifrm.setAttribute('scrolling', 'no');
    //     ifrm.setAttribute('allowfullscreen', '');
    //     ifrm.setAttribute('allow', 'autoplay');
    //     ifrm.setAttribute('id', 'tvbet-iframe');
    //     this.container.appendChild(ifrm);
    //     ifrm.addEventListener('load', function () {
    //         this.sendMessage({ 'tvbet_vh': this.getVh() });
    //     }.bind(this));
    //     return ifrm;
    // };
    // this.changeHeigthGameField = function (height) {
    //     height = parseInt(height);
    //     if (height != 'NaN' && height > 0) {
    //         this.iframe.style.height = height + 'px';
    //     }
    // };
    this.listenMessage = function (event) {
        var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
        if (this.isJSON(event.data)) {
            var data = JSON.parse(event.data);
            if (typeof (data.tvbet_height) !== 'undefined') {
                this.changeHeigthGameField(data.tvbet_height)
                this.sendMessageUp({
                    'game_field_height': data.tvbet_height
                });
            } else if (typeof (data.tvbet_scrollto) !== 'undefined') {
                this.scrollTo(data.tvbet_scrollto, 300)
                this.sendMessageUp({
                    'game_field_scrollto': data.tvbet_scrollto
                });
            } else if (typeof (data.game_field_scroll) !== 'undefined') {
                this.sendMessage({
                    'tvbet_scroll_position': data.game_field_scroll
                });
            }
        }
    };
    this.sendMessage = function (data) {
        if (typeof this.iframe !== 'undefined' && typeof this.iframe.contentWindow !== 'undefined' && typeof this.iframe.contentWindow !== null) {
            this.iframe.contentWindow.postMessage(JSON.stringify(data), '*');
        }
    };
    this.sendMessageUp = function (data) {
        window.parent.postMessage(JSON.stringify(data), '*');
    };
    this.getVh = function () {
        var vh = 0;
        if (window.parent === window) {
            vh = window.innerHeight;
        } else {
            try {
                vh = window.parent.window.innerHeight;
            } catch (e) {
                vh = window.screen.height;
            }
        }
        if (this.floatTop) {
            vh = vh - this.floatTop.getBoundingClientRect().height;
        }
        return vh;
    };
    this.isJSON = function (str) {
        try {
            return (JSON.parse(str) && !!str);
        } catch (e) {
            return false;
        }
    };
    this.scrollTo = function (elementY, duration) {

        var frame_top = this.iframe.getBoundingClientRect().top + pageYOffset;
        var startingY = window.pageYOffset;
        var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY;
        targetY += frame_top;
        if (this.floatTop) {
            targetY -= this.floatTop.getBoundingClientRect().height;
        }

        var diff = targetY - startingY;
        var easing = function (t) {
            return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
        };
        var start;
        if (!diff) return;
        window.requestAnimationFrame(function step(timestamp) {
            if (!start) start = timestamp;
            var time = timestamp - start;
            var percent = Math.min(time / duration, 1);
            percent = easing(percent);
            window.scrollTo(0, startingY + diff * percent);
            if (time < duration) {
                window.requestAnimationFrame(step);
            }
        })
    }
    this.params = this.extend(this.params, params);

    if (!this.params.server) {
        console.warn('TVBet: empty parameter "server"');
        return false;
    }
    if (!this.params.clientId) {
        console.warn('TVBet: empty parameter "clientId"');
        return false;
    }
    if (document.getElementById(this.params.containerId) === null) {
        document.write('<div id="' + this.params.containerId + '"></div>');
    }
    this.container = document.getElementById(this.params.containerId);
    if (this.params.floatTop !== false && document.querySelector(this.params.floatTop) !== null) {
        this.floatTop = document.querySelector(this.params.floatTop);
    } else {
        this.floatTop = false;
    }

    this.url = this.getUrl();
    console.log("@@@@@",this.url)
    return this.url;
    // this.iframe = this.setFrame(this.url);
    // window.addEventListener("message", this.listenMessage.bind(this), false);

    // var scroll_target = window;
    // if (this.params.scrollContainer !== false) {
    //     scroll_target = document.querySelector(this.params.scrollContainer)
    // }
    // scroll_target.addEventListener("scroll", function (e) {
    //     var scroll = 0 - this.iframe.getBoundingClientRect().top;
    //     if (this.floatTop) {
    //         scroll = scroll + this.floatTop.getBoundingClientRect().height
    //     }
    //     this.sendMessage({
    //         'tvbet_scroll_position': scroll
    //     });
    // }.bind(this));
    // window.addEventListener("resize", function (e) {
    //     this.sendMessage({
    //         'tvbet_vh': this.getVh()
    //     });
    // }.bind(this))
};