# calculator Specification

## Purpose
TBD - created by archiving change sample000001. Update Purpose after archive.
## Requirements
### Requirement: 加法运算
系统 SHALL 提供加法运算功能，接受两个数字参数，返回它们的和。

#### Scenario: 正常加法运算
- **WHEN** 调用 add(2, 3)
- **THEN** 返回 5

#### Scenario: 负数加法运算
- **WHEN** 调用 add(-1, 1)
- **THEN** 返回 0

### Requirement: 减法运算
系统 SHALL 提供减法运算功能，接受两个数字参数，返回它们的差。

#### Scenario: 正常减法运算
- **WHEN** 调用 subtract(5, 3)
- **THEN** 返回 2

#### Scenario: 结果为负数的减法运算
- **WHEN** 调用 subtract(3, 5)
- **THEN** 返回 -2

### Requirement: 乘法运算
系统 SHALL 提供乘法运算功能，接受两个数字参数，返回它们的积。

#### Scenario: 正常乘法运算
- **WHEN** 调用 multiply(4, 5)
- **THEN** 返回 20

#### Scenario: 乘以零的运算
- **WHEN** 调用 multiply(10, 0)
- **THEN** 返回 0

### Requirement: 除法运算
系统 SHALL 提供除法运算功能，接受两个数字参数，返回它们的商。

#### Scenario: 正常除法运算
- **WHEN** 调用 divide(10, 2)
- **THEN** 返回 5

#### Scenario: 除数为零时抛出错误
- **WHEN** 调用 divide(10, 0)
- **THEN** 抛出错误 "除数不能为零"

