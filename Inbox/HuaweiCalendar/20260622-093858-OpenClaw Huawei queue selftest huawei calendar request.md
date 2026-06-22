---
type: huawei-calendar-request
status: ready-for-phone-executor
summary: "OpenClaw Huawei queue selftest"
start: "2026-06-22T02:00:00.000Z"
end: "2026-06-22T02:30:00.000Z"
timezone: "Asia/Shanghai"
location: "Local test"
created: "2026-06-22T01:38:58.793Z"
confirmed: "false"
executor: "xiaoyi-harmonyos-calendar-executor"
participants:
---

# OpenClaw Huawei queue selftest

This file is a phone-side Huawei Calendar action request. It has not been executed by the PC local proxy.

```json
{
  "schema": "openclaw.huawei.calendar.create.v1",
  "requestId": "selftest_huawei_queue_20260622",
  "action": "calendar.event.create",
  "provider": "huawei-calendar",
  "executor": "xiaoyi-harmonyos-calendar-executor",
  "timezone": "Asia/Shanghai",
  "event": {
    "summary": "OpenClaw Huawei queue selftest",
    "description": "Queue endpoint verification only; do not create on phone.",
    "location": "Local test",
    "participants": [],
    "allDay": false,
    "start": {
      "iso": "2026-06-22T02:00:00.000Z",
      "epochMs": 1782093600000,
      "timezone": "Asia/Shanghai"
    },
    "end": {
      "iso": "2026-06-22T02:30:00.000Z",
      "epochMs": 1782095400000,
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
