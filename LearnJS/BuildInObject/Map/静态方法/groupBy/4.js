function demonstrateMultiConditionGrouping() {
  console.log('\n=== 多条件分组 ===');
  
  const students = [
    { name: 'Alice', grade: 'A', subject: 'Math', score: 95 },
    { name: 'Bob', grade: 'B', subject: 'Math', score: 82 },
    { name: 'Charlie', grade: 'A', subject: 'Science', score: 92 },
    { name: 'Diana', grade: 'B', subject: 'Science', score: 78 },
    { name: 'Eve', grade: 'A', subject: 'Math', score: 88 },
    { name: 'Frank', grade: 'C', subject: 'Science', score: 65 }
  ];
  
  // 按科目和等级组合分组
  const grouped = Map.groupBy(students, student => 
    `${student.subject}-${student.grade}`
  );
  console.log(grouped)
  
  console.log('按科目-等级分组:');
  for (const [key, group] of grouped) {
    const avgScore = group.reduce((sum, s) => sum + s.score, 0) / group.length;
    console.log(`${key}: ${group.length}人, 平均分: ${avgScore.toFixed(1)}`);
  }
  
  // 返回对象分组（更复杂的键）
  const objectKeyGrouping = Map.groupBy(students, student => ({
    subject: student.subject,
    isHighAchiever: student.score >= 90
  }));
  
  console.log('\n按对象键分组:');
  for (const [key, group] of objectKeyGrouping) {
    console.log(`${key.subject} ${key.isHighAchiever ? '优秀' : '普通'}:`, 
                group.map(s => s.name));
  }
}

demonstrateMultiConditionGrouping();