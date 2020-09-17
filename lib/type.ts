export class Type {
  constructor() {
  }

  isJSON(str: string): boolean {
    let ret: boolean = true;

    try {
      JSON.parse(str);
    } catch (error) {
      ret = false;
    }

    return ret;
  }

  unescapeUnicode(data: any): any {
    function loopUnescape(child: any): any {
      let ret: any = null;

      switch(typeof child) {
        case 'object': {
          if (child != null) {
            ret = {};

            Object.entries(child).forEach(([key, value]) => {
              ret[key] = loopUnescape(value);
            });
          } else {
            ret = null;
          }

          break;
        }
        case 'string':
          ret = child.replace(/\u200B/g, '').trim();
          break;
        default:
          ret = child;
          break;
      }

      return ret;
    }

    return loopUnescape(data);
  }
}
