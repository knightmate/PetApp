import { createRoot } from "react-dom/client";
import App from './App';



    const domNode = document.getElementById('rootReact');

     
     console.log("APp",App);
   
    const rootContainer = createRoot(domNode);

    rootContainer.render(App());
 
      

  

