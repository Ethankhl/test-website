// 网站共用JavaScript功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 初始化滚动动画
  initScrollAnimations();
  
  // 初始化SKU搜索功能（如果页面有搜索功能）
  initSkuSearch();
  
  // 初始化地区检测（如果页面有联系功能）
  initRegionDetection();
  
  // 初始化订阅表单功能（如果页面有订阅表单）
  initNewsletterForm();
  
  // 初始化品牌点击功能（如果页面有品牌模块）
  initBrandClick();
  
  // 初始化SKU列表展示（如果页面有SKU列表）
  initSkuList();
  
  // 初始化数字计数器动画（如果页面有计数器）
  if (typeof initCounters === 'function') {
    initCounters();
  }
});

// 滚动动画功能
function initScrollAnimations() {
  const scrollElements = document.querySelectorAll('.scroll-animate');
  
  const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= 
      ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
  };
  
  const displayScrollElement = (element) => {
    element.classList.add('visible');
  };
  
  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 80)) {
        displayScrollElement(el);
      }
    });
  };
  
  // 初始检查
  handleScrollAnimation();
  
  // 滚动时检查
  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });
}

// SKU搜索功能
function initSkuSearch() {
  const skuInput = document.getElementById('skuInput');
  const searchBtn = document.getElementById('searchBtn');
  
  // 如果页面没有搜索功能，不执行
  if (!skuInput || !searchBtn) return;
  
  const skuResult = document.getElementById('skuResult');
  
  // 使用用户提供的内嵌数据
  const skuDatabase = [
    { brand: 'Acer', type: 'ACER 50.29WH AP18C8K', stock: 'on US stock' },
    { brand: 'Acer', type: 'ACER 58.75WH AP18E7M', stock: 'on US stock' },
    { brand: 'ASUS', type: 'Asus 38wh C21N1518', stock: 'on US stock' },
    { brand: 'ASUS', type: 'Asus 38WH C21N1309', stock: 'on US stock' },
    { brand: 'ASUS', type: 'Asus 50Wh C21N1818', stock: 'on US stock' },
    { brand: 'ASUS', type: 'Asus 42WH C31N1637', stock: 'on US stock' },
    { brand: 'ASUS', type: 'Asus 62WH C41N2013', stock: 'on US stock' },
    { brand: 'ASUS', type: 'AU C31N1815', stock: 'on US stock' },
    { brand: 'ASUS', type: 'AU B31N1424', stock: 'on US stock' },
    { brand: 'DELL', type: 'DELL 58Wh FK0VR', stock: 'on US stock' },
    { brand: 'DELL', type: 'DELL 54wh R73TC', stock: 'on US stock' },
    { brand: 'DELL', type: 'DELL 52wh 7V69Y', stock: 'on US stock' },
    { brand: 'DELL', type: 'DELL 68Wh H5H20-Y', stock: 'on US stock' },
    { brand: 'DELL', type: 'DELLL 64WH GRT01', stock: 'on US stock' },
    { brand: 'DELL', type: 'Dell TVKGH-Y', stock: 'on US stock' },
    { brand: 'DELL', type: 'Dell H5H20', stock: 'on US stock' },
    { brand: 'DELL', type: 'Dell T0TRM', stock: 'on US stock' },
    { brand: 'DELL', type: 'Dell JK6Y6', stock: 'on US stock' },
    { brand: 'HP', type: 'HP 72.9wh BN06XL', stock: 'on US stock' },
    { brand: 'HP', type: 'HP 96wh AI06XL', stock: 'on US stock' },
    { brand: 'HP', type: 'HP YB06XL NEW', stock: 'on US stock' },
    { brand: 'HP', type: 'HP 41.9WH GB02XL', stock: 'on US stock' },
    { brand: 'HP', type: 'HP 41.9WH GM02XL', stock: 'on US stock' },
    { brand: 'HP', type: 'HP 52.5Wh SS03XL', stock: 'on US stock' },
    { brand: 'Lenovo', type: 'LENOVO Y460', stock: 'on US stock' },
    { brand: 'Lenovo', type: 'LENOVO L19M3PD3', stock: 'on US stock' },
    { brand: 'Lenovo', type: 'LENOVO 60WH L14M4P72', stock: 'on US stock' },
    { brand: 'Lenovo', type: 'Lenovo 51WH L18L3P73', stock: 'on US stock' },
    { brand: 'Lenovo', type: 'Lenovo 55WH L21B4P71', stock: 'on US stock' },
    { brand: 'Lenovo', type: 'Lenovo 81Wh L23B2PK0', stock: 'on US stock' },
    { brand: 'Panasonic', type: 'Panasonic 87WH CF-VZSU46', stock: 'on US stock' },
    { brand: 'Panasonic', type: 'Panasonic FZ-VZSU94U', stock: 'on US stock' },
    { brand: 'Panasonic', type: 'Panasonic FZ-VZSU95R', stock: 'on US stock' },
    { brand: 'Apple', type: 'Mac A2171', stock: 'on US stock' },
    { brand: 'Apple', type: 'Mac A1713', stock: 'on US stock' },
    { brand: 'Apple', type: 'Mac A1820', stock: 'on US stock' },
    { brand: 'Apple', type: 'Mac A1819', stock: 'on US stock' }
  ];
  
  // 搜索函数
  const searchSku = () => {
    const inputValue = skuInput.value.trim().toLowerCase();
    
    // 清空结果
    skuResult.innerHTML = '';
    skuResult.classList.remove('visible', 'success', 'error');
    
    // 如果输入为空，不显示结果
    if (!inputValue) {
      return;
    }
    
    // 搜索匹配的SKU
    const matches = skuDatabase.filter(item => 
      item.brand.toLowerCase().includes(inputValue) || 
      item.type.toLowerCase().includes(inputValue)
    );
    
    // 显示结果
    if (matches.length > 0) {
      skuResult.classList.add('success');
      let resultHTML = '<p>✔ Compatible model found:</p>';
      matches.forEach(item => {
        resultHTML += `
          <div style="margin: 1rem 0; padding: 1rem; background-color: rgba(255, 255, 255, 0.5); border-radius: 4px;">
            <p><b>${item.brand}</b></p>
            <p>${item.type}</p>
            <p class="text-green-600"><i class="fa fa-check-circle"></i> ${item.stock}</p>
          </div>
        `;
      });
      skuResult.innerHTML = resultHTML;
    } else {
      skuResult.classList.add('error');
      skuResult.innerHTML = '<p>❌ No matching battery model found.</p>';
    }
    
    // 显示结果框
    skuResult.classList.add('visible');
  };
  
  // 按钮点击事件
  searchBtn.addEventListener('click', searchSku);
  
  // 输入框回车事件
  skuInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchSku();
    }
  });
  
  // 输入框内容变化时清空结果
  skuInput.addEventListener('input', () => {
    if (!skuInput.value.trim()) {
      skuResult.innerHTML = '';
      skuResult.classList.remove('visible', 'success', 'error');
    }
  });
}

