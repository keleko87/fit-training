(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["auth"],{"3f7e":function(t,n,e){"use strict";e.r(n);var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"container"},[e("header",{staticClass:"jumbotron"},[e("h3",[t._v(t._s(t.content))])])])},s=[],a=e("453b"),o={name:"FtBoardUser",data:function(){return{content:""}},mounted:function(){var t=this;a["a"].getUserBoard().then((function(n){t.content=n.data}),(function(n){t.content=n.response&&n.response.data||n.message||n.toString()}))}},u=o,c=e("2877"),i=Object(c["a"])(u,r,s,!1,null,null,null);n["default"]=i.exports},"453b":function(t,n,e){"use strict";var r=e("bc3a"),s=e.n(r);function a(){var t=JSON.parse(localStorage.getItem("user"));return t&&t.accessToken?{"x-access-token":t.accessToken}:{}}function o(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function u(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,n,e){return n&&u(t.prototype,n),e&&u(t,e),t}var i="https://fit-training.herokuapp.com/api",l=function(){function t(){o(this,t)}return c(t,[{key:"getPublicContent",value:function(){return s.a.get(i+"/test/all")}},{key:"getUserBoard",value:function(){return s.a.get(i+"/test/user",{headers:a()})}},{key:"getAdminBoard",value:function(){return s.a.get(i+"/test/admin",{headers:a()})}}]),t}();n["a"]=new l},"594d":function(t,n,e){"use strict";e.r(n);var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"container"},[e("header",{staticClass:"jumbotron"},[e("h3",[t._v(t._s(t.content))])])])},s=[],a=e("453b"),o={name:"FtBoardAdmin",data:function(){return{content:""}},mounted:function(){var t=this;a["a"].getAdminBoard().then((function(n){t.content=n.data}),(function(n){t.content=n.response&&n.response.data||n.message||n.toString()}))}},u=o,c=e("2877"),i=Object(c["a"])(u,r,s,!1,null,null,null);n["default"]=i.exports},"96eb":function(t,n,e){"use strict";e.r(n);var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"container"},[e("header",{staticClass:"jumbotron"},[e("h3",[e("strong",[t._v(t._s(t.currentUser.username))]),t._v(" Profile\n    ")])]),e("p",[e("strong",[t._v("Token:")]),t._v("\n    "+t._s(t.currentUser.accessToken.substring(0,20))+" ...\n    "+t._s(t.currentUser.accessToken.substr(t.currentUser.accessToken.length-20))+"\n  ")]),e("p",[e("strong",[t._v("Id:")]),t._v("\n    "+t._s(t.currentUser.id)+"\n  ")]),e("p",[e("strong",[t._v("Email:")]),t._v("\n    "+t._s(t.currentUser.email)+"\n  ")]),e("strong",[t._v("Authorities:")]),e("ul",t._l(t.currentUser.roles,(function(n,r){return e("li",{key:r},[t._v("\n      "+t._s(n)+"\n    ")])})),0)])},s=[],a={name:"FtProfile",computed:{currentUser:function(){return this.$store.state.auth.user}},mounted:function(){this.currentUser||this.$router.push("/login")}},o=a,u=e("2877"),c=Object(u["a"])(o,r,s,!1,null,null,null);n["default"]=c.exports}}]);
//# sourceMappingURL=auth.6f355a7e.js.map