setInterval(() => { // 每隔1秒执行一次函数
    let create_time = Math.round(new Date('2025-01-25 00:00:00').getTime() / 1000); // 设置建站时间
    let timestamp = Math.round((new Date().getTime()) / 1000); // 获取当前时间戳
    let second = timestamp - create_time; // 计算从建站到现在经过的秒数
    let time = new Array(0, 0, 0, 0, 0); // 初始化时间数组，用于存储年、天、时、分、秒
  
    var nol = function(h){ // 定义一个函数，用于在数字小于10时补零
      return h>9?h:'0'+h;
    }
  
    // 计算经过的时间
    if (second >= 365 * 24 * 3600) { // 如果超过1年
      time[0] = parseInt(second / (365 * 24 * 3600)); // 计算年数
      second %= 365 * 24 * 3600; // 取余数
    }
    if (second >= 24 * 3600) { // 如果超过1天
      time[1] = parseInt(second / (24 * 3600)); // 计算天数
      second %= 24 * 3600; // 取余数
    }
    if (second >= 3600) { // 如果超过1小时
      time[2] = nol(parseInt(second / 3600)); // 计算小时数，并补零
      second %= 3600; // 取余数
    }
    if (second >= 60) { // 如果超过1分钟
      time[3] = nol(parseInt(second / 60)); // 计算分钟数，并补零
      second %= 60; // 取余数
    }
    if (second > 0) { // 如果还有秒数
      time[4] = nol(second); // 补零
    }
  
    // 根据时间判断显示内容
    if ((Number(time[2])<22) && (Number(time[2])>7)){ // 如果当前时间在7点到22点之间
      currentTimeHtml =`<img class='boardsign' src='https://img.shields.io/badge/dmw小屋-营业中-6adea8?style=social&logo=cakephp' title='欢迎光临~'>` +
        `<div id='runtime'>` + '本站已经运行' + time[0] + ' 年 ' + time[1] + ' 天 ' + time[2] + ' : ' + time[3] + ' : ' + time[4] + '了哟~' + '</div>';
    }
    else{ // 否则
      currentTimeHtml =`<img class='boardsign' src='https://img.shields.io/badge/dmw小屋-打烊了-6adea8?style=social&logo=coffeescript' title='这个点了应该去睡觉啦，熬夜对身体不好哦'>` +
        `<div id='runtime'>` + time[0] + ' YEAR ' + time[1] + ' DAYS ' + time[2] + ' : ' + time[3] + ' : ' + time[4] + '</div>';
    }
  
    // 将生成的HTML内容插入到页面中
    document.getElementById("workboard").innerHTML = currentTimeHtml;
  }, 1000);