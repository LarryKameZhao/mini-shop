import { Http } from "../utils/http";
class Theme {
  static locationE = "t-2";
  static locationA = "t-1";
  static locationF = "t-3";
  static locationH = "t-4";
  themes = [];
  async getThemes() {
    const names = `${Theme.locationA},${Theme.locationE},,${Theme.locationF},,${Theme.locationH}`;
    this.themes = await Http.request({
      url: "theme/by/names",
      method: "GET",
      data: {
        names
      }
    });
  }
  getHomeLocationA() {
    const themeA = this.themes.find(item => item.name === Theme.locationA);
    return themeA;
  }
  getHomeLocationE() {
    const themeE = this.themes.find(item => item.name === Theme.locationE);
    return themeE;
  }
  getHomeLocationF() {
    const themeF = this.themes.find(item => item.name === Theme.locationF);
    return themeF;
  }
  getHomeLocationH() {
    const themeH = this.themes.find(item => item.name === Theme.locationH);
    return themeH;
  }
  static getHomeLocationESpu() {
    return Theme.getThemeSpuByName(Theme.locationE);
  }
  static getThemeSpuByName(name) {
    return Http.request({
      url: `theme/name/${name}/with_spu`
    });
  }
}
export { Theme };