// 地区检测功能
function initRegionDetection() {
  const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
  
  // 如果页面没有WhatsApp按钮，不执行
  if (whatsappButtons.length === 0) return;
  
  // 模拟根据地区推荐
  // 在实际应用中，这里可以根据IP地址或其他方式检测地区
  const detectRegionAndRecommendWhatsApp = () => {
    // 这里简化处理，实际应用中可以根据IP地址或其他方式检测地区
    // 这里默认显示两个按钮，用户可以根据需要选择
    
    // 模拟根据地区推荐
    // 在实际应用中，这里可以根据检测到的地区设置推荐的按钮样式
    // 例如：
    // if (detectedRegion === 'China') {
    //   chinaWhatsApp.style.border = '2px solid white';
    // } else if (detectedRegion === 'USA') {
    //   usaWhatsApp.style.border = '2px solid white';
    // }
  };
  
  detectRegionAndRecommendWhatsApp();
}

// 初始化订阅表单功能
function initNewsletterForm() {
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  // 如果页面没有订阅表单，不执行
  if (newsletterForms.length === 0) return;
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = form.querySelector('.newsletter-input');
      const email = emailInput.value.trim();
      
      if (email && validateEmail(email)) {
        // 模拟表单提交
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  });
}

// 品牌点击功能
function initBrandClick() {
  const brandItems = document.querySelectorAll('.brand-item');
  
  // 如果页面没有品牌模块，不执行
  if (brandItems.length === 0) return;
  
  brandItems.forEach(item => {
    item.addEventListener('click', function() {
      const brand = this.getAttribute('data-brand');
      
      // 跳转到SKU列表页面，并传递品牌参数
      window.location.href = `sku.html?brand=${encodeURIComponent(brand)}`;
    });
  });
}

