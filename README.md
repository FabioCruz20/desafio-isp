# Desafio ISP

Endereço: http://desafiofabio.free.nf

Aplicação web que exibe um mapa com uma camada de pontos e outra de polígonos.

A camada de pontos representa câmeras de trânsito, enquanto a de polígonos representa condados nos Estados Unidos da América.

O usuário pode filtrar as câmeras, causando mudanças no mapa.

Tecnologias usadas:
- HTML 5
- CSS + Tailwind
- Vanilla Javascript
- ArcGIS JS API

Configuração:
- Para usar a ArcGIS JS API, é necessário definir uma chave de API.
- A chave de API pode ser criada seguindo o tutorial: https://developers.arcgis.com/documentation/security-and-authentication/api-key-authentication/tutorials/create-an-api-key/
- Para definir a chave, crie uma cópia de js/secret.template.js como js/secret.js.
- No arquivo js/secret.js criado, atribua a chave da API à variável string chamada arcgisAPIKey.

Fontes dos dados:
- Câmeras: https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/Traffic_Cameras/FeatureServer/0
- Condados: https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Census_Counties/FeatureServer/0 
