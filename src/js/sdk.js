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

    Lectures: {
        getById: function (id, cb) {
            SDK.request({
                method: "GET",
                url: "/lecture/" + id

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
        SDK.Storage.remove("type");
    },

    login: function (cbsMail, password, cb) {
        this.request({
            data: {
                cbsMail: cbsMail,
                password: password
            },
            url: "/login",
            method: "POST"
        }, function (err, data) {

            //On login-error
            if (err) return cb(err);

            SDK.Storage.persist("tokenId", data.id);
            SDK.Storage.persist("type", data.type);
            //SDK.Storage.persist("user", data.user);

            cb(null, data);

        });
    },

    Storage: {
        prefix: "BookStoreSDK",
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
    }


};
function encryptDecrypt(input) {
    var key = ['A', 'B', 'C'];
    var out = "";
    for (var i = 0; i < input.length; i++) {
        out += (String.fromCharCode(((input.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0))));
    }
    return out;
}