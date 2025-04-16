---
title: Spring
date: 2025-04-15
updated: 2025-04-16
categories: java
---
# Spring简介

### 1.1历史

2002年，首次推出了spring框架的雏形：interface21框架

2004年3月24日，悉尼大学音乐学博士**Rod Johnson**首次推出Spring框架1.0，解决企业应用开发的复杂性。

设计理念：使现有的技术更加容易使用，本身是一套大杂烩，整合了现有的技术框架。



- SSH：Struct2(视图框架) + Spring(融合剂) + Hibernate(全自动持久层框架)

- SSM : SpringMvc(视图框架) + Spring(融合剂) + Mybatis(半自动持久层框架，可定制性更高)

### 1.2优点

- Spring是一个开源的免费的框架（容器）

- Spring是一个轻量级的、非入侵式的框架
- 控制反转（IOC),面向方面编程（AOP)

- 支持事务的处理，对框架整合的支持

<mark>总结一句话：Spring就是一个轻量级的控制反转（IoC）和面向方面编程（AOP）的框架！</mark>

### 1.3组成

![img](spring/1010726-20190908042152777-1895820426.png)

### 1.4拓展

- Spring Boot
  - 一个快速开发的脚手架
  - 基于Spring Boot可以快速的开发单个微服务
  - <mark>约定大于配置</mark>

- Spring Cloud
  - SpringCloud是基于SpringBoot实现的

现在大多数公司都在使用SpringBoot进行快速开发，所以先掌握Spring及SpringMVC很重要，承上启下！

# IoC

假如我们需要在程序内构建一辆”车“，那么我们传统的思想一般是下面这样的。

![image-20250415134033090](spring/image-20250415134033090.png)

想要构建一辆汽车，首先要依赖于车身，而车身又依赖于地盘。而底盘需要轮胎。最终我们得到下面的代码。

```java
public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        car.init();
   }
    /**
     * 汽⻋对象
     */
    static class Car {
        public void init() {
            // 依赖⻋身
            Framework framework = new Framework();
            framework.init();
       }
   }
    /**
     * ⻋身类
     */
    static class Framework {
        public void init() {
            // 依赖底盘
            Bottom bottom = new Bottom();
            bottom.init();
       }
   }
    /**
     * 底盘类
     */
    static class Bottom {
        public void init() {
            // 依赖轮胎
            Tire tire = new Tire();
            tire.init();
       }
   }
    /**
     * 轮胎类
     */
    static class Tire {
     // 尺⼨
        private int size = 30;
        public void init() {
            System.out.println("轮胎尺⼨：" + size);
       }
   }
}
```

 虽然这段代码的确能够满足需求，但是我们不难发现一个特点，就是它的耦合性非常高。假如我们需要更改轮胎的尺寸，我们需要将轮胎以及所有依赖轮胎的组件的构造方法全部更改一遍，加上size参数，例如下面那样。

```java
public class Main {
    public static void main(String[] args) {
        Car car = new Car(20);
        car.run();
   }
    /**
     * 汽⻋对象
     */
    static class Car {
        private Framework framework;
        public Car(int size) {
            framework = new Framework(size);
       }
        public void run() {
            // 依赖⻋身
            framework.init();
       }
   }
    /**
     * ⻋身类
     */
    static class Framework {
        private Bottom bottom;
        public Framework(int size) {
            bottom = new Bottom(size);
       }
        public void init() {
            // 依赖底盘
            bottom.init();
       }
   }
    /**
     * 底盘类
     */
    static class Bottom {
        private Tire tire;
public Bottom(int size) {
            tire = new Tire(size);
       }
        public void init() {
            // 依赖轮胎
            tire.init();
       }
   }
    /**
     * 轮胎类
     */
    static class Tire {
        // 尺⼨
        private int size;
        public Tire(int size) {
            this.size = size;
       }
        public void init() {
            System.out.println("轮胎尺⼨：" + size);
       }
   }
}
```

而在实际开发过程中，需求变更是很常见的。而我们不难看出，以上程序的问题是：**当最底层代码改动之后，整个调⽤链上的所有代码都需要修改。**这在实际开发过程中就会严重拖慢我们的进度，那么有什么办法能够解决这个问题呢。我们看看以下的代码。

