// pages/home/home.js
import { Theme } from "../../model/theme.js";
import { Banner } from "../../model/banner.js";
import { Category } from "../../model/category.js";
import { Activity } from "../../model/activity.js";
import { SpuPaging } from "../../model/spu-paging.js";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    themeE: null,
    themeF: null,
    themeESpu: null,
    bannerB: null,
    bannerG: null,
    themeH: null,
    grid: [],
    activityD: null,
    spuPaging: null,
    loadingType: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.initAllData();
    this.initBottomSpuList();
  },
  async initBottomSpuList() {
    const paging = await SpuPaging.getLatestPaging();
    this.data.spuPaging = paging;
    const data = await paging.getMoreData();
    if (!data) {
      return;
    }
    wx.lin.renderWaterFlow(data.items);
  },
  async initAllData() {
    const theme = new Theme();
    await theme.getThemes();
    const themeA = theme.getHomeLocationA();
    const themeE = theme.getHomeLocationE();
    let themeESpu;
    if (themeE.online) {
      const data = await Theme.getHomeLocationESpu();
      if (data) {
        themeESpu = data.spu_list.slice(0, 8);
      }
    }
    const themeF = theme.getHomeLocationF();
    const bannerB = await Banner.getHomeLocationB();
    const bannerG = await Banner.getHomeLocationG();
    const themeH = theme.getHomeLocationH();
    const grid = await Category.getHomeLocationC();
    const activityD = await Activity.getHomeLocationD();
    this.setData({
      themeA,
      bannerB,
      themeE,
      themeF,
      themeESpu,
      bannerG,
      themeH,
      grid,
      activityD
    });
  },
  onReachBottom: async function() {
    console.log("reach bottom");
    const data = await this.data.spuPaging.getMoreData();
    if (!data) {
      return;
    }
    wx.lin.renderWaterFlow(data.items);
    if (!data.moreData) {
      this.setData({
        loadingType: "end"
      });
    }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
