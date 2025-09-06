import styled from "styled-components"

// 此处导入的 变量 在下方的 标签模板字符串 中可以直接使用
import {
  primaryColor,
  largeSize
} from "./style/variables"

// 1.基本使用
//! ES6: 标签模板字符串      styled.div会返回一个组件，该组件会被渲染成div
//！ 标签模板字符串 的 内部参数是针对子元素的样式
export const AppWrapper = styled.div`
  .footer {
    border: 1px solid orange;
  }
`



// 2.子元素单独抽取到一个样式组件
//! 3.可以接受外部传入的props
//! 4.可以通过attrs给标签模板字符串中提供的属性
//! 5.从一个单独的文件中引入变量

//! 直接写样式时，表示对当前的组件添加样式
//! 加 .attrs 可以传入的数据并产生新的变量，然后在下面使用 ${props => props.tColor}    
//! 即使上面没有使用 attrs 下面也可以用 ${props => props.size}
export const SectionWrapper = styled.div.attrs(props => ({
  tColor: props.color || "blue"
}))`
  border: 1px solid red;

  .title {
    font-size: ${props => props.size}px;
    color: ${props => props.tColor};

    &:hover {
      background-color: purple;
    }
  }

  .content {
    font-size: ${largeSize}px;
    color: ${primaryColor};
  }
`
