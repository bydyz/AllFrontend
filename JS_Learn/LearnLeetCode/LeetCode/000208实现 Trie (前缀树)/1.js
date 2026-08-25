/**
 * 前缀树（Trie）实现
 * 核心思想：利用树结构共享字符串前缀，每个节点存储一个字符，从根到叶的路径构成完整单词
 * children 用对象模拟，key 为字符，value 为子节点
 * isEnd 标记该节点是否为某个单词的结尾
 */
var Trie = function() {
    this.children = {};
};

/**
 * 插入单词：逐字符沿树向下走，不存在则创建新节点，末尾标记 isEnd
 */
Trie.prototype.insert = function(word) {
    let node = this.children;
    for (const ch of word) {
        if (!node[ch]) {
            node[ch] = {};
        }
        node = node[ch];
    }
    node.isEnd = true;
};

/**
 * 前缀搜索的内部方法：沿前缀路径向下走，中途失败返回 false，成功返回终止节点
 */
Trie.prototype.searchPrefix = function(prefix) {
    let node = this.children;
    for (const ch of prefix) {
        if (!node[ch]) {
            return false;
        }
        node = node[ch];
    }
    return node;
}

/**
 * 精确搜索：先走完前缀路径，再判断终止节点是否为单词结尾
 */
Trie.prototype.search = function(word) {
    const node = this.searchPrefix(word);
    return node !== undefined && node.isEnd !== undefined;
};

/**
 * 前缀匹配：只要路径存在即返回真
 */
Trie.prototype.startsWith = function(prefix) {
    return this.searchPrefix(prefix);
};

/*
复杂度分析：
时间复杂度：初始化为 O(1)，insert / search / startsWith 均为 O(m)，m 为字符串长度
空间复杂度：O(N * Σ)，N 为所有插入字符串的总长度，Σ 为字符集大小（本题 Σ=26）
*/