```java
public class Main {
    public static void main(String[] args) {
        Tire tire = new Tire(20);
        Bottom bottom = new Bottom(tire);
        Framework framework = new Framework(bottom);
        Car car = new Car(framework);
        car.run();
   }
    static class Car {
        private Framework framework;
        public Car(Framework framework) {
            this.framework = framework;
       }
        public void run() {
            framework.init();
       }
   }
    static class Framework {
        private Bottom bottom;
        public Framework(Bottom bottom) {
            this.bottom = bottom;
       }
        public void init() {
            bottom.init();
       }
   }
    static class Bottom {
        private Tire tire;
        public Bottom(Tire tire) {
            this.tire = tire;
       }
        public void init() {
            tire.init();
       }
   }
static class Tire {
        private int size;
        public Tire(int size) {
            this.size = size;
       }
        public void init() {
            System.out.println("轮胎：" + size);
       }
   }
}
```

 可以看到我们先创建了所有的下级依赖类，然后再通过参数传递的方式注入。这样我们不需 要在当前类中创建下级类了，所以下级类即使发⽣变化（创建或减少参数），当前类本身也⽆需修改任 何代码，这样就完成了程序的解耦。

 以上就是所谓的控制反转式程序开发。此时⽆论底层类如何变化，整个调⽤链是不⽤做任何改变的，这样就完成了代码之间的解耦，从⽽实现了更加灵活、通⽤的程序设计了。
在传统的代码中对象创建顺序是：Car -> Framework -> Bottom -> Tire

改进之后解耦的代码的对象创建顺序是：Tire -> Bottom -> Framework -> Car
![image-20250415134331010](spring/image-20250415134331010.png)

这里我们可以发现：通⽤程序的实现代码，类的创建顺序是反的，传统代码是 Car 控制并创建了 Framework，Framework 创建并创建了 Bottom，依次往下，⽽改进之后的控制权发⽣的反转，不再是上级对象创建并控制下级对象了，⽽是下级对象把注⼊将当前对象中，下级的控制权不再由上级类控制了，这样即使下级类发⽣任何改变，当前类都是不受影响的，这就是典型的控制反转，也就是 IoC 的实现思想。 

仔细去思考一下 , 以前所有东西都是由程序去进行控制创建 , 而现在是由我们自行控制创建对象 , 把主动权交给了调用者 . 程序不用去管怎么创建,怎么实现了 . 它只负责提供一个接口 .

这种思想 , 从本质上解决了问题 , 我们不再去管理对象的创建了 , 更多的去关注业务的实现 . 耦合性大大降低 . 这也就是IOC的原型 !

### IoC本质

控制反转IoC(Inversion of Control)，是一种设计思想，DI(依赖注入)是实现IoC的一种方法，也有人认为DI只是IoC的另一种说法。没有IoC的程序中 , 我们使用面向对象编程 , 对象的创建与对象间的依赖关系完全硬编码在程序中，对象的创建由程序自己控制，控制反转后将对象的创建转移给第三方，所谓控制反转就是：获得依赖对象的方式反转了。

![img](spring/0a4cf6d3f9cb9a73593e73fbf29b4758.png)

IoC是Spring框架的核心内容，使用多种方式完美的实现了IoC，可以使用XML配置，也可以使用注解，新版本的Spring也可以零配置实现IoC。

Spring容器在初始化时先读取配置文件，根据配置文件或元数据创建与组织对象存入容器中，程序使用时再从Ioc容器中取出需要的对象。

![img](spring/6c0706d0b1875bec9cfac6620612da5d.png)

采用XML方式配置Bean的时候，Bean的定义信息是和实现分离的，而采用注解的方式可以把两者合为一体，Bean的定义信息直接以注解的形式定义在实现类中，从而达到了零配置的目的。

控制反转是一种通过描述（XML或注解）并通过第三方去生产或获取特定对象的方式。在Spring中实现控制反转的是IoC容器，其实现方法是依赖注入（Dependency Injection,DI）。

### IoC容器的使用

#### Bean注册与配置

1.Spring为我们提供了一个IoC容器用于存放我们需要使用的对象，我们可以将对象交给IoC容器来管理，当我们需要使用对象时，就可以向IoC容器索要，并由它来决定给我们哪一个对象。要使用IoC容器，就需要创建一个应用程序上下文，它代表的就是IoC容器，它会负责实例化、配置和组装Bean:

