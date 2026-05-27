(function(){try{var e=typeof window<`u`?window:typeof global<`u`?global:typeof globalThis<`u`?globalThis:typeof self<`u`?self:{};e.SENTRY_RELEASE={id:`5a4b99fac13e438d6109ba17422a3e6283d1fc94`};var t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]=`a6be6649-c982-4b3f-a6eb-b2c1a81c2d8c`,e._sentryDebugIdIdentifier=`sentry-dbid-a6be6649-c982-4b3f-a6eb-b2c1a81c2d8c`)}catch{}})();import{D as e,s as t,u as n,w as r,x as i}from"./runtime-core.esm-bundler-DLCrKq1W.js";import{a,s as o}from"./plugin-vue-export-helper-SqhnPzXu.js";var s=o.extend({name:`toolbar`,style:`
    .p-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: dt('toolbar.padding');
        background: dt('toolbar.background');
        border: 1px solid dt('toolbar.border.color');
        color: dt('toolbar.color');
        border-radius: dt('toolbar.border.radius');
        gap: dt('toolbar.gap');
    }

    .p-toolbar-start,
    .p-toolbar-center,
    .p-toolbar-end {
        display: flex;
        align-items: center;
    }
`,classes:{root:`p-toolbar p-component`,start:`p-toolbar-start`,center:`p-toolbar-center`,end:`p-toolbar-end`}}),c={name:`Toolbar`,extends:{name:`BaseToolbar`,extends:a,props:{ariaLabelledby:{type:String,default:null}},style:s,provide:function(){return{$pcToolbar:this,$parentInstance:this}}},inheritAttrs:!1},l=[`aria-labelledby`];function u(a,o,s,c,u,d){return r(),n(`div`,i({class:a.cx(`root`),role:`toolbar`,"aria-labelledby":a.ariaLabelledby},a.ptmi(`root`)),[t(`div`,i({class:a.cx(`start`)},a.ptm(`start`)),[e(a.$slots,`start`)],16),t(`div`,i({class:a.cx(`center`)},a.ptm(`center`)),[e(a.$slots,`center`)],16),t(`div`,i({class:a.cx(`end`)},a.ptm(`end`)),[e(a.$slots,`end`)],16)],16,l)}c.render=u;export{c as t};
//# sourceMappingURL=toolbar-CVIf1FFq.js.map