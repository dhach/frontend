export class Utils {

  static simpleDeepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

}
