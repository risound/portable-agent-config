---
doc_type: skeleton
plan: "[[<YYYY-MM-DD> - plan]]"
---

# Skeleton: <Company>, <YYYY-MM-DD>

Slide headers are parsed by the gates and must follow `### S<nn> · <title> · <seconds>s · asks: <ask ids> · case: <case-id>`. Front matter slides omit `asks` and `case`. Lines starting `On slide:` are the slide face and are linted; caution claims belong only on `Notes:` lines, with their caveat.

### S01 · Title · 10s
On slide: <name and role>
Notes: <delivery intent and timing>

### S02 · <title> · 60s · asks: <ask> · case: <case-id>
Beat: [[<case-id> beats#^b01]]
On slide: ![[<case-id> claims#^c01]]
Notes: <delivery intent, timing, warnings>
Transition: <none, dissolve, or push>
