# Serralheria Ferro Forte - Site

Site institucional da **Serralheria Ferro Forte**, feito só com HTML, CSS e JavaScript (sem instalar nada).
Pode ser publicado **de graça** no GitHub Pages.

## 1. Troque os dados da serralheria

Abra o arquivo `js/main.js`. No topo tem um bloco `SITE` com tudo que aparece no site:

```js
const SITE = {
  whatsapp:  "5500000000000",   // 55 + DDD + número (só números)
  telefone:  "(00) 00000-0000",
  email:     "contato@ferroforte.com.br",
  cidade:    "Sua Cidade - UF",
  endereco:  "Rua Exemplo, 123 - Bairro, Sua Cidade - UF",
  horario:   "Seg a Sex 7h–18h · Sáb 7h–12h",
  instagram: "",                // link do Instagram (vazio = esconde)
  areas: ["Centro", "Zona Norte", ...]   // bairros/cidades atendidos
};
```

Troque pelos dados reais e salve. O botão de WhatsApp, o formulário, o mapa e o rodapé se atualizam sozinhos.

Em `index.html`, procure por `data-count` (seção "Números") e ajuste os valores de anos de experiência, obras entregues etc. para os números reais da empresa.

## 2. Troque as fotos pelas do seu trabalho

As fotos em `img/` são gratuitas do [Pexels](https://www.pexels.com) (uso livre). Quando tiver fotos dos portões que você mesmo fez, é só colocar na pasta `img/` e trocar o nome do arquivo no `index.html`.

## 3. Publicar no GitHub Pages (grátis)

1. Crie uma conta em <https://github.com> (se ainda não tiver).
2. Clique em **New repository**, dê o nome `serralheria-ferro-forte`, deixe **Public** e clique em **Create repository**.
3. Na página do repositório, clique em **uploading an existing file** e arraste **todo o conteúdo desta pasta** (`index.html`, pastas `css`, `js`, `img` e o `README.md`). Clique em **Commit changes**.
4. Vá em **Settings → Pages**.
5. Em **Build and deployment → Source**, escolha **Deploy from a branch**, branch **main** e pasta **/ (root)**. Clique em **Save**.
6. Espere 1 a 2 minutos. O endereço do site aparece no topo da mesma página:
   `https://SEU-USUARIO.github.io/serralheria-ferro-forte/`

### Atualizar o site depois
Edite o arquivo no GitHub (ícone de lápis) ou envie novos arquivos com **Add file → Upload files**. Em 1-2 minutos o site atualiza.

### Usar um domínio próprio (opcional)
Em **Settings → Pages → Custom domain** você pode usar algo como `www.ferroforte.com.br` (o domínio é pago no Registro.br, o GitHub Pages continua grátis).

## Estrutura

```
index.html      página única
css/style.css   visual (cores no topo, em :root)
js/main.js      dados da empresa, menu, galeria, formulário, animações
img/            logo (logo.svg) e fotos
```

## Créditos das fotos
Pexels: Pavel Chernonogov, Critical Smith, Magda Ehlers, Mathias Reding, Kürşat Sarpkaya, Serena Koi, Anne van der Valk, Markus Winkler e Richard Revel.
