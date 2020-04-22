/*
Weibo Super Talk Check in
Made by NavePnow

[Script]
cron "0 12 * * *" script-path=checkin_surge.js
http-request https:\/\/weibo\.com\/p\/aj\/general\/button\?ajwvr=6&api=http:\/\/i\.huati\.weibo\.com\/aj\/super\/checkin max-size=0,script-path=https://raw.githubusercontent.com/NavePnow/Profiles/master/Scripts/weibo/get_cookie_surge.js

MITM = weibo.com
*/
const accounts = [
    // ["洛杉矶湖人", "1008086b6c0f3a7a95b611faf01fe5a32e85b8"],
    // ["Apple", "1008089f6290f4436e5a2351f12e03b6433c3c"],
    // ["浦江", "1008085d903ed20b32d94c3d75fab36ab2fb1e"],
    // ["tiger谭秋娟", "1008085ab844c4b99c1bb14a745a8dc2802cd4"],
    // ["田馥甄", "1008084b49ae2340f76f6b91d36b17958d703e"]]
async function launch() {
    for (var i in accounts) {
        let name = accounts[i][0]
        let super_id = accounts[i][1]
        await weibo_super(name, super_id)
    }
    $done();
}

launch()

function weibo_super(name, super_id) {
    //$notification.post(name + "的微博超话签到", super_id, "")
    let super_url = {
        url: "https://weibo.com/p/aj/general/button?ajwvr=6&api=http://i.huati.weibo.com/aj/super/checkin&texta=%E7%AD%BE%E5%88%B0&textb=%E5%B7%B2%E7%AD%BE%E5%88%B0&status=0&id=" + super_id + "&location=page_100808_super_index&timezone=GMT+0800&lang=zh-cn&plat=MacIntel&ua=Mozilla/5.0%20(Macintosh;%20Intel%20Mac%20OS%20X%2010_15)%20AppleWebKit/605.1.15%20(KHTML,%20like%20Gecko)%20Version/13.0.4%20Safari/605.1.15&screen=375*812&__rnd=1576850070506",
        headers: {        
            Cookie: $persistentStore.read("super_cookie"),
            }
    };

    $httpClient.get(super_url, async function (error, response, data) {
        if (error) {
            $notification.post(name + "的微博超话签到错误！", "", error)
        } else {
            var obj = JSON.parse(data);
            //console.log(obj);
            var code = obj.code;
            var msg = obj.msg;
            //console.log(msg);
            if (code == 100003) {   // 行为异常，需要重新验证
                //console.log("Cookie error response: \n" + data)
                $notification.post(name + "的微博超话签到", "❕" + msg, obj.data.location)
            } else if (code == 100000) {
                tipMessage = obj.data.tipMessage;
                alert_title = obj.data.alert_title;
                alert_subtitle = obj.data.alert_subtitle;
                $notification.post(name + "的微博超话签到", "签到成功" + " 🎉", alert_title + "\n" + alert_subtitle)

            } else if (code == 382004){
                msg = msg.replace("(382004)", "")
                $notification.post(name + "的微博超话签到", "", msg + " 🎉")
            } else{
                $notification.post(name + "的微博超话签到", "", msg)
            }

        }
    })
}
