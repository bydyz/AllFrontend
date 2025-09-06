import styled from "styled-components";

const HYButton = styled.button`
  border: 1px solid red;
  border-radius: 5px;
`

//! styled(HYButton) 会继承上面写过的属性
export const HYButtonWrapper = styled(HYButton)`
  background-color: #0f0;
  color: #fff;
`

//! 倘若有对 HomeWrapper 进行传值，还能同时使用 props.theme.color 吗？？？？？？
export const HomeWrapper = styled.div`
  .top {
    .banner {
      color: red;
    }
  }

  .bottom {
    .header {
      color: ${props => props.theme.color};
      font-size: ${props => props.theme.size};
    }

    .product-list {
      .item {
        color: blue;
      }
    }
  }
`
