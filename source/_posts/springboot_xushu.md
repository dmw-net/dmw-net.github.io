---
title: springboot_xushu
date: 2025-03-02
updated: 2025-03-02
categories: java
---

跟着up主徐庶做了一个springboot的小Demo，在后端实现了user的增删改查。以下是对本次学习的记录。

​	首先我打开了IDEA软件创建了一个用maven管理的springboot项目，勾选了web，mysql driver和jpa的依赖包。进入到项目界面，pom.xml文件是maven项目的配置文件，src-main-java是主体程序部分，test是测试程序部分，resources-application.properties是springboot应用的配置文件，我在配置文件中引入了数据库连接的配置和一些jpa的配置。另外，由于我的电脑8080端口已经被占用了所以我还配置了端口为8088。

​	接着我在java目录下创建了一些包，它们是springboot项目的层次结构，控制层的controller包，业务逻辑层的service包，数据访问层的repository包。例外我还创建了pojo包用于存储简单的Java对象，exception包用于处理所有的异常以便给前端传输格式一致的数据。

​	然后我在pojo包下创建了一个User类，给它一些属性和getter、setter方法以及toString方法，我准备将这个对象映射成数据库的一张表，在这个类的上方加上了@Table(name="tb_user")和@Entity注解。在它的id属性上方加上了@Id和@GeneratedValue(strategy = GenerationType.IDENTITY)//自增生成    这两个注解，并且在id属性以及其他属性上方加上了@Column(name="xxx")注解表示这对应表中的某一字段。并且新建一个Dto包，新建一个数据传输类UserDto。

​	完成创建实体后，我便在控制层controller包下创建userController类来写对实体的一些操作如增删改查，依然利用注解完成，它们对应着网站请求方法的这四种方式

```java
//增加
@PostMapping//localhost:8088/user
//查询
@GetMapping("/{userId}")
//修改
@PutMapping
//删除
@DeleteMapping("/{userId}")
```

在此类上方加上注解

```java
@RestController//接口方法返回对象 转换成json文本
@RequestMapping("/user")//localhost:8088/user/**
```

我开始实现第一个功能，其中@Validated注解是用来验证传入参数的，@RequestBody注解是把json文本转换成对象的。

```
@PostMapping//localhost:8088/user
public ResponseMessage<User> add(@Validated @RequestBody UserDto user) {
    User userNew = userService.add(user);
    return ResponseMessage.success(userNew);
}
```

我把业务逻辑的实现交给了UserService类的add方法，所以去业务逻辑层写一个这样的接口IUserService，并写它的实现类Userservice。实现类上方写注解@Service表示这个类是springboot的一个bean。加上此注解后便可以在UserController中把这个类自动装配进来。

```java
@Autowired
IUserService userService;
```

在这个接口新建add方法，在它的实现类UserService中实现这个方法，

```java
@Override
public User add(UserDto user) {

    User userPojo = new User();

    BeanUtils.copyProperties(user,userPojo);//用于把user拷贝到userPojo

    return userRepository.save(userPojo);
}
```

我在数据数据访问层定义了一个接口UserRepository，此接口继承了JPA的CrudRepository接口，无需我们自己实现。

```java
@Repository //用来表示数据访问层的bean
public interface UserRepository extends CrudRepository<User,Integer> {

}
```

有了这个bean我们便可以在UerService类中把它自动装配进来。

```java
@Autowired
UserRepository userRepository;
```

完成之后打开postman开始测试。

