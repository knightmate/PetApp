var u=Object.defineProperty;var m=(a,t,s)=>t in a?u(a,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[t]=s;var o=(a,t,s)=>(m(a,typeof t!="symbol"?t+"":t,s),s);import{r as c,j as e,L as x,u as p,a as j,b as g,A as v}from"./index-48accc83.js";class f extends c.Component{constructor(){super(...arguments);o(this,"state",{hasError:!1})}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(s,n){console.error("ErrorBoundary caught an error",s,n)}render(){return this.state.hasError?e.jsxs("h2",{children:["There was an error with this listing. ",e.jsx(x,{to:"/",children:"Click here"})," ","to back to the home page."]}):this.props.children}}const k=f,C=async({queryKey:a})=>{const t=a[1],s=await fetch(`http://pets-v2.dev-apis.com/pets?id=${t}`);if(!s.ok)throw new Error(`details/${t} fetch not ok`);return s.json()};class d extends c.Component{constructor(){super(...arguments);o(this,"state",{active:0});o(this,"handleIndexClick",s=>{this.setState({active:+s.target.dataset.index})})}render(){const{active:s}=this.state,{images:n}=this.props;return e.jsxs("div",{className:"carousel",children:[e.jsx("img",{src:n[s],alt:"animal"}),e.jsx("div",{className:"carousel-smaller",children:n.map((i,l)=>e.jsx("img",{src:i,className:l===s?"active":"",alt:"animal thumbnail",onClick:this.handleIndexClick,"data-index":l},i))})]})}}o(d,"defaultProps",{images:["http://pets-images.dev-apis.com/pets/none.jpg"]});const y=()=>{const{id:a}=p(),[t,s]=c.useState(!1),n=j(),i=g({queryKey:["details",a],queryFn:C}),[l,h]=c.useContext(v);if(i.isLoading)return e.jsx("div",{className:"loading-pane",children:e.jsx("h2",{className:"loader",children:"🌀"})});const r=i.data.pets[0];return console.log("Details Loaded!"),e.jsxs("div",{className:"details",children:[e.jsx(d,{images:r.images}),e.jsxs("div",{children:[e.jsx("h1",{children:r.name}),e.jsx("h2",{children:`${r.animal} — ${r.breed} — ${r.city}, ${r.state}`}),e.jsxs("button",{onClick:()=>s(!0),children:["Adopt ",r.name]}),e.jsx("p",{children:r.description}),t?e.jsx(Modal,{children:e.jsxs("div",{children:[e.jsxs("h1",{children:["Would you like to adopt ",r.name,"?"]}),e.jsxs("div",{className:"buttons",children:[e.jsx("button",{onClick:()=>{h(r),n("/")},children:"Yes"}),e.jsx("button",{onClick:()=>s(!1),children:"No"})]})]})}):null]})]})};function b(a){return e.jsx(k,{children:e.jsx(y,{...a})})}export{b as default};