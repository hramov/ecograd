(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5a1c065c","chunk-d1bd29ae"],{"22ac":function(e,t,c){"use strict";c("e1f7")},"4c53":function(e,t,c){"use strict";var r=c("23e7"),n=c("857a"),a=c("af03");r({target:"String",proto:!0,forced:a("sub")},{sub:function(){return n(this,"sub","","")}})},"6bbc":function(e,t,c){"use strict";c.r(t);c("4c53");var r=c("7a23"),n={key:0,style:{"margin-top":"50px"},class:"container"},a=Object(r["m"])("div",{class:"alert alert-warning",role:"alert"}," Для того, чтобы получить возможность добавлять заказы необходимо заключить договор. Далее вам будет предоставлен доступ к системе ",-1),o={key:1,class:"add-project-contaider"},i=Object(r["m"])("h2",{style:{"text-align":"center"}},"Добавить объект",-1),s={class:"project-name"},d=Object(r["m"])("h4",{style:{"margin-left":"10px"}},"Описание",-1),l={key:0,style:{margin:"0px -10px 20px 10px"}},u=Object(r["m"])("label",null,"Заявление на проведение экспертизы",-1),b=Object(r["m"])("option",{disabled:"",value:"0"},"Вид экспертизы",-1),j=Object(r["m"])("option",{value:"1"},"Результаты инженерно-экологических изысканий (РИИ)",-1),p=Object(r["m"])("option",{value:"2"},"Проектная документация (ПД)",-1),O=Object(r["m"])("option",{value:"3"},"РИИ и ПД",-1),m=Object(r["m"])("option",{disabled:"",value:"0"},"Тип объекта",-1),f=Object(r["m"])("option",{value:"1"},"Объект капитального строительства",-1),h=Object(r["m"])("option",{value:"2"},"Линейный объект",-1),g={key:0,class:"add-project-form"},y=Object(r["m"])("h4",null,"Разделы",-1),v={class:"add-project-checkbox"},k={class:"add-project-checkbox-up"},x={key:0,class:"add-project-checkbox-up-text"},w={class:"add-project-checkbox-text"},B={class:"form-check-label",for:"flexCheckChecked"},C={class:"add-project-input-up"},I={key:1,class:"accordion accordion-flush",id:"accordionExample"},S={class:"accordion-item"},D={class:"accordion-header",style:{width:"99.2%",margin:"8px 0"},id:"headingTwo"},U={class:"accordion-button collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#collapseTwo","aria-expanded":"false","aria-controls":"collapseTwo"},_={id:"collapseTwo",class:"accordion-collapse collapse collapse-margin","aria-labelledby":"headingTwo","data-bs-parent":"#accordionExample"},F={class:"accordion-body-text"},q={class:"form-check-label",for:"flexCheckChecked"},T={class:"accordion-body-input"},A={key:0,style:{"text-align":"center"}},R=Object(r["m"])("button",{class:"btn",type:"submit",style:{width:"20%","font-weight":"bold","background-color":"#7DCE94"}}," Добавить ",-1),V={key:1,style:{width:"60%",margin:"0 auto"}},P=Object(r["m"])("div",{class:"alert alert-danger",role:"alert"}," Ошибка при загрузке секций ",-1);function E(e,t,c,E,L,N){return e.getUser?(Object(r["B"])(),Object(r["i"])("div",o,[i,Object(r["m"])("form",{class:"add-project-contaider-colum",onSubmit:t[11]||(t[11]=Object(r["cb"])((function(){return e.createOrder&&e.createOrder.apply(e,arguments)}),["prevent"]))},[Object(r["m"])("div",s,[d,Object(r["bb"])(Object(r["m"])("textarea",{style:{resize:"none"},rows:"3",placeholder:"Введите название проектной документации...",class:"form-control form-margin-texarea","onUpdate:modelValue":t[1]||(t[1]=function(t){return e.order.title=t}),onInput:t[2]||(t[2]=function(t){return e.isNameInput=!0}),onEmptied:t[3]||(t[3]=function(t){return e.isNameInput=!1}),required:""},null,544),[[r["V"],e.order.title]]),e.isNameInput?(Object(r["B"])(),Object(r["i"])("div",l,[u,Object(r["m"])("input",{type:"file",class:"form-control form-size",onChange:t[4]||(t[4]=function(t){e.isFileLoaded=!0,e.addFile(t,"0")}),required:""},null,32)])):Object(r["j"])("",!0),e.isFileLoaded?Object(r["bb"])((Object(r["B"])(),Object(r["i"])("select",{key:1,style:{width:"100%"},class:"accordion-button collapsed form-control form-margin-texarea form-select",name:"registraistion-name-sex",onChange:t[5]||(t[5]=function(t){e.isTypeSelected=!0,e.loadSections()}),"onUpdate:modelValue":t[6]||(t[6]=function(t){return e.order.exp_type=t}),required:""},[b,j,p,O],544)),[[r["U"],e.order.exp_type]]):Object(r["j"])("",!0),e.isTypeSelected&&"1"!=e.order.exp_type?Object(r["bb"])((Object(r["B"])(),Object(r["i"])("select",{key:2,style:{width:"100%"},class:"accordion-button collapsed form-control form-margin-texarea form-select",name:"registraistion-name-sex","onUpdate:modelValue":t[7]||(t[7]=function(t){return e.order.object_type=t}),onChange:t[8]||(t[8]=function(t){e.isObjectTypeSelected=!0,e.loadSections()}),required:""},[m,f,h],544)),[[r["U"],e.order.object_type]]):Object(r["j"])("",!0),e.isObjectTypeSelected||"1"==e.order.exp_type?Object(r["bb"])((Object(r["B"])(),Object(r["i"])("textarea",{key:3,style:{resize:"none"},rows:"3",placeholder:"Введите шифр проектной документации...",class:"form-control form-margin-texarea","onUpdate:modelValue":t[9]||(t[9]=function(t){return e.order.docs_cipher=t}),required:""},null,512)),[[r["V"],e.order.docs_cipher]]):Object(r["j"])("",!0),e.isObjectTypeSelected||"1"==e.order.exp_type?Object(r["bb"])((Object(r["B"])(),Object(r["i"])("textarea",{key:4,style:{resize:"none"},rows:"3",placeholder:"Введите шифр РИИ...",class:"form-control form-margin-texarea","onUpdate:modelValue":t[10]||(t[10]=function(t){return e.order.rii_cipher=t}),required:""},null,512)),[[r["V"],e.order.rii_cipher]]):Object(r["j"])("",!0)]),e.isShowSections?(Object(r["B"])(),Object(r["i"])("div",g,[y,Object(r["m"])("div",v,[Object(r["m"])("div",k,[(Object(r["B"])(!0),Object(r["i"])(r["a"],null,Object(r["I"])(e.sections,(function(t,c){return Object(r["B"])(),Object(r["i"])("div",{class:"add-project-checkbox-up-text",key:c},[t.sub?(Object(r["B"])(),Object(r["i"])("div",I,[Object(r["m"])("div",S,[Object(r["m"])("h2",D,[Object(r["m"])("button",U,Object(r["O"])(t.code)+" "+Object(r["O"])(t.title),1)]),Object(r["m"])("div",_,[(Object(r["B"])(!0),Object(r["i"])(r["a"],null,Object(r["I"])(t.sub,(function(t,c){return Object(r["B"])(),Object(r["i"])("div",{class:"accordion-body",key:c},[Object(r["m"])("div",F,[Object(r["m"])("p",null,[Object(r["m"])("label",q,[Object(r["bb"])(Object(r["m"])("input",{class:"form-check-input ",type:"checkbox",id:"flexCheckChecked","onUpdate:modelValue":function(e){return t.checked=e}},null,8,["onUpdate:modelValue"]),[[r["T"],t.checked]]),Object(r["l"])(" "+Object(r["O"])(t.code)+" "+Object(r["O"])(t.title),1)])])]),Object(r["m"])("div",T,[Object(r["m"])("input",{name:"myFile",type:"file",class:"form-control form-size",disabled:!t.checked,ref:t.code,onChange:function(c){return e.addFile(c,t.code)}},null,40,["disabled","onChange"])])])})),128))])])])):(Object(r["B"])(),Object(r["i"])("div",x,[Object(r["m"])("div",w,[Object(r["m"])("label",B,[Object(r["bb"])(Object(r["m"])("input",{class:"form-check-input",type:"checkbox",id:"flexCheckChecked","onUpdate:modelValue":function(e){return t.checked=e}},null,8,["onUpdate:modelValue"]),[[r["T"],t.checked]]),Object(r["l"])(" "+Object(r["O"])(t.code)+" "+Object(r["O"])(t.title),1)])]),Object(r["m"])("div",C,[Object(r["m"])("input",{type:"file",class:"form-control form-size",disabled:!t.checked,ref:t.code,onChange:function(c){return e.addFile(c,t.code)}},null,40,["disabled","onChange"])])]))])})),128))])]),e.sections.length?(Object(r["B"])(),Object(r["i"])("div",A,[R])):(Object(r["B"])(),Object(r["i"])("div",V,[P]))])):Object(r["j"])("",!0)],32)])):(Object(r["B"])(),Object(r["i"])("div",n,[a]))}var L=c("b85c"),N=c("1da1"),H=c("5530"),z=(c("4de4"),c("d3b7"),c("ddb0"),c("96cf"),c("e394")),J=c("5c40"),M=c("5502"),$=Object(J["o"])({name:"AddProject",data:function(){return{order:{exp_type:0,object_type:0},sections:[],formData:new FormData,isNameInput:!1,isFileLoaded:!1,isTypeSelected:!1,isObjectTypeSelected:!1}},computed:Object(H["a"])(Object(H["a"])({},Object(M["c"])(["getUser"])),{},{isShowSections:function(){return this.isNameInput&&this.isFileLoaded&&this.isTypeSelected&&(this.isObjectTypeSelected||1==this.order.exp_type)}}),methods:{loadSections:function(){var e=this;return Object(N["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,z["a"].get("/order/sections-dict/"+e.order.exp_type+"/"+e.order.object_type);case 2:e.sections=t.sent;case 3:case"end":return t.stop()}}),t)})))()},createOrder:function(){var e=this;return Object(N["a"])(regeneratorRuntime.mark((function t(){var c,r,n,a,o,i,s,d;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.checkSubsection(),c=e.sections.filter((function(e){return e.checked})),0!=c.length){t.next=5;break}return alert("Необходимо загрузить хотя бы один раздел!"),t.abrupt("return");case 5:e.formData.append("0","Заявление на проведение экспертизы"),r=Object(L["a"])(c);try{for(r.s();!(n=r.n()).done;){if(a=n.value,a.sub){o=Object(L["a"])(a.sub);try{for(o.s();!(i=o.n()).done;)s=i.value,e.formData.append(s.code,s.title)}catch(l){o.e(l)}finally{o.f()}}e.formData.append(a.code,a.title)}}catch(l){r.e(l)}finally{r.f()}if(e.isFormDataHasItems(e.formData)){t.next=11;break}return alert("Необходимо выбрать хотя бы один раздел"),t.abrupt("return");case 11:return t.next=13,z["a"].post("/order",e.order);case 13:if(d=t.sent,d.id){t.next=16;break}return t.abrupt("return");case 16:return t.next=18,z["a"].post("/order/upload-file/"+d.id,e.formData);case 18:t.sent,e.formData=new FormData,alert("Проект успешно добавлен"),e.$emit("add-project",!0),e.order={},e.sections=[];case 24:case"end":return t.stop()}}),t)})))()},checkSubsection:function(){var e,t=this.sections.filter((function(e){return e.sub})),c=Object(L["a"])(t);try{for(c.s();!(e=c.n()).done;){var r=e.value;r.sub.filter((function(e){return e.checked})).length>0?(r.checked=!0,r.sub=r.sub.filter((function(e){return e.checked}))):r.checked=!1}}catch(n){c.e(n)}finally{c.f()}},addFile:function(e,t){var c=e.target;this.formData.append(t,c.files[0])},isFormDataHasItems:function(e){var t,c=0,r=Object(L["a"])(e.values());try{for(r.s();!(t=r.n()).done;){var n=t.value;n&&c++}}catch(a){r.e(a)}finally{r.f()}return!!c},showFormData:function(e){var t,c=Object(L["a"])(e.values());try{for(c.s();!(t=c.n()).done;){var r=t.value;console.log(r)}}catch(n){c.e(n)}finally{c.f()}}}});$.render=E;t["default"]=$},c889:function(e,t,c){"use strict";c.r(t);var r=c("7a23");function n(e,t,c,n,a,o){var i=Object(r["J"])("Orders"),s=Object(r["J"])("BuyModal");return Object(r["B"])(),Object(r["i"])("div",null,[Object(r["m"])(i),Object(r["m"])(s)])}c("caad"),c("2532"),c("d81d"),c("4c53");var a={class:"client-orders"},o={key:0,class:"alert alert-warning",role:"alert",style:{width:"50%",margin:"0 auto","text-align":"center"}},i={key:1},s={class:"project"},d={class:"add-project-container"},l={class:"list-group"},u=Object(r["m"])("div",{class:"divider"},null,-1),b={key:1,class:"info-project-container"},j={style:{margin:"0 auto","margin-bottom":"30px"}},p={key:0,style:{width:"100%","margin-left":"10px","margin-bottom":"30px"}},O=Object(r["m"])("h4",null,"Загруженные справки о внесении изменений",-1),m={class:"table"},f=Object(r["m"])("thead",null,[Object(r["m"])("tr",null,[Object(r["m"])("th",{scope:"col"},"№"),Object(r["m"])("th",{scope:"col"},"Документ"),Object(r["m"])("th",{scope:"col"},"Дата загрузки")])],-1),h={scope:"row"},g={style:{display:"flex"}},y={key:1,class:"existing-project"},v={class:"list-group"},k=Object(r["m"])("h4",null,"Загруженные разделы",-1),x=Object(r["m"])("button",null," Добавить раздел ",-1),w={key:2,class:"add-project-form",style:{width:"65%"}},B=Object(r["m"])("h4",null,"Доступные разделы",-1),C={class:"add-project-checkbox"},I={class:"add-project-checkbox-up"},S={key:0,class:"add-project-checkbox-up-text"},D={class:"add-project-checkbox-text"},U={class:"form-check-label",for:"flexCheckChecked",style:{"text-align":"left"}},_={class:"add-project-input-up"},F={key:1,class:"accordion accordion-flush",id:"accordionExample"},q={class:"accordion-item"},T={class:"accordion-header",id:"headingTwo"},A={class:"accordion-button collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#collapseTwo","aria-expanded":"false","aria-controls":"collapseTwo"},R={id:"collapseTwo",class:"accordion-collapse collapse collapse-margin","aria-labelledby":"headingTwo","data-bs-parent":"#accordionExample"},V={class:"accordion-body-text"},P={class:"form-check-label",for:"flexCheckChecked",style:{"text-align":"left"}},E={class:"accordion-body-input"},L={key:0,style:{"text-align":"center"}},N={key:3,class:"project-status"},H={class:"project-status-chapter"},z={class:"list-group"},J={style:{"text-align":"center"}},M={key:0,class:"list-group-item list-group-item-action file-data"},$={key:0,class:"project-status-button"};function G(e,t,c,n,G,K){var Q=Object(r["J"])("AddOrder");return Object(r["B"])(),Object(r["i"])("section",a,[e.getIsExpert&&!e.orders.length?(Object(r["B"])(),Object(r["i"])("div",o," Пока нет назначенных проектов ")):(Object(r["B"])(),Object(r["i"])("div",i,[Object(r["m"])("div",s,[Object(r["m"])("div",d,[Object(r["m"])("ul",l,[e.getIsClient?(Object(r["B"])(),Object(r["i"])("button",{key:0,type:"button",class:"add-project-bt btn list-group-item-action",onClick:t[1]||(t[1]=function(t){return e.addProject=!0})}," Добавить объект ")):Object(r["j"])("",!0),(Object(r["B"])(!0),Object(r["i"])(r["a"],null,Object(r["I"])(e.orders,(function(t){return Object(r["B"])(),Object(r["i"])("li",{style:{cursor:"pointer"},class:["list-group-item list-group-item-action list-project-color",{selected:e.selectedId==t.id}],onClick:function(c){e.addProject=!1,e.selectedId!=t.id&&e.chooseOrder(t.id)},key:t.id},[e.changes.map((function(e){return e.order_id})).includes(t.id)?(Object(r["B"])(),Object(r["i"])("img",{key:0,align:"left",src:e.getBackendURL()+"public/img/change.png",style:{width:"20px"}},null,8,["src"])):Object(r["j"])("",!0),Object(r["l"])(" "+Object(r["O"])(t.title),1)],10,["onClick"])})),128))])]),u,e.addProject?(Object(r["B"])(),Object(r["i"])(Q,{key:0,style:{width:"75%"},onAddProject:e.addProjectHandler},null,8,["onAddProject"])):Object(r["j"])("",!0),e.order.id&&!e.addProject?(Object(r["B"])(),Object(r["i"])("div",b,[Object(r["m"])("h2",j,Object(r["O"])(e.order.title),1),e.addProject?Object(r["j"])("",!0):(Object(r["B"])(),Object(r["i"])("div",p,[O,Object(r["m"])("table",m,[f,Object(r["m"])("tbody",null,[(Object(r["B"])(!0),Object(r["i"])(r["a"],null,Object(r["I"])(e.inquires,(function(t,c){return Object(r["B"])(),Object(r["i"])("tr",{key:c},[Object(r["m"])("th",h,Object(r["O"])(c+1),1),Object(r["m"])("td",null,[Object(r["m"])("a",{href:e.apiUrl+t.path},Object(r["O"])(t.title),9,["href"])]),Object(r["m"])("td",null,Object(r["O"])(t.createdAt),1)])})),128))])]),Object(r["m"])("div",g,[Object(r["m"])("input",{type:"file",class:"form-control",ref:e.section.code,onChange:t[2]||(t[2]=function(t){e.addInquireFile(t,"inquire"),e.inquireAttached=!0}),style:{width:"40%"}},null,544),Object(r["m"])("button",{class:"btn",style:{"background-color":"#7DCE94","font-weight":"bold","margin-left":"20px"},onClick:t[3]||(t[3]=function(){return e.addInquire&&e.addInquire.apply(e,arguments)}),disabled:!e.inquireAttached}," Загрузить ",8,["disabled"])])])),e.addProject?Object(r["j"])("",!0):(Object(r["B"])(),Object(r["i"])("div",y,[Object(r["m"])("ul",v,[k,(Object(r["B"])(!0),Object(r["i"])(r["a"],null,Object(r["I"])(e.sections,(function(t){return Object(r["B"])(),Object(r["i"])("li",{class:["list-group-item list-group-item-action color-selection",{green:"done"==t.status,yellow:"taken"==t.status,grey:"new"==t.status,selected:e.selectedSectionId==t.id}],style:{"text-align":"justify","word-wrap":"break-word"},key:t.id,onClick:function(c){return e.selectedSectionId!=t.id?e.chooseSection(t.id):null}},[e.changes.map((function(e){return e.section_id})).includes(t.id)?(Object(r["B"])(),Object(r["i"])("img",{key:0,align:"left",src:e.getBackendURL()+"public/img/change.png",style:{width:"20px","margin-right":"10px"}},null,8,["src"])):Object(r["j"])("",!0),Object(r["l"])(" "+Object(r["O"])(t.arrange)+" "+Object(r["O"])(t.title),1)],10,["onClick"])})),128)),e.getIsClient&&e.sectionsToAdd.length>0?(Object(r["B"])(),Object(r["i"])("li",{key:0,class:"list-group-item list-group-item-action add-project-bt",style:{"text-align":"center"},onClick:t[4]||(t[4]=function(t){return e.showAddSection=!0})},[x])):Object(r["j"])("",!0)])])),e.order.object_type&&e.order.exp_type&&e.showAddSection&&!e.addProject?(Object(r["B"])(),Object(r["i"])("div",w,[B,Object(r["m"])("div",C,[Object(r["m"])("div",I,[(Object(r["B"])(!0),Object(r["i"])(r["a"],null,Object(r["I"])(e.sectionsToAdd,(function(t){return Object(r["B"])(),Object(r["i"])("div",{class:"add-project-checkbox-up-text",key:t.code},[t.sub?(Object(r["B"])(),Object(r["i"])("div",F,[Object(r["m"])("div",q,[Object(r["m"])("h2",T,[Object(r["m"])("button",A,Object(r["O"])(t.code)+" "+Object(r["O"])(t.title),1)]),Object(r["m"])("div",R,[(Object(r["B"])(!0),Object(r["i"])(r["a"],null,Object(r["I"])(t.sub,(function(t,c){return Object(r["B"])(),Object(r["i"])("div",{class:"accordion-body",key:c},[Object(r["m"])("div",V,[Object(r["m"])("label",P,[Object(r["bb"])(Object(r["m"])("input",{class:"form-check-input ",type:"checkbox",id:"flexCheckChecked","onUpdate:modelValue":function(e){return t.checked=e}},null,8,["onUpdate:modelValue"]),[[r["T"],t.checked]]),Object(r["l"])(" "+Object(r["O"])(t.code)+" "+Object(r["O"])(t.title),1)])]),Object(r["m"])("div",E,[Object(r["m"])("input",{name:"myFile",type:"file",class:"form-control form-size",disabled:!t.checked,ref:t.code,onChange:function(c){return e.addFile(c,t.code)}},null,40,["disabled","onChange"])])])})),128))])])])):(Object(r["B"])(),Object(r["i"])("div",S,[Object(r["m"])("div",D,[Object(r["m"])("label",U,[Object(r["bb"])(Object(r["m"])("input",{class:"form-check-input",type:"checkbox",id:"flexCheckChecked","onUpdate:modelValue":function(e){return t.checked=e}},null,8,["onUpdate:modelValue"]),[[r["T"],t.checked]]),Object(r["l"])(" "+Object(r["O"])(t.code)+" "+Object(r["O"])(t.title),1)])]),Object(r["m"])("div",_,[Object(r["m"])("input",{type:"file",class:"form-control form-size",disabled:!t.checked,ref:t.code,onChange:function(c){return e.addFile(c,t.code)}},null,40,["disabled","onChange"])])]))])})),128))])]),e.sections.length?(Object(r["B"])(),Object(r["i"])("div",L,[Object(r["m"])("button",{style:{"text-align":"center",width:"20%"},class:"btn btn-success",onClick:t[5]||(t[5]=function(){return e.addSection&&e.addSection.apply(e,arguments)})}," Добавить ")])):Object(r["j"])("",!0)])):Object(r["j"])("",!0),!e.section.id||e.showAddSection||e.addProject?Object(r["j"])("",!0):(Object(r["B"])(),Object(r["i"])("div",N,[Object(r["m"])("div",H,[Object(r["m"])("ul",z,[Object(r["m"])("h4",J,Object(r["O"])(e.section.title),1),(Object(r["B"])(!0),Object(r["i"])(r["a"],null,Object(r["I"])(e.attaches,(function(t){return Object(r["B"])(),Object(r["i"])("li",{class:"list-group-item list-group-item-action file-data",key:t.id},[Object(r["m"])("a",{href:e.getDownloadURL(t.path)},[Object(r["m"])("span",null,Object(r["O"])(e.changes.map((function(e){return e.attach_id})).includes(t.id)?"*":"")+" "+Object(r["O"])(t.title),1)],8,["href"]),Object(r["m"])("span",null,Object(r["O"])(new Date(t.createdAt).toLocaleDateString())+" "+Object(r["O"])(new Date(t.createdAt).toLocaleTimeString()),1)])})),128)),"done"!=e.section.status?(Object(r["B"])(),Object(r["i"])("li",M,[Object(r["m"])("input",{type:"file",class:"form-control",style:{"margin-top":"20px"},ref:e.section.code,onChange:t[6]||(t[6]=function(t){return e.addFile(t,e.section.arrange)})},null,544)])):Object(r["j"])("",!0)]),"done"!=e.section.status?(Object(r["B"])(),Object(r["i"])("div",$,[Object(r["m"])("button",{type:"button",class:"add-project-bt btn",style:{"margin-right":"20px"},onClick:t[7]||(t[7]=function(){return e.addAttach&&e.addAttach.apply(e,arguments)})}," Загрузить документ "),e.getIsExpert?(Object(r["B"])(),Object(r["i"])("button",{key:0,class:"btn btn-success",onClick:t[8]||(t[8]=function(t){return e.setSectionDone(e.section.id)})}," Отметить законченным ")):Object(r["j"])("",!0)])):Object(r["j"])("",!0)])]))])):Object(r["j"])("",!0)])]))])}var K=c("b85c"),Q=c("1da1"),W=c("5530"),X=(c("4de4"),c("a9e3"),c("4e82"),c("d3b7"),c("ddb0"),c("96cf"),c("e394")),Y=c("5c40"),Z=c("5502"),ee=c("660d"),te=c("6bbc"),ce=Object(Y["o"])({components:{BuyButton:ee["a"],AddOrder:te["default"]},data:function(){return{orders:[],order:{},section:{},showAddSection:!1,sections:[],sectionsToAdd:[],attaches:[],formData:new FormData,fileInquireUpload:{},inquiryForm:new FormData,fileUpload:{},inquireAttached:!1,changes:[{order_id:0,section_id:0,attach_id:0}],selectedId:0,selectedSectionId:0,inquires:[],addProject:!1}},computed:Object(W["a"])(Object(W["a"])({},Object(Z["c"])(["getIsExpert","getIsClient"])),{},{apiUrl:function(){return"https://hramovdev.ru:5005/api/"}}),mounted:function(){var e=this;return Object(Q["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getOrders();case 2:case"end":return t.stop()}}),t)})))()},methods:{getOrders:function(){var e=this;return Object(Q["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.getIsExpert){t.next=7;break}return t.next=3,X["a"].get("/order/expert");case 3:return e.orders=t.sent,t.next=6,X["a"].get("/order/check-changes");case 6:e.changes=t.sent;case 7:if(!e.getIsClient){t.next=14;break}return t.next=10,X["a"].get("/order/client");case 10:return e.orders=t.sent,t.next=13,X["a"].get("/order/check-changes");case 13:e.changes=t.sent;case 14:case"end":return t.stop()}}),t)})))()},setSectionDone:function(e){return Object(Q["a"])(regeneratorRuntime.mark((function t(){var c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(c=confirm("Завершить секцию?"),!c){t.next=5;break}return t.next=4,X["a"].patch("/order/change-section-status",e,{new_status:"done"});case 4:alert("Секция помечена как законченная");case 5:case"end":return t.stop()}}),t)})))()},getDownloadURL:function(e){return"https://hramovdev.ru:5005/api/"+e},getBackendURL:function(){return"https://hramovdev.ru:5005/api/"},addSection:function(){var e=this;return Object(Q["a"])(regeneratorRuntime.mark((function t(){var c,r,n,a,o,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:c=Object(K["a"])(e.sectionsToAdd);try{for(c.s();!(r=c.n()).done;){if(n=r.value,n.sub){a=Object(K["a"])(n.sub.filter((function(e){return e.checked})));try{for(a.s();!(o=a.n()).done;)i=o.value,e.formData.append(i.code,i.title)}catch(s){a.e(s)}finally{a.f()}}n.checked&&e.formData.append(n.code,n.title)}}catch(s){c.e(s)}finally{c.f()}if(!e.isFormDataHasItems(e.formData)){t.next=10;break}return t.next=5,X["a"].post("/order/upload-file/"+e.order.id,e.formData);case 5:return e.formData=new FormData,alert("Раздел успешно добавлен"),t.next=9,e.chooseOrder(e.order.id);case 9:e.showAddSection=!1;case 10:case"end":return t.stop()}}),t)})))()},addFile:function(e,t){this.fileUpload=e.target,this.formData.append(t,this.fileUpload.files[0])},addInquireFile:function(e,t){this.fileInquireUpload=e.target,this.inquiryForm.append(t,this.fileInquireUpload.files[0])},addAttach:function(){var e=this;return Object(Q["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.formData.append("order_id",String(e.order.id)),e.formData.append("section_id",String(e.section.id)),t.next=4,X["a"].post("/order/upload-file-for-section",e.formData);case 4:return e.formData=new FormData,t.next=7,X["a"].get("/order/check-changes");case 7:return e.changes=t.sent,alert("Документ успешно загружен"),t.next=11,e.chooseSection(Number(e.section.id));case 11:e.fileUpload.value=null;case 12:case"end":return t.stop()}}),t)})))()},addInquire:function(){var e=this;return Object(Q["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.isFormDataHasItems(e.inquiryForm)){t.next=3;break}return alert("Необходимо прикрепить файл!"),t.abrupt("return");case 3:return e.inquiryForm.append("order_id",String(e.order.id)),t.next=6,X["a"].post("/order/upload-inquire",e.inquiryForm);case 6:return e.inquiryForm=new FormData,alert("Справка успешно загружена"),t.next=10,e.chooseOrder(Number(e.order.id));case 10:e.fileInquireUpload.value=null;case 11:case"end":return t.stop()}}),t)})))()},chooseOrder:function(e){var t=this;return Object(Q["a"])(regeneratorRuntime.mark((function c(){var r,n,a;return regeneratorRuntime.wrap((function(c){while(1)switch(c.prev=c.next){case 0:if(e){c.next=2;break}return c.abrupt("return");case 2:return t.selectedId=e,c.next=5,X["a"].get("/order/"+e);case 5:if(t.order=c.sent,t.order&&t.order.id){c.next=8;break}return c.abrupt("return");case 8:return c.next=10,X["a"].get("/order/expert-for-order/"+t.order.id);case 10:return t.order.expert=c.sent,c.next=13,X["a"].get("/order/inquire/"+t.order.id);case 13:return t.inquires=c.sent,c.next=16,X["a"].get("/order/sections/"+t.order.id);case 16:return t.sections=c.sent.sort((function(e,t){return Number(e.arrange)-Number(t.arrange)>0?1:-1})),c.next=19,X["a"].get("/order/sections-dict/"+t.order.exp_type+"/"+t.order.object_type);case 19:for(r=c.sent,n=t.sections.map((function(e){return e.arrange})),t.sectionsToAdd=[],a=0;a<r.length;a++)n.includes(r[a].code)||(t.sectionsToAdd.push(r[a]),r[a].sub&&(r[a].sub=r[a].sub.filter((function(e){return!n.includes(e.code)})),r[a].sub&&0==r[a].sub.length?t.sectionsToAdd.pop():t.sectionsToAdd[t.sectionsToAdd.length-1].sub=r[a].sub));case 23:case"end":return c.stop()}}),c)})))()},chooseSection:function(e){var t=this;return Object(Q["a"])(regeneratorRuntime.mark((function c(){return regeneratorRuntime.wrap((function(c){while(1)switch(c.prev=c.next){case 0:return t.selectedSectionId=e,t.showAddSection=!1,c.next=4,X["a"].get("/order/section/"+e);case 4:return t.section=c.sent,c.next=7,X["a"].get("/order/attaches-for-section/"+e);case 7:return t.attaches=c.sent,c.next=10,X["a"].get("/order/check-changes");case 10:t.changes=c.sent;case 11:case"end":return c.stop()}}),c)})))()},isFormDataHasItems:function(e){var t,c=0,r=Object(K["a"])(e.values());try{for(r.s();!(t=r.n()).done;){var n=t.value;n&&c++}}catch(a){r.e(a)}finally{r.f()}return!!c},addProjectHandler:function(e){var t=this;return Object(Q["a"])(regeneratorRuntime.mark((function c(){return regeneratorRuntime.wrap((function(c){while(1)switch(c.prev=c.next){case 0:if(1!=e){c.next=4;break}return c.next=3,t.getOrders();case 3:t.addProject=!1;case 4:case"end":return c.stop()}}),c)})))()}}});c("22ac");ce.render=G;var re=ce,ne=(c("b0c0"),{class:"modal fade",id:"buyModal",tabindex:"-1","aria-labelledby":"buyModalLable","aria-hidden":"true"}),ae={class:"modal-dialog"},oe={class:"modal-content"},ie={key:0},se={key:0,class:"alert alert-danger",role:"alert"},de={key:1,class:"alert alert-success",role:"alert"},le=Object(r["l"])(" Ваш заказ успешно отправлен! "),ue={key:0},be=Object(r["m"])("p",null,"Для входа на сайт используйте",-1),je=Object(r["m"])("div",{class:"modal-header"},[Object(r["m"])("h5",{class:"modal-title",id:"buyModalLable"}," Форма оформления заказа на экспертизу "),Object(r["m"])("button",{id:"closeBtn",type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),pe={class:"modal-body"},Oe={class:"form-group"},me={class:"form-group"},fe={class:"form-group"},he={class:"form-group"},ge={class:"form-group"},ye={class:"modal-footer"};function ve(e,t,c,n,a,o){return Object(r["B"])(),Object(r["i"])("div",ne,[Object(r["m"])("div",ae,[Object(r["m"])("div",oe,[e.edited?(Object(r["B"])(),Object(r["i"])("div",ie,[e.status?(Object(r["B"])(),Object(r["i"])("div",de,[le,e.user&&e.user.id?Object(r["j"])("",!0):(Object(r["B"])(),Object(r["i"])("div",ue,[be,Object(r["m"])("p",null,"логин: "+Object(r["O"])(e.tempuser.email),1),Object(r["m"])("p",null,"пароль: "+Object(r["O"])(e.tempuser.password),1)]))])):(Object(r["B"])(),Object(r["i"])("div",se," Ошибка! "+Object(r["O"])(e.error),1))])):Object(r["j"])("",!0),je,Object(r["m"])("div",pe,[Object(r["m"])("form",null,[Object(r["m"])("div",Oe,[e.user.id?Object(r["j"])("",!0):Object(r["bb"])((Object(r["B"])(),Object(r["i"])("input",{key:0,id:"name",type:"text",class:"form-control",placeholder:"* Ваше имя","onUpdate:modelValue":t[1]||(t[1]=function(t){return e.order.name=t}),required:""},null,512)),[[r["V"],e.order.name]])]),Object(r["m"])("div",me,[e.user.id?Object(r["j"])("",!0):Object(r["bb"])((Object(r["B"])(),Object(r["i"])("input",{key:0,id:"email",type:"email",class:"form-control",placeholder:"* Ваш E-mail","onUpdate:modelValue":t[2]||(t[2]=function(t){return e.order.email=t}),required:""},null,512)),[[r["V"],e.order.email]])]),Object(r["m"])("div",fe,[Object(r["bb"])(Object(r["m"])("input",{id:"object",type:"text",class:"form-control",placeholder:"* Объект","onUpdate:modelValue":t[3]||(t[3]=function(t){return e.order.object=t}),required:""},null,512),[[r["V"],e.order.object]])]),Object(r["m"])("div",he,[Object(r["bb"])(Object(r["m"])("select",{class:"form-select","aria-label":"Default select example","onUpdate:modelValue":t[4]||(t[4]=function(t){return e.order.object_type=t})},[Object(r["m"])("option",{value:Number(1)}," Объект капитального строительства ",8,["value"]),Object(r["m"])("option",{value:Number(2)},"Линейный объект",8,["value"])],512),[[r["U"],e.order.object_type]])]),Object(r["m"])("div",ge,[e.user.id?Object(r["j"])("",!0):Object(r["bb"])((Object(r["B"])(),Object(r["i"])("input",{key:0,id:"phone",type:"number",class:"form-control",placeholder:"* Номер телефона","onUpdate:modelValue":t[5]||(t[5]=function(t){return e.order.phone=t}),required:""},null,512)),[[r["V"],e.order.phone]])])])]),Object(r["m"])("div",ye,[Object(r["m"])("a",{class:"btn btn-success",style:{margin:"0 auto",cursor:"pointer"},onClick:t[6]||(t[6]=Object(r["cb"])((function(){return e.sendOrder&&e.sendOrder.apply(e,arguments)}),["prevent"]))},"Отправить")])])])])}var ke=Object(r["n"])({setup:function(){var e=Object(Z["d"])(),t=Object(r["g"])((function(){return e.getters.getUser})),c=Object(r["F"])({userid:t.value?t.value.id:0,name:t.value?t.value.name:"",email:t.value?t.value.email:"",object:"",object_type:1,phone:t.value?t.value.phone:null}),n=Object(r["H"])(!1),a=Object(r["H"])(""),o=Object(r["H"])(!1),i=Object(r["F"])({email:"",password:""}),s=function(){var r=Object(Q["a"])(regeneratorRuntime.mark((function r(){var a,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!t.value.id){r.next=6;break}return r.next=3,e.dispatch("addOrder",{client_id:t.value.id,object:c.object,object_type:c.object_type});case 3:r.t0=r.sent,r.next=9;break;case 6:return r.next=8,e.dispatch("addOrderUnauthorized",{client:{name:c.name,email:c.email,phone:c.phone},order:{object:c.object,object_type:c.object_type}});case 8:r.t0=r.sent;case 9:s=r.t0,n.value=!(null===(a=s.data.order)||void 0===a||!a.id),t.value.id||(i.email=s.data.client.email,i.password=s.data.client.password),o.value=!0,setTimeout((function(){document.getElementById("closeBtn").click()}),1e4);case 14:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}();return{sendOrder:s,status:n,error:a,edited:o,order:c,tempuser:i,user:t}}});ke.render=ve;var xe=ke,we=Object(r["n"])({components:{Orders:re,BuyModal:xe}});we.render=n;t["default"]=we},e1f7:function(e,t,c){}}]);
//# sourceMappingURL=chunk-5a1c065c.c87520b4.js.map