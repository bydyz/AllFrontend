# IService提供的默认方法，可直接进行数据库处理

```java
检索，最后得到数量
Long count = this.lambdaQuery().eq(SystemUser::getAccount, params.getAccount()).count();



检索，最后得到list
List<SystemUser> userList = systemUserService.lambdaQuery().eq(SystemUser::getAccount, request.getAccount()).list();



新建
UniUser uniUser = new UniUser();
this.save(uniUser);



根据 id 查询
// SecurityContextHolder.getUserId() 是 Long类型的
SystemUser systemUser = systemUserService.getById(SecurityContextHolder.getUserId());
```