```java
ApplicationContext context = new ClassPathXmlApplicationContext("application.xml")
```

它有很多种实现方式，这里使用xml配置文件所以使用ClassPathXmlApplicationContext。

2.当你写好了一个bean，可以在xml文件里添加上。

```xml
<bean name="a" class="com.test.bean.Student"/>
<bean name="b" class="com.test.bean.Student"/>
```

class指定bean的类型,name（或id)表示该bean的唯一标识。

我们可以给Bean起名字，也可以起别名，就像我们除了有一个名字之外，可能在家里还有自己的小名：

```xml
<bean name="a" class="com.test.bean.Student"/>
<alias name="a" alias="test"/>
```

在xml文件上的bean可以通过context的getBean方法得到。getBean方法的参数可以是类型或name等。

3.那么现在又有新的问题了，IoC容器创建的Bean是只有一个还是每次索要的时候都会给我们一个新的对象？

实际上，我们配置的bean有两种模式(scope)。第一种是`singleton`，默认情况下就是这一种，当然还有`prototype`，表示为原型模式（为了方便叫多例模式也行）这种模式每次得到的对象都是一个新的。当Bean的作用域为单例模式时，那么它会在一开始（容器加载配置时）就被创建，我们之后拿到的都是这个对象。而处于原型模式下，只有在获取时才会被创建，也就是说，单例模式下，Bean会被IoC容器存储，只要容器没有被销毁，那么此对象将一直存在，而原型模式才是相当于在要用的时候直接new了一个对象，并不会被保存。

当然，如果我们希望单例模式下的Bean不用再一开始就加载，而是一样等到需要时再加载（加载后依然会被容器存储，之后一直使用这个对象了，不会再创建新的）我们也可以开启懒加载：

```xml
<bean class="com.test.bean.Student" lazy-init="true"/>
```

开启懒加载后，只有在真正第一次使用时才会创建对象。

因为单例模式下Bean是由IoC容器加载，但是加载顺序我们并不清楚，如果我们需要维护Bean的加载顺序（比如某个Bean必须要在另一个Bean之前创建）那么我们可以使用`depends-on`来设定前置加载Bean，这样被依赖的Bean一定会在之前加载，比如Teacher应该在Student之前加载：        

```xml
<bean name="teacher" class="com.test.bean.Teacher"/>
<bean name="student" class="com.test.bean.Student" depends-on="teacher"/>
```

这样就可以保证Bean的加载顺序了。

#### 依赖注入

4.IoC容器在创建对象时，需要将我们预先给定的属性注入到对象中，非常简单，我们可以使用`property`标签来实现，

首先依赖注入要求对应的属性必须有一个set方法：      

```java
public class Student {
    private Teacher teacher;
  	//要使用依赖注入，我们必须提供一个set方法（无论成员变量的访问权限是什么）命名规则依然是驼峰命名法
    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }
    ...
```

然后我们将bean标签展开插入property标签：             

```xml
<bean name="teacher" class="com.test.bean.ProgramTeacher"/>
<bean name="student" class="com.test.bean.Student">
    <property name="teacher" ref="teacher"/>
</bean>
```

- **`name="teacher"`**：指定了`Student`类中需要注入的属性名称，即`teacher`属性。
- **`ref="teacher"`**：表示这个`teacher`属性的值引用了前面定义的`teacher` Bean。也就是说，`Student`类的`teacher`属性会被注入为`ProgramTeacher`类的实例。

更改这两个属性，就达到了切换不同的实现。

当然，依赖注入并不一定要注入其他的Bean，也可以是一个简单的值：

```xml
<bean name="student" class="com.test.bean.Student">
    <property name="name" value="卢本伟"/>
</bean>
```

直接使用`value`可以直接传入一个具体值。

5.实际上，在很多情况下，类中的某些参数是在构造方法中就已经完成的初始化，而不是创建之后，比如：           

```java
public class Student {
    private final Teacher teacher;   //构造方法中完成，所以说是一个final变量

    public Student(Teacher teacher){   //Teacher属性是在构造方法中完成的初始化
        this.teacher = teacher;
    }
  	...
```

我们前面说了，Bean实际上是由IoC容器进行创建的，但是现在我们修改了默认的无参构造，可以看到配置文件里面报错了：

![image-20221122174328107](spring/5HN8GKQywWaYvrF.webp)

指定构造器

