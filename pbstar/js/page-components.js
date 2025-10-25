/**
 * 页面组件工具模块
 * 提供通用的页面组件功能
 */

/**
 * 生成导航栏HTML
 * @param {Object} options - 配置选项
 * @param {string} options.activePage - 当前活跃页面
 * @returns {string} 导航栏HTML
 */
function generateHeaderHTML(options = {}) {
  const { activePage = "" } = options;

  const navItems = [
    { name: "首页", href: "/index.html", id: "home" },
    { name: "我的作品", href: "/index.html#products", id: "products" },
    { name: "我的博客", href: "/index.html#blogs", id: "blogs" },
    { name: "关于我", href: "/index.html#about", id: "about" },
  ];

  const navLinksHTML = navItems
    .map((item) => {
      const isActive = activePage === item.id ? "active" : "";
      return `<li><a href="${item.href}" class="${isActive}">${item.name}</a></li>`;
    })
    .join("");

  return `
      <div class="container">
        <nav>
          <a href="/index.html" class="logo">初辰ge</a>
          <ul class="nav-links">
            ${navLinksHTML}
          </ul>
          <div class="mobile-menu">
            <i class="fas fa-bars"></i>
          </div>
        </nav>
      </div>
  `;
}

/**
 * 检查并显示备案信息
 */
function checkBeian() {
  const beianList = ["pbstar.cn", "www.pbstar.cn"];
  return beianList.includes(window.location.hostname);
}

/**
 * 生成页脚HTML
 * @param {Object} options - 配置选项
 * @returns {string} 页脚HTML
 */
function generateFooterHTML(options = {}) {
  const isBeian = checkBeian();
  return `
      <div class="container">
        <div class="footer-bottom">
          <span>© 2025 初辰ge</span>
          <span>|</span>
          ${
            isBeian
              ? '<a href="https://beian.miit.gov.cn/">京ICP备2025125905号</a>'
              : "<span>All Rights Reserved</span>"
          }
        </div>
      </div>
  `;
}

/**
 * 初始化导航栏交互
 */
function initHeaderInteraction() {
  // 导航栏滚动效果
  function handleScroll() {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.08)";
    }
  }

  // 移动端菜单
  const mobileMenu = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });

    // 点击导航链接后关闭菜单
    const navLinkItems = document.querySelectorAll(".nav-links li a");
    navLinkItems.forEach((link) => {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove("active");
        }
      });
    });
  }

  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // 监听滚动事件
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // 初始化
}

/**
 * 设置页面最小高度
 * @param {string} contentSelector - 内容区域选择器
 * @param {number} minHeight - 最小高度（可选，默认计算）
 */
function setPageMinHeight(contentSelector = ".page-content", minHeight = null) {
  function updateMinHeight() {
    const content = document.querySelector(contentSelector);
    if (!content) return;

    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    if (header && footer) {
      const headerHeight = header.offsetHeight;
      const footerHeight = footer.offsetHeight;
      const windowHeight = window.innerHeight;

      // 计算内容区域的最小高度
      const calculatedMinHeight =
        windowHeight - headerHeight - footerHeight - 40; // 40px 为上下边距
      const finalMinHeight = minHeight || Math.max(calculatedMinHeight, 400); // 最小400px

      content.style.minHeight = `${finalMinHeight}px`;
    }
  }

  // 页面加载完成后设置
  document.addEventListener("DOMContentLoaded", updateMinHeight);
  window.addEventListener("resize", updateMinHeight);
}

/**
 * 初始化导航栏和页脚
 * @param {Object} options - 配置选项
 */
function initNavigation(options = {}) {
  const { activePage = "" } = options;

  // 生成并插入导航栏
  const headerContainer = document.getElementById("main-header");
  if (headerContainer) {
    headerContainer.innerHTML = generateHeaderHTML({ activePage });
  }

  // 生成并插入页脚
  const footerContainer = document.getElementById("main-footer");
  if (footerContainer) {
    footerContainer.innerHTML = generateFooterHTML();
  }
}

/**
 * 初始化页面基础功能
 * @param {Object} options - 配置选项
 */
function initPageComponents(options = {}) {
  const {
    activePage = "",
    contentSelector = ".page-content",
    minHeight = null,
  } = options;

  // 初始化导航栏和页脚
  initNavigation({ activePage });

  // 初始化导航栏交互
  initHeaderInteraction();

  // 设置页面最小高度
  setPageMinHeight(contentSelector, minHeight);
}

/**
 * 添加博客卡片动画样式
 */
function addBlogCardAnimation() {
  const style = document.createElement("style");
  style.textContent = `
    .blog-card {
      opacity: 0;
      transition: all 0.6s ease;
    }
    .blog-card.visible {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
}

// 浏览器环境，挂载到全局对象
window.PageComponents = {
  initPageComponents,
  addBlogCardAnimation,
};
