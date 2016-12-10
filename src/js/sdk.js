var SDK = {

    serverURL: "http://localhost:5000/api",

    request: function (options, cb) {

        //Perform XHR
        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: function (data, status, xhr) {
                cb(null, data, status, xhr);
            },
            error: function (xhr, status, errorThrown) {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });
    },

    UserReview: {
        getAll: function (cb) {
            SDK.request({method: "GET", url: "/review/user/" + SDK.Storage.load("tokenId"), headers: {filter: {include: ["id", "userId", "lectureId", "rating", "comment", "isDeleted"]}}}, cb);
        },
    },

    LectureReview: {
        getAll: function (cb) {
            SDK.request({method: "GET", url: "/review/lecture/" + SDK.Storage.load("lectureId"), headers: {filter: {include: ["id", "userId", "lectureId", "rating", "comment", "isDeleted"]}}}, cb);
        },
        create: function (data, cb) {
            SDK.request({method: "POST", url:"/" + SDK.Storage.load("type") + "/review/", data: data, }, cb);
        }
    },


    Lectures: {
        getById: function (id, cb) {
            SDK.request({
                method: "GET",
                url: "/lecture/" + id

            }, cb);
        }
    },

    DeleteReview: {
        deleteReview: function (data, cb) {
            SDK.request({
                data: {
                    id: data
                },
                method: "DELETE",
                url: "/" + SDK.Storage.load("type") + "/deletereview"
            }, cb);
        }
    },

    Course: {
        getById: function (cb) {

            $.ajax({
                url: SDK.serverURL + "/course/" + SDK.Storage.load("tokenId"),
                method: "GET",
                contentType: "application/json",
                dataType: "json",
                success: function (data) {

                    cb(null,data)
                }
            });

        }
    },



    logOut:function() {
        SDK.Storage.remove("tokenId");
        SDK.Storage.remove("password");
        SDK.Storage.remove("lectureId");
        SDK.Storage.remove("type");
    },

        login: function (cbsMail, password, cb) {


            let SALT = "n0zaCTADRUuTb@JUp01n%5@(l@IAaLlZ";
            let passWithSalt = password + SALT;
            let hashedPassWithSalt = md5(passWithSalt);
            let passWithSalt2 = hashedPassWithSalt + SALT;
            let hashedPassWithSalt2 = md5(passWithSalt2);

            this.request({
                    data: {
                        cbsMail: cbsMail,
                        password: hashedPassWithSalt2

                    },


                    url: "/login", //det endpoint
                    method: "POST"
                },

                function (err, data) {

                    //On login-error
                    if (err) return cb(err);

                    SDK.Storage.persist("tokenId", data.id);
                    SDK.Storage.persist("type", data.type);



                    cb(null, data);

                });


    },

    Storage: {
        prefix: "EvaluationSDK",
        persist: function (key, value) {
            window.localStorage.setItem(this.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
        },
        load: function (key) {
            var val = window.localStorage.getItem(this.prefix + key);
            try {
                return JSON.parse(val);
            }
            catch (e){
                return val;
            }
        },
        remove:function (key) {
            window.localStorage.removeItem(this.prefix + key);
        }
    },

    //Kode lånt af Mathias Lund, Nedenstående decrypter password
    Decrypt: function (string) {
        var Base64 = {
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function (e) {
                var t = "";
                var n, r, i, s, o, u, a;
                var f = 0;
                e = Base64._utf8_encode(e);
                while (f < e.length) {
                    n = e.charCodeAt(f++);
                    r = e.charCodeAt(f++);
                    i = e.charCodeAt(f++);
                    s = n >> 2;
                    o = (n & 3) << 4 | r >> 4;
                    u = (r & 15) << 2 | i >> 6;
                    a = i & 63;
                    if (isNaN(r)) {
                        u = a = 64
                    } else if (isNaN(i)) {
                        a = 64
                    }
                    t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
                }
                return t
            },
            decode: function (e) {
                var t = "";
                var n, r, i;
                var s, o, u, a;
                var f = 0;
                e = e.replace(/[^A-Za-z0-9+/=]/g, "");
                while (f < e.length) {
                    s = this._keyStr.indexOf(e.charAt(f++));
                    o = this._keyStr.indexOf(e.charAt(f++));
                    u = this._keyStr.indexOf(e.charAt(f++));
                    a = this._keyStr.indexOf(e.charAt(f++));
                    n = s << 2 | o >> 4;
                    r = (o & 15) << 4 | u >> 2;
                    i = (u & 3) << 6 | a;
                    t = t + String.fromCharCode(n);
                    if (u != 64) {
                        t = t + String.fromCharCode(r)
                    }
                    if (a != 64) {
                        t = t + String.fromCharCode(i)
                    }
                }
                t = Base64._utf8_decode(t);
                return t
            },
            _utf8_encode: function (e) {
                e = e.replace(/rn/g, "n");
                var t = "";
                for (var n = 0; n < e.length; n++) {
                    var r = e.charCodeAt(n);
                    if (r < 128) {
                        t += String.fromCharCode(r)
                    } else if (r > 127 && r < 2048) {
                        t += String.fromCharCode(r >> 6 | 192);
                        t += String.fromCharCode(r & 63 | 128)
                    } else {
                        t += String.fromCharCode(r >> 12 | 224);
                        t += String.fromCharCode(r >> 6 & 63 | 128);
                        t += String.fromCharCode(r & 63 | 128)
                    }
                }
                return t
            },
            _utf8_decode: function (e) {
                var t = "";
                var n = 0;
                var r = c1 = c2 = 0;
                while (n < e.length) {
                    r = e.charCodeAt(n);
                    if (r < 128) {
                        t += String.fromCharCode(r);
                        n++
                    } else if (r > 191 && r < 224) {
                        c2 = e.charCodeAt(n + 1);
                        t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                        n += 2
                    } else {
                        c2 = e.charCodeAt(n + 1);
                        c3 = e.charCodeAt(n + 2);
                        t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                        n += 3
                    }
                }
                return t
            }
        }

        return Base64.decode(string)
    }

};

/*
function encryptDecrypt(input) {
    var key = ['A', 'B', 'C'];
    var out = "";
    for (var i = 0; i < input.length; i++) {
        out += (String.fromCharCode(((input.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0))));
    }
    return out;
}*/