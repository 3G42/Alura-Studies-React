import Botao from "../Botao";
import Relogio from "./Relogio";
import style from "./Cronometro.module.scss";
import { ITarefa } from "../../types/tarefa";
import { tempoParaSegundos } from "../../common/utils/date";
import { useEffect, useState } from "react";

interface Props {
  selecionado: ITarefa | undefined;
  finalizarTarefa: (selected: ITarefa | undefined) => void;
}
export default function Cronometro({ selecionado, finalizarTarefa }: Props) {
  const [tempo, setTempo] = useState<number>();

  useEffect(() => {
    if (selecionado?.tempo || selecionado?.id === "Pomodoro") {
      setTempo(tempoParaSegundos(selecionado.tempo));
    }
  }, [selecionado]);
  function regressiva(contador: number = 0) {
    setTimeout(() => {
      if (contador > 0) {
        setTempo(contador - 1);
        return regressiva(contador - 1);
      }
      finalizarTarefa(selecionado);
    }, 1000);
  }
  console.log("selecionado" + JSON.stringify(selecionado, null, 2));
  return (
    <div className={style.cronometro}>
      {selecionado && selecionado.id === "Pomodoro" ? (
        <p className={style.titulo}>{selecionado.tarefa}</p>
      ) : (
        <p className={style.titulo}>Escolha um card e inicie o cronometro</p>
      )}
      <div className={style.relogioWrapper}>
        <Relogio tempo={tempo === undefined ? 0 : tempo} />
      </div>
      <Botao onClick={() => regressiva(tempo)}>
        {selecionado && selecionado.id === "Pomodoro"
          ? "Iniciar Pomodoro"
          : "Começar"}
      </Botao>
    </div>
  );
}
