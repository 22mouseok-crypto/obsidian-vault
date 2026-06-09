// Templater 脚本：获取天津天气数据
// 用法：在模板中调用 <%%await tp.user.weather()%%>

module.exports = async function() {
  try {
    // wttr.in 格式：%C（天气状况）+%t（体感温度）+%h（湿度）
    const res = await fetch('https://wttr.in/天津?format=j1');
    const data = await res.json();

    // 从 current_condition[0] 中提取信息
    const current = data.current_condition[0];
    const weatherDesc = current.lang_zh ? current.lang_zh[0]?.value : current.weatherDesc[0]?.value;
    const tempC = current.temp_C + '°C';
    const humidity = current.humidity + '%';

    return `${weatherDesc} ${tempC} 湿度${humidity}`;
  } catch (e) {
    return `天气获取失败（${e.message}）`;
  }
};
