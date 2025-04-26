---
title: JavaScript_ES6
date: 2025-04-25
updated: 2025-04-26
categories: JS
---
被js的各种语法困惑了很久，至今未能流程写出一个完整的js程序，痛心疾首，决定认真学一遍ES6语法。

本次学习了6部分内容，分别是：

## 1.变量和常量

```js
//1.变量和常量
let count=0
console.log(count)

const URL = 'https://2025521.xyz'
console.log(URL)
// URL = 'ddd'
//独立作用域
{
    let num1=1;
    console.log(num1);
}
// console.log(num1)

```

## 2.模板字符串

```js
//2.模板字符串
const str1 = 'abc'
const str2 = 'def'
const str3 =  `${str1 + str2}`
console.log(str3) 
```

## 3.解构赋值操作

```javascript
//3.解构赋值操作
//数组的解构
const arr = [1, 2, 3]
const a1 = arr[0]
const a2 = arr[1]
const a3 = arr[2]
//变成
const [a, b, c] = [1, 2, 3]
console.log(a, b, c)

//对象的解构
const obj1 = {
    username: 'dmw',
    age: 18,
    gender: 'male'
}
console.log(obj1)
//变成
const {username, age: userage, ...otherInfo} = {
    username: 'dmw',
    age: 18,
    gender: 'male',
    id: 888
}
console.log(username, userage, otherInfo)

```

## 4.数组和对象的扩展

```



//4.数组和对象的扩展
//4.1扩展运算符(...)
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const arr3 = [7, 8, 9, ...arr1,...arr2]
console.log(arr3)//[7, 8, 9, 1, 2, 3, 4, 5, 6]
//4.2数组方法(Array.from())
//将伪数组转化为真数组以调用数组的方法
function fn () {
    Array.from(arguments).forEach(function (item) {
        console.log(item)
    })
}
fn(1, 2, 3, 4)
```

## 5.class的使用

```javascript
//5.class 快速创建对象
class A {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}
const obja = new A('dmw', 18)
console.log(obja)
//继承
class B extends A {
    constructor(name, age, gender) {
        super(name, age)
        this.gender=gender
    }
    sayHello(){
        console.log('你好，我是'+this.name)
    }
}
const objb = new B('小猫', 18, '男')
console.log(objb)
objb.sayHello()
```

## 6.箭头函数

```js
//6.箭头函数
const getSum1 = function(n) {
    return n + 3
}
console.log(getSum1(10))

const getSum2 = n => n+3
console.log(getSum2(10))

const getResult = (n1, n2, ...other) => console.log(n1, n2, other)
getResult(1, 3, 5 ,7 ,9)

const getResult2 = arr => {
    let sum=0
    arr.forEach(item => sum+=item)
    return sum
}
console.log(getResult2([1, 2, 3]))
```

