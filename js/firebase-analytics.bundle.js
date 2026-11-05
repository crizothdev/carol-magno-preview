(()=>{var ke=()=>{};var Re=function(e){let t=[],n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},Ct=function(e){let t=[],n=0,r=0;for(;n<e.length;){let i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=e[n++];t[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=e[n++],o=e[n++],a=e[n++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(c&1023))}else{let s=e[n++],o=e[n++];t[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return t.join("")},Ne={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){let s=e[i],o=i+1<e.length,a=o?e[i+1]:0,c=i+2<e.length,l=c?e[i+2]:0,d=s>>2,g=(s&3)<<4|a>>4,h=(a&15)<<2|l>>6,P=l&63;c||(P=64,o||(h=64)),r.push(n[d],n[g],n[h],n[P])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(Re(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):Ct(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){let s=n[e.charAt(i++)],a=i<e.length?n[e.charAt(i)]:0;++i;let l=i<e.length?n[e.charAt(i)]:64;++i;let g=i<e.length?n[e.charAt(i)]:64;if(++i,s==null||a==null||l==null||g==null)throw new G;let h=s<<2|a>>4;if(r.push(h),l!==64){let P=a<<4&240|l>>2;if(r.push(P),g!==64){let St=l<<6&192|g;r.push(St)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},G=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Dt=function(e){let t=Re(e);return Ne.encodeByteArray(t,!0)},K=function(e){return Dt(e).replace(/\./g,"")},Be=function(e){try{return Ne.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};function Tt(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var Ot=()=>Tt().__FIREBASE_DEFAULTS__,kt=()=>{if(typeof process>"u"||typeof process.env>"u")return;let e=process.env.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},xt=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let t=e&&Be(e[1]);return t&&JSON.parse(t)},Rt=()=>{try{return ke()||Ot()||kt()||xt()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}};var J=()=>Rt()?.config;var M=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}};function Y(){let e=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof e=="object"&&e.id!==void 0}function R(){try{return typeof indexedDB=="object"}catch{return!1}}function N(){return new Promise((e,t)=>{try{let n=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{t(i.error?.message||"")}}catch(n){t(n)}})}function X(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}var Nt="FirebaseError",b=class e extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=Nt,Object.setPrototypeOf(this,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,I.prototype.create)}},I=class{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){let r=n[0]||{},i=`${this.service}/${t}`,s=this.errors[t],o=s?Bt(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new b(i,a,r)}};function Bt(e,t){try{let n=0,r="";for(;n<e.length;){let i=e.indexOf("{$",n);if(i===-1){r+=e.substring(n);break}let s=e.indexOf("}",i+2);if(s===-1){r+=e.substring(n);break}let o=e.substring(i+2,s),a=t[o];r+=e.substring(n,i)+(a!=null?String(a):`<${o}?>`),n=s+1}return r}catch{return e}}function T(e,t){if(e===t)return!0;let n=Object.keys(e),r=Object.keys(t);for(let i of n){if(!r.includes(i))return!1;let s=e[i],o=t[i];if(xe(s)&&xe(o)){if(!T(s,o))return!1}else if(s!==o)return!1}for(let i of r)if(!n.includes(i))return!1;return!0}function xe(e){return e!==null&&typeof e=="object"}var Pt=1e3,Mt=2,$t=14400*1e3,Lt=.5;function Q(e,t=Pt,n=Mt){let r=t*Math.pow(n,e),i=Math.round(Lt*r*(Math.random()-.5)*2);return Math.min($t,r+i)}function $(e){return e&&e._delegate?e._delegate:e}var p=class{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}};var A="[DEFAULT]";var Z=class{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){let n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){let r=new M;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){let n=this.normalizeInstanceIdentifier(t?.identifier),r=t?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(jt(t))try{this.getOrInitializeService({instanceIdentifier:A})}catch{}for(let[n,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(n);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(t=A){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){let t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=A){return this.instances.has(t)}getOptions(t=A){return this.instancesOptions.get(t)||{}}initialize(t={}){let{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(let[s,o]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(t,n){let r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(t),this.onInitCallbacks.set(r,i);let s=this.instances.get(r);return s&&t(s,r),()=>{i.delete(t)}}invokeOnInitCallbacks(t,n){let r=this.onInitCallbacks.get(n);if(r)for(let i of r)try{i(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Ft(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=A){return this.component?this.component.multipleInstances?t:A:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Ft(e){return e===A?void 0:e}function jt(e){return e.instantiationMode==="EAGER"}var L=class{constructor(t){this.name=t,this.providers=new Map}addComponent(t){let n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);let n=new Z(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}};var Ht=[],f;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(f||(f={}));var Ut={debug:f.DEBUG,verbose:f.VERBOSE,info:f.INFO,warn:f.WARN,error:f.ERROR,silent:f.SILENT},Vt=f.INFO,zt={[f.DEBUG]:"log",[f.VERBOSE]:"log",[f.INFO]:"info",[f.WARN]:"warn",[f.ERROR]:"error"},Wt=(e,t,...n)=>{if(t<e.logLevel)return;let r=new Date().toISOString(),i=zt[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)},O=class{constructor(t){this.name=t,this._logLevel=Vt,this._logHandler=Wt,this._userLogHandler=null,Ht.push(this)}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in f))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Ut[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,f.DEBUG,...t),this._logHandler(this,f.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,f.VERBOSE,...t),this._logHandler(this,f.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,f.INFO,...t),this._logHandler(this,f.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,f.WARN,...t),this._logHandler(this,f.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,f.ERROR,...t),this._logHandler(this,f.ERROR,...t)}};var qt=(e,t)=>t.some(n=>e instanceof n),Pe,Me;function Gt(){return Pe||(Pe=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Kt(){return Me||(Me=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var $e=new WeakMap,te=new WeakMap,Le=new WeakMap,ee=new WeakMap,re=new WeakMap;function Jt(e){let t=new Promise((n,r)=>{let i=()=>{e.removeEventListener("success",s),e.removeEventListener("error",o)},s=()=>{n(w(e.result)),i()},o=()=>{r(e.error),i()};e.addEventListener("success",s),e.addEventListener("error",o)});return t.then(n=>{n instanceof IDBCursor&&$e.set(n,e)}).catch(()=>{}),re.set(t,e),t}function Yt(e){if(te.has(e))return;let t=new Promise((n,r)=>{let i=()=>{e.removeEventListener("complete",s),e.removeEventListener("error",o),e.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",s),e.addEventListener("error",o),e.addEventListener("abort",o)});te.set(e,t)}var ne={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return te.get(e);if(t==="objectStoreNames")return e.objectStoreNames||Le.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return w(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Fe(e){ne=e(ne)}function Xt(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){let r=e.call(F(this),t,...n);return Le.set(r,t.sort?t.sort():[t]),w(r)}:Kt().includes(e)?function(...t){return e.apply(F(this),t),w($e.get(this))}:function(...t){return w(e.apply(F(this),t))}}function Qt(e){return typeof e=="function"?Xt(e):(e instanceof IDBTransaction&&Yt(e),qt(e,Gt())?new Proxy(e,ne):e)}function w(e){if(e instanceof IDBRequest)return Jt(e);if(ee.has(e))return ee.get(e);let t=Qt(e);return t!==e&&(ee.set(e,t),re.set(t,e)),t}var F=e=>re.get(e);function j(e,t,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){let o=indexedDB.open(e,t),a=w(o);return r&&o.addEventListener("upgradeneeded",c=>{r(w(o.result),c.oldVersion,c.newVersion,w(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}var Zt=["get","getKey","getAll","getAllKeys","count"],en=["put","add","delete","clear"],ie=new Map;function je(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(ie.get(t))return ie.get(t);let n=t.replace(/FromIndex$/,""),r=t!==n,i=en.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Zt.includes(n)))return;let s=async function(o,...a){let c=this.transaction(o,i?"readwrite":"readonly"),l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),i&&c.done]))[0]};return ie.set(t,s),s}Fe(e=>({...e,get:(t,n,r)=>je(t,n)||e.get(t,n,r),has:(t,n)=>!!je(t,n)||e.has(t,n)}));var oe=class{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(tn(n)){let r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}};function tn(e){return e.getComponent()?.type==="VERSION"}var ae="@firebase/app",He="0.16.5";var E=new O("@firebase/app"),nn="@firebase/app-compat",rn="@firebase/analytics-compat",sn="@firebase/analytics",on="@firebase/app-check-compat",an="@firebase/app-check",cn="@firebase/auth",ln="@firebase/auth-compat",fn="@firebase/crashlytics",un="@firebase/database",dn="@firebase/data-connect",hn="@firebase/database-compat",pn="@firebase/functions",mn="@firebase/functions-compat",gn="@firebase/installations",bn="@firebase/installations-compat",yn="@firebase/messaging",wn="@firebase/messaging-compat",In="@firebase/performance",_n="@firebase/performance-compat",En="@firebase/remote-config",vn="@firebase/remote-config-compat",An="@firebase/storage",Sn="@firebase/storage-compat",Cn="@firebase/firestore",Dn="@firebase/ai",Tn="@firebase/firestore-compat",On="firebase";var ce="[DEFAULT]",kn={[ae]:"fire-core",[nn]:"fire-core-compat",[sn]:"fire-analytics",[rn]:"fire-analytics-compat",[an]:"fire-app-check",[on]:"fire-app-check-compat",[cn]:"fire-auth",[ln]:"fire-auth-compat",[fn]:"fire-cls",[un]:"fire-rtdb",[dn]:"fire-data-connect",[hn]:"fire-rtdb-compat",[pn]:"fire-fn",[mn]:"fire-fn-compat",[gn]:"fire-iid",[bn]:"fire-iid-compat",[yn]:"fire-fcm",[wn]:"fire-fcm-compat",[In]:"fire-perf",[_n]:"fire-perf-compat",[En]:"fire-rc",[vn]:"fire-rc-compat",[An]:"fire-gcs",[Sn]:"fire-gcs-compat",[Cn]:"fire-fst",[Tn]:"fire-fst-compat",[Dn]:"fire-vertex","fire-js":"fire-js",[On]:"fire-js-all"};var H=new Map,xn=new Map,le=new Map;function Ue(e,t){try{e.container.addComponent(t)}catch(n){E.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function v(e){let t=e.name;if(le.has(t))return E.debug(`There were multiple attempts to register component ${t}.`),!1;le.set(t,e);for(let n of H.values())Ue(n,e);for(let n of xn.values())Ue(n,e);return!0}function k(e,t){let n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}var Rn={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},_=new I("app","Firebase",Rn);var fe=class{constructor(t,n,r){this._isDeleted=!1,this._options={...t},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new p("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw _.create("app-deleted",{appName:this._name})}};function he(e,t={}){let n=e;typeof t!="object"&&(t={name:t});let r={name:ce,automaticDataCollectionEnabled:!0,...t},i=r.name;if(typeof i!="string"||!i)throw _.create("bad-app-name",{appName:String(i)});if(n||(n=J()),!n)throw _.create("no-options");let s=H.get(i);if(s)if(T(n,s.options)){if(T(r,s.config))return s;throw _.create("duplicate-app",{appName:i,mismatchedParam:"config",oldValue:JSON.stringify(s.config),newValue:JSON.stringify(r)})}else throw _.create("duplicate-app",{appName:i,mismatchedParam:"options",oldValue:JSON.stringify(s.options),newValue:JSON.stringify(n)});let o=new L(i);for(let c of le.values())o.addComponent(c);let a=new fe(n,r,o);return H.set(i,a),a}function pe(e=ce){let t=H.get(e);if(!t&&e===ce&&J())return he();if(!t)throw _.create("no-app",{appName:e});return t}function y(e,t,n){let r=kn[e]??e;n&&(r+=`-${n}`);let i=r.match(/\s|\//),s=t.match(/\s|\//);if(i||s){let o=[`Unable to register library "${r}" with version "${t}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),E.warn(o.join(" "));return}v(new p(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}var Nn="firebase-heartbeat-database",Bn=1,B="firebase-heartbeat-store",se=null;function qe(){return se||(se=j(Nn,Bn,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(B)}catch(n){console.warn(n)}}}}).catch(e=>{throw _.create("idb-open",{originalErrorMessage:e.message})})),se}async function Pn(e){try{let n=(await qe()).transaction(B),r=await n.objectStore(B).get(Ge(e));return await n.done,r}catch(t){if(t instanceof b)E.warn(t.message);else{let n=_.create("idb-get",{originalErrorMessage:t?.message});E.warn(n.message)}}}async function Ve(e,t){try{let r=(await qe()).transaction(B,"readwrite");await r.objectStore(B).put(t,Ge(e)),await r.done}catch(n){if(n instanceof b)E.warn(n.message);else{let r=_.create("idb-set",{originalErrorMessage:n?.message});E.warn(r.message)}}}function Ge(e){return`${e.name}!${e.options.appId}`}var Mn=1024,$n=30,ue=class{constructor(t){this.container=t,this._heartbeatsCache=null;let n=this.container.getProvider("app").getImmediate();this._storage=new de(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{let n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=ze();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>$n){let i=Fn(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(t){E.warn(t)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=ze(),{heartbeatsToSend:n,unsentEntries:r}=Ln(this._heartbeatsCache.heartbeats),i=K(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return E.warn(t),""}}};function ze(){return new Date().toISOString().substring(0,10)}function Ln(e,t=Mn){let n=[],r=e.slice();for(let i of e){let s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),We(n)>t){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),We(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}var de=class{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return R()?N().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let n=await Pn(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){let r=await this.read();return Ve(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){let r=await this.read();return Ve(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}};function We(e){return K(JSON.stringify({version:2,heartbeats:e})).length}function Fn(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}function jn(e){v(new p("platform-logger",t=>new oe(t),"PRIVATE")),v(new p("heartbeat",t=>new ue(t),"PRIVATE")),y(ae,He,e),y(ae,He,"esm2020"),y("fire-js","")}jn("");var Hn="firebase",Un="13.2.0";y(Hn,Un,"app");var Ye="@firebase/installations",ye="0.6.24";var Xe=1e4,Qe=`w:${ye}`,Ze="FIS_v2",Vn="https://firebaseinstallations.googleapis.com/v1",zn=3600*1e3,Wn="installations",qn="Installations";var Gn={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},C=new I(Wn,qn,Gn);function et(e){return e instanceof b&&e.code.includes("request-failed")}function tt({projectId:e}){return`${Vn}/projects/${e}/installations`}function nt(e){return{token:e.token,requestStatus:2,expiresIn:Jn(e.expiresIn),creationTime:Date.now()}}async function rt(e,t){let r=(await t.json()).error;return C.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function it({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Kn(e,{refreshToken:t}){let n=it(e);return n.append("Authorization",Yn(t)),n}async function st(e){let t=await e();return t.status>=500&&t.status<600?e():t}function Jn(e){return Number(e.replace("s","000"))}function Yn(e){return`${Ze} ${e}`}async function Xn({appConfig:e,heartbeatServiceProvider:t},{fid:n}){let r=tt(e),i=it(e),s=t.getImmediate({optional:!0});if(s){let l=await s.getHeartbeatsHeader();l&&i.append("x-firebase-client",l)}let o={fid:n,authVersion:Ze,appId:e.appId,sdkVersion:Qe},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await st(()=>fetch(r,a));if(c.ok){let l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:nt(l.authToken)}}else throw await rt("Create Installation",c)}function ot(e){return new Promise(t=>{setTimeout(t,e)})}function Qn(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}var Zn=/^[cdef][\w-]{21}$/,be="";function er(){try{let e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;let n=tr(e);return Zn.test(n)?n:be}catch{return be}}function tr(e){return Qn(e).substr(0,22)}function V(e){return`${e.appName}!${e.appId}`}var at=new Map;function ct(e,t){let n=V(e);lt(n,t),nr(n,t)}function lt(e,t){let n=at.get(e);if(n)for(let r of n)r(t)}function nr(e,t){let n=rr();n&&n.postMessage({key:e,fid:t}),ir()}var S=null;function rr(){return!S&&"BroadcastChannel"in self&&(S=new BroadcastChannel("[Firebase] FID Change"),S.onmessage=e=>{lt(e.data.key,e.data.fid)}),S}function ir(){at.size===0&&S&&(S.close(),S=null)}var sr="firebase-installations-database",or=1,D="firebase-installations-store",me=null;function we(){return me||(me=j(sr,or,{upgrade:(e,t)=>{t===0&&e.createObjectStore(D)}})),me}async function U(e,t){let n=V(e),i=(await we()).transaction(D,"readwrite"),s=i.objectStore(D),o=await s.get(n);return await s.put(t,n),await i.done,(!o||o.fid!==t.fid)&&ct(e,t.fid),t}async function ft(e){let t=V(e),r=(await we()).transaction(D,"readwrite");await r.objectStore(D).delete(t),await r.done}async function z(e,t){let n=V(e),i=(await we()).transaction(D,"readwrite"),s=i.objectStore(D),o=await s.get(n),a=t(o);return a===void 0?await s.delete(n):await s.put(a,n),await i.done,a&&(!o||o.fid!==a.fid)&&ct(e,a.fid),a}async function Ie(e){let t,n=await z(e.appConfig,r=>{let i=ar(r),s=cr(e,i);return t=s.registrationPromise,s.installationEntry});return n.fid===be?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function ar(e){let t=e||{fid:er(),registrationStatus:0};return ut(t)}function cr(e,t){if(t.registrationStatus===0){if(!navigator.onLine){let i=Promise.reject(C.create("app-offline"));return{installationEntry:t,registrationPromise:i}}let n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=lr(e,n);return{installationEntry:n,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:fr(e)}:{installationEntry:t}}async function lr(e,t){try{let n=await Xn(e,t);return U(e.appConfig,n)}catch(n){throw et(n)&&n.customData.serverCode===409?await ft(e.appConfig):await U(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function fr(e){let t=await Ke(e.appConfig);for(;t.registrationStatus===1;)await ot(100),t=await Ke(e.appConfig);if(t.registrationStatus===0){let{installationEntry:n,registrationPromise:r}=await Ie(e);return r||n}return t}function Ke(e){return z(e,t=>{if(!t)throw C.create("installation-not-found");return ut(t)})}function ut(e){return ur(e)?{fid:e.fid,registrationStatus:0}:e}function ur(e){return e.registrationStatus===1&&e.registrationTime+Xe<Date.now()}async function dr({appConfig:e,heartbeatServiceProvider:t},n){let r=hr(e,n),i=Kn(e,n),s=t.getImmediate({optional:!0});if(s){let l=await s.getHeartbeatsHeader();l&&i.append("x-firebase-client",l)}let o={installation:{sdkVersion:Qe,appId:e.appId}},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await st(()=>fetch(r,a));if(c.ok){let l=await c.json();return nt(l)}else throw await rt("Generate Auth Token",c)}function hr(e,{fid:t}){return`${tt(e)}/${t}/authTokens:generate`}async function _e(e,t=!1){let n,r=await z(e.appConfig,s=>{if(!dt(s))throw C.create("not-registered");let o=s.authToken;if(!t&&gr(o))return s;if(o.requestStatus===1)return n=pr(e,t),s;{if(!navigator.onLine)throw C.create("app-offline");let a=yr(s);return n=mr(e,a),a}});return n?await n:r.authToken}async function pr(e,t){let n=await Je(e.appConfig);for(;n.authToken.requestStatus===1;)await ot(100),n=await Je(e.appConfig);let r=n.authToken;return r.requestStatus===0?_e(e,t):r}function Je(e){return z(e,t=>{if(!dt(t))throw C.create("not-registered");let n=t.authToken;return wr(n)?{...t,authToken:{requestStatus:0}}:t})}async function mr(e,t){try{let n=await dr(e,t),r={...t,authToken:n};return await U(e.appConfig,r),n}catch(n){if(et(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await ft(e.appConfig);else{let r={...t,authToken:{requestStatus:0}};await U(e.appConfig,r)}throw n}}function dt(e){return e!==void 0&&e.registrationStatus===2}function gr(e){return e.requestStatus===2&&!br(e)}function br(e){let t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+zn}function yr(e){let t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}function wr(e){return e.requestStatus===1&&e.requestTime+Xe<Date.now()}async function Ir(e){let t=e,{installationEntry:n,registrationPromise:r}=await Ie(t);return r?r.catch(console.error):_e(t).catch(console.error),n.fid}async function _r(e,t=!1){let n=e;return await Er(n),(await _e(n,t)).token}async function Er(e){let{registrationPromise:t}=await Ie(e);t&&await t}function vr(e){if(!e||!e.options)throw ge("App Configuration");if(!e.name)throw ge("App Name");let t=["projectId","apiKey","appId"];for(let n of t)if(!e.options[n])throw ge(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function ge(e){return C.create("missing-app-config-values",{valueName:e})}var ht="installations",Ar="installations-internal",Sr=e=>{let t=e.getProvider("app").getImmediate(),n=vr(t),r=k(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Cr=e=>{let t=e.getProvider("app").getImmediate(),n=k(t,ht).getImmediate();return{getId:()=>Ir(n),getToken:i=>_r(n,i)}};function Dr(){v(new p(ht,Sr,"PUBLIC")),v(new p(Ar,Cr,"PRIVATE"))}Dr();y(Ye,ye);y(Ye,ye,"esm2020");var W="analytics",Tr="firebase_id",Or="origin",kr=60*1e3,xr="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Te="https://www.googletagmanager.com/gtag/js";var u=new O("@firebase/analytics");var Rr={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},m=new I("analytics","Analytics",Rr);function Nr(e){if(!e.startsWith(Te)){let t=m.create("invalid-gtag-resource",{gtagURL:e});return u.warn(t.message),""}return e}function It(e){return Promise.all(e.map(t=>t.catch(n=>n)))}function Br(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}function Pr(e,t){let n=Br("firebase-js-sdk-policy",{createScriptURL:Nr}),r=document.createElement("script"),i=`${Te}?l=${e}&id=${t}`;r.src=n?n?.createScriptURL(i):i,r.async=!0,document.head.appendChild(r)}function Mr(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}async function $r(e,t,n,r,i,s){let o=r[i];try{if(o)await t[o];else{let c=(await It(n)).find(l=>l.measurementId===i);c&&await t[c.appId]}}catch(a){u.error(a)}e("config",i,s)}async function Lr(e,t,n,r,i){try{let s=[];if(i&&i.send_to){let o=i.send_to;Array.isArray(o)||(o=[o]);let a=await It(n);for(let c of o){let l=a.find(g=>g.measurementId===c),d=l&&t[l.appId];if(d)s.push(d);else{s=[];break}}}s.length===0&&(s=Object.values(t)),await Promise.all(s),e("event",r,i||{})}catch(s){u.error(s)}}function Fr(e,t,n,r){async function i(s,...o){try{if(s==="event"){let[a,c]=o;await Lr(e,t,n,a,c)}else if(s==="config"){let[a,c]=o;await $r(e,t,n,r,a,c)}else if(s==="consent"){let[a,c]=o;e("consent",a,c)}else if(s==="get"){let[a,c,l]=o;e("get",a,c,l)}else if(s==="set"){let[a]=o;e("set",a)}else e(s,...o)}catch(a){u.error(a)}}return i}function jr(e,t,n,r,i){let s=function(...o){window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(s=window[i]),window[i]=Fr(s,e,t,n),{gtagCore:s,wrappedGtag:window[i]}}function Hr(e){let t=window.document.getElementsByTagName("script");for(let n of Object.values(t))if(n.src&&n.src.includes(Te)&&n.src.includes(e))return n;return null}var Ur=30,Vr=1e3,ve=class{constructor(t={},n=Vr){this.throttleMetadata=t,this.intervalMillis=n}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,n){this.throttleMetadata[t]=n}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}},_t=new ve;function zr(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function Wr(e){let{appId:t,apiKey:n}=e,r={method:"GET",headers:zr(n)},i=xr.replace("{app-id}",t),s=await fetch(i,r);if(s.status!==200&&s.status!==304){let o="";try{let a=await s.json();a.error?.message&&(o=a.error.message)}catch{}throw m.create("config-fetch-failed",{httpStatus:s.status,responseMessage:o})}return s.json()}async function qr(e,t=_t,n){let{appId:r,apiKey:i,measurementId:s}=e.options;if(!r)throw m.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:r};throw m.create("no-api-key")}let o=t.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new Ae;return setTimeout(async()=>{a.abort()},kr),Et({appId:r,apiKey:i,measurementId:s},o,a,t)}async function Et(e,{throttleEndTimeMillis:t,backoffCount:n},r,i=_t){let{appId:s,measurementId:o}=e;try{await Gr(r,t)}catch(a){if(o)return u.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${a?.message}]`),{appId:s,measurementId:o};throw a}try{let a=await Wr(e);return i.deleteThrottleMetadata(s),a}catch(a){let c=a;if(!Kr(c)){if(i.deleteThrottleMetadata(s),o)return u.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${c?.message}]`),{appId:s,measurementId:o};throw a}let l=Number(c?.customData?.httpStatus)===503?Q(n,i.intervalMillis,Ur):Q(n,i.intervalMillis),d={throttleEndTimeMillis:Date.now()+l,backoffCount:n+1};return i.setThrottleMetadata(s,d),u.debug(`Calling attemptFetch again in ${l} millis`),Et(e,d,r,i)}}function Gr(e,t){return new Promise((n,r)=>{let i=Math.max(t-Date.now(),0),s=setTimeout(n,i);e.addEventListener(()=>{clearTimeout(s),r(m.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function Kr(e){if(!(e instanceof b)||!e.customData)return!1;let t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}var Ae=class{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}};var Se;async function Jr(e,t,n,r,i){if(i&&i.global){e("event",n,r);return}else{let s=await t,o={...r,send_to:s};e("event",n,o)}}async function Yr(e,t,n,r){if(r&&r.global){let i={};for(let s of Object.keys(n))i[`user_properties.${s}`]=n[s];return e("set",i),Promise.resolve()}else{let i=await t;e("config",i,{update:!0,user_properties:n})}}var Ce;function Xr(e){Ce=e}function Qr(e){Se=e}async function Zr(){if(R())try{await N()}catch(e){return u.warn(m.create("indexeddb-unavailable",{errorInfo:e?.toString()}).message),!1}else return u.warn(m.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function ei(e,t,n,r,i,s,o){let a=qr(e);a.then(h=>{n[h.measurementId]=h.appId,e.options.measurementId&&h.measurementId!==e.options.measurementId&&u.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${h.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(h=>u.error(h)),t.push(a);let c=Zr().then(h=>{if(h)return r.getId()}),[l,d]=await Promise.all([a,c]);Hr(s)||Pr(s,l.measurementId),Ce&&(i("consent","default",Ce),Xr(void 0)),i("js",new Date);let g=o?.config??{};return g[Or]="firebase",g.update=!0,d!=null&&(g[Tr]=d),i("config",l.measurementId,g),Se&&(i("set",Se),Qr(void 0)),l.measurementId}var De=class{constructor(t){this.app=t}_delete(){return delete x[this.app.options.appId],Promise.resolve()}},x={},pt=[],mt={},Ee="dataLayer",ti="gtag",gt,Oe,bt=!1;function ni(){let e=[];if(Y()&&e.push("This is a browser extension environment."),X()||e.push("Cookies are not available."),e.length>0){let t=e.map((r,i)=>`(${i+1}) ${r}`).join(" "),n=m.create("invalid-analytics-context",{errorInfo:t});u.warn(n.message)}}function ri(e,t,n){ni();let r=e.options.appId;if(!r)throw m.create("no-app-id");if(!e.options.apiKey)if(e.options.measurementId)u.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw m.create("no-api-key");if(x[r]!=null)throw m.create("already-exists",{id:r});if(!bt){Mr(Ee);let{wrappedGtag:s,gtagCore:o}=jr(x,pt,mt,Ee,ti);Oe=s,gt=o,bt=!0}return x[r]=ei(e,pt,mt,t,gt,Ee,n),new De(e)}function vt(e=pe()){e=$(e);let t=k(e,W);return t.isInitialized()?t.getImmediate():ii(e)}function ii(e,t={}){let n=k(e,W);if(n.isInitialized()){let i=n.getImmediate();if(T(t,n.getOptions()))return i;throw m.create("already-initialized")}return n.initialize({options:t})}async function At(){if(Y()||!X()||!R())return!1;try{return await N()}catch{return!1}}function si(e,t,n){e=$(e),Yr(Oe,x[e.app.options.appId],t,n).catch(r=>u.error(r))}function q(e,t,n,r){e=$(e),Jr(Oe,x[e.app.options.appId],t,n,r).catch(i=>u.error(i))}var yt="@firebase/analytics",wt="0.10.25";function oi(){v(new p(W,(t,{options:n})=>{let r=t.getProvider("app").getImmediate(),i=t.getProvider("installations-internal").getImmediate();return ri(r,i,n)},"PUBLIC")),v(new p("analytics-internal",e,"PRIVATE")),y(yt,wt),y(yt,wt,"esm2020");function e(t){try{let n=t.getProvider(W).getImmediate();return{logEvent:(r,i,s)=>q(n,r,i,s),setUserProperties:(r,i)=>si(n,r,i)}}catch(n){throw m.create("interop-component-reg-failed",{reason:n})}}}oi();(function(){var e=window.CMAG_FIREBASE_CONFIG;!e||!e.apiKey||!e.projectId||!e.appId||!e.measurementId||At().then(function(t){if(t){var n=vt(he(e));document.addEventListener("click",function(r){var i=r.target instanceof Element?r.target:r.target.parentElement;if(i){var s=i.closest("a[href^='https://wa.me/'], a[href^='mailto:'], a[href^='tel:']");if(s){var o=s.href.indexOf("wa.me/")!==-1?"whatsapp":s.href.indexOf("mailto:")===0?"email":"phone";q(n,"contact_click",{method:o})}var a=i.closest("[data-showcase-gallery], .project-card");if(a){var c=a.querySelector(".project-card__title, h3"),l=c?c.textContent.trim():a.getAttribute("data-showcase-gallery");l&&q(n,"select_content",{content_type:"project",item_id:l})}}})}}).catch(function(){})})();})();
/*! Bundled license information:

@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/logger/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
@firebase/analytics/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm.js:
@firebase/app/dist/esm/index.esm.js:
@firebase/app/dist/esm/index.esm.js:
@firebase/app/dist/esm/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
@firebase/analytics/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
@firebase/analytics/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/analytics/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
