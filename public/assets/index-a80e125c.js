(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const s of c.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerpolicy&&(c.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?c.credentials="include":r.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(r){if(r.ep)return;r.ep=!0;const c=n(r);fetch(r.href,c)}})();function a(){}function N(e){return e()}function v(){return Object.create(null)}function p(e){e.forEach(N)}function L(e){return typeof e=="function"}function C(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function P(e){return Object.keys(e).length===0}function B(e,t,n){e.insertBefore(t,n||null)}function j(e){e.parentNode&&e.parentNode.removeChild(e)}function I(e){return document.createElement(e)}function M(e){return Array.from(e.childNodes)}let $;function d(e){$=e}const l=[],E=[],m=[],O=[],q=Promise.resolve();let g=!1;function F(){g||(g=!0,q.then(S))}function y(e){m.push(e)}const _=new Set;let u=0;function S(){if(u!==0)return;const e=$;do{try{for(;u<l.length;){const t=l[u];u++,d(t),K(t.$$)}}catch(t){throw l.length=0,u=0,t}for(d(null),l.length=0,u=0;E.length;)E.pop()();for(let t=0;t<m.length;t+=1){const n=m[t];_.has(n)||(_.add(n),n())}m.length=0}while(l.length);for(;O.length;)O.pop()();g=!1,_.clear(),d(e)}function K(e){if(e.fragment!==null){e.update(),p(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(y)}}const z=new Set;function D(e,t){e&&e.i&&(z.delete(e),e.i(t))}function G(e,t,n,i){const{fragment:r,after_update:c}=e.$$;r&&r.m(t,n),i||y(()=>{const s=e.$$.on_mount.map(N).filter(L);e.$$.on_destroy?e.$$.on_destroy.push(...s):p(s),e.$$.on_mount=[]}),c.forEach(y)}function H(e,t){const n=e.$$;n.fragment!==null&&(p(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function J(e,t){e.$$.dirty[0]===-1&&(l.push(e),F(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function Q(e,t,n,i,r,c,s,A=[-1]){const h=$;d(e);const o=e.$$={fragment:null,ctx:[],props:c,update:a,not_equal:r,bound:v(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(h?h.$$.context:[])),callbacks:v(),dirty:A,skip_bound:!1,root:t.target||h.$$.root};s&&s(o.root);let b=!1;if(o.ctx=n?n(e,t.props||{},(f,x,...k)=>{const w=k.length?k[0]:x;return o.ctx&&r(o.ctx[f],o.ctx[f]=w)&&(!o.skip_bound&&o.bound[f]&&o.bound[f](w),b&&J(e,f)),x}):[],o.update(),b=!0,p(o.before_update),o.fragment=i?i(o.ctx):!1,t.target){if(t.hydrate){const f=M(t.target);o.fragment&&o.fragment.l(f),f.forEach(j)}else o.fragment&&o.fragment.c();t.intro&&D(e.$$.fragment),G(e,t.target,t.anchor,t.customElement),S()}d(h)}class R{$destroy(){H(this,1),this.$destroy=a}$on(t,n){if(!L(n))return a;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(t){this.$$set&&!P(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function T(e){let t;return{c(){t=I("p"),t.textContent="dfsdfsdfgdfg"},m(n,i){B(n,t,i)},p:a,i:a,o:a,d(n){n&&j(t)}}}class U extends R{constructor(t){super(),Q(this,t,null,T,C,{})}}new U({target:document.getElementById("app")});
