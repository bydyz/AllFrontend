/**
 * 前缀树 + DFS 实现模糊匹配
 * 核心思想：在 Trie 基础上，遇到 '.' 通配符时对所有可能的子节点进行 DFS 搜索
 * TrieNode 使用长度 26 的数组存储子节点（对应 a-z）
 */
class TrieNode {
    constructor() {
        this.children = new Array(26).fill(0);
        this.isEnd = false;
    }

    insert(word) {
        let node = this;
        for (let i = 0; i < word.length; i++) {
            const ch = word[i];
            const index = ch.charCodeAt() - 'a'.charCodeAt();
            if (node.children[index] === 0) {
                node.children[index] = new TrieNode();
            }
            node = node.children[index];
        }
        node.isEnd = true;
    }

    getChildren() {
        return this.children;
    }

    isEnd() {
        return this.isEnd;
    }
}

var WordDictionary = function() {
    this.trieRoot = new TrieNode();
};

WordDictionary.prototype.addWord = function(word) {
    this.trieRoot.insert(word);
};

/**
 * 搜索：对每个字符进行 DFS
 * - 普通字符：沿对应子节点向下搜索
 * - '.' 通配符：遍历当前节点所有非空子节点，任一命中即返回 true
 */
WordDictionary.prototype.search = function(word) {
    const dfs = (index, node) => {
        if (index === word.length) {
            return node.isEnd;
        }
        const ch = word[index];
        if (ch !== '.') {
            const child = node.children[ch.charCodeAt() - 'a'.charCodeAt()];
            if (child && dfs(index + 1, child)) {
                return true;
            }
        } else {
            for (const child of node.children) {
                if (child && dfs(index + 1, child)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    return dfs(0, this.trieRoot);
};

/*
复杂度分析：
时间复杂度：addWord 为 O(m)，m 为单词长度；search 最坏为 O(26^m)，当全是 '.' 时需要遍历所有分支
空间复杂度：O(N * 26)，N 为所有插入单词的总长度（Trie 节点数）
*/