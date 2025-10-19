function printCoordinate(point: {x: number, y: number}) {
  console.log('x坐标：', point.x)
  console.log('y坐标：', point.y)
}
printCoordinate({m: 10, y: 30})

//！ 必须 数目、个数 完全对应     其他皆不可
printCoordinate({x: 10, y: 30})

printCoordinate({x: 10})
printCoordinate({x: 10, y: 30, z: 50})
printCoordinate({x: 10, y: '30'})