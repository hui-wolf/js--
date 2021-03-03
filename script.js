/**
 * 1. 基础功能：
    1.1 在 HTML/JavaScript/CSS 三个tab中编写代码实现「红绿灯」
    1.2 参数：初始化允许传入JSON Object，里面有三个参数：red、green、yellow，分别代表每种颜色的灯的持续时长，参考 Javascript tab 下的 duration 定义
    1.3 运行：运行start方法之后红绿灯之后就自动开始运行
  2. 绿灯的最后10s，会每间隔 1s 闪烁一次
  3. UI 带秒表倒计时计数(按照现实情况倒计时中显示的不要出现 0)
  4. 尽可能地保证走时的准确性
 */

const duration = {
  red: 27,
  green: 30,
  yellow: 3
};

class Traffic {
  constructor(duration, container) {
    this.duration = duration;
    this.container = container;
    this.countDown("red", this.duration.yellow);
  }

  light(timer) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, timer * 1000);
    });
  }

  countDown(color, nextTimer) {
    // 设置亮灯颜色
    this.container.className = color;

    // 倒计时
    let timer = this.duration[color];
    let timeContainer = document.getElementById("time");
    let t = setInterval(() => {
      timer--;

      // 绿灯闪烁
      if (color === "green" && timer <= 10) {
        this.container.className = this.container.className ? "" : color;
      }

      // 清空倒计时
      if (timer <= 0) {
        timer = nextTimer;
        clearInterval(t);
      }

      timeContainer.innerText = timer > 9 ? timer : `0${timer}`;
    }, 1000);
  }

  async start() {
    await this.light(this.duration.red);
    this.countDown("yellow", this.duration.green);
    await this.light(this.duration.yellow);
    this.countDown("green", this.duration.red);
    await this.light(this.duration.green);
    this.countDown("red", this.duration.yellow);
    this.start();
  }
}

let traffic = new Traffic(duration, document.getElementById("traffic-light"));
traffic.start();
