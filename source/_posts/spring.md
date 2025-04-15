---
title: Spring
date: 2025-04-15
updated: 2025-04-15
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

# IOC理论推导

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

 虽然这段代码的确能够满足需求，但是我们不难发现一个特点，就是它的[耦合性](https://so.csdn.net/so/search?q=耦合性&spm=1001.2101.3001.7020)非常高。假如我们需要更改轮胎的尺寸，我们需要将轮胎以及所有依赖轮胎的组件的构造方法全部更改一遍，加上size参数，例如下面那样。

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

### IOC本质

控制反转IoC(Inversion of Control)，是一种设计思想，DI(依赖注入)是实现IoC的一种方法，也有人认为DI只是IoC的另一种说法。没有IoC的程序中 , 我们使用面向对象编程 , 对象的创建与对象间的依赖关系完全硬编码在程序中，对象的创建由程序自己控制，控制反转后将对象的创建转移给第三方，所谓控制反转就是：获得依赖对象的方式反转了。

![img](spring/0a4cf6d3f9cb9a73593e73fbf29b4758.png)

IoC是Spring框架的核心内容，使用多种方式完美的实现了IoC，可以使用XML配置，也可以使用注解，新版本的Spring也可以零配置实现IoC。

Spring容器在初始化时先读取配置文件，根据配置文件或元数据创建与组织对象存入容器中，程序使用时再从Ioc容器中取出需要的对象。

![img](spring/6c0706d0b1875bec9cfac6620612da5d.png)

采用XML方式配置Bean的时候，Bean的定义信息是和实现分离的，而采用注解的方式可以把两者合为一体，Bean的定义信息直接以注解的形式定义在实现类中，从而达到了零配置的目的。

控制反转是一种通过描述（XML或注解）并通过第三方去生产或获取特定对象的方式。在Spring中实现控制反转的是IoC容器，其实现方法是依赖注入（Dependency Injection,DI）。