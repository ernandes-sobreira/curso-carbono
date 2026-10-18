from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.lib.colors import HexColor
r=Path(__file__).resolve().parents[1]
W,H=960,540
out=r/'CARBONO_SBFA_apoio.pdf'
pdf=canvas.Canvas(str(out),pagesize=(W,H),pageCompression=1)
pdf.setTitle('Carbono SBFA: telas e fontes')
for n in range(11):
    file=r/'resources'/'pdf-captures'/f'slide_{n:02d}.png'
    assert file.exists(),file
    pdf.drawImage(ImageReader(str(file)),0,0,W,H)
    pdf.showPage()
pdf.setFillColor(HexColor('#FFFFFF'));pdf.rect(0,0,W,H,fill=1,stroke=0)
pdf.setFillColor(HexColor('#12233A'));pdf.setFont('Helvetica-Bold',24);pdf.drawString(48,466,'Fontes e limites deste apoio')
pdf.setFont('Helvetica',12)
lines=[
 'Carbono SBFA | III Semana Brasileira de Física Ambiental | Cuiabá, 2026',
 'SEEG, MT 2024, coleção 13.0 (GWP-AR5): plataforma.seeg.eco.br/territorio/mato-grosso',
 'IPCC AR6 WG1: ipcc.ch/report/ar6/wg1/ | capítulos 5 e 7 | Figuras 5.12 e 7.2.',
 'Oke (1973), DOI: 10.1016/0004-6981(73)90140-6.',
 'Villela et al. (2026), DOI: 10.1038/s41467-026-68340-4.',
 'Huang et al. (2024), DOI: 10.1029/2023EF004254.',
 'NASA e NOAA: créditos e URLs estão detalhados em IMAGENS.md.',
 '',
 'As três primeiras telas aqui foram capturadas no modo de contingência 2D.',
 'Este ambiente de teste não possui WebGL. Não são imagens da animação 3D.',
 'As séries e demais cifras do HTML original aguardam validação com CSVs originais.',
 'CO2 equivalente (multigás) não é entrada direta da relação TCRE de CO2.',
 'Este PDF é material visual de aula, não banco de dados ou validação científica.'
]
y=420
for line in lines:
    pdf.setFillColor(HexColor('#465F79') if line.startswith('As três') else HexColor('#12233A'))
    pdf.drawString(48,y,line);y-=27
pdf.showPage();pdf.save()
print(out)
