# Markdown Aura <!-- omit in toc -->

> **Fork of [Markdown All in One](https://github.com/yzhang-gh/vscode-markdown) by [@yzhang-gh](https://github.com/yzhang-gh)**
> — all original features preserved, plus semantic task state decorations.

[![GitHub stars](https://img.shields.io/github/stars/pasta0126/markdown-aura.svg?style=flat-square&label=github%20stars)](https://github.com/pasta0126/markdown-aura)

Everything you need to write Markdown (keyboard shortcuts, table of contents, auto preview and more), now with visual semantic layers for task lists inspired by Bullet Journal and Kanban workflows.

***Note***: VS Code has basic Markdown support out-of-the-box (e.g. **Markdown preview**), please see the [official documentation](https://code.visualstudio.com/docs/languages/markdown) for more information.

**Table of Contents**

- [What's new in Markdown Aura](#whats-new-in-markdown-aura)
  - [Semantic task decorations](#semantic-task-decorations)
  - [Extended list editing](#extended-list-editing)
- [Features](#features)
  - [Keyboard shortcuts](#keyboard-shortcuts)
  - [Table of contents](#table-of-contents)
  - [List editing](#list-editing)
  - [Print Markdown to HTML](#print-markdown-to-html)
  - [GitHub Flavored Markdown](#github-flavored-markdown)
  - [Math](#math)
  - [Auto completions](#auto-completions)
  - [Others](#others)
- [Available Commands](#available-commands)
- [Keyboard Shortcuts](#keyboard-shortcuts-1)
- [Supported Settings](#supported-settings)
- [FAQ](#faq)
    - [Q: Error "command 'markdown.extension.onXXXKey' not found"](#q-error-command-markdownextensiononxxxkey-not-found)
    - [Q: Which Markdown syntax is supported?](#q-which-markdown-syntax-is-supported)
    - [Q: This extension has overridden some of my key bindings (e.g. Ctrl + B, Alt + C)](#q-this-extension-has-overridden-some-of-my-key-bindings-eg-ctrl--b-alt--c)
    - [Q: The extension is unresponsive, causing lag etc. (performance issues)](#q-the-extension-is-unresponsive-causing-lag-etc-performance-issues)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [Upstream project](#upstream-project)

---

## What's new in Markdown Aura

### Semantic task decorations

Markdown Aura extends the standard GFM task list (`[ ]` / `[x]`) with **9 semantic states**, each rendered with a distinct visual style directly in the editor — no file modification, purely visual overlays.

| Marker | State | Visual |
|--------|-------|--------|
| `- [ ]` | Todo | Soft blue-grey, slightly muted |
| `- [x]` | Done | Green, strikethrough, reduced opacity |
| `- [~]` | In progress | Light blue, italic |
| `- [-]` | Cancelled | Grey, strikethrough, italic, low opacity |
| `- [!]` | Important | Yellow, bold, left border accent |
| `- [?]` | Blocked | Orange-warm tint |
| `- [*]` | Priority | Red, bold, overview ruler marker |
| `- [>]` | Migrated | Muted blue, italic |
| `- [<]` | Backlog | Grey, italic, low opacity |

Decorations apply to both **unordered** (`-`, `+`, `*`) and **ordered** (`1.`, `2)`, …) list items.

> **Note:** These markers are non-standard Markdown. They will render as plain text in most Markdown previewers. They are designed for personal task management inside the editor.

Toggle all semantic decorations at once via:

```json
"markdown.extension.theming.decoration.renderSemanticTasks": true
```

### Extended list editing

The smart list editing engine (Enter / Tab / Backspace / auto-renumber) now fully understands all 9 semantic states:

- **Enter** on `- [~] item` → continues with `- [~] ` (preserves state)
- **Enter** on empty `- [!] ` → removes/outdents the item (same as `[ ]`/`[x]`)
- **Backspace** on `- [*] ` → removes the checkbox token
- **Tab / Shift+Tab** → indentation works correctly with any state
- **Auto-renumber** → ordered list renumbering ignores marker content as expected

---

## Features

### Keyboard shortcuts

<p><img src="https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/toggle-bold.gif" alt="toggle bold gif" width="282px">
<br>(Typo: multiple words)</p>

<p><img src="https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/check-task-list.gif" alt="check task list" width="240px"></p>

See full key binding list in the [keyboard shortcuts](#keyboard-shortcuts-1) section

### Table of contents

<p><img src="https://github.com/yzhang-gh/vscode-markdown/raw/master/images/toc.png" alt="toc" width="305px"></p>

- Run command "**Create Table of Contents**" (in the [VS Code Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette)) to insert a new table of contents.

- The TOC is **automatically updated** on file save by default. To disable, please change the `toc.updateOnSave` option.

- The **indentation type (tab or spaces)** of TOC can be configured per file. Find the setting in the right bottom corner of VS Code's status bar.

  ***Note***: Be sure to also check the `list.indentationSize` option.

- To make TOC **compatible with GitHub or GitLab**, set option `slugifyMode` accordingly

- Three ways to **control which headings are present** in the TOC:

  <details>
  <summary>Click to expand</summary>

  1. Add `<!-- omit from toc -->` at the end of a heading to ignore it in TOC\
    (It can also be placed above a heading)

  2. Use `toc.levels` setting.

  3. You can also use the `toc.omittedFromToc` setting to omit some headings (and their subheadings) from TOC:

     ```js
     // In your settings.json
     "markdown.extension.toc.omittedFromToc": {
       // Use a path relative to your workspace.
       "README.md": [
           "# Introduction",
           "## Also omitted",
       ],
       // Or an absolute path for standalone files.
       "/home/foo/Documents/todo-list.md": [
         "## Shame list (I'll never do these)",
       ]
     }
     ```

     ***Note***:

     - Setext headings (underlined with `===` or `---`) can also be omitted, just put their `# ` and `## ` versions in the setting, respectively.
     - When omitting heading, **make sure headings within a document are unique**. Duplicate headings may lead to unpredictable behavior.

  </details>

- Easily add/update/remove **section numbering**

  <img src="https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/section-numbers.gif" alt="section numbers" width="768px">

- *In case you are seeing **unexpected TOC recognition**, you can add a `<!-- no toc -->` comment above the list*.

### List editing

<p><img src="https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/on-enter-key.gif" alt="on enter key" width="214px"></p>

<p><img src="https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/tab-backspace.gif" alt="on tab/backspace key" width="214px"></p>

<p><img src="https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/fix-marker.gif" alt="fix ordered list markers" width="214px"></p>

***Note***: By default, this extension tries to determine indentation size for different lists according to [CommonMark Spec](https://spec.commonmark.org/0.29/#list-items). If you prefer to use a fixed tab size, please change the `list.indentationSize` setting.

### Print Markdown to HTML

- Commands `Markdown: Print current document to HTML`
  and `Markdown: Print documents to HTML` (batch mode)

- **Compatible** with other installed Markdown plugins (e.g. [Markdown Footnotes](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-footnotes)).
  The exported HTML should look the same as inside VS Code (except for a few theme colors due to the limitations of APIs).

- Use comment `<!-- title: Your Title -->` (in the first line) to specify a title of the exported HTML.

- Plain links to `.md` files will be converted to `.html`.

- It's recommended to print the exported HTML to PDF with browser (e.g. Chrome) if you want to share your documents with others.

### GitHub Flavored Markdown

- Table formatter

  <p><img src="https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/table-formatter.gif" alt="table formatter" width="246px"></p>

  ***Note***: The key binding is <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd> on Linux. See [Visual Studio Code Key Bindings](https://code.visualstudio.com/docs/getstarted/keybindings#_keyboard-shortcuts-reference).

- Task lists (standard `[ ]` / `[x]` plus the 9 semantic states described above)

### Math

<p><img src="https://github.com/yzhang-gh/vscode-markdown/raw/master/images/math.png" alt="math" width="544px"></p>

Please use [Markdown+Math](https://marketplace.visualstudio.com/items?itemName=goessner.mdmath) for dedicated math support. Be sure to disable `math.enabled` option of this extension.

### Auto completions

Tip: also support the option `completion.root`

- Images/Files (respects option `search.exclude`)

  <p><img src="https://github.com/yzhang-gh/vscode-markdown/raw/master/images/image-completions.png" alt="image completions" width="351px"></p>

- Math functions (including option `katex.macros`)

  <p><img src="https://github.com/yzhang-gh/vscode-markdown/raw/master/images/math-completions.png" alt="math completions" width="154px"></p>

- Reference links

  <p><img src="https://github.com/yzhang-gh/vscode-markdown/raw/master/images/reference-link.png" alt="reference links" width="301px"></p>

### Others

- Paste link on selected text

  <p><img src="https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/paste-link.gif" alt="paste link" width="342px"></p>

- Add "Close Preview" keybinding, which allows you to close the preview tab using the same keybinding of "Open Preview" (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd> or <kbd>Ctrl</kbd> + <kbd>K</kbd> <kbd>V</kbd>).

## Available Commands

- Markdown All in One: Create Table of Contents
- Markdown All in One: Update Table of Contents
- Markdown All in One: Add/Update section numbers
- Markdown All in One: Remove section numbers
- Markdown All in One: Toggle code span
- Markdown All in One: Toggle code block
- Markdown All in One: Print current document to HTML
- Markdown All in One: Print documents to HTML
- Markdown All in One: Toggle math environment
- Markdown All in One: Toggle list
  - It will cycle through list markers (by default `-`, `*`, `+`, `1.` and `1)`, which can be changed with option `list.toggle.candidate-markers`).

## Keyboard Shortcuts

<details>
<summary>Table</summary>

| Key                                                              | Command                          |
| ---------------------------------------------------------------- | -------------------------------- |
| <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>B</kbd>                    | Toggle bold                      |
| <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>I</kbd>                    | Toggle italic                    |
| <kbd>Alt</kbd>+<kbd>S</kbd> (on Windows)                         | Toggle strikethrough<sup>1</sup> |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>]</kbd>                | Toggle heading (uplevel)         |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>[</kbd>                | Toggle heading (downlevel)       |
| <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>M</kbd>                    | Toggle math environment          |
| <kbd>Alt</kbd> + <kbd>C</kbd>                                    | Check/Uncheck task list item     |
| <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd> | Toggle preview                   |
| <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> <kbd>V</kbd>       | Toggle preview to side           |

<sup>1. If the cursor is on a list/task item without selection, strikethrough will be added to the whole item (line)</sup>

</details>

## Supported Settings

<details>
<summary>Table</summary>

| Name                                                                   | Default    | Description                                                                                      |
| ---------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------ |
| `markdown.extension.completion.respectVscodeSearchExclude`             | `true`     | Whether to consider `search.exclude` option when providing file path completions                 |
| `markdown.extension.completion.root`                                   |            | Root folder when providing file path completions (It takes effect when the path starts with `/`) |
| `markdown.extension.italic.indicator`                                  | `*`        | Use `*` or `_` to wrap italic text                                                               |
| `markdown.extension.bold.indicator`                                    | `**`       | Use `**` or `__` to wrap bold text                                                               |
| `markdown.extension.katex.macros`                                      | `{}`       | KaTeX macros e.g. `{ "\\name": "expansion", ... }`                                               |
| `markdown.extension.list.indentationSize`                              | `adaptive` | Use different indentation size for ordered and unordered list                                    |
| `markdown.extension.list.toggle.candidate-markers`                     | `[ "-", "*", "+", "1.", "1)" ]`  | Markers to cycle through with Toggle List                             |
| `markdown.extension.orderedList.autoRenumber`                          | `true`     | Auto fix list markers as you edits                                                               |
| `markdown.extension.orderedList.marker`                                | `ordered`  | Or `one`: always use `1.` as ordered list marker                                                 |
| `markdown.extension.preview.autoShowPreviewToSide`                     | `false`    | Automatically show preview when opening a Markdown file                                          |
| `markdown.extension.print.absoluteImgPath`                             | `true`     | Convert image path to absolute path                                                              |
| `markdown.extension.print.imgToBase64`                                 | `false`    | Convert images to base64 when printing to HTML                                                   |
| `markdown.extension.print.includeVscodeStylesheets`                    | `true`     | Whether to include VS Code's default styles                                                      |
| `markdown.extension.print.onFileSave`                                  | `false`    | Print to HTML on file save                                                                       |
| `markdown.extension.print.theme`                                       | `light`    | Theme of the exported HTML                                                                       |
| `markdown.extension.print.validateUrls`                                | `true`     | Enable/disable URL validation when printing                                                      |
| `markdown.extension.syntax.decorations`                                | `true`     | Add decorations to ~~strikethrough~~ and `code span`                                             |
| `markdown.extension.syntax.decorationFileSizeLimit`                    | 50000      | Don't render syntax decorations if a file is larger than this size (in byte/B)                   |
| `markdown.extension.syntax.plainTheme`                                 | `false`    | A distraction-free theme                                                                         |
| `markdown.extension.tableFormatter.enabled`                            | `true`     | Enable GFM table formatter                                                                       |
| `markdown.extension.theming.decoration.renderSemanticTasks`            | `true`     | **(Aura)** Render semantic decorations for task items (`[ ]`, `[x]`, `[~]`, `[-]`, `[!]`, `[?]`, `[*]`, `[>]`, `[<]`) |
| `markdown.extension.toc.slugifyMode`                                   | `github`   | Slugify mode for TOC link generation (`vscode`, `github`, `gitlab` or `gitea`)                   |
| `markdown.extension.toc.omittedFromToc`                                | `{}`       | Lists of headings to omit by project file (e.g. `{ "README.md": ["# Introduction"] }`)           |
| `markdown.extension.toc.levels`                                        | `1..6`     | Control the heading levels to show in the table of contents                                      |
| `markdown.extension.toc.orderedList`                                   | `false`    | Use ordered list in the table of contents                                                        |
| `markdown.extension.toc.plaintext`                                     | `false`    | Just plain text                                                                                  |
| `markdown.extension.toc.unorderedList.marker`                          | `-`        | Use `-`, `*` or `+` in the table of contents (for unordered list)                                |
| `markdown.extension.toc.updateOnSave`                                  | `true`     | Automatically update the table of contents on save                                               |

</details>

## FAQ

#### Q: Error "command 'markdown.extension.onXXXKey' not found"

- In most cases, it is because VS Code **needs a few seconds to load** this extension when you open a Markdown file *for the first time*. (You will see a message "Activating Extensions..." on the status bar.)

- If you still see this "command not found" error after waiting for a long time, please try to **restart** VS Code. If needed, **reinstall** this extension:

  1. Uninstall this extension.
  2. **Close and restart VS Code. (important!)**
  3. Reinstall this extension.

- If it doesn't help, feel free to open a new issue on [GitHub](https://github.com/pasta0126/markdown-aura/issues/new).

- (As a last resort, you may choose to delete `onXXXKey` keys through [VS Code's Keyboard Shortcuts editor](https://code.visualstudio.com/docs/getstarted/keybindings) if you do not need the [list editing feature](#list-editing) at all.)

#### Q: Which Markdown syntax is supported?

- [CommonMark](https://spec.commonmark.org/)
- [Tables](https://help.github.com/articles/organizing-information-with-tables/), [strikethrough](https://help.github.com/articles/basic-writing-and-formatting-syntax/#styling-text) and [task lists](https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax#task-lists) (from GitHub Flavored Markdown)
- [Math support](https://github.com/waylonflinn/markdown-it-katex#syntax) (from KaTeX)
- [Front matter](https://github.com/ParkSB/markdown-it-front-matter#valid-front-matter)

For other Markdown syntax, you need to install the corresponding extensions from VS Code marketplace (e.g. [Mermaid diagram](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid), [emoji](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-emoji), [footnotes](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-footnotes) and [superscript](https://marketplace.visualstudio.com/items?itemName=DevHawk.markdown-sup)). Once installed, they will take effect in VS Code and also the exported HTML file.

#### Q: This extension has overridden some of my key bindings (e.g. <kbd>Ctrl</kbd> + <kbd>B</kbd>, <kbd>Alt</kbd> + <kbd>C</kbd>)

You can easily manage key bindings with [VS Code's **Keyboard Shortcuts** editor](https://code.visualstudio.com/docs/getstarted/keybindings). (Commands provided by this extension have prefix `markdown.extension`.)

#### Q: The extension is unresponsive, causing lag etc. (performance issues)

From experience, there is *a good chance* that the performance issues are caused by *other extensions* (e.g., some spell checker extensions).

This can be verified if you try again with all other extensions disabled (execute `Developer: Reload with Extensions Disabled` or `Extensions: Disable All Installed Extensions for this Workspace` in the VS Code command Palette) and then enable this extension.

## Changelog

See [CHANGELOG](CHANGELOG.md) for more information.

## Contributing

- File bugs or feature requests in [GitHub Issues](https://github.com/pasta0126/markdown-aura/issues).
- Changes specific to Markdown Aura (semantic decorations, list editing extensions) live in:
  - `src/theming/constant.ts` — decoration styles
  - `src/theming/decorationWorkerRegistry.ts` — pattern matching workers
  - `src/listEditing.ts` — list editing regex (search for `[ x~\-!?*><]`)

## Upstream project

This extension is a fork of **[Markdown All in One](https://github.com/yzhang-gh/vscode-markdown)** by [@yzhang-gh](https://github.com/yzhang-gh) and contributors, published under the MIT license. All original features, keyboard shortcuts, and settings are preserved. Upstream changes are periodically merged via `git rebase upstream/master`.
