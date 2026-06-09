<%*
try {
  const weather = await tp.user.weather();
  tR.append(`\n天气：${weather}`);
} catch(e) {
  tR.append(`\n天气：获取失败（${e.message}）`);
}
%>
