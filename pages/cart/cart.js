import { Cart } from '../../components/models/cart';
const cart = new Cart();

// pages/cart/cart.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartItems: [],
    isEmpty: false,
    allChecked: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const cartItems = cart.getAllCartItemFromLocal().items;
    if (cart.isEmpty()) {
      this.empty();
      return;
    }
    this.setData({
      cartItems,
    });
    this.notEmpty();
    this.isAllChecked();
  },
  onSingleCheck(evnet) {
    this.isAllChecked();
  },
  onDeleteItem(event) {
    this.isAllChecked();
  },
  onCheckAll(event) {
    const checked = event.detail.checked;
    cart.checkAll(checked);
    this.setData({
      cartItems: this.data.cartItems,
    });
  },
  isAllChecked() {
    let allChecked = cart.isAllChecked();
    this.setData({
      allChecked,
    });
  },
  empty() {
    this.setData({
      isEmpty: true,
    });
    wx.hideTabBarRedDot({
      index: 2,
    });
  },
  notEmpty() {
    this.setData({
      isEmpty: false,
    });
    wx.showTabBarRedDot({
      index: 2,
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
});
