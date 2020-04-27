/*
    本作品用于QuantumultX和Surge之间js执行方法的转换
    您只需书写其中任一软件的js,然后在您的js最【前面】追加上此段js即可
    无需担心影响执行问题,具体原理是将QX和Surge的方法转换为互相可调用的方法
    尚未测试是否支持import的方式进行使用,因此暂未export
    如有问题或您有更好的改进方案,请前往 https://github.com/sazs34/TaskConfig/issues 提交内容,或直接进行pull request
    您也可直接在tg中联系@wechatu
*/
// #region 固定头部
let isQuantumultX = $task != undefined; //判断当前运行环境是否是qx
let isSurge = $httpClient != undefined; //判断当前运行环境是否是surge
// http请求
var $task = isQuantumultX ? $task : {};
var $httpClient = isSurge ? $httpClient : {};
// cookie读写
var $prefs = isQuantumultX ? $prefs : {};
var $persistentStore = isSurge ? $persistentStore : {};
// 消息通知
var $notify = isQuantumultX ? $notify : {};
var $notification = isSurge ? $notification : {};
// #endregion 固定头部

// #region 网络请求专用转换
if (isQuantumultX) {
    var errorInfo = {
        error: ''
    };
    $httpClient = {
        get: (url, cb) => {
            var urlObj;
            if (typeof (url) == 'string') {
                urlObj = {
                    url: url
                }
            } else {
                urlObj = url;
            }
            $task.fetch(urlObj).then(response => {
                cb(undefined, response, response.body)
            }, reason => {
                errorInfo.error = reason.error;
                cb(errorInfo, response, '')
            })
        },
        post: (url, cb) => {
            var urlObj;
            if (typeof (url) == 'string') {
                urlObj = {
                    url: url
                }
            } else {
                urlObj = url;
            }
            url.method = 'POST';
            $task.fetch(urlObj).then(response => {
                cb(undefined, response, response.body)
            }, reason => {
                errorInfo.error = reason.error;
                cb(errorInfo, response, '')
            })
        }
    }
}
if (isSurge) {
    $task = {
        fetch: url => {
            //为了兼容qx中fetch的写法,所以永不reject
            return new Promise((resolve, reject) => {
                if (url.method == 'POST') {
                    $httpClient.post(url, (error, response, data) => {
                        if (response) {
                            response.body = data;
                            resolve(response, {
                                error: error
                            });
                        } else {
                            resolve(null, {
                                error: error
                            })
                        }
                    })
                } else {
                    $httpClient.get(url, (error, response, data) => {
                        if (response) {
                            response.body = data;
                            resolve(response, {
                                error: error
                            });
                        } else {
                            resolve(null, {
                                error: error
                            })
                        }
                    })
                }
            })

        }
    }
}
// #endregion 网络请求专用转换

// #region cookie操作
if (isQuantumultX) {
    $persistentStore = {
        read: key => {
            return $prefs.valueForKey(key);
        },
        write: (val, key) => {
            return $prefs.setValueForKey(val, key);
        }
    }
}
if (isSurge) {
    $prefs = {
        valueForKey: key => {
            return $persistentStore.read(key);
        },
        setValueForKey: (val, key) => {
            return $persistentStore.write(val, key);
        }
    }
}
// #endregion

// #region 消息通知
if (isQuantumultX) {
    $notification = {
        post: (title, subTitle, detail) => {
            $notify(title, subTitle, detail);
        }
    }
}
if (isSurge) {
    $notify = function (title, subTitle, detail) {
        $notification.post(title, subTitle, detail);
    }
}
// #endregion

