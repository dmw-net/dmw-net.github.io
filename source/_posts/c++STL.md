---
title: C++STL
date: 2025-03-21
updated: 2025-03-21
categories: 算法
---

**C++ 标准模板库 (STL, Standard Template Library)**：包含一些常用数据结构与算法的模板的 C++ 软件库。其包含四个组件——算法 (Algorithms)、容器 (Containers)、仿函数 (Functors)、迭代器 (Iterators).

示例：

- 算法：`sort(a.begin(), a.end())`
- 容器：`queue<int> que`
- 仿函数：`greater<int>()`
- 迭代器：`vector<int>::iterator it = a.begin()`

## 队列queue

### 特点：

先进先出

### 操作：
|   作用   |      操作       |          实例          |
| :------: | :-------------: | :--------------------: |
|   构造   | queue<类型> que |   queue< int > que;    |
|   进队   |   .push(元素)   |      que.push(1);      |
|   出队   |     .pop()      |       que.pop();       |
|  取队首  |    .front()     |  int a = que.front();  |
|  取队尾  |     .back()     |  int a = que.back();   |
| 查看大小 |     .size()     |       que.size()       |
|   判空   |    .empty()     | bool emp = que.empty() |
|   清空   |       无        |           无           |

创建队列对象：queue<元素类型> 队列名

**添加**元素：队列名.push(元素名)；

**删除**元素：队列名.pop();

判断**是否为空**：队列名.empty()；

返回队列的**大小**：队列名.size();

### 注意事项：不可访问内部元素！

**下面都是错误用法**

```cpp
for (int i = 0; i < que.size(); i++)
    cout << que[i] << endl;
for (auto ele : que)
    cout << ele << endl;
```

## 栈stack

### 特点：

先进后出FILO；

从栈顶删除元素；

在栈顶加入元素。

### 操作：

|   作用   |      操作       |          实例          |
| :------: | :-------------: | :--------------------: |
|   构造   | stack<类型> stk |    stack< int> stk;    |
|   进栈   |   .push(元素)   |      stk.push(1);      |
|   出栈   |     .pop()      |       stk.pop();       |
|  取栈顶  |     .top()      |   int a = stk.top();   |
| 查看大小 |     .size()     |       que.size()       |
|   判空   |    .empty()     | bool emp = stk.empty() |
|   清空   |       无        |           无           |

创建栈对象：stack<元素类型> 栈名

栈顶**添加**元素：栈名.push(元素名)；

**删除**栈顶元素：栈名.pop();

**访问**栈顶元素:栈名.top();**//要先确保栈非空**

判断**是否为空**：栈名.empty()；

返回栈的**大小**：栈名.size();

**tips:栈和队列一样，没有clear之类的函数，如果想要清空一个栈，需要循环调用出栈函数。**

eg:

```c++
stack<int> s;
s.push(1);
s.push(2);
s.push(3);
s.pop();
cout<<s.top()<<endl;//2
s.top()+=3;
cout<<s.top()<<endl;//5
while(!s.empty()) {
	s.pop();
}
cout<<s.size()<<endl;//0
```

###  注意事项:不可访问内部元素！

以下是错误示例：

```cpp
for (int i = 0; i < stk.size(); i++)
    cout << stk[i] << endl;
for (auto ele : stk)
    cout << stk << endl;
```

### 典例：括号匹配

```c++
#include<bits/stdc++.h>
using namespace std;

bool check(string s) {
	stack<char> p;
	p.push('#');//设置哨兵，防止RE
	for(int i = 0;i < s.size(); ++i) {
		if(s[i]==')') {
			if(p.top() == '(') {
				p.pop();
			}
			else return false;
		}
		else if(s[i] == ']') {
			if(p.top() == '[') {
				p.pop();
			}
			else return false;
		}
		else p.push(s[i]);//左括号直接入栈，右括号就判断匹配
	}
	return (p.size() == 1);//如果全能匹配上就只剩哨兵
}

int main() {
	string s;
	while(cin >> s) {
		if(check(s)) {
			cout << "Yes\n";
		}
		else cout << "No\n";
	}
	return 0;
}
```

## 字符串string

### 操作：

