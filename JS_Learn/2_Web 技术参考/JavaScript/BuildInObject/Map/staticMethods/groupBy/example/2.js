function demonstrateChainingOperations() {
  console.log('\n=== 链式处理 ===');
  
  const employees = [
    { name: 'Alice', department: 'Engineering', level: 'Senior', salary: 8000 },
    { name: 'Bob', department: 'Marketing', level: 'Junior', salary: 4500 },
    { name: 'Charlie', department: 'Engineering', level: 'Mid', salary: 6000 },
    { name: 'Diana', department: 'Sales', level: 'Senior', salary: 7000 },
    { name: 'Eve', department: 'Engineering', level: 'Junior', salary: 5000 },
    { name: 'Frank', department: 'Marketing', level: 'Senior', salary: 7500 }
  ];
  
  // 复杂的链式分组和分析
  const analysis = new Map();
  
  // 首先按部门分组
  const byDepartment = Map.groupBy(employees, emp => emp.department);
  console.log(byDepartment)
  
  for (const [dept, deptEmployees] of byDepartment) {
    // 在每个部门内按级别分组
    const byLevel = Map.groupBy(deptEmployees, emp => emp.level);
    
    const deptStats = {
      totalEmployees: deptEmployees.length,
      totalSalary: deptEmployees.reduce((sum, emp) => sum + emp.salary, 0),
      byLevel: new Map()
    };
    
    for (const [level, levelEmployees] of byLevel) {
      deptStats.byLevel.set(level, {
        count: levelEmployees.length,
        avgSalary: levelEmployees.reduce((sum, emp) => sum + emp.salary, 0) / levelEmployees.length
      });
    }
    
    analysis.set(dept, deptStats);
  }
  
  console.log('部门深度分析:');
  for (const [dept, stats] of analysis) {
    console.log(`\n${dept}部门:`);
    console.log(`  总人数: ${stats.totalEmployees}`);
    console.log(`  总薪资: $${stats.totalSalary}`);
    console.log('  各级别统计:');
    for (const [level, levelStats] of stats.byLevel) {
      console.log(`    ${level}: ${levelStats.count}人, 平均薪资: $${levelStats.avgSalary.toFixed(2)}`);
    }
  }
}

demonstrateChainingOperations();