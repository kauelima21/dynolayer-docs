import{a as l}from"./chunk-CHCN75MF.js";import{Aa as r,Ba as a,Ca as t,Da as s,Ka as e,la as n,ta as d}from"./chunk-JK3SF23V.js";import"./chunk-JL6EIR4O.js";var E=(()=>{class i{createMethodCode=`
    class User(DynoLayer):
      def __init__(self):
          super().__init__(
              entity="users",
              fillable=["id", "first_name", "last_name"]
          )

    # atributo 'email' ser\xE1 ignorado
    user_input = {"id": 1, "first_name": "John", "last_name": "Doe", "email": "john@mail.com"}
    User.create(user_input)
  `;saveMethodCode=`
    user = User()
    user.id = 999 # o id n\xE3o existe na tabela
    user.first_name = "Jane"

    user.save() # insere o novo item
  `;updateExample=`
    user = User()
    user.id = 1 # usu\xE1rio existente na tabela
    user.first_name = "Jane"

    user.save() # atualiza o campo 'first_name' do registro
  `;static \u0275fac=function(o){return new(o||i)};static \u0275cmp=d({type:i,selectors:[["app-persisting-data"]],decls:38,vars:3,consts:[[1,"flex","flex-col","gap-5","mb-6","text-zinc-800"],[1,"font-semibold","text-2xl"],[3,"code"]],template:function(o,m){o&1&&(a(0,"section",0)(1,"h2",1),e(2,"Introdu\xE7\xE3o"),t(),a(3,"p"),e(4," No DynoLayer, \xE9 poss\xEDvel persistir dados de duas formas: fazendo um "),a(5,"b"),e(6,"create"),t(),e(7," ou um "),a(8,"b"),e(9,"save"),t(),e(10,". "),t(),a(11,"p"),e(12,"Abaixo, haver\xE3o exemplos de como implementar ambos os casos."),t(),a(13,"h2",1),e(14,"Salvando registros"),t(),a(15,"p"),e(16," A primeira forma de persist\xEAncia \xE9 usando o "),a(17,"b"),e(18,"create"),t(),e(19,". Para isso, \xE9 necess\xE1rio antes que hajam propriedades declaradas no atributo "),a(20,"b"),e(21,"fillable"),t(),e(22,". Uma vez que estas tenham sido indicadas, basta acionar o m\xE9todo passando um dicion\xE1rio que as contenha. O DynoLayer filtrar\xE1 pelos campos declarados e realizar\xE1 o cadastro do registro. "),t(),s(23,"app-code-block",2),a(24,"p"),e(25," A segunda forma \xE9 usando o "),a(26,"b"),e(27,"save"),t(),e(28,", que tamb\xE9m \xE9 usada para atualizar registros. Ou seja, caso o registro n\xE3o exista com a chave prim\xE1ria indicada, o DynamoDB ir\xE1 inserir um novo item na tabela. "),t(),s(29,"app-code-block",2),a(30,"h2",1),e(31,"Atualizando registros"),t(),a(32,"p"),e(33," Conforme o exemplo anterior, o m\xE9todo "),a(34,"b"),e(35,"save"),t(),e(36," tamb\xE9m \xE9 utilizado para atualizar registros em uma tabela. Desse modo, ao utilizar o save em um item que j\xE1 existe, a opera\xE7\xE3o apenas atualizar\xE1 os campos passados. "),t(),s(37,"app-code-block",2),t()),o&2&&(n(23),r("code",m.createMethodCode),n(6),r("code",m.saveMethodCode),n(8),r("code",m.updateExample))},dependencies:[l],encapsulation:2})}return i})();export{E as PersistingDataComponent};
//# sourceMappingURL=chunk-DTUEFBJB.js.map
