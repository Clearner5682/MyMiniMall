const homeservice = require('../../services/homeservice')
const types = ['fashion', 'newStyle', 'chosen']

Page({
  data: {
    swiperItems: [],
    recommendItems: [],
    popularItems: [],
    tabItems: [
      { tabIndex: 0, name: "流行" },
      { tabIndex: 1, name: "新款" },
      { tabIndex: 2, name: "精选" }
    ],
    activeTabIndex: 0,
    isShowBackTop: false,
    tabToTop: 0,
    isFixed: false,
    currentType: "fashion",
    tabGoods: {
      fashion: {
        type: 0,
        page: 1,
        total: 0,
        goodItems: []
      },
      newStyle: {
        type: 1,
        page: 1,
        total: 0,
        goodItems: []
      },
      chosen: {
        type: 2,
        page: 1,
        total: 0,
        goodItems: []
      }
    }
  },
  onLoad(options) {
    // 拿轮播图数据
    homeservice.GetSwiperData()
      .then(res => {
        this.setData({
          swiperItems: res.data
        })
      })
      .catch(res => { });

    // 拿推荐数据
    homeservice.GetRecommendData()
      .then(res => {
        this.setData({
          recommendItems: res.data
        })
      })
      .catch(res => { });

    // 拿本周流行数据
    homeservice.GetWeeklyData()
      .then(res => {
        this.setData({
          popularItems: res.data
        })
      })
      .catch(res => { });

    // 拿tab页数据
    this._getTabGoodData(0, 1);
    this._getTabGoodData(1, 1);
    this._getTabGoodData(2, 1);
  },
  onShow() {
    setTimeout(() => {
      wx.createSelectorQuery().select('#mainTab').boundingClientRect(res => {
        // console.log(res.top);
        this.setData({
          tabToTop: res.top
        })
      }).exec();
    }, 1000)
  },
  onPageScroll(options) {
    const isShowBackTop = options.scrollTop >= 1000;
    if (isShowBackTop != this.data.isShowBackTop) {
      this.setData({ isShowBackTop: isShowBackTop })
    }
    const isFixed = options.scrollTop > this.data.tabToTop;
    if (this.data.isFixed != isFixed) {
      this.setData({
        isFixed: isFixed
      })
    }
  },
  onReachBottom() {
    this.loadMore();
  },
  // 自定义方法
  tabClickHandler(event) {
    this.setData({ currentType: types[event.detail.activeIndex] });
    this.setData({ activeTabIndex: event.detail.activeIndex });
  },
  _getTabGoodData(tabIndex, page) {
    homeservice.GetTabGoodItem(tabIndex, page)
      .then(res => {
        const list = res.data.PagedList;
        const total = res.data.total;
        const type = types[tabIndex];
        let tempData = this.data.tabGoods[type];
        tempData.page += 1;
        tempData.total = total;
        tempData.goodItems.push(...list);
        const dataKey = "tabGoods." + type;
        this.setData({
          // ***注意这里必须加上[]
          [dataKey]: tempData
        })
      })
      .catch(res => { });
  },
  backtop() {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  loadMore() {
    const activeTabIndex = this.data.activeTabIndex;
    const tabGoodData = this.data.tabGoods[this.data.currentType];
    if (tabGoodData.goodItems.length >= tabGoodData.total) {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    const page = tabGoodData.page;
    this._getTabGoodData(activeTabIndex, page);
  }
})