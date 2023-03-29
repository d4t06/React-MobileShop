import TippyHeadless from "@tippyjs/react/headless";

function Popup({ children, option, content, onHide}) {   
   return (
      <TippyHeadless
      interactive
      placement="bottom"
      render={(attrs) => (
         <div tabIndex="-1" {...attrs}>
            {content}
         </div>
      )}
      onHide={onHide}
      {...option}
      >
         {children}
      </TippyHeadless>
   );
}

export default Popup;
