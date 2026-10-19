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
        assert page.locator("#stage.uhi4-on").count()==1
        assert page.locator("#uhi4 .u4-panel").count()==2
        assert not page.locator(".head").is_visible(), "Título antigo sobrepõe cena"
        assert not page.locator("#ctrl").is_visible(), "Controles antigos cobrem cena"
        assert page.locator("#next").is_visible(), "Navegação indisponível"

        pop=page.locator("#u4-pop")
        page.locator("#u4-pop").evaluate("""e=>{e.value='0';e.dispatchEvent(new Event('input',{bubbles:true}));}""")
        before=int(page.locator("#uhi4").get_attribute("data-buildings"))
        page.locator("#u4-pop").evaluate("""e=>{e.value='100';e.dispatchEvent(new Event('input',{bubbles:true}));}""")
        after=int(page.locator("#uhi4").get_attribute("data-buildings"))
        assert after>before+10,(before,after)
        assert "20,0 mi" in page.locator("#u4-out-pop").inner_text()

        green=page.locator("#u4-green")
        green.evaluate("""e=>{e.value='5';e.dispatchEvent(new Event('input',{bubbles:true}));}""")
        fewer=page.locator('[data-u4-scene="b"] circle').count()
        green.evaluate("""e=>{e.value='80';e.dispatchEvent(new Event('input',{bubbles:true}));}""")
        more=page.locator('[data-u4-scene="b"] circle').count()
        assert more>fewer+25,(fewer,more)
        assert "80%" in page.locator("#u4-out-green").inner_text()

        rain=page.locator("#u4-rain")
        rain.evaluate("""e=>{e.value='200';e.dispatchEvent(new Event('input',{bubbles:true}));}""")
        dry=int(page.locator("#uhi4").get_attribute("data-moisture"))
        drypaths=page.locator('[data-u4-scene="b"] path').count()
        rain.evaluate("""e=>{e.value='3000';e.dispatchEvent(new Event('input',{bubbles:true}));}""")
        wet=int(page.locator("#uhi4").get_attribute("data-moisture"))
        wetpaths=page.locator('[data-u4-scene="b"] path').count()
        assert dry==0 and wet==2 and wetpaths>drypaths,(drypaths,wetpaths)

        page.locator('[data-u4-city="cac"]').click()
        assert "95 mil" in page.locator("#u4-out-pop").inner_text()
        # Scroll da experiência não pode interceptar navegação inferior.
        page.locator("#next").click(timeout=12000)
        assert page.locator("#stage.uhi4-on").count()==0,"Próximo travado"
        page.locator("#prev").click(timeout=12000)
        assert page.locator("#stage.uhi4-on").count()==1,"Anterior travado"
        page.locator("#uhi4").evaluate("e=>e.scrollTo(0,0)")
        page.screenshot(path=str(OUT/f"{name}_uhi_v4.png"),full_page=False)

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
        print(f"{name}: população {before}->{after} edifícios, árvores {fewer}->{more}, clima {dry}->{wet}, navegação e alimentos OK")
        page.close()
    browser.close()
