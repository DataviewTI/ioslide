
# Gestor de Slides para IntranetOne
Gestor de slides BS4 com definição de largura e altura, recorte de imagem, prazo de exibição, intervalo, exibição ou não de controles e marcadores.
## Conteúdo
 
## Instalação

```sh
composer require dataview/ioslide
```
```sh
php artisan io-slide:install
```

- Configure o webpack conforme abaixo 
```js
...
let slide = require('io-slide');
io.compile({
  services:[
    ...
    new slide(),
    ...
  ]
});

```
- Compile os assets e faça o cache
```sh
npm run dev|prod|watch
php artisan config:cache
```
## Frontend 

- Adicione a chamada da classe ao seu arquivo .blade

```php
@php
  use Dataview\IOSlide\Slide
@endphp
```

- Insira o componente abaixo informando o ID do slide a ser exibido , se "slide" não for informado, o ID mais recente será utilizado, os parametros: indicators, controls, pause e interval, podem ser informados subscrevendo os valores do cadastro.

```php
@component('Slide::fe.slide',[
  "slide"=> Slide::find(5),
  "indicators"=>true, // irá subscrever o parâmetro "indicators" informado no cadastro
])
@endcomponent
```
