// components/m-tab/m-tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabItems:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectTabItem(event){
      const index=event.currentTarget.dataset.index;
      this.setData({activeIndex:index});
      this.triggerEvent("getActiveIndex",{activeIndex:this.data.activeIndex});
    }
  }
})