创建：string s;

求长度:s.length(); 或者 s.size();

连接： 直接用+、+=运算符 或者append函数

比较：直接用运算符< 、 >  、!=、 == 等等或者compare函数

求子串：

```c++
string s1 = "this is ok";
string s2 = s1.substr(2, 4);// s2 = "is i"
s2 = s1.substr(2); // s2 = "is is ok"
```

插入字符串：

```c++
string s1 = "Limitless";
string s2 = "00";
s1.insert(2, "123");//s1 = "Li123mitless"
s1.insert(3, s2); // s1 = "Li10023mitless"
s1.insert(3, 5, 'X') // s1 = "Li1XXXXX0023mitless"
```

删除子串：

```c++
	string s1 = "Reak Steel";
	s1.erase(1, 3); //s1 = "R Steel"
	s1.erase(5); //s1 = "R ste
```

交换两个string对象的内容：swap函数：s1.swap(s2);

查找：

s1.find(str) 查找字符串str在当前字符串s中第一次出现的位置

s1.find(str, pos) 查找字符串str在当前字符串s的[pos, end]中第一次出现的位置

全排列的下一个序列：next_permutation（s.begin(), s.end()）

全排列的前一个序列：prev_permutation（s.begin(), s.end()）

翻转字符串：reverse（s.begin(), s.end())

## 动态数组、向量vector

### 操作：

创建：vector<数据类型> 向量名；

初始化：

```c
	vector<int> abc;//初始化一个size为0的vector，最常用
	vector<int> abc(10);//初始化了10个默认值为0的元素
	vector<int> abc(10, 1);//初始化了10个值为1的元素
```

访问：

首元素：v.front()

尾元素：v.back（）

下标访问类似普通数组

添加元素：

向尾部添加：v.push_back(value);//最常见的操作

下标赋值注意别超出v.size（）

求元素个数：v.size（）//实际元素个数，不是容量

判空：v.empty();

翻转操作：reverse(v.begin(), v.end());

清空：v.clear（）//直接清空，不是变成0

### 注意事项

#### 提前指定长度

如果长度已经确定，那么应当直接在构造函数指定长度，而不是一个一个 `.push_back()`. 因为 `vector` 额外内存耗尽后的重分配是有时间开销的，直接指定长度就不会出现重分配了。

```cpp
// 优化前: 522ms
vector<int> a;
for (int i = 0; i < 1e8; i++)
    a.push_back(i);
// 优化后: 259ms
vector<int> a(1e8);
for (int i = 0; i < a.size(); i++)
    a[i] = i;
```

#### 当心 size_t 溢出

vector 获取长度的方法 `.size()` 返回值类型为 `size_t`，通常 OJ 平台使用的是 32 位编译器（有些平台例如 cf 可选 64 位），那么该类型范围为 [0,232).

```cpp
vector<int> a(65536);
long long a = a.size() * a.size(); // 直接溢出变成0了
```

### 典例：二维向量存储邻接表

## 集合set

数学上集合的特点：确定性，互异性，无序性

stl中：有序的，元素都是排序好的，所有操作都是log时间里完成。

提供对数时间的插入、删除、查找的集合数据结构。底层原理是红黑树。

| 集合三要素 | 解释                           | set           | multiset      | unordered_set |
| ---------- | ------------------------------ | ------------- | ------------- | ------------- |
| 确定性     | 一个元素要么在集合中，要么不在 | ✔             | ✔             | ✔             |
| 互异性     | 一个元素仅可以在集合中出现一次 | ✔             | ❌（任意次）   | ✔             |
| 无序性     | 集合中的元素是没有顺序的       | ❌（从小到大） | ❌（从小到大） | ✔             |

#### 操作：

| 作用                   | 用法            | 示例                    |
| ---------------------- | --------------- | ----------------------- |
| 插入元素               | `.insert(元素)` | `st.insert(1);`         |
| 删除元素               | `.erase(元素)`  | `st.erase(2);`          |
| 查找元素               | `.find(元素)`   | `auto it = st.find(1);` |
| 判断元素是否存在       | `.count(元素)`  | `st.count(3);`          |
| 查看大小 / 清空 / 判空 | 略              | 略                      |

