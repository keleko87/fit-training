(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d5a2b52","chunk-5b90e4ae"],{"0d77":function(e,t,n){e.exports=n.p+"img/boxing.bb9ac4d1.png"},"0f4d":function(e,t,n){e.exports=n.p+"img/core.119d12d8.png"},"10e9":function(e,t,n){e.exports=n.p+"img/hiit.6bb2f852.png"},"320a":function(e,t,n){var r={"./boxing.png":"0d77","./core.png":"5b20","./fitness.png":"64b1","./hiit.png":"347a"};function o(e){var t=i(e);return n(t)}function i(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=i,e.exports=o,o.id="320a"},3368:function(e,t,n){e.exports=n.p+"img/boxing.863323aa.png"},"347a":function(e,t,n){e.exports=n.p+"img/hiit.c9a0897a.png"},"5b20":function(e,t,n){e.exports=n.p+"img/core.67f8544d.png"},"5ede":function(e,t,n){"use strict";t["a"]={methods:{isImageUrl:function(e){var t=new RegExp("https://");return t.test(e)},getImage:function(e){return this.isImageUrl(e.imageUrl)?e.imageUrl:"".concat("https://fit-training.herokuapp.com/uploads/").concat(e.image.filename)},defaultExerciseImage:function(e,t){var r=t&&t.sport?t.sport.toLowerCase():"boxing",o=n("320a")("./".concat(r,".png"));e.target.src=o},getSportImage:function(e){var t=e.toLowerCase();return n("90f8")("./".concat(t,".png"))},setLoopInVideo:function(e){var t=e.split("embed/")[1];return"".concat(e,"?version=3&loop=1&playlist=").concat(t)}}}},"64b1":function(e,t,n){e.exports=n.p+"img/fitness.ffdbffb8.png"},"90f8":function(e,t,n){var r={"./boxing.png":"3368","./core.png":"0f4d","./fitness.png":"e20d","./hiit.png":"10e9"};function o(e){var t=i(e);return n(t)}function i(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=i,e.exports=o,o.id="90f8"},b470:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"ft-workout-exercise-card grid",class:[{"current-exercise":e.isCurrentExercise},{"exercise-done":e.exerciseDone}]},[n("ft-modal",{attrs:{size:"lg",modal:e.modalPoll},on:{close:function(t){return e.onCloseModal(t)}}},[n("template",{slot:"header"},[n("h3",{staticClass:"mb-0"},[e._v(e._s(e.data.name))])]),n("template",{slot:"body"},[n("exercise-detail",{attrs:{info:e.data},on:{submitStatus:function(t){return e.onCloseModal(t)}}})],1)],2),n("figure",{class:e.effectClass},[e.data.series&&0!==e.data.series?n("small",{staticClass:"ft-workout-exercise-card__series"},[e._v(e._s(e.data.series))]):e._e(),e.data.reps?n("small",{staticClass:"ft-workout-exercise-card__reps"},[e._v("x"+e._s(e.reps))]):e.data.time&&0!==e.data.time?n("small",{staticClass:"ft-workout-exercise-card__series"},[e._v(e._s(e.time))]):e._e(),n("img",{attrs:{src:e.getImage(e.data),alt:"image url"},on:{error:function(t){return e.defaultExerciseImage(t,e.data)}}}),n("figcaption",[n("h6",{staticClass:"ft-workout-exercise-card__figcaption-name"},[e._v("\n        "+e._s(e.data.name)+"\n      ")]),n("div",{staticClass:"ft-workout-exercise-card__action"},[n("div",{staticClass:"d-flex"},[n("div",{on:{click:function(t){return e.showExercise()}}},[n("mdb-icon",{staticClass:"ft-card__icon",attrs:{icon:"info-circle",size:"6x"}})],1),n("div",{on:{click:function(t){return e.shareExercise()}}},[n("mdb-icon",{staticClass:"ft-card__icon",attrs:{icon:"share-alt",size:"6x"}})],1)])])])])],1)},o=[],i=n("91c9"),s=n("2f62"),a=n("aeca"),c=n("5ede");function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d=function(){return n.e("chunk-59e6540b").then(n.bind(null,"3e8b"))},p=function(){return n.e("chunk-0672d8aa").then(n.bind(null,"11de"))},m={name:"workout-exercises-card",props:{workoutGo:{type:Boolean,default:!1},data:{type:Object},effect:{type:String,default:"sadie"}},mixins:[a["a"],c["a"]],components:{ExerciseDetail:d,FtModal:p,mdbIcon:i["mdbIcon"]},data:function(){return{modalPoll:!1}},computed:f(f({},Object(s["b"])(["currentExercise"])),{},{isWorkoutGo:function(){return this.workoutGo},workoutExercises:function(){return this.$store.state.workoutGo.timer.workoutExercises},isCurrentExercise:function(){return!!this.isWorkoutGo&&this.currentExercise.idGlobal===this.data.idGlobal},exerciseDone:function(){var e=this;if(this.isWorkoutGo){var t=this.workoutExercises.find((function(t){return t.idGlobal===e.data.idGlobal}));return!!t&&t.done}return!1},effectClass:function(){return"effect-".concat(this.effect)},time:function(){return this.setTextTime(this.data.time)},rest:function(){return this.setTextTime(this.data.rest)},reps:function(){return this.setTextReps(this.data.reps)}}),methods:{onCloseModal:function(e){this.modalPoll=e},showExercise:function(){this.modalPoll=!0},shareExercise:function(){}}},g=m,b=(n("c226"),n("2877")),x=Object(b["a"])(g,r,o,!1,null,"4fa35d03",null);t["default"]=x.exports},c226:function(e,t,n){"use strict";var r=n("e7d5"),o=n.n(r);o.a},e20d:function(e,t,n){e.exports=n.p+"img/fitness.20309555.png"},e7d5:function(e,t,n){}}]);
//# sourceMappingURL=chunk-4d5a2b52.553bb83f.js.map