const cookieName = '网易新闻'
const cookieKey = 'chavy_cookie_neteasenews'
const bodyKey = 'chavy_body_neteasenews'
const chavy = init()
let cookieVal = null
let bodyVal = `trashId=%7B%22id_ver%22%3A%22IOS_1.2.1%22%2C%22rk%22%3A%22IxYREpCUCY7AwXI4rDFu8Rpah1%2F%2FY2WS9yua4k7k1fruNxo6MyNzBDN0lsXDj9JdvjFa9mi8ps5XaM9VFImtBHRmFffTr%2B6FO%2BFW2l3K2ekupSr%2FYVq9k%2FZsFm9UYjSfSFbBePDiDIJHMgKXXHU5HnYBG0mZi1BTriHOLixL%2F24%3D%22%2C%22rdata%22%3A%22mdeWlKEWM6J2ZWUOHao%2BPSBqEvcnH0UrM2a6yP0al%2BBYLNV7vwyjDbys9M2%2FIHF6yC0WR%2FpHYywSVvuf%2Bg60dH37RosJYqHQflttAgq65Af3nPUf7SDUepYbiGU3yenR%2FJjdO%2FjMxRFLtfjtqDwu2BerspirhO4wFyfZGd7uG23SViOn9WzR%2BPGdVXMnOVnK5pm0i6X6c6Y3vhTVcqZ2%2FF6SWFlTvSMSxRS4dn4tYfuQr6Wl1%2BLlvX6%2FKWMiKvtT5nkaaSx7Mv90f7%2BWj03MI5bmOQLMNjMRoX6gfg6ERszHcEQEhHlw4H5g9mbG3YmRDsM5tIXR4cUuXiHm5pM9bHypOBSOd5cXZsyWv2bG8JpS%2BbUM9zIYNVh%2BCF5TZh9iaXmLBid0K2yeDnCxP1qr3Q%3D%3D%22%2C%22datatype%22%3A%22aimt_datas%22%7D`

if ($request.body) {
  cookieVal = JSON.stringify($request.headers)
  bodyVal = bodyVal ? bodyVal : $request.body
} else {
  // ([^:]*):\s(.*)\n?
  // cookieObj['$1'] = $request.headers['$1']\n
  const cookieObj = {}
  cookieObj['Content-Length'] = `699`
  cookieObj['isDirectRequest'] = `1`
  cookieObj['X-NR-Trace-Id'] = $request.headers['X-NR-Trace-Id']
  cookieObj['User-DA'] = $request.headers['User-DA']
  cookieObj['Accept-Encoding'] = `gzip, deflate, br`
  cookieObj['Connection'] = `keep-alive`
  cookieObj['Content-Type'] = `application/x-www-form-urlencoded`
  cookieObj['User-D'] = $request.headers['User-D']
  cookieObj['User-U'] = $request.headers['User-U']
  cookieObj['User-id'] = $request.headers['User-id']
  cookieObj['User-C'] = $request.headers['User-C']
  cookieObj['User-tk'] = $request.headers['User-tk']
  cookieObj['User-N'] = $request.headers['User-N']
  cookieObj['User-Agent'] = `NewsApp/64.1 iOS/13.3 (iPhone10,1)`
  cookieObj['Host'] = `c.m.163.com`
  cookieObj['User-LC'] = $request.headers['User-LC']
  cookieObj['Accept-Language'] = `zh-cn`
  cookieObj['Accept'] = `*/*`
  cookieObj['User-L'] = $request.headers['User-L']
  cookieVal = JSON.stringify(cookieObj)
}

if (cookieVal) {
  chavy.setdata(cookieVal, cookieKey)
  chavy.msg(`${cookieName}`, '获取Cookie: 成功', '')
  chavy.log(`[${cookieName}] 获取Cookie: 成功, cookie: ${cookieVal}`)
} else {
  chavy.msg(`${cookieName}`, '获取Cookie: 失败', '说明: 未知')
  chavy.log(`[${cookieName}] 获取Cookie: 失败, cookie: ${cookieVal}`)
}
if (bodyVal) {
  chavy.setdata(bodyVal, bodyKey)
  chavy.msg(`${cookieName}`, '获取Body: 成功', '')
  chavy.log(`[${cookieName}] 获取Body: 成功, body: ${bodyVal}`)
} else {
  if (isQuanX()) {
    chavy.msg(`${cookieName}`, '获取Body: 失败', '说明: QuanX用户请手动抓包 body 参数!')
    chavy.log(`[${cookieName}] 获取Body: 失败, 说明: QuanX用户请手动抓包 body 参数!`)
  } else {
    chavy.msg(`${cookieName}`, '获取Body: 失败', '说明: 未知')
    chavy.log(`[${cookieName}] 获取Body: 失败, body: ${bodyVal}`)
  }
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
chavy.done()
