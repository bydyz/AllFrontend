# mapper的xml文件注释

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<!-- namespace 的值是 此xml文件对应的 mapper文件 -->
<mapper namespace="cn.wa.cstp.basic.mapper.SystemMenuMapper">

    <!-- resultMap：这是一个 MyBatis 的配置元素，用于定义从数据库列到 Java 对象属性的映射规则。
         它允许你指定如何将 SQL 查询的结果集转换为复杂的对象结构。 -->
    <!-- type="cn.wa.cstp.basic.entity.SystemMenu"：指定了该 resultMap 将用于映射 SystemMenu 类型的对象。 -->
    <!-- id="SystemMenuMap"：为这个 resultMap 指定一个唯一的标识符，以便在其他地方引用它。 -->
    <!-- <result> 元素：每个 <result> 元素定义了数据库列（column）与 Java 对象属性（property）之间的映射关系，
         并指定了相应的 JDBC 类型（jdbcType）。这有助于确保数据类型匹配，并且可以处理 NULL 值。 -->

    <!-- 复杂对象映射：当你需要将数据库查询结果映射到具有复杂嵌套结构或特殊命名约定的 Java 对象时，resultMap 是非常有用的工具。 -->
    <!-- 字段名称不一致：当数据库表字段名与 Java 对象属性名不完全对应时，resultMap 可以明确指定映射关系，避免歧义。 -->
    <resultMap type="cn.wa.cstp.basic.entity.SystemMenu" id="SystemMenuMap">
        <result property="id" column="id" jdbcType="INTEGER"/>
        <result property="appId" column="app_id" jdbcType="INTEGER"/>
        <result property="parentId" column="parent_id" jdbcType="INTEGER"/>
        <result property="type" column="type" jdbcType="INTEGER"/>
        <result property="uri" column="uri" jdbcType="VARCHAR"/>
        <result property="permission" column="permission" jdbcType="VARCHAR"/>
        <result property="name" column="name" jdbcType="VARCHAR"/>
        <result property="remark" column="remark" jdbcType="VARCHAR"/>
        <result property="iconUrl" column="icon_url" jdbcType="VARCHAR"/>
        <result property="category" column="category" jdbcType="VARCHAR"/>
        <result property="sort" column="sort" jdbcType="INTEGER"/>
        <result property="enabled" column="enabled" jdbcType="INTEGER"/>
        <result property="createBy" column="create_by" jdbcType="INTEGER"/>
        <result property="createTime" column="create_time" jdbcType="TIMESTAMP"/>
        <result property="updateBy" column="update_by" jdbcType="INTEGER"/>
        <result property="updateTime" column="update_time" jdbcType="TIMESTAMP"/>
    </resultMap>



    <!-- id="page"：为这个 SQL 查询指定一个唯一的标识符，通常与接口中的方法名相对应。 -->
    <!-- resultType="cn.wa.cstp.basic.pojo.systemmenu.SystemMenuPageResponse"：指定了查询结果应该被映射为 SystemMenuPageResponse 类型的对象。
         这意味着每行查询结果都会被转换成一个 SystemMenuPageResponse 实例。 -->
    
    <!-- <where> 和 <if> 结构：这些是 MyBatis 的动态 SQL 特性，用于根据传入参数构建条件语句。
         <where> 元素会自动处理 AND/OR 关键字的添加，而 <if> 元素则根据参数值的存在与否来决定是否包含某个条件。 -->
    <!-- <if test="params.appId != null">：如果 params.appId 不为空，则添加 AND app_id = #{params.appId} 条件。 -->
    <!-- <if test="params.parentId != null">：如果 params.parentId 不为空，则添加 AND parent_id = #{params.parentId} 条件。 -->
    <!-- <if test="params.enabled != null">：如果 params.enabled 不为空，则添加 AND enabled = #{params.enabled} 条件。 -->

    <!-- 动态查询：通过使用 <if> 和 <where> 元素，可以根据实际需求动态生成 SQL 查询语句，使查询更加灵活和高效。 -->
    <!-- 分页查询：虽然这里的 select 语句没有显式包含分页逻辑，但在实际调用时，MyBatis-Plus 或其他框架会自动处理 LIMIT 和 OFFSET 子句，从而实现分页功能。 -->
    <select id="page" resultType="cn.wa.cstp.basic.pojo.systemmenu.SystemMenuPageResponse">
        <!-- select * from system_menu：SQL 查询语句的基础部分，选择 system_menu 表中的所有列。 -->
        select *
        from system_menu
        <where>
            <if test="params.appId != null  ">
                and app_id = #{params.appId}
            </if>
            <if test="params.parentId != null  ">
                and parent_id = #{params.parentId}
            </if>
        </where>
    </select>

    <select id="selectDetailById" resultType="cn.wa.cstp.basic.pojo.systemmenu.SystemMenuDetailResponse">
        select *
        from system_menu
        where id = #{id}
    </select>

    <!-- 批量插入 -->
    <!-- keyProperty="id"：指定实体类中用于接收自动生成主键的属性名。在这个例子中，假设 SystemUser 类有一个名为 id 的字段。 -->
    <!-- useGeneratedKeys="true"：指示 MyBatis 使用 JDBC 的 getGeneratedKeys 方法来获取数据库自动生成的主键值（例如 MySQL 的 AUTO_INCREMENT）。 -->
    <insert id="insertBatch" keyProperty="id" useGeneratedKeys="true">
    insert into alumnus_basic.system_user(
        app_id,
        account,
        phone,
        email,
        password,
        real_name,
        org_name,
        job_name,
        head_img_url,
        sex,
        enabled,
        id_number,
        create_time,
        update_time,
        create_by,
        update_by
    )
    values
    <foreach collection="entities" item="entity" separator=",">
        (
            #{entity.appId},
            #{entity.account},
            #{entity.phone},
            #{entity.email},
            #{entity.password},
            #{entity.realName},
            #{entity.orgName},
            #{entity.jobName},
            #{entity.headImgUrl},
            #{entity.sex},
            #{entity.enabled},
            #{entity.idNumber},
            #{entity.createTime},
            #{entity.updateTime},
            #{entity.createBy},
            #{entity.updateBy}
        )
    </foreach>
</insert>

</mapper>
```