创建:set<元素类型> s;

清空：s.crear()

插入元素：s.insert(x);//如果集合中之前没有就插入并排序，否则不插入

删除元素：s.erase(x)

查询是否有元素x：s.count(x);//返回0无，返回1有。

查询元素x位置：s.find(x)；返回一个x位置的迭代器

判空：s.empty();

求个数：size();

**访问**：

只能通过迭代器访问。不支持 iterator < s.end()写法

可使用迭代器进行遍历访问：

```cpp
for (set<int>::iterator it = st.begin(); it != st.end(); ++it)
    cout << *it << endl;
```

基于范围的循环（C++ 11）：

```cpp
for (auto &ele : st)
    cout << ele << endl;
```

### 注意事项

#### 不存在下标索引

set 虽说可遍历，但仅可使用迭代器进行遍历，它不存在下标这一概念，无法通过下标访问到数据。**下面是错误用法：**

```cpp
cout << st[0] << endl;
```

#### 元素只读

set 的迭代器取到的元素是只读的（因为是 const 迭代器），不可修改其值。如果要改，需要先 erase 再 insert. **下面是错误用法：**

```cpp
cout << *st.begin() << endl; // 正确。可读。
*st.begin() = 1;             // 错误！不可写！
```

#### 不可用迭代器计算下标

set 的迭代器不能像 vector 一样相减得到下标。**下面是错误用法：**

```cpp
auto it = st.find(2);      // 正确，返回2所在位置的迭代器。
int idx = it - st.begin(); // 错误！不可相减得到下标。
```

### 典例：自动去重并升序排序

## 映射map

map是一个键值对（key:value)的容器，对于迭代器来说，可以修改value，而不能修改key。map会根据key自动排序。

| 性质   | 解释                         | map           | multimap      | unordered_map |
| ------ | ---------------------------- | ------------- | ------------- | ------------- |
| 互异性 | 一个键仅可以在映射中出现一次 | ✔             | ❌（任意次）   | ✔             |
| 无序性 | 键是没有顺序的               | ❌（从小到大） | ❌（从小到大） | ✔             |

### 操作：

| 作用                   | 用法           | 示例                    |
| ---------------------- | -------------- | ----------------------- |
| 增 / 改 / 查元素       | 中括号         | `mp[1] = 2;`            |
| 查元素（返回迭代器）   | `.find(元素)`  | `auto it = mp.find(1);` |
| 删除元素               | `.erase(元素)` | `mp.erase(2);`          |
| 判断元素是否存在       | `.count(元素)` | `mp.count(3);`          |
| 查看大小 / 清空 / 判空 | 略             | 略                      |

map<int,string> m;//定义了一个空map m

m.count(k);//返回m中键值等于k的元素个数（1或0——

m.find(k);//存在返回指向该元素的迭代器，否则返回结束地址ennd()

m.erase（k);//删除m中**键为k**的元素，返回删除元素的个数（1或0）

m.erase(p);//从m中删除**迭代器p**所指向的元素

m.insert(e);//e是一个用在m上的value_type类型的值（一个pair）。

如果键e.first不在m中，则插入一个值为e.second的新元素；如果该键在m中已存在，那么不进行任何操作。

m.clear();//清空map m

m.empty();//判断map m是否为空。

### 注意事项

#### 中括号访问时默认值

如果使用中括号访问 map 时对应的键不存在，那么会新增这个键，并且值为默认值，因此中括号会影响键的存在性。

```cpp
map<char, int> mp;
cout << mp.count('a') << endl; // 0
mp['a'];                       // 即使什么都没做，此时mp['a']=0已经插入了
cout << mp.count('a') << endl; // 1
cout << mp['a'] << endl;       // 0
```

#### 不可用迭代器计算下标

map 的迭代器不能像 vector 一样相减得到下标。**下面是错误用法：**

```cpp
auto it = mp.find('a');      // 正确，返回2所在位置的迭代器。
int idx = it - mp.begin();   // 错误！不可相减得到下标。
```

### 适用情形

需要维护映射的场景可以使用：输入若干字符串，统计每种字符串的出现次数。(`map<string, int> mp`)