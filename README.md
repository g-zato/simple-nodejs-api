# bld-teste-backend
API para cálculo de preço e prazo em entregas

## Introdução

<p>
Essa API é uma simples calculadora de preço de frete e prazo de entrega. Recebe como input o CEP da residência e o peso da embalagem (em gramas), os quais são passados como parâmetros do url. A API vai avaliar os dados, verificar sua validade e comparar com os dados do arquivo valores.json.  
</p>
<p>
O serviço recebe requests no endereço /api/v1/calculo-frete, e de padrão usa a porta 5000. O programa compara o CEP informado com cada um dos intervalos de CEP presentes no arquivo JSON. Se o valor existir nesse intervalo, o programa puxa as informações desse intervalo e as usa para efetuar os cálculos, retornando um objeto JSON como resposta da request.
</p>
<p>
  O objetivo do projeto foi cumprir todos os pré-requisitos do desafio, da maneira mais sucinta e limpa possível. Foram necessárias 60 linhas de código para fazer toda a lógica e error handling do programa.
</p>

## Como usar
<p>
1. Tenha Node.js instalado;
</p>
<p>
2. Clone esse repositório em alguma pasta na sua máquina (baixe os arquivos);
</p>
<p>
3. Acesse a pasta pela linha de comando. Para isso, basta abrir o terminal e mudar o diretório usando o comando (em Windows ou Linux):
 </p>

> cd /caminho/da/sua/pasta

<p>
4. Inicie um projeto com o comando:
 </p>
 
> npm init -y

<p>
5. Instale as dependências necessárias com o comando:
</p>

  > npm install
  
  <p>
6. Deixe a API rodando com o comando
  </p>
  
  > npm start
  
  <p>
7. Através do navegador, Postman, ou em Node, faça uma request para o endereço 
</p>

> http://localhost:5000/api/v1/calculo-frete/
> 
<p>
8. Preencha os parâmetros do URL com seus dados, sendo o primeiro parâmetro seu CEP, e o segundo, o peso da sua embalagem (em gramas). Para ambos, use apenas números. Segue um exemplo de request:
</p>

> http://localhost:5000/api/v1/calculo-frete/86605969/600
<br> Sendo 86605-969 o CEP, e 600g o peso da embalagem.
<p>
A API retorna um json com a resposta:
  </p>

> {<br>
> "Preço final (em R$)":  3.25272,<br>
> "Previsão de entrega: ":  "6 dias úteis"<br>
> }
