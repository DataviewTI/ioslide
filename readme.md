
# Gestor de Slides para IntranetOne
Gestor de slides BS4 
IOGallery requires IntranetOne
## Conteúdo
 
## Instalação

```sh
composer require dataview/io[servico]
```
```sh
php artisan io-[servico]:install
```

- Configure o webpack conforme abaixo 
```js
...
let slide = require('io-[servico]');
io.compile({
  services:{
    ...
    new [servico]()
    ...
  }
});

```
- Compile os assets e faça o cache
```sh
npm run dev|prod|watch
php artisan config:cache
```
[servico]: slide