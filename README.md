# Markdown Aura

Fork of [Markdown All in One](https://github.com/yzhang-gh/vscode-markdown) with semantic task state decorations.

---

## Semantic task states

Nine visual states for task lists, rendered directly in the editor without modifying the file:

| Marker | State | Style |
|--------|-------|-------|
| `- [ ]` | Todo | Blue-grey, muted |
| `- [x]` | Done | Green, strikethrough |
| `- [~]` | In progress | Light blue, italic |
| `- [-]` | Cancelled | Grey, strikethrough, italic |
| `- [!]` | Important | Yellow, bold, left border |
| `- [?]` | Blocked | Orange tint |
| `- [*]` | Priority | Red, bold, ruler marker |
| `- [>]` | Migrated | Muted blue, italic |
| `- [<]` | Backlog | Grey, italic, low opacity |

Works on unordered (`-`, `+`, `*`) and ordered (`1.`, `2)`) lists.

> These markers are non-standard Markdown and won't render in most previewers — they are designed for in-editor task management.

**Toggle all decorations:**
```json
"markdown.extension.theming.decoration.renderSemanticTasks": true
```

---

## List editing

Smart Enter / Tab / Backspace fully supports all 9 states:

- `Enter` on `- [~] item` → continues with `- [~] ` (state preserved)
- `Enter` on empty `- [!] ` → removes the item
- `Backspace` on `- [*] ` → removes the checkbox
- `Tab` / `Shift+Tab` → indentation works with any state

---

## All original features

Everything from Markdown All in One is included unchanged:

- **Keyboard shortcuts** — bold, italic, strikethrough, headings, math
- **Table of contents** — auto-create, update on save, section numbering
- **Table formatter** — align GFM tables
- **Print to HTML** — single file or batch
- **Math** — KaTeX support
- **Auto completions** — image paths, math functions, reference links

### Key bindings

| Key | Command |
|-----|---------|
| `Ctrl/Cmd + B` | Toggle bold |
| `Ctrl/Cmd + I` | Toggle italic |
| `Alt + S` | Toggle strikethrough |
| `Ctrl/Cmd + Shift + ]` / `[` | Heading up / down |
| `Alt + C` | Check / uncheck task item |
| `Ctrl/Cmd + M` | Toggle math |
| `Ctrl/Cmd + Shift + V` | Toggle preview |

### Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `theming.decoration.renderSemanticTasks` | `true` | Semantic task decorations |
| `list.indentationSize` | `adaptive` | List indentation size |
| `orderedList.autoRenumber` | `true` | Auto-renumber ordered lists |
| `orderedList.marker` | `ordered` | `one` to always use `1.` |
| `toc.updateOnSave` | `true` | Update TOC on save |
| `toc.slugifyMode` | `github` | Slug mode for TOC links |
| `tableFormatter.enabled` | `true` | Format GFM tables |
| `print.theme` | `light` | HTML export theme |

All settings use the prefix `markdown.extension.*`. Full list in the [upstream docs](https://github.com/yzhang-gh/vscode-markdown).

---

## Install

```bash
code --install-extension markdown-aura-1.0.0.vsix
```

Or: Extensions panel → `⋯` → *Install from VSIX…*

> **Note:** Uninstall `yzhang.markdown-all-in-one` first if you have it — they share the same command namespace.
