function demonstrateBasicGrouping() {
  console.log('=== 基础分组示例：按年龄分组 ===');
  
  const people = [
    { name: 'Alice', age: 25, department: 'Engineering' },
    { name: 'Bob', age: 30, department: 'Marketing' },
    { name: 'Charlie', age: 25, department: 'Engineering' },
    { name: 'Diana', age: 30, department: 'Sales' },
    { name: 'Eve', age: 35, department: 'Marketing' }
  ];
  
  // 按年龄分组
  const groupedByAge = Map.groupBy(people, person => person.age);
  console.log(groupedByAge)
  
  console.log('分组结果:');
  for (const [age, group] of groupedByAge) {
    console.log(`年龄 ${age}:`, group.map(p => p.name));
  }
  
  return groupedByAge;
}

const ageGroups = demonstrateBasicGrouping();