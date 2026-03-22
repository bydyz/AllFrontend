# import com.baomidou.mybatisplus.annotation.*

* @TableField(fill = FieldFill.INSERT)
  @TableField(fill = FieldFill.INSERT) 是 MyBatis-Plus 框架中用于实体类字段上的注解，旨在指定该字段在插入（insert）操作时需要自动填充。MyBatis-Plus 提供了便捷的 CRUD 操作支持，并通过这些注解简化了数据库表与 Java 实体类之间的映射。 
  <br/>
  <br/>


  * 注解描述
    * 作用：当实体对象被插入到数据库时，带有 @TableField(fill = FieldFill.INSERT) 注解的字段会被自动填充。这意味着你不需要手动为这些字段赋值，框架会在执行插入操作前自动处理。
    * 应用场景：通常用于那些在插入记录时需要自动设置的字段，例如创建时间、创建人等。
  <br/>
  <br/>


  * 参数详解
  @TableField 支持多个参数来定制其行为，以下是与自动填充相关的参数说明：
    * fill  指定字段的自动填充策略。
      * FieldFill.DEFAULT：默认不进行自动填充。
      * FieldFill.INSERT：仅在插入时自动填充。
      * FieldFill.UPDATE：仅在更新时自动填充。
      * FieldFill.INSERT_UPDATE：在插入和更新时都自动填充。
    * value
      * 描述: 指定字段对应的数据库列名。如果实体类字段名与数据库列名不同，则可以使用此参数进行映射。
      * 默认值: 实体类字段名。
    * exist
      * 描述: 指示该字段是否存在于数据库表中。如果设置为 false，则 MyBatis-Plus 在生成 SQL 语句时不会考虑该字段。
      * 默认值: true
  <br/>
  <br/>


  * 自动填充处理器
    为了实现自动填充功能，你需要配置一个或多个 MetaObjectHandler 接口的实现类。这些处理器负责在适当的时候为标记了 @TableField(fill = ...) 的字段提供具体的值。
    ```java
    import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
    import org.apache.ibatis.reflection.MetaObject;
    import java.util.Date;

    @Component
    public class MyMetaObjectHandler implements MetaObjectHandler {

        @Override
        public void insertFill(MetaObject metaObject) {
            this.strictInsertFill(metaObject, "createTime", Date.class, new Date());
            this.strictInsertFill(metaObject, "createBy", String.class, "system");
        }

        @Override
        public void updateFill(MetaObject metaObject) {
            this.strictUpdateFill(metaObject, "updateTime", Date.class, new Date());
            this.strictUpdateFill(metaObject, "updateBy", String.class, "system");
        }
    }

    在这个例子中：
    insertFill 方法会在插入操作时自动为 createTime 和 createBy 字段填充当前时间和 "system" 作为默认创建者。
    updateFill 方法会在更新操作时自动为 updateTime 和 updateBy 字段填充当前时间和 "system" 作为默认更新者。
    ```
  <br/>
  <br/>


  * 举例
  

  * 配置自动填充处理器
    确保你的 Spring Boot 应用程序能够扫描到并注册 MetaObjectHandler 实现类。如果你使用的是组件扫描，只需将其实现类标注为 @Component 即可。
    ```yaml
    # application.yml
    mybatis-plus:
      global-config:
        db-config:
          id-type: auto
    ```
<br/>
<br/>


# MybatisPlusConfiguration MybatisPlus配置类

