var minWindow = function(s1, s2) {
    const m = s1.length, n = s2.length;
    let minLen = Infinity, start = -1;

    for (let i = 0; i < m; i++) {
        // 正向扫描：从 s1[i] 开始匹配 s2
        if (s1[i] !== s2[0]) continue;

        let j = 0; // s2 指针
        let k = i; // s1 指针
        while (k < m && j < n) {
            if (s1[k] === s2[j]) j++;
            k++;
        }

        // 未匹配完 s2，跳过
        if (j < n) continue;

        // 反向扫描：从匹配终点 k-1 往回找，尽可能缩短窗口
        let end = k; // 匹配结束位置（k 已经多走了一步）
        j = n - 1;
        k = end - 1;
        while (j >= 0) {
            if (s1[k] === s2[j]) j--;
            k--;
        }
        let windowStart = k + 1; // 窗口起始位置

        if (end - windowStart < minLen) {
            minLen = end - windowStart;
            start = windowStart;
        }
    }

    return start === -1 ? "" : s1.substring(start, start + minLen + 1);
};
