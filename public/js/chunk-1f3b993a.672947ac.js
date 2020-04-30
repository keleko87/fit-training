(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f3b993a"],{a77f:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"ft-exercise-edit"},[i("div",{staticClass:"container"},[i("form",{attrs:{novalidate:""},on:{submit:function(t){return t.preventDefault(),e.onSubmit(t)}}},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-12 col-lg-6"},[!e.info.videoUrl&&e.info.imageUrl?i("div",{staticClass:"row"},[i("div",{staticClass:"col-12"},[i("img",{staticClass:"ft-exercise-edit__image mx-auto",attrs:{src:e.getImage(e.info),alt:"image exercise"}})])]):e.info.videoUrl?i("div",{staticClass:"row"},[i("div",{staticClass:"col-12"},[i("mdb-view",{attrs:{hover:""}},[i("iframe",{staticClass:"ft-exercise-edit__iframe",attrs:{title:"video exercise",width:"560",src:e.videoUrl,allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""}})])],1)]):e._e()]),i("div",{staticClass:"col-12 col-lg-6 mt-3"},[i("div",{staticClass:"row ft-exercise-edit__is-warm-up mb-3"},[i("div",{staticClass:"col-12"},[i("md-checkbox",{staticClass:"md-primary",attrs:{id:"is-warmup"},model:{value:e.form.isWarmUp,callback:function(t){e.$set(e.form,"isWarmUp",t)},expression:"form.isWarmUp"}},[i("span",{staticClass:"checkbox-text"},[e._v("Ejercicio de calentamiento")])])],1)]),i("div",{staticClass:"row ft-exercise-edit__time-info"},[i("div",{staticClass:"col-6 ft-exercise-edit__time-info--item"},[i("md-field",{class:e.getValidationClass("series")},[i("label",[e._v("Series")]),i("md-input",{attrs:{type:"number",id:"series"},model:{value:e.form.series,callback:function(t){e.$set(e.form,"series","string"===typeof t?t.trim():t)},expression:"form.series"}})],1)],1),i("div",{staticClass:"col-6 ft-exercise-edit__time-info--item"},[i("md-field",{class:e.getValidationClass("reps")},[i("label",[e._v("Repeticiones")]),i("md-input",{attrs:{type:"number",id:"reps"},model:{value:e.form.reps,callback:function(t){e.$set(e.form,"reps",t)},expression:"form.reps"}})],1)],1),i("div",{staticClass:"col-6 ft-exercise-edit__time-info--item"},[i("md-autocomplete",{class:e.getValidationClass("rest"),attrs:{"md-options":e.minutes},model:{value:e.form.rest,callback:function(t){e.$set(e.form,"rest",t)},expression:"form.rest"}},[i("label",[e._v("Descanso (min)")])])],1),i("div",{staticClass:"col-6 ft-exercise-edit__time-info--item"},[i("md-autocomplete",{class:e.getValidationClass("time"),attrs:{"md-options":e.minutes},model:{value:e.form.time,callback:function(t){e.$set(e.form,"time",t)},expression:"form.time"}},[i("label",[e._v("Duración (min)")])])],1)]),i("div",{staticClass:"row"},[i("div",{staticClass:"col"},[i("md-field",{class:e.getValidationClass("observations")},[i("label",[e._v("Observaciones")]),i("md-input",{attrs:{type:"textarea",id:"observations"},model:{value:e.form.observations,callback:function(t){e.$set(e.form,"observations",t)},expression:"form.observations"}})],1)],1)])])]),i("div",{staticClass:"row mt-3 text-center"},[i("div",{staticClass:"col"},[i("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e._v("\n            Guardar\n          ")]),"OK"===e.submitStatus?i("p",{staticClass:"success"},[e._v("\n            Ejercicio fue actualizado!\n          ")]):e._e()])])])])])},a=[],r=i("a34a"),n=i.n(r),o=i("91c9"),c=i("5ede"),l=i("9a36"),m=i("b5ae");function u(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,s)}return i}function f(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?u(Object(i),!0).forEach((function(t){d(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):u(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function d(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function v(e,t,i,s,a,r,n){try{var o=e[r](n),c=o.value}catch(l){return void i(l)}o.done?t(c):Promise.resolve(c).then(s,a)}function b(e){return function(){var t=this,i=arguments;return new Promise((function(s,a){var r=e.apply(t,i);function n(e){v(r,s,a,n,o,"next",e)}function o(e){v(r,s,a,n,o,"throw",e)}n(void 0)}))}}var p={name:"exercise-edit",props:{info:{type:Object}},created:function(){this.form=this.setInfoData(this.info)},mixins:[c["a"]],components:{mdbView:o["mdbView"]},data:function(){return{form:{},submitStatus:null,minutes:l["c"],minValueTime:l["c"][0],maxValueTime:l["c"][l["c"].length-1]}},computed:{videoUrl:function(){return this.setLoopInVideo(this.info.videoUrl)}},methods:{setInfoData:function(e){var t=e.isWarmUp,i=e.series,s=e.reps,a=e.rest,r=e.time,n=e.observations;return{isWarmUp:t||"",series:i||"",reps:s||"",rest:a?a.toString():"",time:r?r.toString():"",observations:n||""}},getValidationClass:function(e){var t=this.$v.form[e];if(t)return{"md-invalid":t.$invalid&&t.$dirty}},onSubmit:function(){var e=b(n.a.mark((function e(){var t;return n.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.$v.form.$touch(),!this.$v.$invalid){e.next=5;break}this.submitStatus="ERROR",e.next=10;break;case 5:return t=f({},this.info,{},this.$v.form.$model),e.next=8,this.$store.dispatch("UPDATE_WORKOUT_EXERCISE",t);case 8:this.submitStatus="OK",this.$emit("submitStatus",!1);case 10:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},validations:function(){return{form:{observations:{minLength:Object(m["minLength"])(5),maxLength:Object(m["maxLength"])(200)},series:{minValue:Object(m["minValue"])(1),maxValue:Object(m["maxValue"])(60)},reps:{minValue:Object(m["minValue"])(0),maxValue:Object(m["maxValue"])(60)},rest:{minValue:Object(m["minValue"])(this.minValueTime),maxValue:Object(m["maxValue"])(this.maxValueTime)},time:{minValue:Object(m["minValue"])(this.minValueTime),maxValue:Object(m["maxValue"])(this.maxValueTime)}}}}},h=p,x=(i("aa93"),i("2877")),O=Object(x["a"])(h,s,a,!1,null,"5bcb7418",null);t["default"]=O.exports},a8bd:function(e,t,i){},aa93:function(e,t,i){"use strict";var s=i("a8bd"),a=i.n(s);a.a}}]);
//# sourceMappingURL=chunk-1f3b993a.672947ac.js.map