很明显，是因为我们修改了构造方法，IoC容器默认只会调用无参构造，所以，我们需要指明一个可以用的构造方法，我们展开bean标签，添加一个`constructor-arg`标签：   

```xml
<bean name="teacher" class="com.test.bean.ArtTeacher"/>
<bean name="student" class="com.test.bean.Student">
    <constructor-arg name="teacher" ref="teacher"/>
</bean>
```

这里的`constructor-arg`就是构造方法的一个参数，这个参数可以写很多个，会自动匹配符合里面参数数量的构造方法，这里匹配的就是我们刚刚编写的需要一个参数的构造方法。

![image-20221122191427776](spring/evKArqDYcIQPCXT.webp)

通过这种方式，我们也能实现依赖注入，只不过现在我们将依赖注入的时机提前到了对象构造时。

那要是出现这种情况呢？现在我们的Student类中是这样定义的：

```java
public class Student {
    private final String name;
    public Student(String name){
        System.out.println("我是一号构造方法");
        this.name = name;
    }

    public Student(int age){
        System.out.println("我是二号构造方法");
        this.name = String.valueOf(age);
    }
}
```

此时我们希望使用的是二号构造方法，那么怎么才能指定呢？有2种方式，我们可以给标签添加类型：

```xml
<constructor-arg value="1" type="int"/>
```

也可以指定为对应的参数名称：                   

```xml
<constructor-arg value="1" name="age"/>
```

反正只要能够保证我们指定的参数匹配到目标构造方法即可。

6.特殊的类型

现在我们的类中出现了一个比较特殊的类型，它是一个集合类型：    

```java
public class Student {
    private List<String> list;

    public void setList(List<String> list) {
        this.list = list;
    }
}
```

对于这种集合类型，有着特殊的支持：          

```xml
<bean name="student" class="com.test.bean.Student">
  	<!--  对于集合类型，我们可以直接使用标签编辑集合的默认值  -->
    <property name="list">
        <list>
            <value>AAA</value>
            <value>BBB</value>
            <value>CCC</value>
        </list>
    </property>
</bean>
```

不仅仅是List，Map、Set这类常用集合类包括数组在内，都是支持这样编写的，比如Map类型，我们也可以使用`entry`来注入：

```xml
<bean name="student" class="com.test.bean.Student">
    <property name="map">
        <map>
            <entry key="语文" value="100.0"/>
            <entry key="数学" value="80.0"/>
            <entry key="英语" value="92.5"/>
        </map>
    </property>
</bean>
```

至此，我们就已经完成了两种依赖注入的学习：

- Setter依赖注入：通过成员属性对应的set方法完成注入。
- 构造方法依赖注入：通过构造方法完成注入。

#### 自动装配

**autowire实现自动装配**

在之前，如果我们需要使用依赖注入的话，我们需要对`property`参数进行配置：       

```xml
<bean name="student" class="com.test.bean.Student">
    <property name="teacher" ref="teacher"/>
</bean>
```

但是有些时候为了方便，我们也可以开启自动装配。自动装配就是让IoC容器自己去寻找需要填入的值，我们只需要将set方法提供好就可以了，这里需要添加autowire属性：             

```xml
<bean name="student" class="com.test.bean.Student" autowire="byType"/>
```

`autowire`属性有两个值普通，一个是byName，还有一个是byType，顾名思义，一个是根据类型去寻找合适的Bean自动装配，还有一个是根据名字去找，这样我们就不需要显式指定`property`了。

![image-20221122221936559](spring/QIBRwScq6fu4XDm.webp)

此时set方法旁边会出现一个自动装配图标，效果和上面是一样的。

对于使用构造方法完成的依赖注入，也支持自动装配，我们只需要将autowire修改为：   

```xml
<bean name="student" class="com.test.bean.Student" autowire="constructor"/>
```

这样，我们只需要提供一个对应参数的构造方法就可以了（这种情况默认也是byType寻找的）：

![image-20221122230320004](spring/rgl7fXJ2ZKAU8Rd.webp)

这样同样可以完成自动注入：

![image-20221122191427776](spring/evKArqDYcIQPCXT.webp)

**autowire-candidate和primary解决类型相同问题**

自动化的东西虽然省事，但是太过机械，有些时候，自动装配可能会遇到一些问题，比如出现了下面的情况：

