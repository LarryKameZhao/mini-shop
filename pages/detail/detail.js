import { Spu } from "../../model/spu";
import { ShoppingWay } from "../../core/enum";

// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    spu: null,
    showRealm: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const pid = options.pid;
    const spu = await Spu.getDetail(pid);
    this.setData({
      spu
    });
  },
  onAddToCart(event) {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.CART
    });
  },
  onBuy(event) {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.BUY
    });
  },
  onGotoHome(event) {
    wx.switchTab({
      url: "/pages/home/home"
    });
  },
  onGotoCart(event) {
    wx.switchTab({
      url: "/pages/cart/cart"
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
