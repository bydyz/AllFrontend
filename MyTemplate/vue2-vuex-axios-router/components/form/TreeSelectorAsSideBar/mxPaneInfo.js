import mxCountAPI from './mxCountAPI'
import mxDataAPI from './mxDataAPI'

export default {
  mixins: [mxCountAPI, mxDataAPI],
  data() {

    // 组织 - 组织批量添加课程/培训
    let OrgDept = {
      /*数据配置*/
      dataAPI: this.$api.Dept.treeList,
      dataParams: { parentId: 0 },
      dataResultParse: a => a.deptList || a,

      countParams(item, idList) {
        return {
          idList: idList.slice(0, 1)
        }
      },

      /*元素单位配置*/
      // 配置覆盖 - 搜索栏
      searchBar: {
        title: '组织查询',
        expandAll: true,
        close: false
      },

      // 配置覆盖 - 全部选择栏
      selectAllBar: {
        visible: false
      }
    }

    // 学员标签 - 标签批量添加课程/培训
    let OrgGroup = {
      /*数据配置*/
      dataAPI: this.$api.labelPage.listAll,
      dataParams: { parentId: 0 },
      dataResultParse: a => a.map(b => {
        return {
          ...b,
          id: b.groupId
        }
      }),

      countParams(item, idList) {
        return {
          idList: idList.slice(0, 1)
        }
      },

      /*元素单位配置*/
      // 配置覆盖 - 搜索栏
      searchBar: {
        title: '标签查询',
        expandAll: false,
        close: false
      },

      // 配置覆盖 - 全部选择栏
      selectAllBar: {
        visible: false
      }
    }

    return {
      typeMapping: {
        // 课件库 - 完整DEMO
        Resource: {

          /*数据配置*/
          // 列表数据 - 请求接口
          dataAPI: this.$api.ResourceType.treeTotal,
          // 列表数据 - 请求参数
          dataParams: {},
          // 列表数据 - 结果解析
          dataResultParse: a => a,

          // 单项分类数量 - 请求接口
          countAPI: this.$api.ResourceType.count,
          // 单项分类数量 - 请求参数 【object || function】
          countParams: {},


          /*元素单位配置*/
          // 配置覆盖 - 搜索栏
          searchBar: {},

          // 配置覆盖 - 全部选择栏
          selectAllBar: {
            title: '全部课件分类',
            editRoute: {
              name: 'CategoryManagement',
              query: {
                id: 'ResourceType'
              }
            }
          },

          // 配置覆盖 - 未选择分类
          unselectedBar: {}

        },

        // 课件库 - 弹窗
        ResourceAttach: {
          /*数据配置*/
          dataAPI: this.$api.ResourceType.treeTotal,

          /*元素单位配置*/
          // 配置覆盖 - 搜索栏
          searchBar: {
            close: false
          },

          // 配置覆盖 - 全部选择栏
          selectAllBar: {
            title: '全部课件分类'
          }
        },


        // 课程
        Course: {
          /*数据配置*/
          dataAPI: this.$api.CourseCategory.treeV2,

          countAPI: this.$api.CourseCategory.count,
          countParams: { sourceType: 1 },

          /*元素单位配置*/
          // 配置覆盖 - 全部选择栏
          selectAllBar: {
            title: '全部课程分类',
            editRoute: {
              name: 'CategoryManagement'
            }
          }
        },

        // 课程销售
        SalesCourse: {
          /*数据配置*/
          dataAPI: this.$api.CourseCategory.treeV2,

          countAPI: this.$api.CourseCategory.count,

          /*元素单位配置*/
          // 配置覆盖 - 全部选择栏
          selectAllBar: {
            title: '全部课程分类',
            editRoute: {
              name: 'CategoryManagement'
            }
          },

           // 配置覆盖 - 未选择分类
           unselectedBar: {
            visible:true
           }
        },

        ExternalCourse: {
          /*数据配置*/
          dataAPI: this.$api.CourseCategory.treeV2,

          /*元素单位配置*/
          // 配置覆盖 - 全部选择栏
          selectAllBar: {
            title: '全部课程分类',
            editRoute: {
              name: 'CategoryManagement'
            }
          },

          // 配置覆盖 - 未选择分类
          unselectedBar: {
            visible: true
          }
        },

        MyCourse: {
          /*数据配置*/
          dataAPI: this.$api.CourseCategory.treeV2,

          countAPI: this.$api.CourseCategory.countByLecturerId,

          /*元素单位配置*/
          // 配置覆盖 - 全部选择栏
          selectAllBar: {
            title: '全部课程分类',
            editRoute: {
              name: 'CategoryManagement'
            }
          }
        },


        // 题库 - 自由组卷
        CustomQuestion: {
          /*数据配置*/
          dataAPI: this.$api.Question.categoryAll,

          countAPI: this.$api.Category.questionCount,

          /*元素单位配置*/
          // 配置覆盖 - 全部选择栏
          selectAllBar: {
            title: '全部试题分类',
            editRoute: {
              name: 'CategoryManagement',
              query: {
                id: 'QuestionCategory'
              }
            }
          }
        },
        // 题库 - 智能组卷
        AutoQuestion: {
          /*数据配置*/
          dataAPI: this.$api.Question.categoryAll,

          countAPI: this.$api.Category.questionCount,
          countParams: { enabled: true },

          /*元素单位配置*/
          // 配置覆盖 - 全部选择栏
          selectAllBar: {
            title: '全部试题分类',
            editRoute: {
              name: 'CategoryManagement',
              query: {
                id: 'QuestionCategory'
              }
            }
          }
        },

        // 试卷管理
        Paper: {
          /*数据配置*/
          dataAPI: this.$api.Paper.categoryAll,

          countAPI: this.$api.Category.paperCount,

          /*元素单位配置*/
          // 配置覆盖 - 全部选择栏
          selectAllBar: {
            title: '全部试卷分类',
            editRoute: {
              name: 'CategoryManagement',
              query: {
                id: 'PaperCategory'
              }
            }
          }
        },


        // 学员管理
        OrgStudent: {
          /*数据配置*/
          dataAPI: this.$api.Dept.treeList,
          dataParams: { parentId: 0 },
          dataResultParse: a => a.deptList || a,

          countAPI: this.$api.Student.categoryCount,

          /*元素单位配置*/
          // 配置覆盖 - 搜索栏
          searchBar: {
            title: '组织查询'
          },

          // 配置覆盖 - 全部选择栏
          selectAllBar: {
            title: '全部组织',
            editRoute: {
              name: 'Dept'
            }
          },

          // 配置覆盖 - 未选择分类
          unselectedBar: {
            visible: true,
            title: '未选择组织'
          }
        },

        // 后台用户
        OrgEmployee: {
          /*数据配置*/
          dataAPI: this.$api.Dept.treeList,
          dataParams: { parentId: 0 },
          dataResultParse: a => a.deptList || a,

          countAPI: this.$api.Employee.categoryCount,

          /*元素单位配置*/
          // 配置覆盖 - 搜索栏
          searchBar: {
            title: '组织查询'
          },

          // 配置覆盖 - 全部选择栏
          selectAllBar: {
            title: '全部组织',
            editRoute: {
              name: 'Dept'
            }
          },

          // 配置覆盖 - 未选择分类
          unselectedBar: {
            visible: true,
            title: '未选择组织'
          }
        },

        // 组织批量添加课程/培训
        OrgDeptCourse: {
          ...OrgDept,
          countAPI: this.$api.Course.deptCourseCount
        },
        OrgDeptLearnCourse: {
          ...OrgDept,
          countAPI: this.$api.Course.deptDialogCount
        },
        OrgDeptTask: {
          ...OrgDept,
          countAPI: this.$api.Task.deptTaskCount
        },

        // 标签批量添加课程/培训
        OrgGroupCourse: {
          ...OrgGroup,
          countAPI: this.$api.Course.groupCourseCount
        },
        OrgGroupLearnCourse: {
          ...OrgGroup,
          countAPI: this.$api.Course.groupDialogCount
        },
        OrgGroupTask: {
          ...OrgGroup,
          countAPI: this.$api.Task.groupTaskCount
        },


        // 企业微信用户
        WxWorkDept: {
          /*数据配置*/
          dataAPI: this.$api.QywxDept.tree,

          /*元素单位配置*/
          // 配置覆盖 - 搜索栏
          searchBar: {
            visible: false
          },

          // 配置覆盖 - 全部选择栏
          selectAllBar: {
            visible: false
          }
        }


      }
    }
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    paneInfo() {
      /* 此处的this.type就是从父组件传过来的，用以控制从typeMapping下的哪部分取值 */
      return this.typeMapping[this.type]
    },
    // 元素单位， 显示|隐藏 文案信息
    units() {
      // 默认配置
      return {

        // 搜索栏
        searchBar: {
          visible: true,
          title: '分类查询', // 搜索框 占位文案
          expandAll: false, // 展开|收起 分类
          close: true, // 收起 侧边栏
          ...this.paneInfo.searchBar, // 配置覆盖
        },

        // 全部选择栏
        selectAllBar: {
          visible: true,
          title: '全部', // 主体文案
          expandAll: true, // 展开|收起 分类
          editRoute: false, // 编辑分类 - 页面对应的路由对象
          ...this.paneInfo.selectAllBar
        },

        // 未选择分类
        unselectedBar: {
          visible: false,
          title: '未选择分类', // 主体文案
          ...this.paneInfo.unselectedBar
        }
      }
    }
  }
}
