# 5.3 如何运用二分查找算法

本文对应的力扣题目：

[875.爱吃香蕉的珂珂](https://leetcode-cn.com/problems/koko-eating-bananas)

[1011.在D天内送达包裹的能力](https://leetcode-cn.com/problems/capacity-to-ship-packages-within-d-days)

**爱吃香蕉的珂珂**：

```java
int minEatingSpeed(int[] piles, int H) {
    // 套用搜索左侧边界的算法框架
    int left = 1, right = getMax(piles) + 1;
    while (left < right) {
        // 防止溢出
        int mid = left + (right - left) / 2;
        if (canFinish(piles, mid, H)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}

// 时间复杂度 O(N)
boolean canFinish(int[] piles, int speed, int H) {
    int time = 0;
    for (int n : piles) {
        time += timeOf(n, speed);
    }
    return time <= H;
}

// 以 speed 的速度吃 n 个香蕉，要多久？
int timeOf(int n, int speed) {
    return (n / speed) + ((n % speed > 0) ? 1 : 0);
}

// 计算数组的最大值
int getMax(int[] piles) {
    int max = 0;
    for (int n : piles)
        max = Math.max(n, max);
    return max;
}
```

**在D天内送达包裹的能力**：

```java
// 寻找左侧边界的二分查找
int shipWithinDays(int[] weights, int D) {
	// 载重可能的最小值
    int left = getMax(weights);
	// 载重可能的最大值 + 1
    int right = getSum(weights) + 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (canFinish(weights, D, mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}

// 如果载重为 cap，是否能在 D 天内运完货物？
boolean canFinish(int[] w, int D, int cap) {
    int i = 0;
    for (int day = 0; day < D; day++) {
        int maxCap = cap;
        while ((maxCap -= w[i]) >= 0) {
            i++;
            if (i == w.length)
                return true;
        }
    }
    return false;
}
```



```javascript
var minEatingSpeed = function(piles, H) {
    // 最低值一根
    let left = 1;
    // 使用...迭代器遍找到最大值
    let right = Math.max(...piles);
    // 模拟能否在规定时间内吃完香蕉
    const canEat = (piles, speed, H) => {
        // 初始值为0
        let sumTime = 0;
        // 遍历piles中的数组，每堆香蕉的数量
        for(let pile of piles){
            // 向上取整
            sumTime += Math.ceil(pile / speed);
        }
        return sumTime <= H;
    };
    // 判断条件，左子树小于右子树
    while(left < right){
        // 返回一个对数
        let mid = Math.floor((right + left) / 2);
        if(canEat(piles, mid, H)){
            right = mid; // 如果能吃完，最大值调整为 mid
        }else {
            left = mid + 1; // 如果不能吃完，最小值调整为 mid=1
        }
    }
    return right;
}; 
```