export default class Cell {
  constructor () {
    this.r = Math.floor(Math.random() * 255);
    this.g = Math.floor(Math.random() * 255);
    this.b = Math.floor(Math.random() * 255);
  }
  /**
   * スタイルオブジェクトの取得(背景色)
   * @return Object スタイルオブジェクト
   */
  getStyle () {
    return {
      'background-color': `rgb(${this.r},${this.g},${this.b})`
    };
  }

  /**
   * セルの色と引数の色との距離を計算する
   * @param  Number r red
   * @param  Number g green
   * @param  Number b blue
   * @return Number   色距離
   */
  caclColorDistance (r, g, b) {
    return Math.pow((this.r - r), 2) +
           Math.pow((this.g - g), 2) +
           Math.pow((this.b - b), 2);
  }

  /**
   * 現在のセルの色に指定色を混ぜる
   * @param  Number r     red
   * @param  Number g     green
   * @param  Number b     blue
   * @param  Number ratio 混色比率(0～1.0)
   * @return void
   */
  mixColor (r, g, b, ratio) {
    this.r = Math.floor(this.r * (1 - ratio) + r * ratio);
    this.g = Math.floor(this.g * (1 - ratio) + g * ratio);
    this.b = Math.floor(this.b * (1 - ratio) + b * ratio);
  }
}
