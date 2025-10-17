/**
 * 数据工具模块 - 统一处理博客和产品数据
 */

const DataUtils = {
  // 基础工具函数
  utils: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },

    showLoading(container, message = "加载中...") {
      container.innerHTML = `<div class="loading"><i class="fas fa-spinner fa-spin"></i> ${message}</div>`;
    },

    showError(container, message = "加载失败") {
      container.innerHTML = `<div class="error">${message}</div>`;
    },

    triggerAnimation(elements, delay = 100) {
      setTimeout(() => {
        elements.forEach((el, i) => {
          setTimeout(() => el.classList.add("visible"), i * delay);
        });
      }, 100);
    },
  },

  // 数据加载
  async loadData(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`加载失败: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("数据加载失败:", error);
      return [];
    }
  },

  // 博客相关
  blog: {
    sortByDate(items, order = "desc") {
      return [...items].sort((a, b) => {
        const diff = new Date(b.date) - new Date(a.date);
        return order === "desc" ? diff : -diff;
      });
    },

    getLatest(items, count = 5) {
      return this.sortByDate(items, "desc").slice(0, count);
    },

    generateCard(item, type = "list") {
      const tags =
        item.tags?.map((tag) => `<span class="tag">${tag}</span>`).join("") ||
        "";
      const date = `<div class="blog-date"><i class="far fa-calendar"></i> ${DataUtils.utils.formatDate(
        item.date
      )}</div>`;

      if (type === "home") {
        return `
          <div class="home-blog-item fade-in" onclick="location.href='/pbstar/blog-detail.html?id=${item.id}'">
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <div class="blog-meta">${date}<div class="blog-tags">${tags}</div></div>
          </div>`;
      }

      return `
        <div class="blog-card fade-in" onclick="location.href='/pbstar/blog-detail.html?id=${
          item.id
        }'">
          <h3>${item.title}</h3>
          <div class="blog-summary">${item.summary}</div>
          <div class="blog-meta">${date}<div class="blog-stats"><span><i class="fas fa-eye"></i> ${
        item.readCount || 0
      }</span></div></div>
          <div class="blog-tags">${tags}</div>
        </div>`;
    },
  },

  // 产品相关
  product: {
    generateCard(item) {
      const tags = item.tags?.length
        ? `
        <div class="product-tags">
          ${item.tags
            .map((tag) => `<span class="product-tag">${tag}</span>`)
            .join("")}
        </div>`
        : "";

      return `
        <div class="product-card fade-in">
          <div class="product-info">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            ${tags}
            <a href="${item.link}" class="product-link" target="_blank">
              查看详情 <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>`;
    },
  },

  // 通用加载和显示函数
  async loadAndDisplay(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const {
      dataPath,
      type = "blog",
      cardType = "list",
      count = null,
      sortOrder = "desc",
    } = options;

    DataUtils.utils.showLoading(container);

    const data = await DataUtils.loadData(dataPath);
    if (!data.length) {
      DataUtils.utils.showError(container, "暂无数据");
      return;
    }

    let items = data;

    // 博客排序
    if (type === "blog") {
      items = DataUtils.blog.sortByDate(items, sortOrder);
      if (count) items = items.slice(0, count);
    }

    // 生成HTML
    const html = items
      .map((item) => {
        if (type === "blog") return DataUtils.blog.generateCard(item, cardType);
        if (type === "product") return DataUtils.product.generateCard(item);
        return "";
      })
      .join("");

    container.innerHTML = html;

    // 触发动画
    const selector =
      type === "blog"
        ? cardType === "home"
          ? ".home-blog-item"
          : ".blog-card"
        : ".product-card";
    DataUtils.utils.triggerAnimation(container.querySelectorAll(selector));
  },
};

// 导出到全局
window.DataUtils = DataUtils;
