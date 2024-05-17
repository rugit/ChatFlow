function RenderIf({ children, condition }) {
  return condition ? children : null;
}

export default RenderIf;
