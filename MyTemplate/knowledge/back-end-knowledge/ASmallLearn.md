### import lombok.extern.slf4j.Slf4j;

```java
@Slf4j

lombok.extern.slf4j.Slf4j 是 Project Lombok 提供的一个注解，用于简化日志记录的配置。通过使用这个注解，你可以避免手动创建 Logger 实例的样板代码

使用 @Slf4j 注解
@Slf4j 注解会为你的类注入一个静态的日志记录器实例，通常命名为 log。这个日志记录器是基于 SLF4J（Simple Logging Facade for Java）接口实现的，
因此你可以使用任何兼容 SLF4J 的日志框架，如 Logback 或 Log4j2。

@Slf4j：该注解会自动为 有此注解的类 注入一个名为 log 的静态 Logger 实例。
log.debug：记录调试级别的信息。
log.info：记录信息级别的信息，并使用占位符 {} 来格式化输出。
log.error：记录错误级别的信息，并传递异常对象以包含堆栈跟踪。
```










### import com.mf.common.log.annotation.Log;

```java
@Log(title = "新增后台用户表", businessType = BusinessType.INSERT)
@Log 注解通常用于在应用程序中记录操作日志，特别是在执行某些业务逻辑之前或之后。

@Log 注解属性
  title 属性：
    含义：指定日志的标题或描述。
    作用：为日志条目提供一个易于理解的标签，帮助快速识别日志内容。
    示例："新增后台用户表" 表示这个日志是关于添加新的后台用户的。
  businessType 属性：
    含义：指定业务类型，即该方法所涉及的操作类别。
    作用：用于分类和过滤日志，便于后续分析和审计。
    示例：BusinessType.INSERT 表示这是一个插入操作。其他常见的业务类型可能包括 UPDATE（更新）、DELETE（删除）、SELECT（查询）等。

日志记录机制
  自动记录：当带有 @Log 注解的方法被调用时，框架会自动创建并保存一条日志记录。
  日志内容：除了标题和业务类型外，日志还可能包含其他信息，如操作时间、操作人（用户ID）、IP地址、请求参数等，具体取决于框架的实现和配置。
  安全性和合规性：通过记录详细的日志，可以确保系统的操作透明度，有助于满足安全性和合规性要求。

使用场景
  审计追踪：记录所有对系统有影响的操作，特别是涉及到敏感数据或权限变更的操作。
  故障排查：在出现问题时，可以通过查看相关日志来快速定位问题原因。
  性能监控：结合日志分析工具，可以监控系统性能，识别潜在瓶颈。
```










### import org.springframework.web.bind.annotation.RestController;

```java
@RestController

@RestController 是 Spring 框架中的一个注解，主要用于构建 RESTful Web 服务。它简化了控制器类的定义，
使得你可以专注于处理 HTTP 请求和响应，而不需要额外配置或编写大量的样板代码。

组合注解：@RestController 实际上是 @Controller 和 @ResponseBody 的组合注解。
	@Controller：用于标识一个 Spring MVC 控制器类，告诉 Spring 容器这是一个用于处理 HTTP 请求的组件。
	@ResponseBody：用于指示方法返回值应直接写入 HTTP 响应体中，而不是解析为视图名称或模型数据。
因此，当你在一个类上使用 @RestController 注解时，Spring 会自动将该类的方法返回值序列化为 JSON 或 XML 等格式，
并将其作为 HTTP 响应的内容发送给客户端。
```










### swagger中文注释;

```java
import io.swagger.annotations.Api;
@Api(tags = "平台用户-登陆器")

import io.swagger.annotations.ApiModelProperty;
@ApiModelProperty(value = "用户名")

import io.swagger.annotations.ApiOperation;
@ApiOperation("登录")

最终都反映到了 Api文档 中
```










### 请求参数封装类模板;

```java
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class SystemUserAddRequest {
    
    // @Schema：Swagger 注解，用于生成 API 文档，提供字段的描述信息。
    @Schema(title = "账号")
    @NotBlank
    private String account;
    
    @Schema(title = "手机号")
    @NotBlank
    private String phone;
    
    @Schema(title = "密码 若加盐就是加密后的密文")
    @NotBlank
    private String password;
    
    @Schema(title = "真实姓名")
    @NotBlank
    private String realName;
    
    @Schema(title = "部门名称")
    private String orgName;

    @NotEmpty(message = "角色不能为空")
    @Schema(title  = "角色ID列表")
    private List<Long> roleIdList;

}
```










### 实体类模板

提供的 SystemUser 实体类是基于 MyBatis-Plus 和 Lombok 构建的，并且集成了 Swagger 用于 API 文档生成。
```java
import com.baomidou.mybatisplus.extension.activerecord.Model;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDateTime;
import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

@Data
// @EqualsAndHashCode(callSuper = true)：确保继承自父类 Model 的属性也包含在 equals() 和 hashCode() 的计算中。
@EqualsAndHashCode(callSuper = true)
// extends Model：继承自 MyBatis-Plus 提供的 Model 类，简化了 CRUD 操作。
public class SystemUser extends Model {

    // serialVersionUID：用于序列化机制中的版本控制。当类的实现发生变化时，可以调整此值以避免反序列化问题。
    private static final long serialVersionUID = -64490882833222990L;

    // @Schema：Swagger 注解，用于生成 API 文档，提供字段的描述信息。
    @Schema(title = "用户id")
    private Long id;

    @Schema(title = "应用id")
    private Long appId;

    @Schema(title = "账号")
    private String account;

    @Schema(title = "手机号")
    private String phone;

    @Schema(title = "邮箱")
    private String email;

    @Schema(title = "密码 若加盐就是加密后的密文")
    private String password;

    @Schema(title = "真实姓名")
    private String realName;

    @Schema(title = "头像地址")
    private String headImgUrl;

    @Schema(title = "性别 0-未知 1-男 2-女")
    private Integer sex;

    @Schema(title = "身份号码")
    private String idNumber;

    @Schema(title = "")
    @TableField(fill = FieldFill.INSERT)
    // @JsonFormat：Jackson 注解，用于格式化 JSON 输出的时间字段，确保使用指定的时间格式和时区。
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime createTime;

    @Schema(title = "")
    @TableField(fill = FieldFill.INSERT)
    private Long createBy;

    @Schema(title = "")
    @TableField(fill = FieldFill.UPDATE)
    private Long updateBy;

}
```

