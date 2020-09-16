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
}
