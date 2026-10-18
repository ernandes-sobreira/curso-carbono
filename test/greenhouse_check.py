from pathlib import Path
from playwright.sync_api import sync_playwright
p=Path(__file__).resolve().parents[1]
html=(p/'index.html').read_text(encoding='utf-8')
with sync_playwright() as play:
 b=play.chromium.launch(headless=True,executable_path='/usr/bin/chromium', args=['--disable-gpu-sandbox'])
 for name,w,h in [('mobile',390,844)]:
  page=b.new_page(viewport={'width':w,'height':h},device_scale_factor=1,is_mobile=name!='desktop',has_touch=name!='desktop')
  errors=[]
  page.on('pageerror', lambda error:errors.append(str(error)))
  page.set_content(html,wait_until='domcontentloaded',timeout=60000)
  page.evaluate('window.__carbono.go(3)')
  assert page.locator('#greenhouse-lesson').is_visible(),name
  assert page.get_by_text('A atmosfera absorve e emite radiação').is_visible()
  page.locator('[data-gh-step="4"]').click()
  assert 'Mais CO₂' in page.locator('#gh-step-title').inner_text()
  page.locator('[data-gh-preset="2x"]').click()
  assert '554,3' in page.locator('#gh-co2-value').inner_text()
  assert 'W/m²' in page.locator('#gh-forcing').inner_text()
  page.locator('[data-gh-step="3"]').click()
  page.locator('[data-gh-preset="2019"]').click()
  page.screenshot(path=str(p/'_checks'/f'greenhouse-{name}.png'))
  dims=page.evaluate('''() => ({stage:document.querySelector('#stage').getBoundingClientRect().toJSON(),lesson:document.querySelector('#greenhouse-lesson').getBoundingClientRect().toJSON(),scrollHeight:document.querySelector('#greenhouse-lesson').scrollHeight,clientHeight:document.querySelector('#greenhouse-lesson').clientHeight,diagram:document.querySelector('.gh-graphic').getBoundingClientRect().toJSON(),panel:document.querySelector('.gh-panel').getBoundingClientRect().toJSON()})''')
  print(name,dims,'errors',errors)
  assert not errors,errors
  page.close()
 b.close()
