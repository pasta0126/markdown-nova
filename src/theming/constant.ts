import * as vscode from "vscode";
import type { IConfigurationKnownKey } from "../configuration/model";

// Keys are sorted in alphabetical order.

const enum Color {
    EditorCodeSpanBackground,
    EditorCodeSpanBorder,
    EditorFormattingMarkForeground,
    EditorTrailingSpaceBackground,
}

const colors: Readonly<Record<Color, vscode.ThemeColor>> = {
    [Color.EditorCodeSpanBackground]: new vscode.ThemeColor("markdown.extension.editor.codeSpan.background"),
    [Color.EditorCodeSpanBorder]: new vscode.ThemeColor("markdown.extension.editor.codeSpan.border"),
    [Color.EditorFormattingMarkForeground]: new vscode.ThemeColor("markdown.extension.editor.formattingMark.foreground"),
    [Color.EditorTrailingSpaceBackground]: new vscode.ThemeColor("markdown.extension.editor.trailingSpace.background"),
};

const enum FontIcon {
    DownwardsArrow,
    DownwardsArrowWithCornerLeftwards,
    Link,
    Pilcrow,
}

const fontIcons: Readonly<Record<FontIcon, Readonly<vscode.ThemableDecorationAttachmentRenderOptions>>> = {
    [FontIcon.DownwardsArrow]: {
        contentText: "↓",
        color: colors[Color.EditorFormattingMarkForeground],
    },
    [FontIcon.DownwardsArrowWithCornerLeftwards]: {
        contentText: "↵",
        color: colors[Color.EditorFormattingMarkForeground],
    },
    [FontIcon.Link]: {
        contentText: "\u{1F517}\u{FE0E}",
        color: colors[Color.EditorFormattingMarkForeground],
    },
    [FontIcon.Pilcrow]: {
        contentText: "¶",
        color: colors[Color.EditorFormattingMarkForeground],
    },
};

export const enum DecorationClass {
    CodeSpan,
    HardLineBreak,
    Link,
    Paragraph,
    Strikethrough,
    TrailingSpace,
    TaskTodo,
    TaskDone,
    TaskProgress,
    TaskCancelled,
    TaskImportant,
    TaskBlocked,
    TaskPriority,
    TaskMigrated,
    TaskBacklog,
}

/**
 * Rendering styles for each decoration class.
 */
export const decorationStyles: Readonly<Record<DecorationClass, Readonly<vscode.DecorationRenderOptions>>> = {
    [DecorationClass.CodeSpan]: {
        backgroundColor: colors[Color.EditorCodeSpanBackground],
        border: "1px solid",
        borderColor: colors[Color.EditorCodeSpanBorder],
        borderRadius: "3px",
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
    },
    [DecorationClass.HardLineBreak]: {
        after: fontIcons[FontIcon.DownwardsArrowWithCornerLeftwards],
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
    },
    [DecorationClass.Link]: {
        before: fontIcons[FontIcon.Link],
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
    },
    [DecorationClass.Paragraph]: {
        after: fontIcons[FontIcon.Pilcrow],
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
    },
    [DecorationClass.Strikethrough]: {
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        textDecoration: "line-through",
    },
    [DecorationClass.TrailingSpace]: {
        backgroundColor: colors[Color.EditorTrailingSpaceBackground],
    },
    [DecorationClass.TaskTodo]: {
        isWholeLine: true,
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        color: 'rgba(190, 200, 217, 0.95)',
        opacity: '0.85',
    },
    [DecorationClass.TaskDone]: {
        isWholeLine: true,
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        color: 'rgba(130, 205, 152, 0.95)',
        textDecoration: 'line-through',
        opacity: '0.55',
    },
    [DecorationClass.TaskProgress]: {
        isWholeLine: true,
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        color: 'rgba(193, 220, 255, 1)',
        fontStyle: 'italic',
    },
    [DecorationClass.TaskCancelled]: {
        isWholeLine: true,
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        color: 'rgba(176, 180, 189, 0.9)',
        textDecoration: 'line-through',
        fontStyle: 'italic',
        opacity: '0.45',
    },
    [DecorationClass.TaskImportant]: {
        isWholeLine: true,
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        color: 'rgba(255, 245, 195, 1)',
        fontWeight: '700',
        borderStyle: 'solid',
        borderWidth: '0 0 0 3px',
        borderColor: 'rgba(232, 202, 71, 0.95)',
    },
    [DecorationClass.TaskBlocked]: {
        isWholeLine: true,
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        color: 'rgba(255, 225, 199, 1)',
    },
    [DecorationClass.TaskPriority]: {
        isWholeLine: true,
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        color: 'rgba(255, 218, 218, 1)',
        fontWeight: '700',
        overviewRulerColor: 'rgba(244, 72, 72, 0.95)',
        overviewRulerLane: vscode.OverviewRulerLane.Right,
    },
    [DecorationClass.TaskMigrated]: {
        isWholeLine: true,
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        color: 'rgba(149, 179, 222, 0.9)',
        fontStyle: 'italic',
    },
    [DecorationClass.TaskBacklog]: {
        isWholeLine: true,
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        color: 'rgba(176, 180, 189, 0.9)',
        fontStyle: 'italic',
        opacity: '0.45',
    },
};

/**
 * DecorationClass -> Configuration key
 */
export const decorationClassConfigMap: Readonly<Record<DecorationClass, IConfigurationKnownKey>> = {
    [DecorationClass.CodeSpan]: "theming.decoration.renderCodeSpan",
    [DecorationClass.HardLineBreak]: "theming.decoration.renderHardLineBreak",
    [DecorationClass.Link]: "theming.decoration.renderLink",
    [DecorationClass.Paragraph]: "theming.decoration.renderParagraph",
    [DecorationClass.Strikethrough]: "theming.decoration.renderStrikethrough",
    [DecorationClass.TrailingSpace]: "theming.decoration.renderTrailingSpace",
    [DecorationClass.TaskTodo]:      "theming.decoration.renderSemanticTasks",
    [DecorationClass.TaskDone]:      "theming.decoration.renderSemanticTasks",
    [DecorationClass.TaskProgress]:  "theming.decoration.renderSemanticTasks",
    [DecorationClass.TaskCancelled]: "theming.decoration.renderSemanticTasks",
    [DecorationClass.TaskImportant]: "theming.decoration.renderSemanticTasks",
    [DecorationClass.TaskBlocked]:   "theming.decoration.renderSemanticTasks",
    [DecorationClass.TaskPriority]:  "theming.decoration.renderSemanticTasks",
    [DecorationClass.TaskMigrated]:  "theming.decoration.renderSemanticTasks",
    [DecorationClass.TaskBacklog]:   "theming.decoration.renderSemanticTasks",
};
