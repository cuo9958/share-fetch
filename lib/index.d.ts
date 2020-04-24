declare type IGetData = (url: string, data?: RequestInit) => Promise<any>;
interface IReqEvent {
    [index: string]: any;
}
/**
 * 共享请求类，屏蔽多次请求
 */
declare class ShareFetch {
    constructor(getData?: IGetData);
    /**
     * 默认的请求方法
     * @param url url
     * @param data 参数
     */
    getData(url: string, data?: RequestInit): Promise<any>;
    /**
     * 重设请求方法
     * @param getData 方法
     */
    setFetch(getData: IGetData): void;
    reqSet: Set<unknown>;
    reqEvent: IReqEvent;
    /**
     * 开始请求
     * @param {*} url url地址
     * @param {*} data 附带参数
     */
    start(url: string, data?: RequestInit): Promise<any>;
    /**
     * 等待已经开始的请求结束
     * @param {*} key 关键key
     */
    waitReq(key: string): Promise<unknown>;
    /**
     * 正常发起请求，检查返回并处理
     * @param {*} key 关键key
     * @param {*} url url地址
     * @param {*} data 配置参数
     */
    getReq(key: string, url: string, data?: RequestInit): Promise<any>;
    /**
     * 执行成功的返回
     * @param {*} key 关键key
     * @param {*} res 返回的数据
     */
    resolve(key: string, res: string | number | object): void;
    /**
     * 执行失败的返回
     * @param {*} key 关键key
     * @param {*} err 错误
     */
    reject(key: string, err: any): void;
}
export default ShareFetch;