![image-20221122223048820](spring/SQTchJBq4G8NWyC.webp)

此时，由于`autowire`的规则为byType，存在两个候选Bean，但是我们其实希望ProgramTeacher这个Bean在任何情况下都不参与到自动装配中，此时我们就可以将它的自动装配候选关闭：     

```xml
<bean name="teacher" class="com.test.bean.ArtTeacher"/>
<bean name="teacher2" class="com.test.bean.ProgramTeacher" autowire-candidate="false"/>
<bean name="student" class="com.test.bean.Student" autowire="byType"/>
```

当`autowire-candidate`设定false时，这个Bean将不再作为自动装配的候选Bean，此时自动装配候选就只剩下一个唯一的Bean了，报错消失，程序可以正常运行。

除了这种方式，我们也可以设定primary属性，表示这个Bean作为主要的Bean，当出现歧义时，也会优先选择：             

```xml
<bean name="teacher" class="com.test.bean.ArtTeacher" primary="true"/>
<bean name="teacher2" class="com.test.bean.ProgramTeacher"/>
<bean name="student" class="com.test.bean.Student" autowire="byType"/>
```

这样写程序依然可以正常运行，并且选择的也是ArtTeacher。

#### 生命周期与继承

**`init-method`和`destroy-method`来指定初始和销毁方法**

除了修改构造方法，我们也可以为Bean指定初始化方法inti()和销毁方法destroy()，以便在对象创建和被销毁时执行一些其他的任务。

我们可以通过`init-method`和`destroy-method`来指定：

```xml
<bean name="student" class="com.test.bean.Student" init-method="init" destroy-method="destroy"/>
```

那么什么时候是初始化，什么时候又是销毁呢？

```java
//当容器创建时，默认情况下Bean都是单例的，那么都会在一开始就加载好，对象构造完成后，会执行init-method
ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("test.xml");
//我们可以调用close方法关闭容器，此时容器内存放的Bean也会被一起销毁，会执行destroy-method
context.close();
```

所以说，最后的结果为：

![image-20221123132604262](spring/GWIyPDOaK4TAM1N.webp)

注意，如果Bean不是单例模式，而是采用的原型模式，那么就只会在获取时才创建，并调用init-method，而对应的销毁方法不会被调用（因此，对于原型模式下的Bean，Spring无法顾及其完整生命周期，而在单例模式下，Spring能够从Bean对象的创建一直管理到对象的销毁）。

**parent实现属性继承**

Bean之间也是具备继承关系的，只不过这里的继承并不是类的继承，而是属性的继承，比如：        

```java
public class SportStudent {
    private String name;

    public void setName(String name) {
        this.name = name;
    }
}                   
```

```java
public class ArtStudent {
    private String name;
   
    public void setName(String name) {
        this.name = name;
    }
}
```

此时，我们先将ArtStudent注册一个Bean：              

```xml
<bean name="artStudent" class="com.test.bean.ArtStudent">
    <property name="name" value="小明"/>
</bean>
```

这里我们会注入一个name的初始值，此时我们创建了一个SportStudent的Bean，我们希望这个Bean的属性跟刚刚创建的Bean属性是一样的，那么我们可以写一个一模一样的：                 

```xml
<bean class="com.test.bean.SportStudent">
    <property name="name" value="小明"/>
</bean>
```

但是如果属性太多的话，是不是写起来有点麻烦？这种情况，我们就可以配置Bean之间的继承关系了，我们可以让SportStudent这个Bean直接继承ArtStudent这个Bean配置的属性：            

```xml
<bean class="com.test.bean.SportStudent" parent="artStudent"/>
```

这样，在ArtStudent Bean中配置的属性，会直接继承给SportStudent Bean（注意，所有配置的属性，在子Bean中必须也要存在， 并且可以进行注入，否则会出现错误）当然，如果子类中某些属性比较特殊，也可以在继承的基础上单独配置：        

```xml
<bean name="artStudent" class="com.test.bean.ArtStudent" abstract="true">
    <property name="name" value="小明"/>
    <property name="id" value="1"/>
</bean>
<bean class="com.test.bean.SportStudent" parent="artStudent">
    <property name="id" value="2"/>
</bean>
```

**abstract将Bean仅作为一个配置模版**

如果我们只是希望某一个Bean仅作为一个配置模版供其他Bean继承使用，那么我们可以将其配置为abstract，这样，容器就不会创建这个Bean的对象了：        

