
(() => {
    //数据有关
    const PLATFORM_CONFIG = {};
    PLATFORM_CONFIG.platformFlag = 'temple';
    PLATFORM_CONFIG.debug = false;
    if (window.location.search.indexOf('?debug') == 0) {
        PLATFORM_CONFIG.debug = true;
    }
    PLATFORM_CONFIG.host = PLATFORM_CONFIG.debug ? 'http://localhost' : 'http://120.79.167.2';
    PLATFORM_CONFIG.userExpire = 1000 * 60 * 60 * 24 * 3;
    let api = {
        'user': {
            'getByOpenid': {
                url: "/user/${data.openid}",
                method: "get"
            },
        }
    }
    //path 为 user.create.url
    PLATFORM_CONFIG.api = (path, data) => {        
        let p = path.split('.');
        let url;
        if (p[2] == 'url') {
            if (api[p[0]][p[1]][p[2]] != null)
                url = PLATFORM_CONFIG.host + api[p[0]][p[1]][p[2]];
            else
                url = PLATFORM_CONFIG.host +'/' + p[0] + '/' + p[1];
            url = eval("`" + url + "`");
            return url;
        }
        if (p[2] == 'method') {
            if (api[p[0]][p[1]][p[2]] != null)
                return api[p[0]][p[1]][p[2]];
            return 'post';
        }
    }

    let pic = {
        qrcode: 'pic/qrcode_for_gh_eb586ed48c6b_258.jpg',
        messagepic: 'pic/gh_eb586ed48c6b_258_message.jpg'
    }
    
    let cdn ='http://120.79.167.2/';
    PLATFORM_CONFIG.picUrl = (name) => {
        if (pic[name])
            return cdn + pic[name];
        return cdn + name;
    }

    window.PLATFORM_CONFIG = PLATFORM_CONFIG;
})()