```java
@Slf4j
// @Configuration的作用：标识这是一个 Spring Boot 配置类，Spring 容器会扫描并加载此类中的 Bean 定义和其他配置。
// 作用：
// 1.添加Bean 定义，通过使用 @Bean 注解的方法来定义并注册 Bean 到 Spring 容器中。
// 2. 条件化配置    使用 @ConditionalOn* 系列注解（如 @ConditionalOnProperty, @ConditionalOnMissingBean, @ConditionalOnClass 等）
//                 可以根据特定条件决定是否应用某个配置或创建某个 Bean。
//     示例：根据属性值有条件地加载 Bean
//     @Configuration
//     public class ConditionalConfig {
//
//         @Bean
//         @ConditionalOnProperty(name = "my.feature.enabled", havingValue = "true")
//         public FeatureService featureService() {
//             return new FeatureServiceImpl();
//         }
//     }
//     示例：当没有特定 Bean 时才加载
//     @Bean
//     @ConditionalOnMissingBean(MyService.class)
//     public MyService myService() {
//         return new MyServiceImpl();
//     }
// 3.属性绑定      通过 @Value 或者 @ConfigurationProperties 来绑定外部配置文件中的属性到配置类的字段上，从而实现配置的动态化。
//     示例：使用 @Value 绑定单个属性
//     @Configuration
//     public class PropertyConfig {
//
//         @Value("${app.name}")
//         private String appName;
//
//         @Bean
//         public AppService appService() {
//             AppService service = new AppServiceImpl();
//             service.setAppName(appName);
//             return service;
//         }
//     }
//     示例：使用 @ConfigurationProperties 绑定一组属性
//     @Configuration
//     @ConfigurationProperties(prefix = "app")
//     public class AppConfigProperties {
//
//         private String name;
//         private int version;
//
//         // Getters and Setters
//     }
//
//     @Configuration
//     public class AppConfig {
//
//         @Autowired
//         private AppConfigProperties appConfigProperties;
//
//         @Bean
//         public AppService appService() {
//             AppService service = new AppServiceImpl();
//             service.setAppName(appConfigProperties.getName());
//             service.setVersion(appConfigProperties.getVersion());
//             return service;
//         }
//     }
// 4.AOP 配置        可以定义切面（Aspect），通过 AOP 实现横切关注点（如日志记录、事务管理等）。
//     示例：定义一个简单的切面
//     @Configuration
//     @EnableAspectJAutoProxy
//     public class AspectConfig {
//
//         @Bean
//         public LoggingAspect loggingAspect() {
//             return new LoggingAspect();
//         }
//     }
// 5. 事务管理     通过 @EnableTransactionManagement 启用基于注解的事务管理，并可以配置事务管理器。
//     示例：启用事务管理
//     @Configuration
//     @EnableTransactionManagement
//     public class TransactionConfig {
//
//         @Bean
//         public PlatformTransactionManager transactionManager(DataSource dataSource) {
//             return new DataSourceTransactionManager(dataSource);
//         }
//     }
// 6. Spring Security 配置       如果你的应用需要安全保护，可以通过 @Configuration 类来配置 Spring Security。
// 7. 集成第三方库       @Configuration 类可以用来配置与第三方库的集成，比如数据库连接池、消息队列、缓存等。
// 8. 组件扫描         虽然通常我们会使用 @ComponentScan 或者 @SpringBootApplication 来自动扫描组件，但在某些情况下，你可能希望更细粒度地控制哪些包被扫描。
// 9. 视图解析器配置
@Configuration
// @AllArgsConstructor
//     作用：Lombok 注解，自动生成一个全参构造函数，避免手动编写构造函数代码。
//     示例：如果有两个字段 tenantProperties 和 tenantLineInnerInterceptor，则会生成一个包含这两个参数的构造函数。
@AllArgsConstructor
// @EnableTransactionManagement
//     作用：启用基于注解的事务管理功能，确保使用 @Transactional 注解的方法能够正确地参与事务。
@EnableTransactionManagement
// @MapperScan
//     作用：指定 MyBatis Mapper 接口所在的包路径，让 Spring 自动扫描并注册这些接口为 Bean。
//     参数：{AppConstant.MAPPER_BASE_PACKAGES} 表示从 AppConstant 类中获取 Mapper 接口的基础包路径。
// AppConstant.MAPPER_BASE_PACKAGES 的值 "com.mf.alumnus.**.mapper"

// @MapperScan({"com.mf.alumnus.**.mapper"})
// 这条语句的作用是：
//   指定扫描路径：告诉 Spring 在 com.mf.alumnus 包及其所有子包下查找带有 @Mapper 注解的接口或继承自特定基类的接口。
//   自动注册 Bean：找到的所有符合条件的 Mapper 接口都会被自动注册为 Spring 容器中的 Bean，因此你可以直接在服务层或其他组件中通过依赖注入使用它们。

// 多个包的扫描
// 如果你的应用程序中有多个不同的包包含 Mapper 接口，可以通过传递多个字符串参数给 @MapperScan 来同时扫描这些包。
// @MapperScan({
//     "com.mf.alumnus.module1.mapper",
//     "com.mf.alumnus.module2.mapper"
// })

// @ComponentScan 用于扫描服务层和其他组件，而 @MapperScan 专门用于扫描 Mapper 接口。

// 使用 basePackages 属性
// 除了直接传递字符串数组外，还可以使用 basePackages 属性来指定扫描路径。
// @MapperScan(basePackages = {"com.mf.alumnus.**.mapper"})
@MapperScan({AppConstant.MAPPER_BASE_PACKAGES})
public class MybatisPlusConfiguration {

    // TenantProperties：可能包含了与租户隔离（多租户）相关的配置属性。
    private final TenantProperties tenantProperties;

    // TenantLineInnerInterceptor：可能是用于实现租户隔离逻辑的拦截器。
    private final TenantLineInnerInterceptor tenantLineInnerInterceptor;



    /**
     * 单页分页条数限制(默认无限制,参见 插件#handlerLimit 方法)
     */
    private static final Long MAX_LIMIT = 1000L;


    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        boolean enableTenant = tenantProperties.getEnable();
        if (enableTenant) {
            interceptor.addInnerInterceptor(tenantLineInnerInterceptor);
        }
        //分页插件: PaginationInnerInterceptor
        PaginationInnerInterceptor paginationInnerInterceptor = new PaginationInnerInterceptor(DbType.MYSQL);
        paginationInnerInterceptor.setMaxLimit(MAX_LIMIT);
        interceptor.addInnerInterceptor(paginationInnerInterceptor);
        // 乐观锁
        interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        // 防止全表更新与删除
        interceptor.addInnerInterceptor(new BlockAttackInnerInterceptor());
        return interceptor;
    }


    /**
     * 自动填充数据
     */
    // @Bean：声明此方法返回的对象将被注册为 Spring 容器中的一个 Bean。
    @Bean
    // 条件注入：使用 @ConditionalOnMissingBean 注解，确保只有在没有其他 MetaObjectHandler Bean 存在的情况下才会创建一个新的实例，避免重复定义。
    @ConditionalOnMissingBean(MetaObjectHandler.class)
    public MetaObjectHandler mateMetaObjectHandler(){
        // 逻辑：
        //     创建一个新的 CommonMetaObjectHandler 实例，并通过日志输出该实例的信息。
        //     返回 metaObjectHandler 对象，作为自动填充处理器。
        CommonMetaObjectHandler metaObjectHandler = new CommonMetaObjectHandler();
        log.info("MetaObjectHandler [{}]", metaObjectHandler);
        return metaObjectHandler;
    }
}
```
