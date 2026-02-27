# CNPJ Validator

Componente web para validação de CNPJ em tempo real, com suporte ao novo formato alfanumérico da Receita Federal (válido a partir de julho de 2026). O algoritmo de validação segue as especificações oficiais do **Serpro**.

---

## ✨ Funcionalidades

- Validação em tempo real com feedback visual imediato
- Suporte ao formato numérico atual (`00.000.000/0000-00`)
- Suporte ao novo formato alfanumérico 2026 (`A1.B2C.3D4/E5F6-00`)
- Label flutuante animada ao focar/digitar
- Barra de progresso indicando o preenchimento
- Ícones de sucesso e erro
- Máscara automática

---

## 📁 Estrutura

```
├── cnpj_input.html   # Estrutura e estilos do componente
├── cnpj.js           # Classe de validação — algoritmo oficial Serpro
├── style.css         # Estilização adotada
├── index.js     # Lógica de UI: máscara, eventos e estados
└── README.md
```

---

## 🚀 Como usar

Basta abrir o `index.html` no navegador. Os arquivos precisam estar na mesma pasta.

Para integrar em outro projeto, importe os scripts na ordem correta:

```html
<link href="style.css" rel="stylesheet">
```

```html
<script src="cnpj.js"></script>
<script src="cnpj_input.js"></script>
```

### Em projetos Ruby on Rails

Copie os arquivos para `app/assets/javascripts/` e referencie no `application.js`:

```javascript
//= require cnpj
//= require cnpj_input
```

---

## 🔍 Uso da classe CNPJ diretamente

```javascript
// Validar
CNPJ.isValid('12.ABC.345/01DE-35')  // true
CNPJ.isValid('11.111.111/1111-11')  // false

// Calcular dígitos verificadores
CNPJ.calculaDV('12ABC34501DE')  // "35"

// Remover máscara
CNPJ.strip('12.ABC.345/01DE-35')  // "12ABC34501DE35"
```

---

## ✅ Exemplos de CNPJs válidos para teste

| Formato | CNPJ |
|---|---|
| Numérico atual | `11.222.333/0001-81` |
| Alfanumérico 2026 | `12.ABC.345/01DE-35` |

> O exemplo alfanumérico é o caso oficial documentado pelo Serpro.

---

## 🔧 Requisitos

- Navegador moderno com suporte a ES2022+ (Chrome 74+, Firefox 69+, Edge 79+)
- Sem dependências externas

---

## ⚠️ Atenção

A validação no frontend é apenas para **UX**. Sempre valide o CNPJ também no backend antes de persistir no banco de dados.

---

## 📄 Referências

- [Serpro — Algoritmo CNPJ Alfanumérico](https://www.serpro.gov.br)
- [Receita Federal — CNPJ Alfanumérico](https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/cnpj-alfanumerico)
