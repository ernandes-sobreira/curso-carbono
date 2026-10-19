"""Chromium: interação real das experiências 8/10 em celular e desktop.
Não equivale a testar um aparelho Android ou iOS físico.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
HTML=(ROOT/"index.html").read_text(encoding="utf-8")
OUT=ROOT/"_checks"
OUT.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True)
    for name,width,height in [("mobile",393,852),("small_mobile",320,568),("desktop",1280,720)]:
        page=browser.new_page(viewport={"width":width,"height":height})
        errors=[]
        page.on("pageerror",lambda e:errors.append(str(e)))
        page.set_content(HTML,wait_until="domcontentloaded",timeout=70000)
        page.evaluate("window.__carbono.go(7)")
        page.wait_for_timeout(300)
        assert page.locator("#stage.uhi-image-slide").count()==1, "Slide novo não ativado"
        assert page.locator("#uhi .uhi-image-only").count()==1, "Imagem aprovada ausente"
        assert not page.locator("#uhi .u4-scroll").count(), "Slide antigo permanece"
        assert not page.locator("#ctrl").is_visible(), "Régua antiga visível"
        assert page.locator("#uhi-approved-image").is_visible(), "Imagem não visível"
        assert page.locator("#uhi-approved-image").evaluate("im=>im.complete && im.naturalWidth>0"), "Imagem não carregou"
        assert page.locator("#next").is_visible(), "Botão Próximo não visível"
        page.locator("#uhi-zoom").click()
        assert page.locator("#uhi .uhi-zoomed").count()==1, "Zoom não funciona"
        page.locator("#uhi-zoom").click()
        assert page.locator("#uhi .uhi-zoomed").count()==0, "Zoom não reverte"
        page.screenshot(path=str(OUT/f"{name}_uhi_slide.png"),full_page=False)
        page.locator("#next").click()
        assert page.locator("#stage.uhi-image-slide").count()==0, "Navegação travada"
        page.locator("#prev").click()
        assert page.locator("#stage.uhi-image-slide").count()==1, "Voltar ao slide falhou"
        page.evaluate("window.__scen.scen.view='me';window.__carbono.go(8)")
        page.wait_for_timeout(200)
        assert page.locator("#stage.food2-on").count()==1
        assert page.locator("#food2 .f2-row").count()==5
        page.locator('[data-f2-metric="water"]').click()
        assert "5.605" in page.locator("#f2-bars").inner_text()
        page.locator("#f2-all").click()
        assert page.locator("#food2 .f2-row").count()==10
        page.screenshot(path=str(OUT/f"{name}_food_v2.png"),full_page=False)
        assert not errors,errors
        print(f"{name}: slide de ilha de calor, zoom, navegação e alimentos OK")
        page.close()
    browser.close()