// CSV解析函数
function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const result = [];
  
  // 获取表头
  const headers = lines[0].split(',').map(header => header.trim());
  
  // 处理每一行数据
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const values = line.split(',');
    const obj = {};
    
    // 为每个属性赋值，支持不同的列名格式
    headers.forEach((header, index) => {
      if (header.toLowerCase() === 'brand') {
        obj.brand = values[index] ? values[index].trim() : '';
      } else if (header.toLowerCase() === 'type') {
        obj.type = values[index] ? values[index].trim() : '';
      } else {
        obj[header] = values[index] ? values[index].trim() : '';
      }
    });
    
    result.push(obj);
  }
  
  return result;
}

// SKU列表展示功能
function initSkuList() {
  const skuListSection = document.getElementById('skuListSection');
  const skuTableBody = document.getElementById('skuTableBody');
  const brandTitle = document.getElementById('brandTitle');
  
  // 如果页面没有SKU列表，不执行
  if (!skuListSection || !skuTableBody || !brandTitle) return;
  
  // 从URL获取品牌参数
  const urlParams = new URLSearchParams(window.location.search);
  const selectedBrand = urlParams.get('brand');
  
  console.log('=== Initializing SKU List ===');
  console.log('Using embedded SKU data');
  console.log('Selected brand from URL:', selectedBrand);
  
  // 使用用户提供的内嵌数据
  const skuData = [
    { brand: 'Acer', type: 'ACER 50.29WH AP18C8K', stock: 'on US stock' },
    { brand: 'Acer', type: 'ACER 58.75WH AP18E7M', stock: 'on US stock' },
    { brand: 'ASUS', type: 'Asus 38wh C21N1518', stock: 'on US stock' },
    { brand: 'ASUS', type: 'Asus 38WH C21N1309', stock: 'on US stock' },
    { brand: 'ASUS', type: 'Asus 50Wh C21N1818', stock: 'on US stock' },
    { brand: 'ASUS', type: 'Asus 42WH C31N1637', stock: 'on US stock' },
    { brand: 'ASUS', type: 'Asus 62WH C41N2013', stock: 'on US stock' },
    { brand: 'ASUS', type: 'AU C31N1815', stock: 'on US stock' },
    { brand: 'ASUS', type: 'AU B31N1424', stock: 'on US stock' },
    { brand: 'DELL', type: 'DELL 58Wh FK0VR', stock: 'on US stock' },
    { brand: 'DELL', type: 'DELL 54wh R73TC', stock: 'on US stock' },
    { brand: 'DELL', type: 'DELL 52wh 7V69Y', stock: 'on US stock' },
    { brand: 'DELL', type: 'DELL 68Wh H5H20-Y', stock: 'on US stock' },
    { brand: 'DELL', type: 'DELLL 64WH GRT01', stock: 'on US stock' },
    { brand: 'DELL', type: 'Dell TVKGH-Y', stock: 'on US stock' },
    { brand: 'DELL', type: 'Dell H5H20', stock: 'on US stock' },
    { brand: 'DELL', type: 'Dell T0TRM', stock: 'on US stock' },
    { brand: 'DELL', type: 'Dell JK6Y6', stock: 'on US stock' },
    { brand: 'HP', type: 'HP 72.9wh BN06XL', stock: 'on US stock' },
    { brand: 'HP', type: 'HP 96wh AI06XL', stock: 'on US stock' },
    { brand: 'HP', type: 'HP YB06XL NEW', stock: 'on US stock' },
    { brand: 'HP', type: 'HP 41.9WH GB02XL', stock: 'on US stock' },
    { brand: 'HP', type: 'HP 41.9WH GM02XL', stock: 'on US stock' },
    { brand: 'HP', type: 'HP 52.5Wh SS03XL', stock: 'on US stock' },
    { brand: 'Lenovo', type: 'LENOVO Y460', stock: 'on US stock' },
    { brand: 'Lenovo', type: 'LENOVO L19M3PD3', stock: 'on US stock' },
    { brand: 'Lenovo', type: 'LENOVO 60WH L14M4P72', stock: 'on US stock' },
    { brand: 'Lenovo', type: 'Lenovo 51WH L18L3P73', stock: 'on US stock' },
    { brand: 'Lenovo', type: 'Lenovo 55WH L21B4P71', stock: 'on US stock' },
    { brand: 'Lenovo', type: 'Lenovo 81Wh L23B2PK0', stock: 'on US stock' },
    { brand: 'Panasonic', type: 'Panasonic 87WH CF-VZSU46', stock: 'on US stock' },
    { brand: 'Panasonic', type: 'Panasonic FZ-VZSU94U', stock: 'on US stock' },
    { brand: 'Panasonic', type: 'Panasonic FZ-VZSU95R', stock: 'on US stock' },
    { brand: 'Apple', type: 'Mac A2171', stock: 'on US stock' },
    { brand: 'Apple', type: 'Mac A1713', stock: 'on US stock' },
    { brand: 'Apple', type: 'Mac A1820', stock: 'on US stock' },
    { brand: 'Apple', type: 'Mac A1819', stock: 'on US stock' }
  ];
  
  // 筛选数据
  let filteredData = skuData;
  if (selectedBrand) {
    filteredData = skuData.filter(item => 
      item.brand.toLowerCase() === selectedBrand.toLowerCase()
    );
    brandTitle.textContent = `${selectedBrand} SKUs`;
  } else {
    brandTitle.textContent = 'All SKUs';
  }
  
  // 清空表格
  skuTableBody.innerHTML = '';
  
  // 填充表格数据
  filteredData.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.brand}</td>
      <td>${item.type}</td>
      <td class="font-medium text-secondary">${item.stock}</td>
    `;
    skuTableBody.appendChild(row);
  });
  
  // 显示成功信息
  const successRow = document.createElement('tr');
  successRow.innerHTML = `
    <td colspan="3" style="text-align: center; padding: 1rem; background-color: #d4edda; color: #155724;">
      <i class="fa fa-check-circle"></i> Successfully loaded data from embedded source.
    </td>
  `;
  skuTableBody.insertBefore(successRow, skuTableBody.firstChild);
  
  console.log(`Successfully loaded ${filteredData.length} SKU items`);
}

// 邮箱验证函数
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// 数字计数器动画功能
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // 动画速度
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / speed;
        let currentCount = 0;
        
        const updateCount = () => {
          if (currentCount < target) {
            currentCount += increment;
            // 根据目标值决定是否显示小数
            if (target > 1000) {
              counter.innerText = Math.ceil(currentCount).toLocaleString();
            } else if (target < 100) {
              counter.innerText = Math.ceil(currentCount);
            } else {
              counter.innerText = Math.ceil(currentCount).toLocaleString();
            }
            setTimeout(updateCount, 1);
          } else {
            counter.innerText = target.toLocaleString();
          }
        };
        
        updateCount();
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}
