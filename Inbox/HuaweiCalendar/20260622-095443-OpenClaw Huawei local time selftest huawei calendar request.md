---
type: huawei-calendar-request
status: ready-for-phone-executor
summary: "OpenClaw Huawei local time selftest"
start: "2026-06-22 10:00:00 Asia/Shanghai"
end: "2026-06-22 10:30:00 Asia/Shanghai"
timezone: "Asia/Shanghai"
location: "Local test"
created: "2026-06-22T01:54:43.532Z"
confirmed: "false"
executor: "xiaoyi-harmonyos-calendar-executor"
participants:
---

# OpenClaw Huawei local time selftest

This file is a phone-side Huawei Calendar action request. It has not been executed by the PC local proxy.

```json
{
  "schema": "openclaw.huawei.calendar.create.v1",
  "requestId": "selftest_huawei_localtime_20260622",
  "action": "calendar.event.create",
  "provider": "huawei-calendar",
  "executor": "xiaoyi-harmonyos-calendar-executor",
  "timezone": "Asia/Shanghai",
  "event": {
    "summary": "OpenClaw Huawei local time selftest",
    "description": "Local time field verification only; do not create on phone.",
    "location": "Local test",
    "participants": [],
    "allDay": false,
    "start": {
      "iso": "2026-06-22T02:00:00.000Z",
      "epochMs": 1782093600000,
      "local": "2026-06-22 10:00:00 Asia/Shanghai",
      "timezone": "Asia/Shanghai"
    },
    "end": {
      "iso": "2026-06-22T02:30:00.000Z",
      "epochMs": 1782095400000,
      "local": "2026-06-22 10:30:00 Asia/Shanghai",
      "timezone": "Asia/Shanghai"
    },
    "reminders": [
      {
        "minutesBefore": 10
      }
    ]
  },
  "source": {
    "channel": "codex-selftest",
    "message": "selftest"
  },
  "execution": {
    "requiredSide": "harmonyos-phone",
    "note": "Execute this payload only in a trusted phone-side app or tool that uses official Huawei/HarmonyOS calendar or reminder APIs."
  }
}
```
