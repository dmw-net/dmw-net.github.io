---
title: JS异步编程
date: 2025-04-26
updated: 2025-04-26
categories: JS
---
## 1.同步和异步

同步即按顺序执行。

异步即独立执行，异步就是从主线程发射一个子线程来完成任务。

就像这样：

![img](JS异步编程/async-sync.png)

## 2.回调函数

js从设计之初就是只支持单线程的语言，如何做到异步编程呢？js使用回调函数来解决这个问题。

回调函数就是一个函数，它是在我们启动一个异步任务的时候就告诉它：**等你完成了这个任务之后要干什么**。这样一来主线程几乎不用关心异步任务的状态了，他自己会善始善终。

常用的异步操作实现方式：

### setTimeout定时任务

```html
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8"> 
<title>dmw</title> 
</head>
<body>

<p>回调函数等待 3 秒后执行。</p>
<p id="demo"></p>
<script>
const print = () => {
    document.getElementById("demo").innerHTML = "dmw";
};
setTimeout(print, 3000);
</script>

</body>
</html>
```

这段程序中的 setTimeout 就是一个消耗时间较长（3 秒）的过程，它的第一个参数是个回调函数，第二个参数是毫秒数，这个函数执行之后会产生一个子线程，子线程会等待 3 秒，然后执行**回调函数 "print"**，在网页显示“dmw"。

既然 setTimeout 会在子线程中等待 3 秒，在 setTimeout 函数执行之后主线程并没有停止，所以可以这样：

```html
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8"> 
<title>dmw</title> 
</head>
<body>

<p>回调函数等待 3 秒后执行。</p>
<p id="demo1"></p>
<p id="demo2"></p>
<script>
setTimeout(function () {
    document.getElementById("demo1").innerHTML="newbee-1!";  // 三秒后子线程执行
}, 3000);
document.getElementById("demo2").innerHTML="newbee-2!";      // 主线程先执行
</script>

</body>
</html>
```

可以看见一开始显示的“newbee-2”3秒后被 ‘挤’ 下去了。

## 3.promise

Promise 是一个 ECMAScript 6 提供的类，目的是更加优雅地书写复杂的异步任务。

例如，如果我想分三次输出字符串，第一次间隔 1 秒，第二次间隔 4 秒，第三次间隔 3 秒：

```html
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8"> 
<title>dmw</title> 
</head>
<body>
<script>
setTimeout(() => {
    console.log("First")
    setTimeout( () => {
        console.log("Second")
        setTimeout(() => {
            console.log("Third");
        }, 3000)
    },4000)
}, 1000);
</script>
</body>
</html>
```

![image-20250426123401581](JS异步编程/image-20250426123401581.png)

这段程序实现了这个功能，但是它是用 "函数瀑布" 来实现的。在一个复杂的程序当中，这样写可读性非常差。

来看promise如何实现的

```html
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8"> 
<title>dmw</title> 
</head>
<body>
<script>
new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("First");
        resolve();
    }, 1000);
}).then(() => {
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            console.log("Second");
            resolve();
        }, 4000);
    });
}).then(()  => {
    setTimeout(() => {
        console.log("Third");
    }, 3000);
});

</script>
</body>
</html>
```

### 重点注意事项

1. **Promise 链的等待**
   - 在 `.then()` 中返回一个新的 `Promise`，可以让后续的 `.then()` 等待这个新的 `Promise` 完成。
   - 如果没有返回 `Promise`（如第三个 `setTimeout`），后续的 `.then()`（如果有）不会等待。

看起来很长，我们改写一下，封装成promise函数，这种返回值为一个 Promise 对象的函数称作 Promise 函数。

```js
const print = (delay, message) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(message);
            resolve();
        }, delay)
    })
}

print(1000, "First").then(() => {
    return print(4000, "Second")
}).then(() => {
    print(3000, "Third")
})
```

要调用时还可以使用async和await

```js
const fun = async () => {
    await print(1000, "First")
    await print(4000, "Second")
    await print(3000, "Third")
}
fun()
```

await 指令后必须跟着一个 Promise，异步函数会在这个 Promise 运行中暂停，直到其运行结束再继续运行。



Promise 类有 .then() .catch() 和 .finally() 三个方法，这三个方法的参数都是一个函数，.then() 可以将参数中的函数添加到当前 Promise 的正常执行序列，.catch() 则是设定 Promise 的异常处理序列，.finally() 是在 Promise 执行的最后一定会执行的序列。 .then() 传入的函数会按顺序依次执行，有任何异常都会直接跳到 catch 序列。

```html
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8"> 
<title>dmw</title> 
</head>
<body>
<script>

const fun = new Promise((resolve, reject) => {
    // resolve("任务成功了")
    reject("任务失败了")
})
fun.then((data) => {
    console.log(data)
}).catch((err) => {
    console.log(err)
})

</script>
</body>
</html>
```

![image-20250426141645055](JS异步编程/image-20250426141645055.png)

或者

![image-20250426141717407](JS异步编程/image-20250426141717407.png)