(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getReqKey(url, data = {}) {
        console.log("获取标准key");
        const key = url + JSON.stringify(data);
        return key;
    }
    /**
     * 共享请求类，屏蔽多次请求
     */
    class ShareFetch {
        constructor(getData) {
            this.reqSet = new Set();
            this.reqEvent = {};
            //初始化默认请求方法
            if (getData)
                this.getData = getData;
        }
        /**
         * 默认的请求方法
         * @param url url
         * @param data 参数
         */
        async getData(url, data) {
            const res = await fetch(url, data);
            return res.json();
        }
        /**
         * 重设请求方法
         * @param getData 方法
         */
        setFetch(getData) {
            if (getData)
                this.getData = getData;
        }
        /**
         * 开始请求
         * @param {*} url url地址
         * @param {*} data 附带参数
         */
        async start(url, data) {
            const key = getReqKey(url, data);
            if (this.reqSet.has(key)) {
                console.log("重复请求" + key, url, data);
                return this.waitReq(key);
            }
            console.log("发起请求", url);
            this.reqSet.add(key);
            return this.getReq(key, url, data);
        }
        /**
         * 等待已经开始的请求结束
         * @param {*} key 关键key
         */
        waitReq(key) {
            const reqEvent = this.reqEvent;
            return new Promise((resolve, reject) => {
                if (!reqEvent[key])
                    reqEvent[key] = [];
                reqEvent[key].push({ resolve, reject });
            });
        }
        /**
         * 正常发起请求，检查返回并处理
         * @param {*} key 关键key
         * @param {*} url url地址
         * @param {*} data 配置参数
         */
        async getReq(key, url, data) {
            try {
                const res = await this.getData(url, data);
                console.log(key, res);
                this.resolve(key, res);
                this.reqSet.delete(key);
                return res;
            }
            catch (error) {
                this.reject(key, error);
                throw error;
            }
        }
        /**
         * 执行成功的返回
         * @param {*} key 关键key
         * @param {*} res 返回的数据
         */
        resolve(key, res) {
            const reqEvent = this.reqEvent;
            setTimeout(() => {
                while (reqEvent[key] && reqEvent[key].length > 0) {
                    const item = reqEvent[key].shift();
                    console.log("拿到事件", item.resolve);
                    item.resolve(res);
                }
            }, 0);
        }
        /**
         * 执行失败的返回
         * @param {*} key 关键key
         * @param {*} err 错误
         */
        reject(key, err) {
            const reqEvent = this.reqEvent;
            setTimeout(() => {
                while (reqEvent[key] && reqEvent[key].length > 0) {
                    const item = reqEvent[key].shift();
                    console.log("拿到事件", item.reject);
                    item.reject(err);
                }
            }, 0);
        }
    }
    exports.default = ShareRequest;
});
