import { Paging } from "../utils/paging";
import { Http } from "../utils/http";
class Search {
  static search(q) {
    return new Paging({
      url: `search?q=${q}`
    });
  }
}
export { Search };
