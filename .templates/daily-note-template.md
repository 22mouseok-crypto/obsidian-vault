{{date:dddd}} {{date:YYYY-MM-DD}} {{date:DDDD}}
天气：{{t=await fetch('https://wttr.in/天津?format=%C+%t+%h').then(r=>r.text()); t.split('\n')[0].trim()}}
心情：
今日事项：

