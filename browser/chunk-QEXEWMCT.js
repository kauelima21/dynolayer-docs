import{a as s}from"./chunk-CHCN75MF.js";import{Aa as o,Ba as t,Ca as i,Da as n,Ka as e,la as a,ta as m}from"./chunk-JK3SF23V.js";import"./chunk-JL6EIR4O.js";var E=(()=>{class r{allMethodExample=`
    users = User.all()

    print(users) # [{"id": 1, "first_name": "John"}, ...]
  `;findMethodExample=`
    user = User.find({"id": 1})

    print(isinstance(user, User)) # True
  `;queryBuilder=`
    users = User.where("status", "active").and_where("email", "begins_with", "contact").fetch()

    print(users) # [{"id": 1, "first_name": "John"}, ...]
  `;queryBuilderIndex=`
    users = User.where("role", "admin").and_where("email", "begins_with", "contact").index("role-email-index").fetch()

    print(users) # [{"id": 1, "first_name": "John"}, ...]
  `;static \u0275fac=function(l){return new(l||r)};static \u0275cmp=m({type:r,selectors:[["app-retrieving-data"]],decls:67,vars:4,consts:[[1,"flex","flex-col","gap-5","mb-6","text-zinc-800"],[1,"font-semibold","text-2xl"],[3,"code"],[1,"list-disc","pl-6"]],template:function(l,d){l&1&&(t(0,"section",0)(1,"h2",1),e(2,"Introdu\xE7\xE3o"),i(),t(3,"p"),e(4," Existem algumas formas de realizar consultas com o DynoLayer, onde, dependendo do caso de uso, ser\xE1 aplicado uma opera\xE7\xE3o de "),t(5,"b"),e(6,"query"),i(),e(7," ou "),t(8,"b"),e(9,"scan"),i(),e(10," contra a tabela. "),i(),t(11,"p"),e(12,"Abaixo, haver\xE3o exemplos de como implementar ambos os casos."),i(),t(13,"h2",1),e(14,"Resgatando todos o itens da tabela"),i(),t(15,"p"),e(16,' Para realizar um "full scan", usa-se o m\xE9todo '),t(17,"b"),e(18,"all"),i(),e(19,", que realizar\xE1 uma opera\xE7\xE3o de scan paginando todos os registros e retornando uma lista de dicion\xE1rios. "),i(),n(20,"app-code-block",2),t(21,"h2",1),e(22,"Realizando busca por chave prim\xE1ria"),i(),t(23,"p"),e(24," Para resgatar um registro atrav\xE9s de sua chave prim\xE1ria (simples ou composta), usa-se o m\xE9todo "),t(25,"b"),e(26,"find"),i(),e(27,", o qual retorna uma nova inst\xE2ncia da model com os dados resgatados. "),i(),n(28,"app-code-block",2),t(29,"h2",1),e(30,"Buscando com filtros"),i(),t(31,"p"),e(32," Para realizar opera\xE7\xF5es de filtro, usa-se o m\xE9todo "),t(33,"b"),e(34,"where"),i(),e(35,", com o qual \xE9 poss\xEDvel construir um query builder encadeando m\xE9todos. "),i(),t(36,"p"),e(37," Ao final, deve-se especificar o m\xE9todo "),t(38,"b"),e(39,"fetch"),i(),e(40," para queries ou p "),t(41,"b"),e(42,"get"),i(),e(43," para scans."),n(44,"br"),e(45," Caso os campos usados nos filtros n\xE3o fa\xE7am parte de nenhuma chave, o m\xE9todo chamado ser\xE1 o get. "),i(),n(46,"app-code-block",2),t(47,"p"),e(48,"Tamb\xE9m \xE9 poss\xEDvel indicar qual o index que deve ser usado na que ry:"),i(),n(49,"app-code-block",2),t(50,"div"),e(51," Outros m\xE9todos aceitos no query builder: "),t(52,"ul",3)(53,"li"),e(54,"or_where"),i(),t(55,"li"),e(56,"where_not"),i(),t(57,"li"),e(58,"or_where_not"),i(),t(59,"li"),e(60,"where_in"),i(),t(61,"li"),e(62,"where_between"),i(),t(63,"li"),e(64,"limit"),i(),t(65,"li"),e(66,"attributes_to_get"),i()()()()),l&2&&(a(20),o("code",d.allMethodExample),a(8),o("code",d.findMethodExample),a(18),o("code",d.queryBuilder),a(3),o("code",d.queryBuilderIndex))},dependencies:[s],encapsulation:2})}return r})();export{E as RetrievingDataComponent};
//# sourceMappingURL=chunk-QEXEWMCT.js.map
