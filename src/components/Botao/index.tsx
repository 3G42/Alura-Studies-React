import style from "./style.module.scss";

interface Props {
  children: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}
function Botao({ children, type = "button", onClick }: Props) {
  return (
    <button onClick={onClick} type={type} className={style.botao}>
      {children}
    </button>
  );
}

export default Botao;
