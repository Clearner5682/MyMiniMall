Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiperItems:{
      type:Array,
      value:[]
    },
    indicatorDots:{
      type:Boolean,
      value:true
    },
    indicatorColor:{
      type:String,
      value:"#ffffff"
    },
    indicatorActiveColor:{
      type:String,
      value:"#ff5777"
    },
    autoplay:{
      type:Boolean,
      value:true
    },
    interval:{
      type:Number,
      value:3000
    },
    duration:{
      type:Number,
      value:500
    },
    cicular:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
