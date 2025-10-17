# Vue3 Composition API 完全指南

Vue3的Composition API是Vue3中最重要的新特性之一，它提供了一种新的组织组件逻辑的方式。本文将全面介绍Composition API的使用方法和最佳实践。

## 什么是Composition API

Composition API是Vue3引入的一组基于函数的API，它允许我们更灵活地组织和复用组件逻辑。

### 与Options API的对比

```javascript
// Options API
export default {
  data() {
    return {
      count: 0,
      message: 'Hello'
    }
  },
  methods: {
    increment() {
      this.count++;
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2;
    }
  }
}

// Composition API
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0);
    const message = ref('Hello');
    
    const increment = () => {
      count.value++;
    };
    
    const doubleCount = computed(() => count.value * 2);
    
    return {
      count,
      message,
      increment,
      doubleCount
    };
  }
}
```

## 核心概念

### 1. setup函数

`setup`函数是Composition API的入口点，它在组件创建之前执行。

```javascript
export default {
  setup(props, context) {
    // 组件逻辑
    return {
      // 暴露给模板的属性和方法
    };
  }
}
```

### 2. 响应式引用(ref)

`ref`用于创建响应式的基本类型值。

```javascript
import { ref } from 'vue'

const count = ref(0);
const name = ref('Vue3');

// 访问和修改
console.log(count.value); // 0
count.value = 5;
```

### 3. 响应式对象(reactive)

`reactive`用于创建响应式的对象。

```javascript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  user: {
    name: 'John',
    age: 25
  }
});

// 直接访问属性
console.log(state.count); // 0
state.count = 5;
```

### 4. 计算属性(computed)

`computed`用于创建计算属性。

```javascript
import { ref, computed } from 'vue'

const count = ref(0);
const doubleCount = computed(() => count.value * 2);

// 可写的计算属性
const fullName = computed({
  get() {
    return firstName.value + ' ' + lastName.value;
  },
  set(newValue) {
    [firstName.value, lastName.value] = newValue.split(' ');
  }
});
```

### 5. 监听器(watch)

`watch`用于监听响应式数据的变化。

```javascript
import { ref, watch } from 'vue'

const count = ref(0);

// 监听单个ref
watch(count, (newValue, oldValue) => {
  console.log(`count changed from ${oldValue} to ${newValue}`);
});

// 监听多个源
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log('count or name changed');
});
```

## 生命周期钩子

Composition API提供了与Options API对应的生命周期钩子。

| Options API | Composition API |
|-------------|-----------------|
| beforeCreate | setup() |
| created | setup() |
| beforeMount | onBeforeMount |
| mounted | onMounted |
| beforeUpdate | onBeforeUpdate |
| updated | onUpdated |
| beforeUnmount | onBeforeUnmount |
| unmounted | onUnmounted |

```javascript
import { onMounted, onUnmounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      console.log('组件已挂载');
    });
    
    onUnmounted(() => {
      console.log('组件已卸载');
    });
  }
}
```

## 逻辑复用：组合式函数

组合式函数是Composition API最强大的特性之一，它允许我们提取和复用组件逻辑。

```javascript
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  
  const increment = () => {
    count.value++;
  };
  
  const decrement = () => {
    count.value--;
  };
  
  const doubleCount = computed(() => count.value * 2);
  
  return {
    count,
    increment,
    decrement,
    doubleCount
  };
}

// 在组件中使用
import { useCounter } from './useCounter'

export default {
  setup() {
    const { count, increment, decrement, doubleCount } = useCounter(10);
    
    return {
      count,
      increment,
      decrement,
      doubleCount
    };
  }
}
```

## 最佳实践

### 1. 组织代码结构

```javascript
export default {
  setup() {
    // 1. 定义响应式数据
    const state = reactive({...});
    const count = ref(0);
    
    // 2. 定义计算属性
    const computedValue = computed(() => {...});
    
    // 3. 定义方法
    const method1 = () => {...};
    
    // 4. 定义监听器
    watch(state, () => {...});
    
    // 5. 生命周期钩子
    onMounted(() => {...});
    
    // 6. 返回值
    return {
      state,
      count,
      computedValue,
      method1
    };
  }
}
```

### 2. 使用TypeScript

```typescript
import { ref, Ref } from 'vue'

interface User {
  id: number;
  name: string;
  email: string;
}

export default {
  setup(): { user: Ref<User | null> } {
    const user = ref<User | null>(null);
    
    return {
      user
    };
  }
}
```

## 总结

Composition API为Vue开发者提供了更强大的工具来组织和复用代码。虽然在学习初期可能会感到陌生，但一旦掌握，它将成为你开发Vue应用的强大武器。

> 记住，Composition API不是要完全替代Options API，而是提供了另一种选择。根据项目需求和个人偏好选择合适的API风格。