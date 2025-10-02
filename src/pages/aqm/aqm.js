import router from '@system.router';
import app from '@system.app';

export default {
  private: {
    isFirstClick: false,
    firstClickTime: 0,
    doubleClickThreshold: 7000,
    topAreaHeight: 100,
    clickCount: 0,
    requiredClicks: 10
  },

  handleClick(eve) {
    const isInTopArea = eve.clientY <= this.topAreaHeight;
    if (!isInTopArea) {
      this.clickCount = 0;
      this.isFirstClick = false;
      return;
    }

    const currentTime = Date.now();

    if (this.isFirstClick && (currentTime - this.firstClickTime <= this.doubleClickThreshold)) {
      this.clickCount++;
    } else {
      this.clickCount = 1;
      this.isFirstClick = true;
      this.firstClickTime = currentTime;
    }

    if (this.clickCount >= this.requiredClicks) {
      router.push({
        uri: '/pages/index',
        params: {
          ___PARAM_LAUNCH_FLAG___: 'clearTask'
        }
      });
      this.clickCount = 0;
      this.isFirstClick = false;
    }

    setTimeout(() => {
      this.clickCount = 0;
      this.isFirstClick = false;
    }, this.doubleClickThreshold);
  },

  handleSwipe(eve) {
    if (eve.direction === 'right') {
      app.terminate();
    }
  }
}