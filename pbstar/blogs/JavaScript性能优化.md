# JavaScript性能优化实战技巧

JavaScript性能优化是前端开发中的重要课题。本文将分享一些实用的性能优化技巧，帮助你的应用运行得更快、更流畅。

## 1. 代码层面的优化

### 1.1 避免全局变量

全局变量会增加作用域链的长度，影响性能。

```javascript
// ❌ 不好的做法
var globalData = [];
function processData() {
  globalData.push(1);
}

// ✅ 推荐做法
function processData() {
  const localData = [];
  localData.push(1);
  return localData;
}
```

### 1.2 使用局部变量缓存属性访问

```javascript
// ❌ 不好的做法
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}

// ✅ 推荐做法
function calculateTotal(items) {
  let total = 0;
  for (let i = 0, len = items.length; i < len; i++) {
    const item = items[i];
    total += item.price * item.quantity;
  }
  return total;
}
```

### 1.3 使用高效的数据结构

```javascript
// ❌ 数组查找效率低
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
];
function findUser(id) {
  return users.find(user => user.id === id);
}

// ✅ 使用Map提高查找效率
const userMap = new Map([
  [1, { id: 1, name: 'John' }],
  [2, { id: 2, name: 'Jane' }]
]);
function findUser(id) {
  return userMap.get(id);
}
```

## 2. DOM操作优化

### 2.1 批量DOM操作

```javascript
// ❌ 多次DOM操作
const list = document.getElementById('list');
for (let i = 0; i < 100; i++) {
  const item = document.createElement('li');
  item.textContent = `Item ${i}`;
  list.appendChild(item);
}

// ✅ 使用文档片段
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const item = document.createElement('li');
  item.textContent = `Item ${i}`;
  fragment.appendChild(item);
}
document.getElementById('list').appendChild(fragment);
```

### 2.2 事件委托

```javascript
// ❌ 为每个元素添加事件监听器
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', handleClick);
});

// ✅ 使用事件委托
document.getElementById('container').addEventListener('click', (e) => {
  if (e.target.classList.contains('item')) {
    handleClick(e);
  }
});
```

## 3. 异步编程优化

### 3.1 使用Promise.all处理并发请求

```javascript
// ❌ 串行请求
async function fetchUserData(userIds) {
  const results = [];
  for (const id of userIds) {
    const user = await fetchUser(id);
    results.push(user);
  }
  return results;
}

// ✅ 并行请求
async function fetchUserData(userIds) {
  const promises = userIds.map(id => fetchUser(id));
  return await Promise.all(promises);
}
```

### 3.2 防抖和节流

```javascript
// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 节流函数
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// 使用示例
const handleScroll = throttle(() => {
  console.log('Scroll event fired');
}, 100);

window.addEventListener('scroll', handleScroll);
```

## 4. 内存管理

### 4.1 及时清理定时器和事件监听器

```javascript
class TimerComponent {
  constructor() {
    this.timer = null;
    this.handleClick = this.handleClick.bind(this);
  }
  
  start() {
    this.timer = setInterval(() => {
      console.log('Timer tick');
    }, 1000);
    
    document.addEventListener('click', this.handleClick);
  }
  
  destroy() {
    // 清理定时器
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    
    // 移除事件监听器
    document.removeEventListener('click', this.handleClick);
  }
  
  handleClick() {
    console.log('Document clicked');
  }
}
```

### 4.2 避免内存泄漏

```javascript
// ❌ 可能导致内存泄漏
const elements = [];
function createElement() {
  const element = document.createElement('div');
  elements.push(element); // 数组持续增大
  return element;
}

// ✅ 及时清理不需要的引用
const elements = new WeakMap();
function createElement(id) {
  const element = document.createElement('div');
  elements.set(element, id);
  return element;
}
// WeakMap中的引用不会阻止垃圾回收
```

## 5. 性能监控和调试

### 5.1 使用Performance API

```javascript
// 测量代码执行时间
const start = performance.now();

// 执行一些操作
for (let i = 0; i < 1000000; i++) {
  // 一些计算
}

const end = performance.now();
console.log(`执行时间: ${end - start} 毫秒`);
```

### 5.2 使用Chrome DevTools Performance面板

1. 打开Chrome DevTools
2. 切换到Performance面板
3. 点击录制按钮
4. 执行需要测试的操作
5. 停止录制并分析结果

## 6. 代码分割和懒加载

### 6.1 动态导入

```javascript
// 普通导入
import { heavyFunction } from './heavy-module';

// 动态导入（懒加载）
async function loadHeavyModule() {
  const { heavyFunction } = await import('./heavy-module');
  return heavyFunction();
}

// 使用Intersection Observer实现图片懒加载
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('loaded');
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
```

## 总结

JavaScript性能优化是一个持续的过程，需要我们在日常开发中不断关注和改进。以下是一些关键要点：

1. **代码层面**：避免全局变量，使用高效的数据结构
2. **DOM操作**：批量操作，使用事件委托
3. **异步编程**：合理使用Promise.all，实现防抖节流
4. **内存管理**：及时清理引用，避免内存泄漏
5. **性能监控**：使用工具持续监控应用性能

> 性能优化应该基于实际的性能瓶颈，而不是盲目优化。使用性能分析工具找出真正的瓶颈所在。

希望这些技巧能够帮助你构建更快、更高效的JavaScript应用！