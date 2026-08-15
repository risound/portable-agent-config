# HTML Output Mode — Rendering Reference

Read this only when the `html` flag is present. Generates inline-styled HTML optimized for copy-paste into Google Docs: table borders, content boxes, heading hierarchy, and quote formatting survive the paste. The markdown preview is still always generated first; HTML is an additional artifact.

### 6b: HTML Generation

**Generated when the `html` flag is present in arguments.**

For each tab, generate a self-contained HTML file optimized for copy-paste into Google Docs. The key principle: **all content styling must use inline `style=""` attributes** because Google Docs ignores CSS classes and external stylesheets on paste.

#### HTML Document Structure

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>[Project Name] - [Tab Name]</title>
  <style>
    /* Browser-only styles: these do NOT paste into GDocs (intentional) */
    body { max-width: 816px; margin: 40px auto; padding: 0 20px; background: #fff; }
    .section-divider { border-top: 2px dashed #ddd; margin: 28px 0 12px 0; }
    .section-label {
      font-family: Arial, sans-serif; font-size: 9pt; color: #aaa;
      text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;
    }
    .paste-hint {
      font-family: Arial, sans-serif; font-size: 8.5pt; color: #bbb;
      font-style: italic; margin-bottom: 12px;
    }
  </style>
</head>
<body>

  <div class="paste-hint">Select content below each section label and paste into the corresponding GDoc section (Cmd+V)</div>

  <!-- Sections with inline-styled content follow -->

</body>
</html>
```

**Width:** 816px matches Google Docs' default page width (8.5" at 96dpi minus margins).

**Section navigation:** Each section is preceded by a CSS-class-only `.section-divider` and `.section-label`. These do NOT paste into GDocs because they use CSS classes, not inline styles. They serve as browser-only navigation aids so the user can identify which content to copy for each GDoc section.

#### HTML Element Rendering Reference

Use these exact inline-style patterns when generating HTML content. Every element that should transfer to GDocs must have inline styles.

##### Headings

```html
<!-- Tab title / Document heading -->
<h1 style="font-family: Arial, sans-serif; font-size: 20pt; font-weight: bold; color: #000; margin: 0 0 4px 0;">Tab Title</h1>

<!-- Major section heading -->
<h2 style="font-family: Arial, sans-serif; font-size: 16pt; font-weight: bold; color: #000; margin: 20px 0 8px 0;">Section Name</h2>

<!-- Sub-section heading -->
<h3 style="font-family: Arial, sans-serif; font-size: 13pt; font-weight: bold; color: #000; margin: 16px 0 6px 0;">Sub-section Name</h3>

<!-- Body text -->
<p style="font-family: Arial, sans-serif; font-size: 11pt; color: #000; line-height: 1.5; margin: 6px 0;">Paragraph text with <b>bold</b> and <i>italic</i>.</p>

<!-- Instructional/placeholder text -->
<p style="font-family: Arial, sans-serif; font-size: 11pt; color: #666; font-style: italic; margin: 4px 0;">Instructional guidance text</p>
```

##### CONTENT BOX (1x1 bordered table)

Used for: Background, Assumptions, Methodology, Related Requests, Success Criteria, Notes

```html
<table style="border: 1px solid #000000; border-collapse: collapse; width: 100%; margin: 8px 0;">
  <tr>
    <td style="border: 1px solid #000000; padding: 8px 12px; font-family: Arial, sans-serif; font-size: 11pt; color: #000; line-height: 1.5; vertical-align: top;">
      <!-- Content here: paragraphs, bullets, bold, etc. -->
      <p style="font-family: Arial, sans-serif; font-size: 11pt; margin: 0 0 6px 0;">First paragraph of content.</p>
      <ul style="font-family: Arial, sans-serif; font-size: 11pt; margin: 4px 0; padding-left: 20px;">
        <li style="margin: 2px 0;">Bullet point</li>
      </ul>
    </td>
  </tr>
</table>
```

##### DATA TABLE (multi-column with header row)

Used for: Stakeholders, Research Goals, Research Questions, Participant Criteria, Assets, Milestones, Observation Log, Agenda, Debrief, Topline, Insight comparisons

```html
<table style="border: 1px solid #000000; border-collapse: collapse; width: 100%; margin: 8px 0;">
  <tr>
    <td style="border: 1px solid #000000; padding: 6px 10px; background-color: #f3f3f3; font-family: Arial, sans-serif; font-size: 10pt; font-weight: bold; color: #000; vertical-align: top;">Header 1</td>
    <td style="border: 1px solid #000000; padding: 6px 10px; background-color: #f3f3f3; font-family: Arial, sans-serif; font-size: 10pt; font-weight: bold; color: #000; vertical-align: top;">Header 2</td>
  </tr>
  <tr>
    <td style="border: 1px solid #000000; padding: 6px 10px; font-family: Arial, sans-serif; font-size: 10pt; color: #000; vertical-align: top;">Cell data</td>
    <td style="border: 1px solid #000000; padding: 6px 10px; font-family: Arial, sans-serif; font-size: 10pt; color: #000; vertical-align: top;">Cell data</td>
  </tr>
</table>
```

**Note:** For DATA TABLEs without a traditional header row (like Research Goals where the first column IS the header), apply the `background-color: #f3f3f3` and `font-weight: bold` to the first column cells instead of the first row.

##### LAYOUT TABLE: Exec Summary Grid

The Exec Summary grid is a **4-column x 4-row** table with merged cells on the right side:
- **Columns 1-2** (left half): 4 separate rows, each with a bold label cell (col 1, ~12% width) and a content cell (col 2, ~38% width)
- **Columns 3-4** (right half): 2 merged regions using `rowspan="2"`:
  - Rows 1-2: "Key Takeaways" label (col 3) + Key Takeaways content (col 4)
  - Rows 3-4: "Next Steps" label (col 3) + Next Steps content (col 4)

```
| Col 1 (label)      | Col 2 (content)    | Col 3 (label)       | Col 4 (content)     |
|---------------------|--------------------|----------------------|---------------------|
| Business Context    | BC content         | Key Takeaways        | KT content          |
| Research Question   | RQ content         | (rowspan from above) | (rowspan from above)|
| Research Method     | RM content         | Next Steps           | NS content          |
| Dates               | Dates content      | (rowspan from above) | (rowspan from above)|
```

```html
<table style="border: 1px solid #000000; border-collapse: collapse; width: 100%; margin: 8px 0;">
  <!-- Row 1 -->
  <tr>
    <td style="border: 1px solid #000000; padding: 8px 12px; width: 12%; vertical-align: top; font-family: Arial, sans-serif; font-size: 10pt; font-weight: bold; color: #000;">Business Context</td>
    <td style="border: 1px solid #000000; padding: 8px 12px; width: 38%; vertical-align: top; font-family: Arial, sans-serif; font-size: 10pt; color: #000; line-height: 1.5;">Content...</td>
    <td rowspan="2" style="border: 1px solid #000000; padding: 8px 12px; width: 12%; vertical-align: top; font-family: Arial, sans-serif; font-size: 10pt; font-weight: bold; color: #000;">Key Takeaways</td>
    <td rowspan="2" style="border: 1px solid #000000; padding: 8px 12px; width: 38%; vertical-align: top; font-family: Arial, sans-serif; font-size: 10pt; color: #000; line-height: 1.5;">Content with bullets...</td>
  </tr>
  <!-- Row 2: cols 3-4 occupied by rowspan -->
  <tr>
    <td style="border: 1px solid #000000; padding: 8px 12px; vertical-align: top; font-family: Arial, sans-serif; font-size: 10pt; font-weight: bold; color: #000;">Research Question</td>
    <td style="border: 1px solid #000000; padding: 8px 12px; vertical-align: top; font-family: Arial, sans-serif; font-size: 10pt; color: #000; line-height: 1.5;">Content...</td>
  </tr>
  <!-- Row 3 -->
  <tr>
    <td style="border: 1px solid #000000; padding: 8px 12px; vertical-align: top; font-family: Arial, sans-serif; font-size: 10pt; font-weight: bold; color: #000;">Research Method</td>
    <td style="border: 1px solid #000000; padding: 8px 12px; vertical-align: top; font-family: Arial, sans-serif; font-size: 10pt; color: #000; line-height: 1.5;">Content...</td>
    <td rowspan="2" style="border: 1px solid #000000; padding: 8px 12px; vertical-align: top; font-family: Arial, sans-serif; font-size: 10pt; font-weight: bold; color: #000;">Next Steps</td>
    <td rowspan="2" style="border: 1px solid #000000; padding: 8px 12px; vertical-align: top; font-family: Arial, sans-serif; font-size: 10pt; color: #000; line-height: 1.5;">Content with bullets...</td>
  </tr>
  <!-- Row 4: cols 3-4 occupied by rowspan -->
  <tr>
    <td style="border: 1px solid #000000; padding: 8px 12px; vertical-align: top; font-family: Arial, sans-serif; font-size: 10pt; font-weight: bold; color: #000;">Dates</td>
    <td style="border: 1px solid #000000; padding: 8px 12px; vertical-align: top; font-family: Arial, sans-serif; font-size: 10pt; color: #000; line-height: 1.5;">Content...</td>
  </tr>
</table>
```

##### QUOTE BOX (scripts and long narrative blocks)

Used for: Discussion Guide Sections A-E, Warm-up, Wrap-up scripts

```html
<table style="border: 1px solid #cccccc; border-collapse: collapse; width: 100%; margin: 8px 0;">
  <tr>
    <td style="border: 1px solid #cccccc; padding: 10px 14px; background-color: #f9f9f9; font-family: Arial, sans-serif; font-size: 10.5pt; color: #333; line-height: 1.6; vertical-align: top;">
      <p style="font-family: Arial, sans-serif; font-size: 10.5pt; margin: 0 0 8px 0;"><b>Moderator Introduction</b></p>
      <p style="font-family: Arial, sans-serif; font-size: 10.5pt; margin: 0 0 8px 0;">Hello. My name is [Name] and I'm a researcher with LinkedIn...</p>
      <p style="font-family: Arial, sans-serif; font-size: 10.5pt; margin: 0 0 8px 0;"><b>Agenda</b></p>
      <p style="font-family: Arial, sans-serif; font-size: 10.5pt; margin: 0;">Today we'll be talking about...</p>
    </td>
  </tr>
</table>
```

##### PROSE (insight evidence blocks, next steps)

Used for: Findings insight blocks, Next Steps, body text intro. These are NOT tables.

```html
<h3 style="font-family: Arial, sans-serif; font-size: 13pt; font-weight: bold; color: #000; margin: 16px 0 6px 0;">Insight 1: Title Here</h3>

<p style="font-family: Arial, sans-serif; font-size: 11pt; color: #000; line-height: 1.5; margin: 6px 0;">
  Opening paragraph establishing the finding with key data points.
</p>

<ul style="font-family: Arial, sans-serif; font-size: 11pt; color: #000; margin: 6px 0; padding-left: 24px;">
  <li style="margin: 3px 0;">Evidence point with specific participant count (X/N)</li>
  <li style="margin: 3px 0;">Behavioral observation with context
    <ul style="margin: 2px 0; padding-left: 20px;">
      <li style="margin: 2px 0;">Sub-detail or nuance</li>
    </ul>
  </li>
</ul>

<!-- Participant quote as blockquote -->
<blockquote style="margin: 10px 0 10px 20px; padding: 8px 14px; border-left: 3px solid #cccccc; font-family: Arial, sans-serif; font-size: 10.5pt; font-style: italic; color: #444;">
  "Participant quote preserved verbatim." -- P02 ~14:30
</blockquote>

<p style="font-family: Arial, sans-serif; font-size: 11pt; color: #000; line-height: 1.5; margin: 10px 0 6px 0;">
  <b>Recommendation:</b> We recommend [action] because [rationale].
</p>
```

##### Participant Quotes (inline within any section)

Individual quotes always get their own blockquote. Never concatenate multiple quotes with different attributions.

```html
<blockquote style="margin: 10px 0 10px 20px; padding: 8px 14px; border-left: 3px solid #cccccc; font-family: Arial, sans-serif; font-size: 10.5pt; font-style: italic; color: #444;">
  "Quote text here." -- Attribution [Participant ID ~timestamp]
</blockquote>
```

##### Bullet Lists

```html
<ul style="font-family: Arial, sans-serif; font-size: 11pt; color: #000; margin: 6px 0; padding-left: 24px;">
  <li style="margin: 3px 0;">First item</li>
  <li style="margin: 3px 0;">Second item
    <ul style="margin: 2px 0; padding-left: 20px;">
      <li style="margin: 2px 0;">Nested item</li>
    </ul>
  </li>
</ul>
```

##### Links

```html
<a href="https://example.com" style="color: #1a73e8; text-decoration: underline;">Link text</a>
```

#### HTML Section Layout Per Tab

Each tab's HTML file should contain sections in this order, with `.section-divider` and `.section-label` between each:

**Exec Summary (`exec.html`):**
1. Tab header (title + date)
2. Project Name
3. Headline
4. Exec Summary grid (LAYOUT TABLE)
5. Links to findings/presentation

**UXR Brief (`brief.html`):**
1. Tab header (title + date)
2. Project Name
3. Researcher/Stakeholders (DATA TABLE)
4. Research Goals (DATA TABLE)
5. Background (CONTENT BOX)
6. Assumptions/hypotheses (CONTENT BOX)
7. Related requests (CONTENT BOX)
8. Methodology (CONTENT BOX)
9. Research Questions (DATA TABLE)
10. Participant Criteria (DATA TABLE)
11. Success Criteria (CONTENT BOX)
12. Assets (DATA TABLE)

**Discussion Guide (`guide.html`):**
1. Tab header (title + date)
2. Research goals/objectives (DATA TABLE)
3. Background (CONTENT BOX)
4. Metrics (CONTENT BOX)
5. Assumptions (CONTENT BOX)
6. Agenda (DATA TABLE)
7. Section A: Intro & Permissions (QUOTE BOX)
8. Section B: Warm-up (QUOTE BOX)
9. Section C: Topic 1 (QUOTE BOX)
10. Section D: Topic 2 (QUOTE BOX)
11. Section E: Wrap Up (QUOTE BOX)

**Timeline (`timeline.html`):**
1. Tab header (title + date)
2. Project Name
3. Needed by date
4. Milestones (DATA TABLE)
5. Project Plan (simplified milestone list or table)

**Observer Guide (`observer.html`):**
1. Tab header (title + date)
2. Project Name
3. Links (DATA TABLE)
4. Observation Log (DATA TABLE)

**UXR Debrief (`debrief.html`):**
1. Tab header (title + date)
2. Project Name
3. Day 1 description + Observations/Implications (DATA TABLE)
4. Day 2+ (repeat pattern)
5. Notes (CONTENT BOX)

**Topline Report (`topline.html`):**
1. Tab header (title + date)
2. Project Name
3. Takeaway table (DATA TABLE)
4. Supporting quotes (blockquotes under each takeaway)
5. Notes (CONTENT BOX)

**UXR Findings (`findings.html`):**
1. Tab header (title + date)
2. Project Name
3. "Insights & Recommendations" heading
4. Body text intro (PROSE)
5. Insight 1 (PROSE with optional DATA TABLEs for comparisons)
6. Insight 2+ (repeat pattern)
7. Next Steps (PROSE)

#### HTML File Output

Save HTML files to the project's `deliverables/` folder:
- Single-tab mode: `deliverables/{keyword}.html`
- All-tabs (`project`) mode: 8 files -- `deliverables/exec.html`, `deliverables/brief.html`, `deliverables/guide.html`, `deliverables/timeline.html`, `deliverables/observer.html`, `deliverables/debrief.html`, `deliverables/topline.html`, `deliverables/findings.html`
- Postcard: `deliverables/postcard.html`

After writing HTML file(s), open the first file in the browser:
```bash
open deliverables/{keyword}.html
```

## Step 7: Quality Check

Before writing files, verify against this checklist:

### Content Quality
- [ ] Every claim has supporting evidence (data, quote, or observation)
- [ ] Quantitative precision maintained (no vague "many" without numbers)
- [ ] Member voice preserved through direct quotes with attribution
- [ ] Collaborative framing used ("we recommend" not "you should")
- [ ] Template structure matched exactly (all required sections present)
- [ ] Appropriate tone applied for document type
- [ ] No fabricated quotes, data, or participant references
- [ ] Bracketed placeholders used for genuinely missing optional content

### HTML Quality (when html flag is present)
- [ ] All content elements use inline `style=""` attributes (no CSS classes on pasteable content)
- [ ] Navigation elements (.section-divider, .section-label) use CSS classes ONLY (will not paste)
- [ ] Tables use `border-collapse: collapse` and explicit `border` on both `<table>` and `<td>`
- [ ] Font is Arial throughout; sizes match heading hierarchy (20pt/16pt/13pt/11pt/10pt)
- [ ] CONTENT BOXes rendered as 1x1 `<table>` with black border
- [ ] QUOTE BOXes rendered as 1x1 `<table>` with gray border and #f9f9f9 background
- [ ] DATA TABLEs have header row/column styling (bold, #f3f3f3 background)
- [ ] LAYOUT TABLEs rendered as actual multi-cell tables (not converted to paragraphs)
- [ ] PROSE sections use `<h3>`, `<p>`, `<ul>`, `<blockquote>` -- NOT tables
- [ ] Each participant quote has its own `<blockquote>` with separate attribution
- [ ] HTML file is valid and self-contained (has `<!DOCTYPE>`, `<head>`, `<body>`)

### Markdown Quality
- [ ] Only DATA TABLEs appear as markdown tables
- [ ] No formatting annotations, HTML comments, or placeholder markers
- [ ] Insight evidence blocks use nested sections with inline blockquotes for quotes
