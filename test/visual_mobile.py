"""Testes automatizados no Chromium, com viewport mobile e desktop.
Isto NÃO substitui teste em dispositivo Android real.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / "index.html").read_text(encoding="utf-8")
OUT = ROOT / "_checks"
OUT.mkdir(exist_ok=True)

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    for name, width, height in [("mobile", 393, 852), ("desktop", 1280, 720)]:
        page = browser.new_page(viewport={"width": width, "height": height})
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.set_content(HTML, wait_until="domcontentloaded", timeout=70000)
        page.evaluate("window.__carbono.go(7)")
        page.wait_for_timeout(300)
        assert page.locator("#stage.u3-on").count() == 1, "Experiência 8 não foi ativada"
        assert page.locator("#uhi .u3-panel").count() == 2, "Comparação dupla ausente"
        green = page.locator('input[data-u3="green"]')
        green.evaluate("""el => {el.value = '0.60'; el.dispatchEvent(new Event('input',{bubbles:true}));}""")
        page.wait_for_timeout(60)
        a = page.locator('[data-u3-scene="a"] circle').count()
        b = page.locator('[data-u3-scene="b"] circle').count()
        assert b > a + 15, f"Verde insuficiente na cena: {a} vs {b}"
        assert "60%" in page.locator("[data-u3-caption]").inner_text()
        page.screenshot(path=str(OUT / f"{name}_uhi_v3.png"), full_page=False)
        page.evaluate("window.__scen.scen.view='me';window.__carbono.go(8)")
        page.wait_for_timeout(260)
        assert page.locator("#stage.food2-on").count() == 1, "Experiência 10 não foi ativada"
        assert page.locator("#food2 .f2-row").count() == 5, "Barras iniciais não encontradas"
        assert page.locator("#food2 .f2-value").count() == 5, "Rótulos numéricos não encontrados"
        page.locator('[data-f2-metric="water"]').click()
        assert "Água" in page.locator("#f2-metric-name").inner_text()
        assert "5.605" in page.locator("#f2-bars").inner_text(), "O valor original de queijo não apareceu"
        page.locator("#f2-all").click()
        assert page.locator("#food2 .f2-row").count() == 10, "Botão para todos os alimentos falhou"
        page.screenshot(path=str(OUT / f"{name}_food_v2.png"), full_page=False)
        assert not errors, f"Erros JS em {name}: {errors}"
        print(f"{name} OK: UHI 5% vs 60%, 2 cenas, alimentos 5/10, água, sem erros JS.")
        page.close()
    browser.close()
