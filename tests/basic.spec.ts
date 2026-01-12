import { type Page, expect, test } from "@playwright/test";

async function waitForDecompiledContent(page: Page, expectedText: string) {
    await expect(async () => {
        const decompiling = page.getByText("Decompiling...");

        await expect(decompiling).toBeHidden();
    }).toPass({ timeout: 30000 });

    await expect(async () => {
        const editorContent = await page.evaluate(() => {
            const monacoGlobal = (window as { monaco?: { editor: { getEditors: () => { getValue: () => string }[] } } })
                .monaco;
            const editors = monacoGlobal?.editor?.getEditors();
            return editors?.[0]?.getValue() ?? "";
        });

        expect(editorContent).toContain(expectedText);
    }).toPass({ timeout: 30000 });
}

test.describe("mcsrc", () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => {
            localStorage.setItem("setting_eula", "true");
        });
    });

    test("Decompiles class", async ({ page }) => {
        await page.goto("/");
        await waitForDecompiledContent(page, "enum ChatFormatting");
    });

    test("Searches and decompiles Minecraft class", async ({ page }) => {
        await page.goto("/");
        const searchBox = page.getByRole("searchbox", { name: "Search classes" });

        await searchBox.fill("Minecraft");

        const searchResult = page.getByText("net/minecraft/client/Minecraft", { exact: true });

        await searchResult.click();

        await waitForDecompiledContent(page, "class Minecraft");
    });

    test("Permalink with line range highlights multiple lines", async ({ page }) => {
        await page.goto("/#1/26.1-snapshot-1/net/minecraft/SystemReport#L87-90");

        await waitForDecompiledContent(page, "class SystemReport");

        const editor = page.locator(".monaco-editor");
        const highlightedLines = editor.locator(".highlighted-line");

        await expect(highlightedLines.first()).toBeVisible({ timeout: 5000 });
    });

    test("Shift-clicking line number creates line range", async ({ page }) => {
        await page.goto("/");
        await waitForDecompiledContent(page, "enum ChatFormatting");

        const editor = page.locator(".monaco-editor");

        await expect(editor).toBeVisible();

        const lineNumbers = editor.locator(".line-numbers");

        await lineNumbers.first().click();

        await page.waitForTimeout(500);
        const urlAfterFirstClick = page.url();

        expect(urlAfterFirstClick).toMatch(/#L\d+$/);

        await lineNumbers.nth(5).click({ modifiers: ["Shift"] });

        await page.waitForTimeout(500);

        expect(page.url()).toMatch(/#L\d+-\d+$/);
        expect(page.url()).not.toEqual(urlAfterFirstClick);

        const highlightedLine = editor.locator(".highlighted-line");

        await expect(highlightedLine.first()).toBeVisible({ timeout: 2000 });
    });
});
