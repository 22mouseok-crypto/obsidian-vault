<%*
try {
  const weather = await tp.user.weather();
  tR.append(`天气：${weather}`);
} catch(e) {
  tR.append(`天气：获取失败（${e.message}）`);
}
%>

心情：
今日事项：

