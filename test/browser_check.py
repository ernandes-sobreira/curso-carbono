"""Teste de navegação local; NÃO simula aparelho Android/iOS real."""
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
content=(root/'index.html').read_text(encoding='utf-8')
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium')
    page=browser.new_page(viewport={'width':1280,'height':720})
    errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.set_content(content,wait_until='domcontentloaded',timeout=60000)
    ids=page.evaluate('window.__carbono.slides.map(x=>x.id)')
    assert len(ids)==11, ids
    for n in range(11):
        page.evaluate('n => window.__carbono.go(n)',n)
        page.wait_for_timeout(130)
    assert not errors, errors
    page.evaluate('window.__carbono.go(8)')
    emissions=page.evaluate('() => {window.__scen.scen.scope="mt";return window.__scen.leverResult()}')
    assert abs(emissions['total']-231.17459584)<1e-10
    assert len(emissions['rows'])==5
    page.locator('#challenge').evaluate('(e)=>e.click()')
    page.locator('[data-challenge="0"]').evaluate('(e)=>e.click()')
    assert 'Correto' in page.locator('.challenge-feedback').inner_text()
    print('Chromium headless: 11 telas, 0 pageerrors, 5 setores MT e desafio interativo. WebGL:',page.evaluate('window.__carbono.hasGL'))
    browser.close()
