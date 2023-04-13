/**
 * CommonService
 */
export default class CommonService {
  hello = () => {
    return new Promise(resolve => resolve('hello world'));
  };
}
