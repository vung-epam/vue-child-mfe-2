(function(){try{var e=typeof window<`u`?window:typeof global<`u`?global:typeof globalThis<`u`?globalThis:typeof self<`u`?self:{};e.SENTRY_RELEASE={id:`5a4b99fac13e438d6109ba17422a3e6283d1fc94`};var t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]=`762b50f1-8f1f-44bb-812a-df66284e279c`,e._sentryDebugIdIdentifier=`sentry-dbid-762b50f1-8f1f-44bb-812a-df66284e279c`)}catch{}})();import{A as e,D as t,F as n,Q as r,c as i,ft as a,ht as o,l as s,m as c,o as l,r as u,s as d,u as f,w as p,x as m}from"./runtime-core.esm-bundler-DLCrKq1W.js";import{r as ee,t as h}from"./config-DsYf2r2F.js";import{a as g,s as _,t as v}from"./plugin-vue-export-helper-SqhnPzXu.js";import{a as y,n as b,t as x}from"./card-CVzei4BH.js";import{t as S}from"./divider-DnOM4Gvh.js";import{t as C}from"./baseeditableholder-CUNawNzV.js";import{t as w}from"./tag-cxqxNJE3.js";var T=_.extend({name:`avatar`,style:`
    .p-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: dt('avatar.width');
        height: dt('avatar.height');
        font-size: dt('avatar.font.size');
        background: dt('avatar.background');
        color: dt('avatar.color');
        border-radius: dt('avatar.border.radius');
    }

    .p-avatar-image {
        background: transparent;
    }

    .p-avatar-circle {
        border-radius: 50%;
    }

    .p-avatar-circle img {
        border-radius: 50%;
    }

    .p-avatar-icon {
        font-size: dt('avatar.icon.size');
        width: dt('avatar.icon.size');
        height: dt('avatar.icon.size');
    }

    .p-avatar img {
        width: 100%;
        height: 100%;
    }

    .p-avatar-lg {
        width: dt('avatar.lg.width');
        height: dt('avatar.lg.width');
        font-size: dt('avatar.lg.font.size');
    }

    .p-avatar-lg .p-avatar-icon {
        font-size: dt('avatar.lg.icon.size');
        width: dt('avatar.lg.icon.size');
        height: dt('avatar.lg.icon.size');
    }

    .p-avatar-xl {
        width: dt('avatar.xl.width');
        height: dt('avatar.xl.width');
        font-size: dt('avatar.xl.font.size');
    }

    .p-avatar-xl .p-avatar-icon {
        font-size: dt('avatar.xl.icon.size');
        width: dt('avatar.xl.icon.size');
        height: dt('avatar.xl.icon.size');
    }

    .p-avatar-group {
        display: flex;
        align-items: center;
    }

    .p-avatar-group .p-avatar + .p-avatar {
        margin-inline-start: dt('avatar.group.offset');
    }

    .p-avatar-group .p-avatar {
        border: 2px solid dt('avatar.group.border.color');
    }

    .p-avatar-group .p-avatar-lg + .p-avatar-lg {
        margin-inline-start: dt('avatar.lg.group.offset');
    }

    .p-avatar-group .p-avatar-xl + .p-avatar-xl {
        margin-inline-start: dt('avatar.xl.group.offset');
    }
`,classes:{root:function(e){var t=e.props;return[`p-avatar p-component`,{"p-avatar-image":t.image!=null,"p-avatar-circle":t.shape===`circle`,"p-avatar-lg":t.size===`large`,"p-avatar-xl":t.size===`xlarge`}]},label:`p-avatar-label`,icon:`p-avatar-icon`}}),E={name:`BaseAvatar`,extends:g,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},size:{type:String,default:`normal`},shape:{type:String,default:`square`},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:T,provide:function(){return{$pcAvatar:this,$parentInstance:this}}};function D(e){"@babel/helpers - typeof";return D=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},D(e)}function O(e,t,n){return(t=k(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function k(e){var t=A(e,`string`);return D(t)==`symbol`?t:t+``}function A(e,t){if(D(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(D(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var j={name:`Avatar`,extends:E,inheritAttrs:!1,emits:[`error`],methods:{onError:function(e){this.$emit(`error`,e)}},computed:{dataP:function(){return y(O(O({},this.shape,this.shape),this.size,this.size))}}},M=[`aria-labelledby`,`aria-label`,`data-p`],N=[`data-p`],P=[`data-p`],F=[`src`,`alt`,`data-p`];function I(n,r,c,l,u,d){return p(),f(`div`,m({class:n.cx(`root`),"aria-labelledby":n.ariaLabelledby,"aria-label":n.ariaLabel},n.ptmi(`root`),{"data-p":d.dataP}),[t(n.$slots,`default`,{},function(){return[n.label?(p(),f(`span`,m({key:0,class:n.cx(`label`)},n.ptm(`label`),{"data-p":d.dataP}),o(n.label),17,N)):n.$slots.icon?(p(),i(e(n.$slots.icon),{key:1,class:a(n.cx(`icon`))},null,8,[`class`])):n.icon?(p(),f(`span`,m({key:2,class:[n.cx(`icon`),n.icon]},n.ptm(`icon`),{"data-p":d.dataP}),null,16,P)):n.image?(p(),f(`img`,m({key:3,src:n.image,alt:n.ariaLabel,onError:r[0]||=function(){return d.onError&&d.onError.apply(d,arguments)}},n.ptm(`image`),{"data-p":d.dataP}),null,16,F)):s(``,!0)]})],16,M)}j.render=I;var L=_.extend({name:`toggleswitch`,style:`
    .p-toggleswitch {
        display: inline-block;
        width: dt('toggleswitch.width');
        height: dt('toggleswitch.height');
    }

    .p-toggleswitch-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        top: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border-radius: dt('toggleswitch.border.radius');
    }

    .p-toggleswitch-slider {
        cursor: pointer;
        width: 100%;
        height: 100%;
        border-width: dt('toggleswitch.border.width');
        border-style: solid;
        border-color: dt('toggleswitch.border.color');
        background: dt('toggleswitch.background');
        transition:
            background dt('toggleswitch.transition.duration'),
            color dt('toggleswitch.transition.duration'),
            border-color dt('toggleswitch.transition.duration'),
            outline-color dt('toggleswitch.transition.duration'),
            box-shadow dt('toggleswitch.transition.duration');
        border-radius: dt('toggleswitch.border.radius');
        outline-color: transparent;
        box-shadow: dt('toggleswitch.shadow');
    }

    .p-toggleswitch-handle {
        position: absolute;
        top: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: dt('toggleswitch.handle.background');
        color: dt('toggleswitch.handle.color');
        width: dt('toggleswitch.handle.size');
        height: dt('toggleswitch.handle.size');
        inset-inline-start: dt('toggleswitch.gap');
        margin-block-start: calc(-1 * calc(dt('toggleswitch.handle.size') / 2));
        border-radius: dt('toggleswitch.handle.border.radius');
        transition:
            background dt('toggleswitch.transition.duration'),
            color dt('toggleswitch.transition.duration'),
            inset-inline-start dt('toggleswitch.slide.duration'),
            box-shadow dt('toggleswitch.slide.duration');
    }

    .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
        background: dt('toggleswitch.checked.background');
        border-color: dt('toggleswitch.checked.border.color');
    }

    .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.checked.background');
        color: dt('toggleswitch.handle.checked.color');
        inset-inline-start: calc(dt('toggleswitch.width') - calc(dt('toggleswitch.handle.size') + dt('toggleswitch.gap')));
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-slider {
        background: dt('toggleswitch.hover.background');
        border-color: dt('toggleswitch.hover.border.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.hover.background');
        color: dt('toggleswitch.handle.hover.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-slider {
        background: dt('toggleswitch.checked.hover.background');
        border-color: dt('toggleswitch.checked.hover.border.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.checked.hover.background');
        color: dt('toggleswitch.handle.checked.hover.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
        box-shadow: dt('toggleswitch.focus.ring.shadow');
        outline: dt('toggleswitch.focus.ring.width') dt('toggleswitch.focus.ring.style') dt('toggleswitch.focus.ring.color');
        outline-offset: dt('toggleswitch.focus.ring.offset');
    }

    .p-toggleswitch.p-invalid > .p-toggleswitch-slider {
        border-color: dt('toggleswitch.invalid.border.color');
    }

    .p-toggleswitch.p-disabled {
        opacity: 1;
    }

    .p-toggleswitch.p-disabled .p-toggleswitch-slider {
        background: dt('toggleswitch.disabled.background');
    }

    .p-toggleswitch.p-disabled .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.disabled.background');
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-toggleswitch p-component`,{"p-toggleswitch-checked":t.checked,"p-disabled":n.disabled,"p-invalid":t.$invalid}]},input:`p-toggleswitch-input`,slider:`p-toggleswitch-slider`,handle:`p-toggleswitch-handle`},inlineStyles:{root:{position:`relative`}}}),R={name:`ToggleSwitch`,extends:{name:`BaseToggleSwitch`,extends:C,props:{trueValue:{type:null,default:!0},falseValue:{type:null,default:!1},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:L,provide:function(){return{$pcToggleSwitch:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`change`,`focus`,`blur`],methods:{getPTOptions:function(e){return(e===`root`?this.ptmi:this.ptm)(e,{context:{checked:this.checked,disabled:this.disabled}})},onChange:function(e){if(!this.disabled&&!this.readonly){var t=this.checked?this.falseValue:this.trueValue;this.writeValue(t,e),this.$emit(`change`,e)}},onFocus:function(e){this.$emit(`focus`,e)},onBlur:function(e){var t,n;this.$emit(`blur`,e),(t=(n=this.formField).onBlur)==null||t.call(n,e)}},computed:{checked:function(){return this.d_value===this.trueValue},dataP:function(){return y({checked:this.checked,disabled:this.disabled,invalid:this.$invalid})}}},z=[`data-p-checked`,`data-p-disabled`,`data-p`],B=[`id`,`checked`,`tabindex`,`disabled`,`readonly`,`aria-checked`,`aria-labelledby`,`aria-label`,`aria-invalid`],V=[`data-p`],H=[`data-p`];function U(e,n,r,i,a,o){return p(),f(`div`,m({class:e.cx(`root`),style:e.sx(`root`)},o.getPTOptions(`root`),{"data-p-checked":o.checked,"data-p-disabled":e.disabled,"data-p":o.dataP}),[d(`input`,m({id:e.inputId,type:`checkbox`,role:`switch`,class:[e.cx(`input`),e.inputClass],style:e.inputStyle,checked:o.checked,tabindex:e.tabindex,disabled:e.disabled,readonly:e.readonly,"aria-checked":o.checked,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-invalid":e.invalid||void 0,onFocus:n[0]||=function(){return o.onFocus&&o.onFocus.apply(o,arguments)},onBlur:n[1]||=function(){return o.onBlur&&o.onBlur.apply(o,arguments)},onChange:n[2]||=function(){return o.onChange&&o.onChange.apply(o,arguments)}},o.getPTOptions(`input`)),null,16,B),d(`div`,m({class:e.cx(`slider`)},o.getPTOptions(`slider`),{"data-p":o.dataP}),[d(`div`,m({class:e.cx(`handle`)},o.getPTOptions(`handle`),{"data-p":o.dataP}),[t(e.$slots,`handle`,{checked:o.checked})],16,H)],16,V)],16,z)}R.render=U;var W=_.extend({name:`skeleton`,style:`
    .p-skeleton {
        display: block;
        overflow: hidden;
        background: dt('skeleton.background');
        border-radius: dt('skeleton.border.radius');
    }

    .p-skeleton::after {
        content: '';
        animation: p-skeleton-animation 1.2s infinite;
        height: 100%;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(-100%);
        z-index: 1;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0), dt('skeleton.animation.background'), rgba(255, 255, 255, 0));
    }

    [dir='rtl'] .p-skeleton::after {
        animation-name: p-skeleton-animation-rtl;
    }

    .p-skeleton-circle {
        border-radius: 50%;
    }

    .p-skeleton-animation-none::after {
        animation: none;
    }

    @keyframes p-skeleton-animation {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(100%);
        }
    }

    @keyframes p-skeleton-animation-rtl {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(-100%);
        }
    }
`,classes:{root:function(e){var t=e.props;return[`p-skeleton p-component`,{"p-skeleton-circle":t.shape===`circle`,"p-skeleton-animation-none":t.animation===`none`}]}},inlineStyles:{root:{position:`relative`}}}),G={name:`BaseSkeleton`,extends:g,props:{shape:{type:String,default:`rectangle`},size:{type:String,default:null},width:{type:String,default:`100%`},height:{type:String,default:`1rem`},borderRadius:{type:String,default:null},animation:{type:String,default:`wave`}},style:W,provide:function(){return{$pcSkeleton:this,$parentInstance:this}}};function K(e){"@babel/helpers - typeof";return K=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},K(e)}function q(e,t,n){return(t=J(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function J(e){var t=Y(e,`string`);return K(t)==`symbol`?t:t+``}function Y(e,t){if(K(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(K(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var X={name:`Skeleton`,extends:G,inheritAttrs:!1,computed:{containerStyle:function(){return this.size?{width:this.size,height:this.size,borderRadius:this.borderRadius}:{width:this.width,height:this.height,borderRadius:this.borderRadius}},dataP:function(){return y(q({},this.shape,this.shape))}}},Z=[`data-p`];function Q(e,t,n,r,i,a){return p(),f(`div`,m({class:e.cx(`root`),style:[e.sx(`root`),a.containerStyle],"aria-hidden":`true`},e.ptmi(`root`),{"data-p":a.dataP}),null,16,Z)}X.render=Q;var $={key:0,class:`loading`},te={key:1,class:`home`},ne={class:`title`},re={key:0,class:`content`},ie={key:1,class:`profile`},ae={class:`profile-info`},oe={class:`name`},se={class:`email`},ce={key:0,class:`actions`},le={key:1,class:`actions`},ue={key:0,class:`toggle-container`},de={class:`toggle-label`},fe={key:1},pe=v({__name:`Home.page`,setup(e){let{loginWithRedirect:t,isAuthenticated:a,logout:m,isLoading:g,user:_}=ee(),v=l(()=>_.value?.name?.slice(0,4)||`?`),y=l(()=>_.value?.email),C=h(),T=()=>{t({authorizationParams:{screen_hint:`signup`}})},E=()=>{t()},D=()=>{m()};return(e,t)=>(p(),f(u,null,[r(g)?(p(),f(`div`,$,[c(r(X),{class:`home`,width:`50%`,height:`200px`})])):s(``,!0),r(g)?s(``,!0):(p(),f(`div`,te,[c(r(x),{class:`home-card`},{title:n(()=>[d(`div`,ne,[t[1]||=d(`span`,null,`Welcome`,-1),r(a)?(p(),i(r(w),{key:0,value:`Signed in`,severity:`success`})):(p(),i(r(w),{key:1,value:`Guest`,severity:`info`}))])]),content:n(()=>[r(a)?(p(),f(`div`,ie,[c(r(j),{label:r(_)?.name?.charAt(0)||`?`,shape:`circle`,size:`large`},null,8,[`label`]),d(`div`,ae,[d(`span`,oe,o(v.value||`Unknown user`),1),d(`span`,se,o(y.value||`No email`),1)])])):(p(),f(`div`,re,[...t[2]||=[d(`p`,{class:`subtitle`},` Create an account or continue with your login to manage users. `,-1)]]))]),footer:n(()=>[c(r(S)),r(a)?(p(),f(`div`,le,[c(r(b),{label:`Log out`,severity:`danger`,onClick:D})])):(p(),f(`div`,ce,[c(r(b),{label:`Sign up`,onClick:T}),c(r(b),{label:`Log in`,severity:`secondary`,onClick:E})]))]),_:1}),c(r(x),{class:`home-card`},{content:n(()=>[r(a)?(p(),f(`div`,ue,[c(r(R),{modelValue:r(C).configs.darkMode,"onUpdate:modelValue":t[0]||=e=>r(C).configs.darkMode=e},null,8,[`modelValue`]),d(`span`,de,o(r(C).configs.darkMode?`Dark Mode`:`Light Mode`),1)])):(p(),f(`p`,fe,`Please sign in to access the user management features.`))]),_:1})]))],64))}},[[`__scopeId`,`data-v-760ea295`]]);export{pe as default};
//# sourceMappingURL=Home.page-CwNzQJEq.js.map