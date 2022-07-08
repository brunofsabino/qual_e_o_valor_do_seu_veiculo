# API - Qual é o valor do seu veículo?
Esta API realiza web-scraping dinâmico no site da Tabela Fipe e retorna informações sobre os dos veículos pesquisados. Sejam carros, motos ou caminhões. </br>

Link para utilizaram a API rodando via Template Engine Mustache-Express.</br>
<a href="https://brunoferrazsabino.dev/qual-o-valor-do-seu-veiculo" target="_blank">https://brunoferrazsabino.dev/qual-o-valor-do-seu-veiculo</a>

# Algumas telas

![QualValorVeiculo1](https://user-images.githubusercontent.com/28497887/177862584-e0c54100-a959-4a3f-a406-ee136ec68683.PNG)

![QualValorVeiculo2](https://user-images.githubusercontent.com/28497887/177862639-a4716138-595f-401f-b40e-c9b900b27efa.PNG)

![QualValorVeiculo3](https://user-images.githubusercontent.com/28497887/177862667-1a418c3a-9992-45b9-9048-48e158792ef6.PNG)

![screencapture-brunoferrazsabino-dev-qual-o-valor-do-seu-veiculo-2022-07-07-17_06_54](https://user-images.githubusercontent.com/28497887/177862683-3e2d7bcb-c6f5-4d73-88e9-73419137694b.png)

# Para utilizar a API

### Endpoint

`https://brunoferrazsabino.dev/api/qual-o-valor-do-seu-veiculo`

### Retorno

Para obter o retorno é necessário encaminhar no endpoint via URL Encoding os campos `select`, `select1`, `select2` e `select3` seguidos dos seus values. Observe os passos abaixo: </br>

1- O campo `select` deverá ter um dos seguintes values:

 * `Consulta de Carros e utilitários pequenos`: Caso queira pesquisar sobre carros e utilitários pequenos.

 * `Consulta de Caminhões e Micro-Ônibus`: Caso queira pesquisar sobre Caminhões e Micro-Ônibus.

 * `Consulta de motos`: Caso queira pesquisar sobre motos.
 
 2- Ao encaminhar o endpoint com o campo `select` com o value escolhido, a API retornará um objeto com a propriedade `marcadoVeiculo` preenchida, ela é um array com as 92 marcas do veículo no Brasil.</br>
 
 3- Para continuar utilizar a API é necessário encaminhar os dois campos prenchidos, o `select` e o `select1`. O value do campo `select1` é uma das opções que o array da propriedade `marcadoVeiculo` retornou (passo 1). Com isto, a API irá retornar a propriedade `marcadoVeiculo` e a propriedade `modelodoVeiculo` preenchidas. </br>
 
 4- Agora é necessário encaminhar o campo `select2` preenchido (não esquecendo dos selects anteriores citados nos passos 1 e 2). O campo `select2` deverá estar com um value que a propriedade `modelodoVeiculo` anteriormente retornou. A API retornará um array da propriedade `anoDoVeiculo` (juntamente com as propriedades anteriormente citadas) preenchida.</br>
 
 5- Por fim é necessário encaminhar o campo `select3` preenchido, juntamente com todos os selects anteriormente citados. O campo `select3` deverá estar com um value que a propriedade anoDoVeiculo anteriormente retornou.</br></br>
 
 Com todos os selects preenchidos e encaminhados a API retornará um objeto com todas as propriedades preenchidas, que são elas:
 
 
* `marcadoVeiculo`: Um array com todas as marcas do veículo.

* `modelodoVeiculo`: Um array com todos os modelos do veículo.

* `anoDoVeiculo`: Um array com todos os anos do veículo.

* `mesReferencia`: O mês e ano da pesquisa realizada no site da Tabela Fipe.

* `codigoFipe`: O código Fipe da pesquisa realizada no site da Tabela Fipe.

* `marca`: A marca do veículo pesquisado no site da Tabela Fipe.

* `modelo`: O modelo do veículo pesquisado no site da Tabela Fipe.

* `anoModelo`: O ano do modelo do veículo pesquisado no site da Tabela Fipe.

* `autenficacao`: A autenficação da pesquisa realizada no site da Tabela Fipe.

* `dataConsulta`: A data da consulta da pesquisa realizada no site da Tabela Fipe.

* `precoMedio`: O preço médio do veiculo que foi pesquisado no site da Tabela Fipe.
 

 
 ### Tabela Fipe
Site do Tabela Fipe onde o web-scrapping dinâmico é realizado: </br>
`https://veiculos.fipe.org.br/`

### Mustache-Express
Link para utilizaram a API rodando via Template Engine Mustache-Express.</br>
<a href="https://brunoferrazsabino.dev/qual-o-valor-do-seu-veiculo" target="_blank">https://brunoferrazsabino.dev/qual-o-valor-do-seu-veiculo</a>
 