```xml
<bean name="artStudent" class="com.test.bean.ArtStudent" abstract="true">
    <property name="name" value="小明"/>
</bean>
<bean class="com.test.bean.SportStudent" parent="artStudent"/>
```

注意，一旦声明为抽象Bean，那么就无法通过容器获取到其实例化对象了。

![image-20221123140409416](spring/SyDkvOldB7ETW4z.webp)

**大标签beans实现全局默认配置**

如果我们希望整个上下文中所有的Bean都采用某种配置，我们可以在最外层的beans标签中进行默认配置：

![image-20221123141221259](spring/KzSUJXa4jBfO9rd.webp)

这样，即使Bean没有配置某项属性，但是只要在最外层编写了默认配置，那么同样会生效，除非Bean自己进行配置覆盖掉默认配置。

#### 工厂模式和工厂Bean

前面我们介绍了IoC容器的Bean创建机制，默认情况下，容器会调用Bean对应类型的构造方法进行对象创建，但是在某些时候，我们可能不希望外界使用类的构造方法完成对象创建，比如在工厂方法设计模式中（详情请观看《Java设计模式》篇 视频教程）我们更希望 Spring不要直接利用反射机制通过构造方法创建Bean对象， 而是利用反射机制先找到对应的工厂类，然后利用工厂类去生成需要的Bean对象：  

```java
public class Student {
    Student() {
        System.out.println("我被构造了");
    }
}
```

```java
public class StudentFactory {
    public static Student getStudent(){
      	System.out.println("欢迎光临电子厂");
        return new Student();
    }
}
```

此时Student有一个工厂，我们正常情况下需要使用工厂才可以得到Student对象，现在我们希望Spring也这样做，不要直接去反射搞构造方法创建，我们可以通过factory-method进行指定：

```xml
<bean class="com.test.bean.StudentFactory" factory-method="getStudent"/>
```

注意，这里的Bean类型需要填写为Student类的工厂类，并且添加factory-method指定对应的工厂方法，但是最后注册的是工厂方法的返回类型，所以说依然是Student的Bean：

![image-20221123143302785](spring/5Id43xPneJiWfZs.webp)

此时我们再去进行获取，拿到的也是通过工厂方法得到的对象：

![image-20221123143347376](spring/l8HzN7Rwthqrim5.webp)

这里有一个误区，千万不要认为是我们注册了StudentFactory这个Bean，class填写为这个类这个只是为了告诉Spring我们的工厂方法在哪个位置，真正注册的是工厂方法提供的东西。

可以发现，当我们采用工厂模式后，我们就无法再通过配置文件对Bean进行依赖注入等操作了，而是只能在工厂方法中完成，这似乎与Spring的设计理念背道而驰？

当然，可能某些工厂类需要构造出对象之后才能使用，我们也可以将某个工厂类直接注册为工厂Bean： 

```java
public class StudentFactory {
    public Student getStudent(){
        System.out.println("欢迎光临电子厂");
        return new Student();
    }
}
```

现在需要StudentFactory对象才可以获取到Student，此时我们就只能先将其注册为Bean了：                 

```xml
<bean name="studentFactory" class="com.test.bean.StudentFactory"/>
```

像这样将工厂类注册为Bean，我们称其为工厂Bean，然后再使用`factory-bean`来指定Bean的工厂Bean：               

```xml
<bean factory-bean="studentFactory" factory-method="getStudent"/>
```

注意，使用factory-bean之后，不再要求指定class，我们可以直接使用了：

![image-20221123164134470](spring/ih1Af7xBdX3ebaG.webp)

此时可以看到，工厂方法上同样有了图标，这种方式，由于工厂类被注册为Bean，此时我们就可以在配置文件中为工厂Bean配置依赖注入等内容了。

这里还有一个很细节的操作，如果我们想获取工厂Bean为我们提供的Bean，可以直接输入工厂Bean的名称，这样不会得到工厂Bean的实例，而是工厂Bean生产的Bean的实例：             

```java
Student bean = (Student) context.getBean("studentFactory");
```

当然，如果我们需要获取工厂类的实例，可以在名称前面添加`&`符号：           

```java
StudentFactory bean = (StudentFactory) context.getBean("&studentFactory");
```

又是一个小细节。

