(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-23ad95d4"],{1678:function(t,a,i){"use strict";var n=i("7b99"),e=i.n(n);e.a},"7b99":function(t,a,i){},d529:function(t,a,i){"use strict";i.r(a);var n=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"ft-pagination"},[t.showPagination?i("div",{staticClass:"ft-pagination__container"},[i("ul",{staticClass:"ft-pagination__list"},[i("li",{staticClass:"ft-pagination__item"},[i("a",{staticClass:"ft-pagination__link",class:{disabled:t.isInFirstPage},attrs:{disabled:t.isInFirstPage},on:{click:function(a){return a.preventDefault(),t.onClickFirstPage(a)}}},[i("mdb-icon",{staticClass:"ft-pagination__icon",attrs:{icon:"step-backward"}})],1)]),i("li",{staticClass:"ft-pagination__item"},[i("a",{staticClass:"ft-pagination__link",class:{disabled:t.isInFirstPage},attrs:{disabled:t.isInFirstPage},on:{click:function(a){return a.preventDefault(),t.onClickPreviousPage(a)}}},[i("mdb-icon",{staticClass:"ft-pagination__icon",attrs:{icon:"chevron-left"}})],1)]),t._l(t.pages,(function(a){return i("li",{key:a.name,staticClass:"ft-pagination__item"},[i("a",{staticClass:"ft-pagination__link ft-pagination__link--page",class:{active:t.isPageActive(a.name)},attrs:{disabled:a.isDisabled},on:{click:function(i){return i.preventDefault(),t.onClickPage(a.name)}}},[t._v("\n          "+t._s(a.name)+"\n        ")])])})),i("li",{staticClass:"ft-pagination__item"},[i("a",{staticClass:"ft-pagination__link",class:{disabled:t.isInLastPage},attrs:{disabled:t.isInLastPage},on:{click:function(a){return a.preventDefault(),t.onClickNextPage(a)}}},[i("mdb-icon",{staticClass:"ft-pagination__icon",attrs:{icon:"chevron-right"}})],1)]),i("li",{staticClass:"ft-pagination__item"},[i("a",{staticClass:"ft-pagination__link",class:{disabled:t.isInLastPage},attrs:{disabled:t.isInLastPage},on:{click:function(a){return a.preventDefault(),t.onClickLastPage(a)}}},[i("mdb-icon",{staticClass:"ft-pagination__icon",attrs:{icon:"step-forward"}})],1)])],2)]):t._e()])},e=[],s=i("91c9"),r={name:"ft-pagination",props:{maxVisibleas:{type:Number,required:!1,default:3},totalPages:{type:Number,required:!0},total:{type:Number,required:!0},perPage:{type:Number,required:!0},currentPage:{type:Number,required:!0}},components:{mdbIcon:s["mdbIcon"]},computed:{showPagination:function(){return this.total>0&&this.total>this.perPage},startPage:function(){if(1===this.currentPage)return 1;if(this.currentPage===this.totalPages){var t=this.totalPages-this.maxVisibleas+1;return t<=0?1:this.totalPages-this.maxVisibleas+1}return this.currentPage-1},endPage:function(){return Math.min(this.startPage+this.maxVisibleas-1,this.totalPages)},pages:function(){for(var t=[],a=this.startPage;a<=this.endPage;a+=1)t.push({name:a,isDisabled:a===this.currentPage});return t},isInFirstPage:function(){return 1===this.currentPage},isInLastPage:function(){return this.currentPage===this.totalPages}},methods:{onClickFirstPage:function(){this.$emit("pagechanged",1)},onClickPreviousPage:function(){this.$emit("pagechanged",this.currentPage-1)},onClickPage:function(t){this.$emit("pagechanged",t)},onClickNextPage:function(){this.$emit("pagechanged",this.currentPage+1)},onClickLastPage:function(){this.$emit("pagechanged",this.totalPages)},isPageActive:function(t){return this.currentPage===t}}},c=r,o=(i("1678"),i("2877")),l=Object(o["a"])(c,n,e,!1,null,"9e857846",null);a["default"]=l.exports}}]);
//# sourceMappingURL=chunk-23ad95d4.58e83e6a.js.map