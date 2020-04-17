# share-fetch 并发请求库

> 在现代前端开发环境下，多个小组会负责多个模块的开发。
> 假如同时发起同样的请求，会导致同一个接口多次调用，非常浪费系统的资源。
> 该方法库做的事情就是将接口合并在一个请求中，返回结果之后

## 使用方式

```javascript
const req2 = new ShareFetch();
req2.start("/demo/test.json", { method: "GET", cache: "default" })
    .then((data) => {
        console.log("data1", data);
    })
    .catch((err) => {
        console.log("收到错误", err);
    });
req2.start("/demo/test.json", { method: "GET", cache: "default" })
    .then((data) => {
        console.log("data2", data);
    })
    .catch((err) => {
        console.log("收到错误2", err);
    });
```

## api

### 初始化

初始化的时候允许自定义请求方法，方便使用其他的请求库。

```javascript
function fetchData() {
    //其他自定义的请求方法
}
new ShareFetch(fetchData);
```

### 替换默认的请求方法

```javascript
function fetchData() {
    //其他自定义的请求方法
}
const req = new ShareFetch();
req.setFetch(fetchData);
```

### 开始请求

```javascript
const req = new ShareFetch();
await req.start("/test.json");

await req.start("/test.json", {});
```

### 请求参数

默认使用 fetch 方法，参数类型:`RequestInit`

1. `method?: string;`请求方法:'GET','POST','PUT','DELETE','HEAD'
2. `body?: BodyInit | null;`POST 的参数，`Blob | BufferSource | FormData | URLSearchParams | ReadableStream<Uint8Array> | string;`
3. `headers?: HeadersInit;`头信息
