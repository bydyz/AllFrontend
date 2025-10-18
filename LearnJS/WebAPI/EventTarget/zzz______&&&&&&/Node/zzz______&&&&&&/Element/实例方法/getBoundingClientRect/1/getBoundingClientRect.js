window.onscroll = function () {
	runGetBoundingClientRect()
}

const runGetBoundingClientRect = () => {
	var secondDiv = document.getElementsByClassName( 'second' )
	console.log( '包含绿色div的array', secondDiv )
	
	/* 
	offsetTop  offsetLeft  均包含本身的  外边距
	
	offsetHeight  offsetWidth  包含content + padding + border
	
	offsetParent，它是指当前元素最近的使用 position 不为 static 的祖先节点，最终为 body
	
	
	
	clientTop 就是 border-top 的值，clientLeft 就是 border-left 的值。而 clientWidth 和 clientHeight 都不包含 border 和 外边距。
	*/
	
	
	
	
	
	var secondDivById = document.getElementById( 'second' )
	console.log( 'id为second的', secondDivById )
	
	rectObject = secondDivById.getBoundingClientRect();
	console.log('dom.getBoundingClientRect的获取值', rectObject)
	
	// 以下  元素  即指的是   content + padding + border
	console.log('绿色div的top (元素上边到视窗上边的距离)', rectObject.top)
	console.log('绿色div的right (元素右边到视窗左边的距离)', rectObject.right)
	console.log('绿色div的bottom (元素下边到视窗上边的距离)', rectObject.bottom)
	console.log('绿色div的left (元素左边到视窗左边的距离)', rectObject.left)
	
	console.log('绿色div的width (总是获取元素的宽)', rectObject.width)
	console.log('绿色div的height (总是获取元素的高)', rectObject.height)

	console.log('绿色div的x (元素左上角相对于视口的 X 坐标)', rectObject.x)
	console.log('绿色div的y (元素左上角相对于视口的 Y 坐标)', rectObject.y)
	
	console.log( secondDiv === secondDivById )    //false  interesting，why are they different, BECAUSE THE FIRST ONE GET ARE ARRAY
	
	/* 
	getBoundingClientRect()用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。  需要用id获取
	
	
		rectObject.top：元素上padding上边到视窗上边的距离;
		rectObject.right：元素右padding右边到视窗左边的距离;
		rectObject.bottom：元素下padding下边到视窗上边的距离;
		rectObject.left：元素左padding左边到视窗左边的距离;
		rectObject.width：是元素自身的宽(包括content + padding + border)
		rectObject.height: 是元素自身的高(包括content + padding + border)
	*/
} 

runGetBoundingClientRect()
