(self.webpackChunkstrapi_atlas=self.webpackChunkstrapi_atlas||[]).push([[1616,6287],{29327:g=>{function u(s,t,l,d){for(var r=l-1,P=s.length;++r<P;)if(d(s[r],t))return r;return-1}g.exports=u},20920:(g,u,s)=>{var t=s(87864),l=s(80151),d=s(29327),r=s(52689),P=s(76299),L=Array.prototype,h=L.splice;function v(i,p,A,G){var Z=G?d:l,Y=-1,H=p.length,E=i;for(i===p&&(p=P(p)),A&&(E=t(i,r(A)));++Y<H;)for(var W=0,R=p[Y],S=A?A(R):R;(W=Z(E,S,W,G))>-1;)E!==i&&h.call(E,W,1),h.call(i,W,1);return i}g.exports=v},34542:(g,u,s)=>{var t=s(87864),l=s(45353),d=s(29884),r=s(82261);function P(L,h){var v=r(L)?t:d;return v(L,l(h,3))}g.exports=P},92173:(g,u,s)=>{var t=s(39226),l=s(76610),d=t(l);g.exports=d},76610:(g,u,s)=>{var t=s(20920);function l(d,r){return d&&d.length&&r&&r.length?t(d,r):d}g.exports=l},61468:(g,u,s)=>{var t=s(52196);function l(d){var r=d==null?0:d.length;return r?t(d,1,r):[]}g.exports=l},1616:(g,u,s)=>{"use strict";s.d(u,{ProtectedCreateView:()=>cs});var t=s(92132),l=s(51337),d=s(82437),r=s(97987),P=s(96287),L=s(21272),h=s(55151),v=s(79077),i=s(69580),p=s(15126),A=s(63299),G=s(67014),Z=s(59080),Y=s(79275),H=s(14718),E=s(61535),W=s(5790),R=s(12083),S=s(35223),N=s(5409),b=s(74930),k=s(2600),K=s(48940),os=s(41286),is=s(51187),ls=s(56336),_s=s(39404),ds=s(58692),Q=s(54257),rs=s(501),V=s(57646),Es=s(23120),ss=s(44414),As=s(25962),Ts=s(14664),hs=s(42588),ms=s(90325),gs=s(62785),ps=s(87443),Cs=s(41032),Is=s(22957),vs=s(93179),us=s(73055),Ls=s(15747),Rs=s(85306),xs=s(77965),ys=s(26509),Us=s(84624),fs=s(71210),Bs=s(32058),Ws=s(81185),Ks=s(82261),js=s(80836),Ss=s(32118),Ns=s(34542),ks=s(61468),Vs=s(24092),$s=s(92173);const cs=()=>{const Ps=(0,d.d4)(r.s);return(0,t.jsx)(l.kz,{permissions:Ps.settings?.["api-tokens"].create,children:(0,t.jsx)(P.w,{})})}},96287:(g,u,s)=>{"use strict";s.d(u,{ProtectedEditView:()=>dt,w:()=>Os});var t=s(92132),l=s(21272),d=s(94061),r=s(83997),P=s(30893),L=s(90151),h=s(68074),v=s(38413),i=s(55356),p=s(85963),A=s(4198),G=s(57237),Z=s(60888),Y=s(44604),H=s(4181),E=s(51337),W=s(61535),R=s(54894),S=s(17703),N=s(69580),b=s(80836),k=s(99831),K=s(32118),os=s(95267),is=s(54514),ls=s(20415),_s=s(34542),ds=s(61468),Q=s(63891),rs=s(24092),V=s(12083),Es=s(88761),ss=s(92173),As=s(15126),Ts=s(63299),hs=s(67014),ms=s(59080),gs=s(79275),ps=s(14718),Cs=s(82437),Is=s(5790),vs=s(35223),us=s(5409),Ls=s(74930),Rs=s(2600),xs=s(48940),ys=s(41286),Us=s(51187),fs=s(56336),Bs=s(39404),Ws=s(58692),Ks=s(54257),js=s(501),Ss=s(57646),Ns=s(23120),ks=s(44414),Vs=s(25962),$s=s(14664),cs=s(42588),Ps=s(90325),Tt=s(62785),ht=s(87443),mt=s(41032),gt=s(22957),pt=s(93179),Ct=s(73055),It=s(15747),vt=s(85306),ut=s(77965),Lt=s(26509),Rt=s(84624),xt=s(71210),yt=s(32058),Ut=s(81185),ft=s(82261);const Fs=N.n.injectEndpoints({endpoints:n=>({getPermissions:n.query({query:()=>"/admin/content-api/permissions",transformResponse:e=>e.data}),getRoutes:n.query({query:()=>"/admin/content-api/routes",transformResponse:e=>e.data})}),overrideExisting:!1}),{useGetPermissionsQuery:zs,useGetRoutesQuery:Gs}=Fs,[Ys,Hs]=(0,os.q)("ApiTokenPermissionsContext"),Qs=({children:n,...e})=>(0,t.jsx)(Ys,{...e,children:n}),ts=()=>Hs("useApiTokenPermissions"),Js=({errors:n={},onChange:e,canEditInputs:a,isCreating:c,values:o={},apiToken:O={},onDispatch:_,setHasChangedPermissions:B})=>{const{formatMessage:m}=(0,R.A)(),f=({target:{value:x}})=>{B(!1),x==="full-access"&&_({type:"SELECT_ALL_ACTIONS"}),x==="read-only"&&_({type:"ON_CHANGE_READ_ONLY"})},J=[{value:"read-only",label:{id:"Settings.tokens.types.read-only",defaultMessage:"Read-only"}},{value:"full-access",label:{id:"Settings.tokens.types.full-access",defaultMessage:"Full access"}},{value:"custom",label:{id:"Settings.tokens.types.custom",defaultMessage:"Custom"}}];return(0,t.jsx)(d.a,{background:"neutral0",hasRadius:!0,shadow:"filterShadow",paddingTop:6,paddingBottom:6,paddingLeft:7,paddingRight:7,children:(0,t.jsxs)(r.s,{direction:"column",alignItems:"stretch",gap:4,children:[(0,t.jsx)(P.o,{variant:"delta",as:"h2",children:m({id:"global.details",defaultMessage:"Details"})}),(0,t.jsxs)(L.x,{gap:5,children:[(0,t.jsx)(h.E,{col:6,xs:12,children:(0,t.jsx)(K.T,{error:n.name,value:o.name,canEditInputs:a,onChange:e})},"name"),(0,t.jsx)(h.E,{col:6,xs:12,children:(0,t.jsx)(K.a,{error:n.description,value:o.description,canEditInputs:a,onChange:e})},"description"),(0,t.jsx)(h.E,{col:6,xs:12,children:(0,t.jsx)(K.L,{isCreating:c,error:n.lifespan,value:o.lifespan,onChange:e,token:O})},"lifespan"),(0,t.jsx)(h.E,{col:6,xs:12,children:(0,t.jsx)(K.b,{value:o.type,error:n.type,label:{id:"Settings.tokens.form.type",defaultMessage:"Token type"},onChange:x=>{f({target:{value:x}}),e({target:{name:"type",value:x}})},options:J,canEditInputs:a})},"type")]})]})})},Xs=({apiTokenName:n=null})=>{const{formatMessage:e}=(0,R.A)();return(0,E.L4)(),(0,t.jsxs)(v.g,{"aria-busy":"true",children:[(0,t.jsx)(E.x7,{name:"API Tokens"}),(0,t.jsx)(i.Q,{primaryAction:(0,t.jsx)(p.$,{disabled:!0,startIcon:(0,t.jsx)(is.A,{}),type:"button",size:"L",children:e({id:"global.save",defaultMessage:"Save"})}),title:n||e({id:"Settings.apiTokens.createPage.title",defaultMessage:"Create API Token"})}),(0,t.jsx)(A.s,{children:(0,t.jsx)(E.Bl,{})})]})},Zs=n=>{switch(n){case"POST":return{text:"success600",border:"success200",background:"success100"};case"GET":return{text:"secondary600",border:"secondary200",background:"secondary100"};case"PUT":return{text:"warning600",border:"warning200",background:"warning100"};case"DELETE":return{text:"danger600",border:"danger200",background:"danger100"};default:return{text:"neutral600",border:"neutral200",background:"neutral100"}}},bs=(0,Q.Ay)(d.a)`
  margin: -1px;
  border-radius: ${({theme:n})=>n.spaces[1]} 0 0 ${({theme:n})=>n.spaces[1]};
`,ws=({route:n={handler:"Nocontroller.error",method:"GET",path:"/there-is-no-path"}})=>{const{formatMessage:e}=(0,R.A)(),{method:a,handler:c,path:o}=n,O=o?ds(o.split("/")):[],[_="",B=""]=c?c.split("."):[],m=Zs(n.method);return(0,t.jsxs)(r.s,{direction:"column",alignItems:"stretch",gap:2,children:[(0,t.jsxs)(P.o,{variant:"delta",as:"h3",children:[e({id:"Settings.apiTokens.createPage.BoundRoute.title",defaultMessage:"Bound route to"}),"\xA0",(0,t.jsx)("span",{children:_}),(0,t.jsxs)(P.o,{variant:"delta",textColor:"primary600",children:[".",B]})]}),(0,t.jsxs)(r.s,{hasRadius:!0,background:"neutral0",borderColor:"neutral200",gap:0,children:[(0,t.jsx)(bs,{background:m.background,borderColor:m.border,padding:2,children:(0,t.jsx)(P.o,{fontWeight:"bold",textColor:m.text,children:a})}),(0,t.jsx)(d.a,{paddingLeft:2,paddingRight:2,children:_s(O,f=>(0,t.jsxs)(P.o,{textColor:f.includes(":")?"neutral600":"neutral900",children:["/",f]},f))})]})]})},qs=()=>{const{value:{selectedAction:n,routes:e}}=ts(),{formatMessage:a}=(0,R.A)(),c=n?.split(".")[0];return(0,t.jsx)(h.E,{col:5,background:"neutral150",paddingTop:6,paddingBottom:6,paddingLeft:7,paddingRight:7,style:{minHeight:"100%"},children:n?(0,t.jsx)(r.s,{direction:"column",alignItems:"stretch",gap:2,children:c&&c in e&&e[c].map(o=>o.config.auth?.scope?.includes(n)||o.handler===n?(0,t.jsx)(ws,{route:o},o.handler):null)}):(0,t.jsxs)(r.s,{direction:"column",alignItems:"stretch",gap:2,children:[(0,t.jsx)(P.o,{variant:"delta",as:"h3",children:a({id:"Settings.apiTokens.createPage.permissions.header.title",defaultMessage:"Advanced settings"})}),(0,t.jsx)(P.o,{as:"p",textColor:"neutral600",children:a({id:"Settings.apiTokens.createPage.permissions.header.hint",defaultMessage:"Select the application's actions or the plugin's actions and click on the cog icon to display the bound route"})})]})})},Ms=(0,Q.AH)`
  background: ${n=>n.theme.colors.primary100};
  svg {
    opacity: 1;
  }
`,st=(0,Q.Ay)(d.a)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    opacity: 0;
    path {
      fill: ${n=>n.theme.colors.primary600};
    }
  }

  /* Show active style both on hover and when the action is selected */
  ${n=>n.isActive&&Ms}
  &:hover {
    ${Ms}
  }
`,tt=Q.Ay.div`
  flex: 1;
  align-self: center;
  border-top: 1px solid ${({theme:n})=>n.colors.neutral150};
`,et=({controllers:n=[],label:e,orderNumber:a=0,disabled:c=!1,onExpanded:o=()=>null,indexExpandendCollapsedContent:O=null})=>{const{value:{onChangeSelectAll:_,onChange:B,selectedActions:m,setSelectedAction:f,selectedAction:J}}=ts(),[x,w]=l.useState(!1),{formatMessage:X}=(0,R.A)(),C=()=>{w(T=>!T),o(a)};l.useEffect(()=>{O!==null&&O!==a&&x&&w(!1)},[O,a,x]);const Ds=T=>T===J;return(0,t.jsxs)(G.n,{expanded:x,onToggle:C,variant:a%2?"primary":"secondary",children:[(0,t.jsx)(Z.P,{title:rs(e)}),(0,t.jsx)(Y.u,{children:n?.map(T=>{const y=T.actions.every(I=>m.includes(I.actionId)),U=T.actions.some(I=>m.includes(I.actionId));return(0,t.jsxs)(d.a,{children:[(0,t.jsxs)(r.s,{justifyContent:"space-between",alignItems:"center",padding:4,children:[(0,t.jsx)(d.a,{paddingRight:4,children:(0,t.jsx)(P.o,{variant:"sigma",textColor:"neutral600",children:T?.controller})}),(0,t.jsx)(tt,{}),(0,t.jsx)(d.a,{paddingLeft:4,children:(0,t.jsx)(H.S,{value:y,indeterminate:!y&&U,onValueChange:()=>{_({target:{value:[...T.actions]}})},disabled:c,children:X({id:"app.utils.select-all",defaultMessage:"Select all"})})})]}),(0,t.jsx)(L.x,{gap:4,padding:4,children:T?.actions&&T?.actions.map(I=>(0,t.jsx)(h.E,{col:6,children:(0,t.jsxs)(st,{isActive:Ds(I.actionId),padding:2,hasRadius:!0,children:[(0,t.jsx)(H.S,{value:m.includes(I.actionId),name:I.actionId,onValueChange:()=>{B({target:{value:I.actionId}})},disabled:c,children:I.action}),(0,t.jsx)("button",{type:"button","data-testid":"action-cog",onClick:()=>f({target:{value:I.actionId}}),style:{display:"inline-flex",alignItems:"center"},children:(0,t.jsx)(ls.A,{})})]})},I.actionId))})]},`${e}.${T?.controller}`)})})]})},nt=({section:n=null,...e})=>{const[a,c]=l.useState(null),o=O=>c(O);return(0,t.jsx)(d.a,{padding:4,background:"neutral0",children:n&&n.map((O,_)=>(0,t.jsx)(et,{label:O.label,controllers:O.controllers,orderNumber:_,indexExpandendCollapsedContent:a,onExpanded:o,...e},O.apiId))})},at=({...n})=>{const{value:{data:e}}=ts(),{formatMessage:a}=(0,R.A)();return(0,t.jsxs)(L.x,{gap:0,shadow:"filterShadow",hasRadius:!0,background:"neutral0",children:[(0,t.jsxs)(h.E,{col:7,paddingTop:6,paddingBottom:6,paddingLeft:7,paddingRight:7,children:[(0,t.jsxs)(r.s,{direction:"column",alignItems:"stretch",gap:2,children:[(0,t.jsx)(P.o,{variant:"delta",as:"h2",children:a({id:"Settings.apiTokens.createPage.permissions.title",defaultMessage:"Permissions"})}),(0,t.jsx)(P.o,{as:"p",textColor:"neutral600",children:a({id:"Settings.apiTokens.createPage.permissions.description",defaultMessage:"Only actions bound by a route are listed below."})})]}),e?.permissions&&(0,t.jsx)(nt,{section:e?.permissions,...n})]}),(0,t.jsx)(qs,{})]})},ot=V.Ik().shape({name:V.Yj().max(100).required(E.iW.required),type:V.Yj().oneOf(["read-only","full-access","custom"]).required(E.iW.required),description:V.Yj().nullable(),lifespan:V.ai().integer().min(0).nullable().defined(E.iW.required)}),it=n=>{const e={allActionsIds:[],permissions:[]};return e.permissions=Object.entries(n).map(([a,c])=>({apiId:a,label:a.split("::")[1],controllers:Object.keys(c.controllers).map(o=>({controller:o,actions:o in c.controllers?c.controllers[o].map(O=>{const _=`${a}.${o}.${O}`;return a.includes("api::")&&e.allActionsIds.push(_),{action:O,actionId:_}}).flat():[]})).flat()})),e},lt={data:{allActionsIds:[],permissions:[]},routes:{},selectedAction:"",selectedActions:[]},_t=(n,e)=>(0,Es.Ay)(n,a=>{switch(e.type){case"ON_CHANGE":{a.selectedActions.includes(e.value)?ss(a.selectedActions,e.value):a.selectedActions.push(e.value);break}case"SELECT_ALL_IN_PERMISSION":{e.value.every(o=>a.selectedActions.includes(o.actionId))?e.value.forEach(o=>{ss(a.selectedActions,o.actionId)}):e.value.forEach(o=>{a.selectedActions.push(o.actionId)});break}case"SELECT_ALL_ACTIONS":{a.selectedActions=[...a.data.allActionsIds];break}case"ON_CHANGE_READ_ONLY":{const c=a.data.allActionsIds.filter(o=>o.includes("find")||o.includes("findOne"));a.selectedActions=[...c];break}case"UPDATE_PERMISSIONS_LAYOUT":{a.data=it(e.value);break}case"UPDATE_ROUTES":{a.routes={...e.value};break}case"UPDATE_PERMISSIONS":{a.selectedActions=[...e.value];break}case"SET_SELECTED_ACTION":{a.selectedAction=e.value;break}default:return a}}),Os=()=>{(0,E.L4)();const{formatMessage:n}=(0,R.A)(),e=(0,E.hN)(),{lockApp:a,unlockApp:c}=(0,E.MA)(),{state:o}=(0,S.zy)(),O=(0,N.j)(M=>M.admin_app.permissions),[_,B]=l.useState(o?.apiToken?.accessKey?{...o.apiToken}:null),{trackUsage:m}=(0,E.z1)(),{setCurrentStep:f}=(0,E.Cx)(),{allowedActions:{canCreate:J,canUpdate:x,canRegenerate:w}}=(0,E.ec)(O.settings?.["api-tokens"]),[X,C]=l.useReducer(_t,lt),T=(0,S.W5)("/settings/api-tokens/:id")?.params?.id,y=T==="create",{_unstableFormatAPIError:U,_unstableFormatValidationErrors:I}=(0,E.wq)(),rt=(0,S.W6)(),$=zs(),F=Gs();l.useEffect(()=>{$.error&&e({type:"warning",message:U($.error)})},[$.error,U,e]),l.useEffect(()=>{F.error&&e({type:"warning",message:U(F.error)})},[F.error,U,e]),l.useEffect(()=>{$.data&&C({type:"UPDATE_PERMISSIONS_LAYOUT",value:$.data})},[$.data]),l.useEffect(()=>{F.data&&C({type:"UPDATE_ROUTES",value:F.data})},[F.data]),l.useEffect(()=>{_&&(_.type==="read-only"&&C({type:"ON_CHANGE_READ_ONLY"}),_.type==="full-access"&&C({type:"SELECT_ALL_ACTIONS"}),_.type==="custom"&&C({type:"UPDATE_PERMISSIONS",value:_?.permissions}))},[_]),l.useEffect(()=>{m(y?"didAddTokenFromList":"didEditTokenFromList",{tokenType:k.A})},[y,m]);const{data:j,error:es,isLoading:Et}=(0,b.b)(T,{skip:!T||y||!!_});l.useEffect(()=>{es&&e({type:"warning",message:U(es)})},[es,U,e]),l.useEffect(()=>{j&&(B(j),j.type==="read-only"&&C({type:"ON_CHANGE_READ_ONLY"}),j.type==="full-access"&&C({type:"SELECT_ALL_ACTIONS"}),j.type==="custom"&&C({type:"UPDATE_PERMISSIONS",value:j?.permissions}))},[j]);const[ct]=(0,b.c)(),[Pt]=(0,b.d)(),Mt=async(M,z)=>{m(y?"willCreateToken":"willEditToken",{tokenType:k.A}),a();try{if(y){const D=await ct({...M,lifespan:M.lifespan==="0"?parseInt(M.lifespan):null,permissions:M.type==="custom"?X.selectedActions:null});if("error"in D){(0,N.x)(D.error)&&D.error.name==="ValidationError"?z.setErrors(I(D.error)):e({type:"warning",message:U(D.error)});return}e({type:"success",message:n({id:"notification.success.apitokencreated",defaultMessage:"API Token successfully created"})}),m("didCreateToken",{type:D.data.type,tokenType:k.A}),rt.replace(`/settings/api-tokens/${D.data.id}`,{apiToken:D.data}),f("apiTokens.success")}else{const D=await Pt({id:T,name:M.name,description:M.description,type:M.type,permissions:M.type==="custom"?X.selectedActions:null});if("error"in D){(0,N.x)(D.error)&&D.error.name==="ValidationError"?z.setErrors(I(D.error)):e({type:"warning",message:U(D.error)});return}e({type:"success",message:n({id:"notification.success.apitokenedited",defaultMessage:"API Token successfully edited"})}),m("didEditToken",{type:D.data.type,tokenType:k.A})}}catch{e({type:"warning",message:{id:"notification.error",defaultMessage:"Something went wrong"}})}finally{c()}},[Ot,ns]=l.useState(!1),Dt={...X,onChange:({target:{value:M}})=>{ns(!0),C({type:"ON_CHANGE",value:M})},onChangeSelectAll:({target:{value:M}})=>{ns(!0),C({type:"SELECT_ALL_IN_PERMISSION",value:M})},setSelectedAction:({target:{value:M}})=>{C({type:"SET_SELECTED_ACTION",value:M})}},as=x&&!y||J&&y;return Et?(0,t.jsx)(Xs,{apiTokenName:_?.name}):(0,t.jsx)(Qs,{value:Dt,children:(0,t.jsxs)(v.g,{children:[(0,t.jsx)(E.x7,{name:"API Tokens"}),(0,t.jsx)(W.l1,{validationSchema:ot,validateOnChange:!1,initialValues:{name:_?.name||"",description:_?.description||"",type:_?.type,lifespan:_?.lifespan?_.lifespan.toString():_?.lifespan},enableReinitialize:!0,onSubmit:(M,z)=>Mt(M,z),children:({errors:M,handleChange:z,isSubmitting:D,values:q,setFieldValue:At})=>(Ot&&q?.type!=="custom"&&At("type","custom"),(0,t.jsxs)(E.lV,{children:[(0,t.jsx)(K.F,{backUrl:"/settings/api-tokens",title:{id:"Settings.apiTokens.createPage.title",defaultMessage:"Create API Token"},token:_,setToken:B,canEditInputs:as,canRegenerate:w,isSubmitting:D,regenerateUrl:"/admin/api-tokens/"}),(0,t.jsx)(A.s,{children:(0,t.jsxs)(r.s,{direction:"column",alignItems:"stretch",gap:6,children:[Boolean(_?.name)&&(0,t.jsx)(K.c,{token:_?.accessKey,tokenType:k.A}),(0,t.jsx)(Js,{errors:M,onChange:z,canEditInputs:as,isCreating:y,values:q,apiToken:_,onDispatch:C,setHasChangedPermissions:ns}),(0,t.jsx)(at,{disabled:!as||q?.type==="read-only"||q?.type==="full-access"})]})})]}))})]})})},dt=()=>{const n=(0,N.j)(e=>e.admin_app.permissions.settings?.["api-tokens"].read);return(0,t.jsx)(E.kz,{permissions:n,children:(0,t.jsx)(Os,{})})}},80836:(g,u,s)=>{"use strict";s.d(u,{a:()=>L,b:()=>r,c:()=>P,d:()=>h,u:()=>d});var t=s(69580);const l=t.n.injectEndpoints({endpoints:v=>({getAPITokens:v.query({query:()=>"/admin/api-tokens",transformResponse:i=>i.data,providesTags:(i,p)=>[...i?.map(({id:A})=>({type:"ApiToken",id:A}))??[],{type:"ApiToken",id:"LIST"}]}),getAPIToken:v.query({query:i=>`/admin/api-tokens/${i}`,transformResponse:i=>i.data,providesTags:(i,p,A)=>[{type:"ApiToken",id:A}]}),createAPIToken:v.mutation({query:i=>({url:"/admin/api-tokens",method:"POST",data:i}),transformResponse:i=>i.data,invalidatesTags:[{type:"ApiToken",id:"LIST"}]}),deleteAPIToken:v.mutation({query:i=>({url:`/admin/api-tokens/${i}`,method:"DELETE"}),transformResponse:i=>i.data,invalidatesTags:(i,p,A)=>[{type:"ApiToken",id:A}]}),updateAPIToken:v.mutation({query:({id:i,...p})=>({url:`/admin/api-tokens/${i}`,method:"PUT",data:p}),transformResponse:i=>i.data,invalidatesTags:(i,p,{id:A})=>[{type:"ApiToken",id:A}]})}),overrideExisting:!1}),{useGetAPITokensQuery:d,useGetAPITokenQuery:r,useCreateAPITokenMutation:P,useDeleteAPITokenMutation:L,useUpdateAPITokenMutation:h}=l}}]);
