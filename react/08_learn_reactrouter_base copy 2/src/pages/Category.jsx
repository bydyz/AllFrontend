import React, { PureComponent } from 'react'
import { withRouter } from '../hoc';

export class Category extends PureComponent {
  render() {
    return (
      <div>
        <h1>Category Page</h1>
      </div>
    )
  }
}

// export default Category
export default withRouter(Category)