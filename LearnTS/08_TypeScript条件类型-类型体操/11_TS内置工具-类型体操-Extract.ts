type IKun = "sing" | "dance" | "rap"

// ！   这个像是 必须为 E的子类型
type HYExtract<T, E> = T extends E ? T : never


// !      最后的结果只是按照 IKun 的字面量顺序来的而已            调名前后可以看成一样的
type IKuns = HYExtract<IKun, "sing"|"dance">
type IKuns2 = HYExtract<IKun, "sing"|"rap">
type IKuns3 = HYExtract<IKun, "dance"|"rap">

type IKuns4 = HYExtract<IKun, "dance"|"sing">
type IKuns5 = HYExtract<IKun, "rap"|"sing">
type IKuns6 = HYExtract<IKun, "rap"|"dance">


export {}
