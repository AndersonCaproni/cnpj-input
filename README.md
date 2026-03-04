# CNPJ Validator

Componente web para validação de CNPJ em tempo real, com suporte ao novo formato alfanumérico da Receita Federal (válido a partir de julho de 2026). Disponível em duas implementações: **ES5** e **ES6**, alternáveis via interface.

---

## ✨ Funcionalidades

- Validação em tempo real com feedback visual imediato
- Suporte ao novo formato alfanumérico 2026 (`A1.B2C.3D4/E5F6-00`)
- Duas implementações do algoritmo Serpro: ES5 e ES6 — alternáveis via toggle
- Label flutuante animada ao focar/digitar
- Barra de progresso indicando o preenchimento
- Ícones de sucesso e erro
- Máscara automática

---

## 📁 Estrutura

```
├── index.html       # Estrutura do componente
├── style.css        # Estilização do componente
├── cnpj_es5.js      # Validação CNPJ — implementação ES5
├── cnpj_es6.js      # Validação CNPJ — implementação ES6 (Serpro)
├── cnpj_input.js    # Lógica de UI: máscara, eventos e estados
└── README.md
```

---

## 🚀 Como usar

Basta abrir o `index.html` no navegador. Os arquivos precisam estar na mesma pasta.

Para integrar em outro projeto, importe na ordem correta:

```html
<link href="style.css" rel="stylesheet">
```

```html
<!-- Escolha a implementação desejada ou importe ambas para o toggle funcionar -->
<script src="cnpj_es5.js"></script>
<script src="cnpj_es6.js"></script>
<script src="cnpj_input.js"></script>
```

### Em projetos Ruby on Rails

Copie os arquivos para `app/assets/javascripts/` e referencie no `application.js`:

```javascript
//= require cnpj_es5
//= require cnpj_es6
//= require cnpj_input
```

---

## 🔀 ES5 vs ES6

O componente permite alternar entre duas implementações do mesmo algoritmo Serpro:

| | ES5 | ES6 |
|---|---|---|
| **Compatibilidade** | Navegadores legados | Navegadores modernos |
| **Sintaxe** | `function`, `var` | `class`, `const`, `let` |
| **Classe** | `CnpjES5` | `CnpjES6` |

A troca é feita via `getValidator()` no `index.js`, sem duplicação de código nos eventos.

---

## 🔍 Uso das classes diretamente

```javascript
// ES6
CnpjES6.isValid('12.ABC.345/01DE-35')           // true
CnpjES6.calculaDV('12ABC34501DE')               // "35"
CnpjES6.removeMascaraCNPJ('12.ABC.345/01DE-35') // "12ABC34501DE35"

// ES5
CnpjES5.isValid('12.ABC.345/01DE-35')           // true
CnpjES5.calculaDV('12ABC34501DE')               // "35"
CnpjES5.removeMascaraCNPJ('12.ABC.345/01DE-35') // "12ABC34501DE35"
```

---

## ✅ Exemplos de CNPJs válidos para teste

| Formato | CNPJ |
|---|---|
| Alfanumérico 2026 | `12.ABC.345/01DE-35` |

> Exemplo oficial documentado pelo Serpro. Para mais casos de teste, utilize o simulador oficial da Receita Federal.

---

## 🔧 Requisitos

- Para `cnpj_es6.js`: navegador com suporte a ES2022+ (Chrome 74+, Firefox 69+, Edge 79+)
- Para `cnpj_es5.js`: qualquer navegador moderno
- Sem dependências externas

---

## ⚠️ Atenção

A validação no frontend é apenas para **UX**. Sempre valide o CNPJ também no backend antes de persistir no banco de dados.

---

## 📄 Referências

- [Serpro — Algoritmo CNPJ Alfanumérico](https://www.serpro.gov.br)
- [Receita Federal — CNPJ Alfanumérico](https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/cnpj-alfanumerico)
