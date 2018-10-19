// pages/components/footer/footer.js
const app = getApp();

Component({
  options: {
    multipleSlots : true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    about_data: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 获取关于booking数据列表
    */
    getAboutData: function () {
      this.setData({
        about_data: app.globalData.index_about_data
      })
    }
  }
})
