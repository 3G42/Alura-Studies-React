import style from "./style.module.scss";

interface Props {
  botoes: string[];
  selecionado: string;
  setOpcao: (novaOpcao: string) => void;
}
export default function Select({ botoes, selecionado, setOpcao }: Props) {
  return (
    <div className={style.select}>
      {botoes.map((item, index) => (
        <button
          onClick={selecionado !== item ? () => setOpcao(item) : undefined}
          className={`${style.botao} ${
            selecionado === item ? style.selecionado : ""
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
