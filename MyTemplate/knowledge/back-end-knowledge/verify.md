# import jakarta.validation.constraints.*

jakarta.validation.constraints 包含了一系列用于 Bean Validation 的注解，这些注解可以用来定义 Java 类属性的校验规则。Bean Validation 是一种标准，它允许你在应用程序的不同层（如持久层、业务逻辑层和表示层）中声明式地定义和执行验证规则。Jakarta Bean Validation 是这一标准的最新版本，取代了之前的 Hibernate Validator 和 JSR 380（Bean Validation 2.0）。


### @AssertFalse
  - 描述：确保被注解的布尔字段或方法返回值为 false。
  - 示例：
    ```java
    @AssertFalse(message = "必须是 false")
    private boolean isActive;
    ```

### @AssertTrue
  - 描述：确保被注解的布尔字段或方法返回值为 true
  - 示例：
    ```java
    @AssertTrue(message = "必须是 true")
    private boolean isActive;
    ```

### @DecimalMax(value)
  - 描述：确保被注解的数值字段或方法返回值不超过指定的最大值。
  - 参数
    - value：最大值字符串表示。
    - inclusive：是否包含边界值，默认为 true。
  - 示例：
    ```java
    @DecimalMax(value = "100", message = "不能超过 100")
    private BigDecimal price;
    ```

### @DecimalMin(value)
  - 描述：确保被注解的数值字段或方法返回值不低于指定的最小值。
  - 参数
    - value：最小值字符串表示。
    - inclusive：是否包含边界值，默认为 true。
  - 示例：
    ```java
    @DecimalMin(value = "0", message = "不能低于 0")
    private BigDecimal amount;
    ```

### @Digits(integer, fraction)
  - 描述：确保被注解的数值字段或方法返回值符合指定的整数位数和小数位数限制。
  - 参数
    - integer：整数部分的最大长度。
    - fraction：小数部分的最大长度。
  - 示例：
    ```java
    @Digits(integer = 5, fraction = 2, message = "最多 5 位整数和 2 位小数")
    private BigDecimal salary;
    ```

### @Email
  - 描述：确保被注解的字符串字段或方法返回值符合电子邮件格式。
  - 参数
    - regexp：自定义正则表达式。
    - flags：正则表达式的标志。
  - 示例：
    ```java
    @Email(message = "无效的电子邮件地址")
    private String email;
    ```

### @Future
  - 描述：确保被注解的日期字段或方法返回值在当前时间之后。
  - 示例：
    ```java
    @Future(message = "必须是未来的日期")
    private LocalDate startDate;
    ```

### @FutureOrPresent
  - 描述：确保被注解的日期字段或方法返回值在当前时间之后或等于当前时间。
  - 示例：
    ```java
    @FutureOrPresent(message = "必须是未来或当前的日期")
    private LocalDateTime eventDate;
    ```

### @Max(value)
  - 描述：确保被注解的数值字段或方法返回值不超过指定的最大值。
  - 参数
    - value：最大值。
  - 示例：
    ```java
    @Max(value = 100, message = "不能超过 100")
    private int quantity;
    ```

### @Min(value)
  - 描述：确保被注解的数值字段或方法返回值不低于指定的最小值。
  - 参数
    - value：最小值。
  - 示例：
    ```java
    @Min(value = 0, message = "不能低于 0")
    private int age;
    ```

### @Negative
  - 描述：确保被注解的数值字段或方法返回值为负数。
  - 示例：
    ```java
    @Negative(message = "必须为负数")
    private double discount;
    ```

### @NegativeOrZero
  - 描述：确保被注解的数值字段或方法返回值为负数或零。
  - 示例：
    ```java
    @NegativeOrZero(message = "必须为非正数")
    private float balance;
    ```

### @NotBlank
  - 描述：用于确保被注解的字符串字段不为 null、不为空字符串（即 ""），并且至少包含一个非空白字符。
  - 参数
    - message：自定义验证失败时的错误消息。
    - groups：指定分组，允许你在不同的验证场景下应用不同的规则。
    - payload: 携带额外的信息，通常用于与其他框架集成或扩展验证逻辑。无默认值
  - 示例：
    ```java
    @NotBlank(message = "用户名不能为空或仅包含空白字符")
    private String username;

    @NotBlank(groups = RegistrationGroup.class, message = "注册时用户名不能为空或仅包含空白字符")
    private String username;

    当 字段为 null、""、"  " 均会验证失败
    ```

### @NotEmpty
  - 描述：用于确保被注解的字段不为 null 且不是空集合、数组或字符串。
  - 参数
    - message：自定义验证失败时的错误消息。
    - groups：指定分组，允许你在不同的验证场景下应用不同的规则。
    - payload: 携带额外的信息，通常用于与其他框架集成或扩展验证逻辑。无默认值
  - 示例：
    ```java
    @NotEmpty(message = "电子邮件不能为空")
    private String email;

    @NotBlank(groups = RegistrationGroup.class, message = "注册时用户名不能为空或仅包含空白字符")
    private String username;


    它不仅检查对象是否为 null，还进一步检查其是否为空（例如，空字符串 "" 或空集合 []）。与 @NotBlank 不同的是，@NotEmpty 允许字符串包含空白字符。

      当 字段为 null、"" 均会验证失败
      当 字段为 "  " 会验证通过
      只有当字段既不为 null 也不为空集合、数组或字符串时，验证才通过。
    ```

### @NotNull
  - 描述：确保被注解的字段或方法返回值不为 null。
  - 示例：
    ```java
    @NotNull(message = "不能为空")
    private String name;
    ```

### @Null
  - 描述：确保被注解的字段或方法返回值为 null。
  - 示例：
    ```java
    @Null(message = "必须为空")
    private Object data;
    ```

### @Past
  - 描述：确保被注解的日期字段或方法返回值在当前时间之前。
  - 示例：
    ```java
    @Past(message = "必须是过去的日期")
    private Date birthDate;
    ```

### @PastOrPresent
  - 描述：确保被注解的日期字段或方法返回值在当前时间之前或等于当前时间。
  - 示例：
    ```java
    @PastOrPresent(message = "必须是过去或当前的日期")
    private Instant lastLogin;
    ```

### @Pattern(regexp)
  - 描述：确保被注解的字符串字段或方法返回值符合指定的正则表达式。
  - 参数
    - regexp：正则表达式。
    - flags：正则表达式的标志。
  - 示例：
    ```java
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "只能包含字母和数字")
    private String username;
    ```

### @Positive
  - 描述：确保被注解的数值字段或方法返回值为正数。
  - 示例：
    ```java
    @Positive(message = "必须为正数")
    private long id;
    ```

### @PositiveOrZero
  - 描述：确保被注解的数值字段或方法返回值为正数或零。
  - 示例：
    ```java
    @PositiveOrZero(message = "必须为非负数")
    private Integer count;
    ```

### @Size(min, max)
  - 描述：确保被注解的字符串字段或方法返回值符合指定的正则表达式。
  - 参数
    - min：最小长度。
    - max：最大长度。
  - 示例：
    ```java
    @Size(min = 1, max = 10, message = "长度必须在 1 到 10 之间")
    private List<String> items;
    ```


# 自定义校验注解

如果你需要更复杂的校验逻辑，可以通过创建自定义校验注解来实现。以下是一个简单的例子：

```java
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = UniqueUsernameValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueUsername {
    String message() default "用户名已存在";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
```

然后实现相应的校验器：

```java
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

    @Override
    public void initialize(UniqueUsername constraintAnnotation) {
        // 初始化代码
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // 实现校验逻辑
        return userService.isUsernameUnique(value);
    }
}
```
