(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-52ce70ed"],{"0f4d":function(t,e,n){t.exports=n.p+"img/core.119d12d8.png"},"10e9":function(t,e,n){t.exports=n.p+"img/hiit.6bb2f852.png"},2809:function(t,e,n){"use strict";var i=n("996b"),o=n.n(i);o.a},3368:function(t,e,n){t.exports=n.p+"img/boxing.863323aa.png"},"5ede":function(t,e,n){"use strict";e["a"]={methods:{isImageUrl:function(t){var e=new RegExp("https://");return e.test(t)},getImage:function(t){return this.isImageUrl(t.imageUrl)?t.imageUrl:"".concat("https://fit-training.herokuapp.com/uploads/").concat(t.image.filename)},getSportImage:function(t){var e=t.toLowerCase();return n("90f8")("./".concat(e,".png"))},setLoopInVideo:function(t){var e=t.split("embed/")[1];return"".concat(t,"?version=3&loop=1&playlist=").concat(e)}}}},"90f8":function(t,e,n){var i={"./boxing.png":"3368","./core.png":"0f4d","./fitness.png":"e20d","./hiit.png":"10e9"};function o(t){var e=a(t);return n(e)}function a(t){if(!n.o(i,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return i[t]}o.keys=function(){return Object.keys(i)},o.resolve=a,t.exports=o,o.id="90f8"},"996b":function(t,e,n){},d302:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ft-exercise-card grid"},[n("modal-poll",{attrs:{modal:t.modalPoll,position:"bottom",direction:"right"},on:{close:function(e){return t.onCloseModal(e)}}},[n("template",{slot:"header"},[n("h3",{staticClass:"mb-0"},[t._v(t._s(t.data.name))])]),n("template",{slot:"body"},[n("exercise-detail",{attrs:{info:t.data},on:{submitStatus:function(e){return t.onCloseModal(e)}}})],1)],2),n("figure",{class:t.effectClass},[n("img",{attrs:{src:t.getImage(t.data),alt:"image url"}}),n("figcaption",[n("h6",{staticClass:"ft-exercise-card__figcaption-name"},[t._v(t._s(t.data.name))]),n("div",{staticClass:"ft-exercise-card__action"},[n("div",{staticClass:"d-flex"},[n("div",{on:{click:function(e){return t.showExercise()}}},[n("mdb-icon",{staticClass:"ft-card__icon",attrs:{icon:"info-circle",size:"6x"}})],1),n("div",{staticClass:"ft-exercise-card__action--move"},[n("mdb-icon",{staticClass:"ft-card__icon draggable-handle",attrs:{icon:"arrows-alt",size:"7x"}})],1),n("div",{on:{click:function(e){return t.shareExercise()}}},[n("mdb-icon",{staticClass:"ft-card__icon",attrs:{icon:"share-alt",size:"6x"}})],1)])])])])],1)},o=[],a=n("91c9"),c=n("5ede"),s=function(){return n.e("chunk-5fd74178").then(n.bind(null,"fcd6"))},r=function(){return n.e("chunk-ed8f897e").then(n.bind(null,"3e8b"))},l={name:"exercise-card-animation",props:{data:{type:Object},effect:{type:String,default:"sadie"}},mixins:[c["a"]],components:{ExerciseDetail:r,ModalPoll:s,mdbIcon:a["mdbIcon"]},data:function(){return{modalPoll:!1}},computed:{effectClass:function(){return"effect-".concat(this.effect)}},methods:{onCloseModal:function(t){this.modalPoll=t},showExercise:function(){this.modalPoll=!0},shareExercise:function(){}}},d=l,f=(n("2809"),n("2877")),u=Object(f["a"])(d,i,o,!1,null,"76fd0a76",null);e["default"]=u.exports},e20d:function(t,e,n){t.exports=n.p+"img/fitness.20309555.png"}}]);
//# sourceMappingURL=chunk-52ce70ed.1987a433.js.map