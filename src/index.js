 
    import React from 'react';
    import App from './App';
    import { createRoot } from 'react-dom/client';

    const domNode = document.getElementById('rootReact');

    
        
     console.log("APp",App);
   
    const rootContainer = createRoot(domNode);

    rootContainer.render(App());
 
      

  

