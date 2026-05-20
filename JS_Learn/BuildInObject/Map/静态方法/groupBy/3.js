function demonstrateDepartmentGrouping() {
  console.log('\n=== 按部门分组 ===');
  
  const employees = [
    { name: 'Alice', age: 25, department: 'Engineering', salary: 5000 },
    { name: 'Bob', age: 30, department: 'Marketing', salary: 4500 },
    { name: 'Charlie', age: 28, department: 'Engineering', salary: 5500 },
    { name: 'Diana', age: 35, department: 'Sales', salary: 4000 },
    { name: 'Eve', age: 32, department: 'Marketing', salary: 4800 },
    { name: 'Frank', age: 29, department: 'Engineering', salary: 5200 }
  ];
  
  // 按部门分组
  const byDepartment = Map.groupBy(employees, emp => emp.department);
  console.log(byDepartment)
  
  console.log('各部门员工:');
  for (const [dept, employees] of byDepartment) {
    console.log(`${dept}部门:`, employees.map(e => e.name));
    
    // 可以进一步处理每个组
    const avgSalary = employees.reduce((sum, e) => sum + e.salary, 0) / employees.length;
    console.log(`  平均薪资: ${avgSalary.toFixed(2)}`);
  }
  
  return byDepartment;
}

const departmentGroups = demonstrateDepartmentGrouping();