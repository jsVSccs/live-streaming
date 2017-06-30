
//websocket
WEB_SOCKET_SWF_LOCATION  = "/js/websocket/WebSocketMain.swf";
WEB_SOCKET_DEBUG = true;
var ws;
var idtype ="直播";
var flashCtrl = {};
flashCtrl.loadOnlineNumber = function(chatid){
    var idCode = chatid.split('_')[0];
    var idNum = chatid.split('_')[1];
    if (idNum == 1) {
        chatid = idCode;
    } else {
        chatid = idCode + '_' + parseInt(--idNum);
    }
    var mgsTextNumber = {
        "id": chatid,
        "type": idtype,
        "token": flashCtrl.token,
        "action": "num",
        "msg": {"color": "", "bg": "", "content": ""},
        "time": 1
    };
    ws.send(jsonToString(mgsTextNumber));
};

function startInitWebSocket() {
    ws = new WebSocket("ws://chat.xiankan.com/chat");
    var token;
    if(uid>0){
        token=encodeURIComponent($.cookie("user_token"))
    }else{
        if(inlive){
            token="xxx"
        }
    }
    flashCtrl.token = token;
    ws.onopen = function () {
        if (inlive) {
            //ws.send(jsonToString(mgsTextNumber));
            flashCtrl.loadOnlineNumber(chatid + '_' + liveDetail.cameraNum++);
        }
    };
    window.onerror=function(){return true;}
    ws.onmessage = function (e) {
        var event = e || window.event;
        var eventData = event.data;
        if (inlive && !isNaN(parseInt(eventData)) && typeof (parseInt(eventData)) == 'number') {
            liveDetail.showOnlineNumber(eventData);
        }
    };
    ws.onclose = function () {
    };
    ws.onerror = function () {
        liveDetail.cameraNum = 1;
        startInitWebSocket();
    };
}

