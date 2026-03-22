import {mapGetters, mapState} from 'vuex'
import mxWindowResize from '@/mixins/mxWindowResize'
import mxCertEdit from './mxCertEdit'
import mxCertPreviewById from './mxCertPreviewById'
import mxControls from './mxControls'

export default {
    mixins: [mxWindowResize, mxCertEdit, mxCertPreviewById, mxControls],
    props: {
        // 组件类型
        // Preview - 预览, 预览方式有两种，分别根据 value、id 预览
        // Edit - 编辑, 编辑方式需要 value, modelType, backgroundUrl 配合实现
        type: {
            type: String,
            default: 'Preview'
        },

        // 视图宽度（显示大小）
        width: {
            type: [Number, String],
            default: 'auto'
        }
    },

    data() {
        return {
            // 当前协议
            protocol: location.protocol,
            // 组件类型映射
            typeMapping: {
                Preview: {
                    isEdit: false
                },
                Edit: {
                    isEdit: true
                }
            },

            // 通用样式
            commonStyle: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                fontSize: 32
            },

            // 激活元素序号
            activeIndex: 0,
            // 元素映射（内部编辑使用）
            elMaps: {},
            backgroundWidth: 1200,
            backgroundHeight: 0,

            fontFamily: 'siyuanheiti',
            fontFamilyList: [
                {id: 'siyuanheiti', name: '思源黑体'},
                {id: 'siyuansongti', name: '思源宋体'}
            ],

            textAlignList: [
                {id: 'left', name: '居左', icon: 'mdi-set mdi-format-align-left'},
                {id: 'center', name: '居中', icon: 'mdi-set mdi-format-align-center'},
                {id: 'right', name: '居右', icon: 'mdi-set mdi-format-align-right'}
            ],

            formatDateList: [
                {id: 'yyyy年M月d日', name: 'x年x月x日'},
                {id: 'yyyy-M-d', name: 'x-x-x'},
                {id: 'yyyy/M/d', name: 'x/x/x'}
            ],

            timer: {
                emit: null,
                resize: null
            },
            loading: {
                page: false
            },

            isInit: false
        }
    },


    computed: {
        ...mapGetters({
            isFireFox: 'isFireFox'
        }),
        ...mapState('config', {
            images: 'images',
            COSConfig: 'COSConfig'
        }),
        // 视图宽度（显示大小）
        viewWidth() {
            let width = this.width  //auto
            if (width === 'backgroundWidth') return this.backgroundWidth
            if (width === 'auto') {
                width = this.screen.bodyWidth - 820
                if (width < 400) width = 400
                if (width > 800) width = 800
            }
            return width
        },
        // 组件信息
        info() {
            let obj = this.typeMapping[this.type] || {}

            // 缩放比例
            let viewZoom = this.viewWidth / this.backgroundWidth
            let baseZoom = 800 / this.backgroundWidth

            this.StepLog('计算缩放比例', {
                zoom: baseZoom,
                viewZoom,
                backgroundWidth: this.backgroundWidth,
                backgroundHeight: this.backgroundHeight
            })

            return {
                ...obj,
                zoom: baseZoom,
                viewZoom,
                backgroundWidth: this.backgroundWidth,
                backgroundHeight: this.backgroundHeight
            }
        },
        // 当前模板类型对象
        currentModel() {
            return this.certTemplateTypeList.find(({id}) => this.modelType === id)
        },
        // 证书模板 - 预先样式
        certTemplateTypeList() {
            let bk = this.COSConfig.Bucket
            return [
                {
                    id: 1,
                    name: '模板一',
                    value: `//${bk}.cos.ap-guangzhou.myqcloud.com/static/%E5%8E%9F%E5%9B%BE%E8%AF%81%E4%B9%A61.png`,
                    style: {
                        'certName': {
                            'x': 324,
                            'y': 110,
                            'width': 0,
                            'height': 0,
                            'fontSize': 32,
                            'font': 'siyuanheiti'
                        },
                        'userName': {
                            'x': 150,
                            'y': 270,
                            'width': 0,
                            'height': 0,
                            'fontSize': 32,
                            'font': 'siyuanheiti'
                        },
                        'headImg': {'x': 0, 'y': 0, 'width': 100, 'height': 150, 'fontSize': 28, 'font': 'siyuanheiti'},
                        'idNum': {'x': 360, 'y': 270, 'width': 0, 'height': 0, 'fontSize': 32, 'font': 'siyuanheiti'},
                        'searchAddress': {
                            'x': 90,
                            'y': 435,
                            'width': 0,
                            'height': 0,
                            'fontSize': 28,
                            'font': 'siyuanheiti'
                        },
                        'certContent': {
                            'x': 335,
                            'y': 180,
                            'width': 0,
                            'height': 0,
                            'fontSize': 28,
                            'font': 'siyuanheiti'
                        },
                        'certNumRule': {
                            'x': 90,
                            'y': 385,
                            'width': 0,
                            'height': 0,
                            'fontSize': 28,
                            'font': 'siyuanheiti'
                        },
                        'awardCompany': {
                            'x': 550,
                            'y': 385,
                            'width': 0,
                            'height': 0,
                            'fontSize': 28,
                            'font': 'siyuanheiti'
                        },
                        'awardDate': {
                            'x': 550,
                            'y': 435,
                            'width': 0,
                            'height': 0,
                            'fontSize': 28,
                            'font': 'siyuanheiti'
                        },
                        'backgroundUrl': {width: 800, height: 534}
                    }
                },
                {
                    id: 2,
                    name: '模板二',
                    value: `//${bk}.cos.ap-guangzhou.myqcloud.com/static/%E5%8E%9F%E5%9B%BE%E8%AF%81%E4%B9%A62.png`,
                    style: {
                        'certName': {'x': 320, 'y': 70, 'width': 0, 'height': 0, 'fontSize': 28, 'font': 'siyuanheiti'},
                        'userName': {
                            'x': 160,
                            'y': 260,
                            'width': 0,
                            'height': 0,
                            'fontSize': 28,
                            'font': 'siyuanheiti'
                        },
                        'headImg': {'x': 0, 'y': 0, 'width': 100, 'height': 150, 'fontSize': 28, 'font': 'siyuanheiti'},
                        'idNum': {'x': 90, 'y': 330, 'width': 0, 'height': 0, 'fontSize': 28, 'font': 'siyuanheiti'},
                        'searchAddress': {
                            'x': 90,
                            'y': 435,
                            'width': 0,
                            'height': 0,
                            'fontSize': 28,
                            'font': 'siyuanheiti'
                        },
                        'certContent': {
                            'x': 365,
                            'y': 140,
                            'width': 0,
                            'height': 0,
                            'fontSize': 28,
                            'font': 'siyuanheiti'
                        },
                        'certNumRule': {
                            'x': 90,
                            'y': 385,
                            'width': 0,
                            'height': 0,
                            'fontSize': 28,
                            'font': 'siyuanheiti'
                        },
                        'awardCompany': {
                            'x': 550,
                            'y': 385,
                            'width': 0,
                            'height': 0,
                            'fontSize': 28,
                            'font': 'siyuanheiti'
                        },
                        'awardDate': {
                            'x': 550,
                            'y': 435,
                            'width': 0,
                            'height': 0,
                            'fontSize': 28,
                            'font': 'siyuanheiti'
                        },
                        'backgroundUrl': {width: 800, height: 534}
                    }
                },
                {
                    id: 3,
                    name: '模板三',
                    value: `//${bk}.cos.ap-guangzhou.myqcloud.com/static/%E5%8E%9F%E5%9B%BE%E8%AF%81%E4%B9%A63.png`,
                    style: {
                        'certName': {
                            'x': 235,
                            'y': 140,
                            'width': 0,
                            'height': 0,
                            'fontSize': 28,
                            'font': 'siyuanheiti'
                        },
                        'userName': {
                            'x': 160,
                            'y': 200,
                            'width': 0,
                            'height': 0,
                            'fontSize': 28,
                            'font': 'siyuanheiti'
                        },
                        'headImg': {'x': 0, 'y': 0, 'width': 100, 'height': 150, 'fontSize': 28, 'font': 'siyuanheiti'},
                        'idNum': {'x': 160, 'y': 245, 'width': 0, 'height': 0, 'fontSize': 28, 'font': 'siyuanheiti'},
                        'searchAddress': {
                            'x': 50,
                            'y': 615,
                            'width': 0,
                            'height': 0,
                            'fontSize': 28,
                            'font': 'siyuanheiti'
                        },
                        'certContent': {
                            'x': 75,
                            'y': 315,
                            'width': 0,
                            'height': 0,
                            'fontSize': 28,
                            'font': 'siyuanheiti'
                        },
                        'certNumRule': {
                            'x': 50,
                            'y': 570,
                            'width': 0,
                            'height': 0,
                            'fontSize': 28,
                            'font': 'siyuanheiti'
                        },
                        'awardCompany': {
                            'x': 320,
                            'y': 570,
                            'width': 0,
                            'height': 0,
                            'fontSize': 28,
                            'font': 'siyuanheiti'
                        },
                        'awardDate': {
                            'x': 320,
                            'y': 615,
                            'width': 0,
                            'height': 0,
                            'fontSize': 28,
                            'font': 'siyuanheiti'
                        },
                        'backgroundUrl': {width: 534, height: 800}
                    }
                },
                {
                    id: 100, name: '自定义模板', value: null,
                    style: {
                        backgroundUrl: {width: 800, height: 600}
                    }
                }
            ]
        }
    },

    watch: {
        info(info) {
            this.$emit('update:info', info)
        }
    },

    methods: {
        // 事件委托 - 获取指定元素
        getElement(el) {
            while (!/element/.test(el.className)) {
                if (/cert-wrapper/.test(el.className)) return false
                el = el.offsetParent
            }
            return el
        },

        async getBackgroundSize(backgroundUrl) {
            return new Promise((resolve) => {
                const image = new Image()
                image.src = backgroundUrl
                image.onload = () => resolve(image)
            })
        },

        async setBackgroundHeight(e) {
            if (this.info.isEdit) return false
            const getBackgroundSize = () => {
                return new Promise((resolve) => {
                    let backgroundUrl = this.backgroundUrl
                    if (backgroundUrl) {
                        const image = new Image()
                        image.src = backgroundUrl
                        image.onload = () => {
                            resolve({width: image.width, height: image.height})
                        }
                    } else {
                        resolve({
                            width: this.$refs.backgroundUrl[0].$el.offsetWidth,
                            height: this.$refs.backgroundUrl[0].$el.offsetHeight
                        })
                    }
                })
            }
            let {width, height} = await getBackgroundSize()
            this.backgroundWidth = width
            this.backgroundHeight = height
        },

        async initBackground() {
            if (this.isInit) return false
            this.StepLog('首次加载,渲染初始模板')
            this.isInit = true

            // 1. 编辑时，保存自定义模板
            if (this.modelType === 100) {
                let fItem = this.certTemplateTypeList.find(({id}) => 100 === id)
                fItem.value = this.value.find(a => a.code === 'backgroundUrl')?.keyValue || null
            }

            // 2. 首次加载,渲染初始模板
            await this.onSelectModal(this.currentModel)
        },

        // 解析元素对象
        async parseElementList(list) {
            this.fontFamily = 'siyuanheiti'

            let {zoom} = this.info

            this.StepLog('解析元素对象', {
                zoom,
                backgroundWidth: this.backgroundWidth,
                backgroundHeight: this.backgroundHeight
            })

            for (const item of list) {
                if (!this.elMaps[item.code]) this.elMaps[item.code] = {}
                let el = this.elMaps[item.code]


                // 样式: 特殊处理 - backgroundUrl
                if (item.code === 'backgroundUrl') {
                    // el.style = el.style || JSON.parse(item.customStyle) || {...this.commonBackgroundUrlStyle}
                    let customStyle = item.customStyle && JSON.parse(item.customStyle)
                    el.style = {
                        width: customStyle?.width || this.backgroundWidth,
                        height: customStyle?.height || this.backgroundHeight,
                        url: this.backgroundUrl
                    }
                } else {
                    // 样式: 当前样式 | val样式 | 预设样式 | 通用样式
                    if (!el.style) {
                        // 没有当前样式
                        if (item.customStyle) {
                            let zFn = a => Math.round(a * zoom)
                            let style = JSON.parse(item.customStyle)
                            // val样式
                            el.style = {
                                ...style,
                                x: zFn(style.x),
                                y: zFn(style.y),
                                width: zFn(style.width),
                                height: zFn(style.height),
                                fontSize: zFn(style.fontSize)
                            }
                        } else {
                            // 预设样式 | 通用样式
                            el.style = {...(this.currentModel.style[item.code] || this.commonStyle)}
                        }
                    }
                }

                if (el.style.font) {
                    this.fontFamily = el.style.font
                }

                if (!el.style.textAlign) el.style.textAlign = this.textAlignList[0].id

                // code标识
                el.code = item.code
                // 文本内容
                if (item.code === 'awardDate') {
                    el.style.dateFormat = el.style.dateFormat || 'yyyy年M月d日'
                    if (item.keyValue) {
                        el.text = this.$moment(item.keyValue).format(el.style.dateFormat.replace('d', 'D'))
                    } else {
                        el.text = `<${item.keyName}>`
                    }
                } else {
                    el.text = item.keyValue || `<${item.keyName}>`
                }
                // 内容
                el.value = item.keyValue
                // 是否展示
                if (typeof item.selected === 'boolean') {
                    el.visible = item.selected && !/hidden/.test(item.extraOperation)
                } else {
                    el.visible = true
                }
            }

            this.StepLog('解析元素对象 结果', JSON.parse(JSON.stringify(this.elMaps)))

            // 更新渲染
            this.elMaps = {...this.elMaps}
        },

        // 解析(后台)样式
        parseStyle(item) {
            let data = item.style
            // let zFn = a => `${a / this.info.zoom}px`
            let zFn = a => `${a}px`

            if (item.code === 'backgroundUrl') {
                return {
                    width: this.backgroundWidth + 'px',
                    height: this.info.isEdit ? 'auto' : this.backgroundHeight + 'px'
                }
            }

            let styleObj = {
                left: zFn(data.x || 0),
                top: zFn(data.y || 0),
                width: data.width ? zFn(data.width) : 'auto',
                height: data.height ? zFn(data.height) : 'auto',
                fontSize: zFn(data.fontSize),
                fontFamily: data.font,
                textAlign: data.textAlign,
                zoom: 1 / this.info.zoom
            }

            return styleObj
        },

        // 操作 - 选择模板
        async onSelectModal(item) {
            this.StepLog('选择模板')
            this.$emit('update:modelType', item.id)
            this.$emit('update:backgroundUrl', item.value)

            if ((item.id === 100) && item.value) {
                // 自定义模板
                this.$emit('update:loading', true)
                let {width, height} = await this.getBackgroundSize(item.value)
                this.backgroundWidth = width
                this.backgroundHeight = height
                this.$emit('update:loading', false)
            } else {
                this.backgroundWidth = item.style.backgroundUrl.width
                this.backgroundHeight = item.style.backgroundUrl.height
            }

            /*更换样式*/
            for (const k in this.elMaps) {
                let elMap = this.elMaps[k]
                if (item.style[elMap.code]) elMap.style = {...item.style[elMap.code]}
            }
        },

        // 上传文件到COS
        async uploadFile() {
            let url = await this.$refs.ImageUpload.uploadFile()
            this.$emit('update:backgroundUrl', url)
        }

    }
}
