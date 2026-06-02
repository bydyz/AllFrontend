# 心得体会

1. 使用GSD一般使用比较大的需求，倘若是比较小的点，直接使用prompt即可

---

# 命令收集

1. `/gsd-progress`          查看GSD处理需求进行到哪一步了
2. `/gsd-map-codebase`      分析现有代码库，生成结构化的代码库文档，为后续操作提供信息

---

# 场景收集

## 无任何代码的项目

  对于一个没有任何代码的全新项目，GSD 的设计决定了你必须先使用 `/gsd-new-project` 来完成初始化。在这之前，`/gsd-add-phase` 和 `/gsd-new-milestone` 都是无法使用的。

  > &#x2139;&#xfe0f; **原因**
  > * `/gsd-new-project` 会为你从零创建整个项目的骨架：包括项目文件夹、基础配置文件（如 `GSD.md` 或 `ROADMAP.md`）、第一个 `Milestone` 以及其下的第一个 `Phase`。
  > * 只有在初始化完成后，项目才有了“路线图”和“里程碑”的概念。之后，你才能在已有路线图的基础上，使用 `/gsd-add-phase` 来追加新的阶段，或使用 `/gsd-new-milestone` 来开启一个新的里程碑。

## 有存量代码但第一次使用GSD的项目

  1. 先使用 `/gsd-map-codebase`
  2. 再使用 `/gsd-new-project` ；也是不可以先使用 `/gsd-add-phase` 和 `/gsd-new-milestone` 道理同上