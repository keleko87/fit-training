(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5ec1127a"],{"0d77":function(t,n,o){t.exports=o.p+"img/boxing.bb9ac4d1.png"},"0f4d":function(t,n,o){t.exports=o.p+"img/core.119d12d8.png"},"10e9":function(t,n,o){t.exports=o.p+"img/hiit.6bb2f852.png"},"320a":function(t,n,o){var e={"./boxing.png":"0d77","./core.png":"5b20","./fitness.png":"64b1","./hiit.png":"347a"};function i(t){var n=a(t);return o(n)}function a(t){if(!o.o(e,t)){var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}return e[t]}i.keys=function(){return Object.keys(e)},i.resolve=a,t.exports=i,i.id="320a"},3368:function(t,n,o){t.exports=o.p+"img/boxing.863323aa.png"},"347a":function(t,n,o){t.exports=o.p+"img/hiit.c9a0897a.png"},"3e88":function(t,n,o){"use strict";o.r(n);var e=function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{staticClass:"ft-exercise-card grid"},[o("modal-poll",{attrs:{modal:t.modalPoll,position:"bottom",direction:"bottom"},on:{close:function(n){return t.onCloseModal(n)}}},[o("template",{slot:"header"},[o("h3",{staticClass:"mb-0"},[t._v(t._s(t.data.name))])]),o("template",{slot:"body"},[t.isWorkout?t._e():o("workout-detail",{attrs:{info:t.data},on:{submitStatus:function(n){return t.onCloseModal(n)}}})],1)],2),o("figure",{class:t.effectClass},[o("img",{attrs:{src:t.getSportImage(t.data.sport),alt:"image url"}}),o("figcaption",[o("h6",{staticClass:"ft-exercise-card__figcaption-name"},[t._v(t._s(t.data.name))]),o("div",{staticClass:"ft-exercise-card__action"},[o("div",{staticClass:"d-flex"},[o("div",{on:{click:function(n){return t.showWorkout()}}},[o("mdb-icon",{staticClass:"ft-card__icon",attrs:{icon:"info-circle",size:"6x"}})],1),o("div",{staticClass:"ft-exercise-card__action--move"},[o("mdb-icon",{staticClass:"ft-card__icon draggable-handle",attrs:{icon:"arrows-alt",size:"7x"}})],1),o("div",{on:{click:function(n){return t.shareWorkout()}}},[o("mdb-icon",{staticClass:"ft-card__icon",attrs:{icon:"share-alt",size:"6x"}})],1)])])])])],1)},i=[],a=o("91c9"),r=o("5ede"),c=function(){return o.e("chunk-1de067aa").then(o.bind(null,"7b4d"))},s=function(){return o.e("chunk-5fd74178").then(o.bind(null,"fcd6"))},u={name:"workout-card-animation",props:{data:{type:Object},effect:{type:String,default:"sadie"}},mixins:[r["a"]],components:{WorkoutDetail:c,ModalPoll:s,mdbIcon:a["mdbIcon"]},data:function(){return{modalPoll:!1}},computed:{effectClass:function(){return"effect-".concat(this.effect)},isWorkout:function(){return"exercise"===this.type}},methods:{onCloseModal:function(t){this.modalPoll=t},showWorkout:function(){this.modalPoll=!0},shareWorkout:function(){}}},f=u,d=(o("dea0"),o("2877")),l=Object(d["a"])(f,e,i,!1,null,"017b3330",null);n["default"]=l.exports},"5b20":function(t,n,o){t.exports=o.p+"img/core.67f8544d.png"},"5ede":function(t,n,o){"use strict";n["a"]={methods:{isImageUrl:function(t){var n=new RegExp("https://");return n.test(t)},getImage:function(t){return this.isImageUrl(t.imageUrl)?t.imageUrl:"".concat("https://fit-training.herokuapp.com/uploads/").concat(t.image.filename)},defaultExerciseImage:function(t,n){var e=n&&n.sport?n.sport.toLowerCase():"boxing",i=o("320a")("./".concat(e,".png"));t.target.src=i},getSportImage:function(t){var n=t.toLowerCase();return o("90f8")("./".concat(n,".png"))},setLoopInVideo:function(t){var n=t.split("embed/")[1];return"".concat(t,"?version=3&loop=1&playlist=").concat(n)}}}},"64b1":function(t,n,o){t.exports=o.p+"img/fitness.ffdbffb8.png"},"80e7":function(t,n,o){},"90f8":function(t,n,o){var e={"./boxing.png":"3368","./core.png":"0f4d","./fitness.png":"e20d","./hiit.png":"10e9"};function i(t){var n=a(t);return o(n)}function a(t){if(!o.o(e,t)){var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}return e[t]}i.keys=function(){return Object.keys(e)},i.resolve=a,t.exports=i,i.id="90f8"},dea0:function(t,n,o){"use strict";var e=o("80e7"),i=o.n(e);i.a},e20d:function(t,n,o){t.exports=o.p+"img/fitness.20309555.png"}}]);
//# sourceMappingURL=chunk-5ec1127a.4b3d0fcf.js.map