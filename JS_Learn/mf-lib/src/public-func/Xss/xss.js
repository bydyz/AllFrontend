import xss from 'xss'

const options = {
  // 白名单
  whiteList: {
    a: ['style', 'href', 'title', 'target'],
    p: ['style'],
    section: ['style'],
    strong: ['style'],
    abbr: ['title', 'style'],
    address: ['style'],
    area: ['style', 'shape', 'coords', 'href', 'alt'],
    article: ['style'],
    aside: ['style'],
    audio: ['style', 'autoplay', 'controls', 'loop', 'preload', 'src'],
    b: ['style'],
    bdi: ['style', 'dir'],
    bdo: ['style', 'dir'],
    big: ['style'],
    blockquote: ['style', 'cite'],
    br: ['style'],
    caption: ['style'],
    center: ['style'],
    cite: ['style'],
    code: ['style'],
    col: ['style', 'align', 'valign', 'span', 'width'],
    colgroup: ['style', 'align', 'valign', 'span', 'width'],
    dd: ['style'],
    del: ['style', 'datetime'],
    details: ['style', 'open'],
    div: ['style', 'style'],
    dl: ['style'],
    dt: ['style'],
    em: ['style'],
    font: ['style', 'color', 'size', 'face'],
    footer: ['style'],
    h1: ['style'],
    h2: ['style'],
    h3: ['style'],
    h4: ['style'],
    h5: ['style'],
    h6: ['style'],
    header: ['style'],
    hr: ['style'],
    i: ['style'],
    img: ['style', 'src', 'alt', 'title', 'width', 'height'],
    ins: ['style', 'datetime'],
    li: ['style'],
    mark: ['style'],
    nav: ['style'],
    ol: ['style'],
    pre: ['style'],
    s: ['style'],
    small: ['style'],
    span: ['style'],
    sub: ['style'],
    sup: ['style'],
    table: ['width', 'border', 'align', 'valign', 'style'],
    tbody: ['style', 'align', 'valign'],
    td: ['width', 'rowspan', 'colspan', 'align', 'valign', 'style'],
    tfoot: ['style', 'align', 'valign'],
    th: ['style', 'width', 'rowspan', 'colspan', 'align', 'valign'],
    thead: ['style', 'align', 'valign'],
    tr: ['style', 'rowspan', 'align', 'valign'],
    tt: ['style'],
    u: ['style'],
    ul: ['style'],
    video: ['style', 'autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width'],
    style: ['style']   //新添
  },
  // 去掉不在白名单上的标签
  stripIgnoreTag: true,
  // 去掉HTML备注
  allowCommentTag: false,
  // 彻底去除script标签
  stripIgnoreTagBody: ['script', 'noscript']
}

const Xss = new xss.FilterXSS(options)

export const $xss = Xss.process.bind(Xss)
Xss.$xss = $xss

export default Xss