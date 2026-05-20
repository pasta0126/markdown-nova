# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`markdown-all-in-one` is a VS Code extension (publisher: `yzhang`) that adds keyboard shortcuts, TOC generation, list editing, table formatting, completions, and print-to-HTML for Markdown files. It also supports RMarkdown (`rmd`) and Quarto (`quarto`) language IDs.

## Commands

```bash
# Full production build (wasm + webpack)
npm run build

# Development webpack build (no minification)
npm run dev-build

# Watch TypeScript compilation (no webpack, outputs to out/)
npm run dev-compile

# Run all tests (compiles first, then launches VS Code via @vscode/test-electron)
npm test
```

> **Note:** `npm test` downloads and launches a real VS Code instance. It requires a display / GUI environment. There is no headless/unit-only test command built in; unit tests live under `src/test/suite/unit/` and integration tests under `src/test/suite/integration/`, but both run through the same `npm test` pipeline.

## Architecture

### Extension entry point

`src/extension.ts` exports `activate()` and `deactivate()`. On activation it:
1. Configures the NLS (i18n) module.
2. Asynchronously imports the Zola WASM slug module, then calls `activateMdExt()`.
3. Returns `{ extendMarkdownIt }` so other extensions can inject markdown-it plugins.

`activateMdExt()` calls `activate(context)` on each feature module — this is the uniform pattern for registering commands, event listeners, and disposables.

### Feature modules (`src/`)

| File | Responsibility |
|------|---------------|
| `listEditing.ts` | Overrides Enter, Tab, Shift+Tab, Backspace for smart list continuation and indentation |
| `formatting.ts` | Toggle bold, italic, strikethrough, heading level shortcuts |
| `toc.ts` | Create/update TOC, section numbering, CodeLens, auto-update on save |
| `completion.ts` | Image path and math command completions |
| `print.ts` | Export current or batch Markdown files to HTML |
| `tableFormatter.ts` | Align and format GFM tables on save or command |
| `preview.ts` | Auto-show preview to the side |
| `syntaxDecorations.ts` | Editor decorations (code spans, trailing spaces, etc.) |
| `markdownEngine.ts` | Two singleton markdown-it instances: `commonMarkEngine` (strict CommonMark, used for slugify/TOC) and `mdEngine` (with plugins, used for print/preview) |

### Supporting layers

- **`configuration/manager.ts`** — `configManager` singleton: typed proxy over `vscode.workspace.getConfiguration("markdown.extension")`, with deprecated-key warnings.
- **`editor-context-service/`** — Tracks cursor state (in list, in fenced code block, in math env). Used by `when` clauses and key bindings at runtime.
- **`theming/`** — `decorationManager` orchestrates multiple `IDecorationWorker` instances registered in `decorationWorkerRegistry`.
- **`nls/`** — Wrapper around VS Code's NLS (localization). Must be initialized via `configNls({ extensionContext })` before any `localize()` calls.
- **`contract/`** — Shared type definitions: `SlugifyMode`, `MarkdownSpec` heading types, `LanguageIdentifier`.
- **`util/slugify.ts`** — Multi-platform slug implementations (GitHub, GitLab, Gitea, VSCode, AzureDevOps, BitbucketCloud, Zola). The Zola variant delegates to a WASM module loaded asynchronously.

### Build pipeline

- `build/build.js` orchestrates two steps: `compilation.js` (runs webpack) and `duplicate-changelog.js`.
- `webpack.config.js` bundles `src/extension.ts` → `dist/node/main.js` (the extension's `main`).
- `tsconfig.json` compiles `src/` → `out/` with CommonJS modules — this output is used only by the test runner, not the production bundle.
- `src/zola-slug/` is a Rust crate built with `wasm-pack` into `src/zola-slug/pkg/`, then bundled by webpack via `asyncWebAssembly: true`.

### Test structure

- `src/test/runTest.ts` — Entry point; uses `@vscode/test-electron` to launch VS Code with the extension under test.
- `src/test/suite/index.ts` — Mocha runner; loads unit tests first, then integration tests.
- `src/test/suite/util/` — Shared helpers (`openDocument`, `sleep`, `resetConfiguration`).
- Integration tests open a real VS Code editor and issue commands; they require the extension to be fully activated.
