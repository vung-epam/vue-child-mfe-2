(function(){try{var e=typeof window<`u`?window:typeof global<`u`?global:typeof globalThis<`u`?globalThis:typeof self<`u`?self:{};e.SENTRY_RELEASE={id:`e25ce935b9975e77fdab1297eecb47db0951569b`};var t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]=`9d4eb8ce-662f-43d6-afb6-ffb91d060fdd`,e._sentryDebugIdIdentifier=`sentry-dbid-9d4eb8ce-662f-43d6-afb6-ffb91d060fdd`)}catch{}})();import{F as e,K as t,Q as n,h as r,m as i,p as a,s as o,u as s,w as c,x as l}from"./runtime-core.esm-bundler-EmIh1ndn.js";import{i as u}from"./runtime-dom.esm-bundler-DKbewVy6.js";import{s as d,t as f}from"./plugin-vue-export-helper-BTfMbic8.js";import{a as p,n as m,t as h}from"./card-7LWNIAav.js";import{i as g}from"./vue-router-io7J6hhh.js";import{t as _}from"./divider-z7WCRq6H.js";import{n as v,t as y}from"./inputtext-BI8Izv0b.js";import{t as b}from"./message-wMnUFg1x.js";import{t as x}from"./toolbar-ZLsB8PtI.js";import{t as S}from"./select-B3LOTkcD.js";var C={name:`Dropdown`,extends:S,mounted:function(){console.warn(`Deprecated since v4. Use Select component instead.`)}},w=d.extend({name:`textarea`,style:`
    .p-textarea {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('textarea.color');
        background: dt('textarea.background');
        padding-block: dt('textarea.padding.y');
        padding-inline: dt('textarea.padding.x');
        border: 1px solid dt('textarea.border.color');
        transition:
            background dt('textarea.transition.duration'),
            color dt('textarea.transition.duration'),
            border-color dt('textarea.transition.duration'),
            outline-color dt('textarea.transition.duration'),
            box-shadow dt('textarea.transition.duration');
        appearance: none;
        border-radius: dt('textarea.border.radius');
        outline-color: transparent;
        box-shadow: dt('textarea.shadow');
    }

    .p-textarea:enabled:hover {
        border-color: dt('textarea.hover.border.color');
    }

    .p-textarea:enabled:focus {
        border-color: dt('textarea.focus.border.color');
        box-shadow: dt('textarea.focus.ring.shadow');
        outline: dt('textarea.focus.ring.width') dt('textarea.focus.ring.style') dt('textarea.focus.ring.color');
        outline-offset: dt('textarea.focus.ring.offset');
    }

    .p-textarea.p-invalid {
        border-color: dt('textarea.invalid.border.color');
    }

    .p-textarea.p-variant-filled {
        background: dt('textarea.filled.background');
    }

    .p-textarea.p-variant-filled:enabled:hover {
        background: dt('textarea.filled.hover.background');
    }

    .p-textarea.p-variant-filled:enabled:focus {
        background: dt('textarea.filled.focus.background');
    }

    .p-textarea:disabled {
        opacity: 1;
        background: dt('textarea.disabled.background');
        color: dt('textarea.disabled.color');
    }

    .p-textarea::placeholder {
        color: dt('textarea.placeholder.color');
    }

    .p-textarea.p-invalid::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }

    .p-textarea-fluid {
        width: 100%;
    }

    .p-textarea-resizable {
        overflow: hidden;
        resize: none;
    }

    .p-textarea-sm {
        font-size: dt('textarea.sm.font.size');
        padding-block: dt('textarea.sm.padding.y');
        padding-inline: dt('textarea.sm.padding.x');
    }

    .p-textarea-lg {
        font-size: dt('textarea.lg.font.size');
        padding-block: dt('textarea.lg.padding.y');
        padding-inline: dt('textarea.lg.padding.x');
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-textarea p-component`,{"p-filled":t.$filled,"p-textarea-resizable ":n.autoResize,"p-textarea-sm p-inputfield-sm":n.size===`small`,"p-textarea-lg p-inputfield-lg":n.size===`large`,"p-invalid":t.$invalid,"p-variant-filled":t.$variant===`filled`,"p-textarea-fluid":t.$fluid}]}}}),T={name:`BaseTextarea`,extends:v,props:{autoResize:Boolean},style:w,provide:function(){return{$pcTextarea:this,$parentInstance:this}}};function E(e){"@babel/helpers - typeof";return E=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},E(e)}function D(e,t,n){return(t=O(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function O(e){var t=k(e,`string`);return E(t)==`symbol`?t:t+``}function k(e,t){if(E(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(E(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var A={name:`Textarea`,extends:T,inheritAttrs:!1,observer:null,mounted:function(){var e=this;this.autoResize&&(this.observer=new ResizeObserver(function(){requestAnimationFrame(function(){e.resize()})}),this.observer.observe(this.$el))},updated:function(){this.autoResize&&this.resize()},beforeUnmount:function(){this.observer&&this.observer.disconnect()},methods:{resize:function(){if(this.$el.offsetParent){var e=this.$el.style.height,t=parseInt(e)||0,n=this.$el.scrollHeight;t&&n<t?(this.$el.style.height=`auto`,this.$el.style.height=`${this.$el.scrollHeight}px`):(!t||n>t)&&(this.$el.style.height=`${n}px`)}},onInput:function(e){this.autoResize&&this.resize(),this.writeValue(e.target.value,e)}},computed:{attrs:function(){return l(this.ptmi(`root`,{context:{filled:this.$filled,disabled:this.disabled}}),this.formField)},dataP:function(){return p(D({invalid:this.$invalid,fluid:this.$fluid,filled:this.$variant===`filled`},this.size,this.size))}}},j=[`value`,`name`,`disabled`,`aria-invalid`,`data-p`];function M(e,t,n,r,i,a){return c(),s(`textarea`,l({class:e.cx(`root`),value:e.d_value,name:e.name,disabled:e.disabled,"aria-invalid":e.invalid||void 0,"data-p":a.dataP,onInput:t[0]||=function(){return a.onInput&&a.onInput.apply(a,arguments)}},a.attrs),null,16,j)}A.render=M;var N={class:`page`},P={class:`field`},F={class:`field`},I={class:`field`},L={class:`field`},R={class:`actions`},z=f(r({__name:`Edit.Page`,setup(r){let l=g(),d=[{label:`Admin`,value:`Admin`},{label:`Manager`,value:`Manager`},{label:`Viewer`,value:`Viewer`}],f=t({name:`Jamie Tran`,email:`jamie.tran@company.com`,role:`Manager`,note:`Joined the growth team in 2024.`}),p=()=>{},v=()=>{l.push({name:`list-user`})};return(t,r)=>(c(),s(`div`,N,[i(n(x),{class:`page-toolbar`},{start:e(()=>[...r[4]||=[o(`div`,{class:`page-title`},`Edit User`,-1)]]),end:e(()=>[i(n(m),{label:`Back to list`,text:``,onClick:v})]),_:1}),i(n(h),{class:`content-card`},{title:e(()=>[...r[5]||=[a(`Profile`,-1)]]),subtitle:e(()=>[...r[6]||=[a(`Update user information and save changes.`,-1)]]),content:e(()=>[i(n(b),{severity:`warn`,closable:!1},{default:e(()=>[...r[7]||=[a(` Remember to notify the user after updating their role. `,-1)]]),_:1}),i(n(_)),o(`form`,{class:`form`,onSubmit:u(p,[`prevent`])},[o(`div`,P,[r[8]||=o(`label`,{for:`name`},`Full name`,-1),i(n(y),{id:`name`,modelValue:f.value.name,"onUpdate:modelValue":r[0]||=e=>f.value.name=e},null,8,[`modelValue`])]),o(`div`,F,[r[9]||=o(`label`,{for:`email`},`Email address`,-1),i(n(y),{id:`email`,modelValue:f.value.email,"onUpdate:modelValue":r[1]||=e=>f.value.email=e},null,8,[`modelValue`])]),o(`div`,I,[r[10]||=o(`label`,{for:`role`},`Role`,-1),i(n(C),{id:`role`,modelValue:f.value.role,"onUpdate:modelValue":r[2]||=e=>f.value.role=e,options:d,optionLabel:`label`,optionValue:`value`,placeholder:`Select a role`},null,8,[`modelValue`])]),o(`div`,L,[r[11]||=o(`label`,{for:`note`},`Note`,-1),i(n(A),{id:`note`,modelValue:f.value.note,"onUpdate:modelValue":r[3]||=e=>f.value.note=e,rows:`4`},null,8,[`modelValue`])]),o(`div`,R,[i(n(m),{label:`Save changes`,type:`submit`}),i(n(m),{label:`Cancel`,text:``,type:`button`,onClick:v})])],32)]),_:1})]))}}),[[`__scopeId`,`data-v-12fc83a7`]]);export{z as default};
//# sourceMappingURL=Edit.Page-Db517s5E.js.map