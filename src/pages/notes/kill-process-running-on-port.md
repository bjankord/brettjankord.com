---
layout: '$/layouts/NotesPost.astro'
title: 'How to kill a process running on a specific port'
description: "If you have a process/server running on a specific port and it has become unresponsive, run the following command..."
pubDate: '2022-08-15'
tags:
- CLI
---

If you have a process/server running on a specific port and it has become unresponsive, run the following command to get the `PID` of the process (assuming the server is running on port 3000):

```
lsof -wni tcp:3000
```

Then run the following command, replacing `PID` with the `PID` of the process from the previous command.

```
kill -9 PID
```

Alternatively, you can run `npx kill-port 3000` to kill unresponsive servers.
