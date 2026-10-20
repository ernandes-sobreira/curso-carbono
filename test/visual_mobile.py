"""Chromium: interação real das experiências 8/10 em celular e desktop.
Não equivale a testar um aparelho Android ou iOS físico.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import threading
import os

ROOT=Path(__file__).resolve().parents[1]
os.chdir(ROOT)
server=ThreadingHTTPServer(("127.0.0.1",0), SimpleHTTPRequestHandler)
threading.Thread(target=server.serve_forever,daemon=True).start()
URL=f"http://127.0.0.1:{server.server_port}/index.html"
OUT=ROOT/"_checks"
OUT.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True)
    for name,width,height in [("mobile",393,852),("small_mobile",320,568),("desktop",1280,720)]:
        page=browser.new_page(viewport={"width":width,"height":height})
        errors=[]
        page.on("pageerror",lambda e:errors.append(str(e)))
        page.goto(URL,wait_until="domcontentloaded",timeout=70000)
        page.evaluate("window.__carbono.go(7)")
        page.wait_for_timeout(330)
        assert page.locator("#heat-slide-cover.active").count()==1, "Slide novo não cobriu o layout antigo"
        assert page.locator("#heat-slide-cover .heat-title").is_visible()
        assert page.locator("#uhi .uhi-image-only").count()==0, "Componente anterior ainda presente"
        assert page.locator("#uhi #city").count()==0, "Cena antiga ainda existe"
        assert page.locator("#heat-slide-cover .heat-graphic").evaluate("im=>im.complete && im.naturalWidth>0"), "Imagem não carrega"
        assert page.locator("#heat-slide-cover .heat-graphic").is_visible(), "Imagem não aparece"
        dims=page.evaluate("""() => {
          const cover=document.getElementById('heat-slide-cover');
          const img=cover.querySelector('.heat-graphic');
          const r=img.getBoundingClientRect();
          return {width:r.width,stage:document.getElementById('stage').getBoundingClientRect().width};
        }""")
        assert dims["width"]>=dims["stage"]*.78, f"Ilustração pequena demais: {dims}"
        assert not page.locator("#ctrl").evaluate("el=>el.contains(document.elementFromPoint(window.innerWidth/2,window.innerHeight/2))"), "Régua antiga intercepta toques"
        page.locator('[data-heat-action="zoom"]').click(timeout=12000)
        assert page.locator("#heat-zoom.open").count()==1, "Zoom não abre"
        page.locator('[data-heat-action="close"]').click(timeout=12000)
        assert page.locator("#heat-zoom.open").count()==0, "Zoom não fecha"
        page.screenshot(path=str(OUT/f"{name}_uhi_slide.png"),full_page=False)
        page.locator('[data-heat-action="next"]').click(timeout=12000)
        assert page.locator("#heat-slide-cover.active").count()==0, "Próximo slide travou"
        assert page.locator("#health").is_visible(), "Nova experiência 9 não apareceu"
        assert page.locator("#health [data-hh]").count()==3, "Três painéis de saúde ausentes"
        page.locator('[data-hh="heat"]').click(timeout=12000)
        assert "desidratação" in page.locator("#hh-path-copy").inner_text().lower()
        page.locator('[data-hh="climate"]').click(timeout=12000)
        assert "aquecimento global" in page.locator("#hh-path-copy").inner_text()
        page.locator('[data-hh="pm"]').click(timeout=12000)
        assert "Partículas finas" in page.locator("#hh-path-copy").inner_text()
        page.screenshot(path=str(OUT/f"{name}_health.png"),full_page=False)
        page.locator("#next").click(timeout=12000)
        assert not page.locator("#health").is_visible(), "Saída para cenários falhou"
        page.locator("#prev").click(timeout=12000)
        assert page.locator("#health").is_visible(), "Voltar dos cenários deveria alcançar saúde"
        page.locator("#prev").click(timeout=12000)
        assert page.locator("#heat-slide-cover.active").count()==1, "Retorno à ilha de calor falhou"
        page.evaluate("window.__scen.scen.view='me';window.__carbono.go(9)")
        page.wait_for_timeout(200)
        assert page.locator("#stage.food2-on").count()==1
        assert page.locator("#food2 .f2-row").count()==5
        page.locator('[data-f2-metric="water"]').click()
        assert "5.605" in page.locator("#f2-bars").inner_text()
        page.locator("#f2-all").click()
        assert page.locator("#food2 .f2-row").count()==10
        page.screenshot(path=str(OUT/f"{name}_food_v2.png"),full_page=False)
        assert not errors,errors
        print(f"{name}: ilha de calor, saúde interativa, navegação e alimentos OK")
        page.close()
    browser.close()
    server.shutdown()
