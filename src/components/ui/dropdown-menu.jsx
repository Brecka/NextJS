export function DropdownMenu({ children }) {
    return <div>{children}</div>;
  }
  
  export function DropdownMenuTrigger({ children }) {
    return <button>{children}</button>;
  }
  
  export function DropdownMenuContent({ children }) {
    return <div>{children}</div>;
  }
  
  export function DropdownMenuItem({ children, onClick }) {
    return <div onClick={onClick}>{children}</div>;
  }
  